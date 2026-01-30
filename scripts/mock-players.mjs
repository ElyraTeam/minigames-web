#!/usr/bin/env node

import { io } from "socket.io-client";

const API_HOST = process.env.API_HOST || "http://localhost:5000";
const ROOM_ID = process.argv[2];
const PLAYER_COUNT = parseInt(process.argv[3] || "10", 10);

if (!ROOM_ID) {
  console.error("Usage: node mock-players.mjs <roomId> [playerCount]");
  console.error("Example: node mock-players.mjs ABC123 10");
  process.exit(1);
}

console.log(`Connecting ${PLAYER_COUNT} players to room ${ROOM_ID}...`);
console.log(`API Host: ${API_HOST}\n`);

async function getHttpToken() {
  const res = await fetch(`${API_HOST}/token`);
  const data = await res.json();
  return data.token;
}

async function joinRoom(httpToken, nickname, roomId) {
  const res = await fetch(`${API_HOST}/word/room/join/${roomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${httpToken}`,
    },
    body: JSON.stringify({ nickname }),
  });
  return res.json();
}

async function leaveRoom(httpToken, roomId) {
  const res = await fetch(`${API_HOST}/word/room/leave/${roomId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${httpToken}`,
    },
    body: JSON.stringify({}),
  });
  return res.json();
}

async function createMockPlayer(playerNumber) {
  const nickname = `Player${playerNumber}`;

  try {
    // 1. Get HTTP token
    const httpToken = await getHttpToken();

    // 2. Join room via API
    const joinData = await joinRoom(httpToken, nickname, ROOM_ID);

    if (joinData.error) {
      console.error(`[${nickname}] Failed to join: ${joinData.error}`);
      return null;
    }

    const { authToken, playerId } = joinData;

    // 3. Connect socket
    const socket = io(API_HOST, {
      transports: ["websocket"],
      autoConnect: false,
      auth: { token: httpToken },
    });

    // 4. Setup socket events
    socket.on("connect", () => {
      // Authenticate with room
      socket.emit(
        "authenticate",
        {
          game: "word",
          roomId: ROOM_ID,
          nickname,
          authToken,
        },
        (result) => {
          if (result?.error) {
            console.error(`[${nickname}] Auth failed: ${result.error}`);
          } else {
            console.log(`[${nickname}] Joined and authenticated!`);
            // Mark as ready after successful auth
            socket.emit("ready");
            console.log(`[${nickname}] Marked as ready`);
          }
        }
      );
    });

    socket.on("sync", (data) => {
      console.log(`[${nickname}] Game sync: state=${data.state}`);
    });

    socket.on("players", (data) => {
      console.log(`[${nickname}] Players updated: ${data.players?.length} players`);
    });

    socket.on("disconnect", (reason) => {
      console.log(`[${nickname}] Disconnected: ${reason}`);
    });

    socket.on("kick", (reason) => {
      console.log(`[${nickname}] Kicked: ${reason}`);
      socket.disconnect();
    });

    // Handle server requesting category values
    socket.on("request-values", (callback) => {
      const player = players.find((p) => p.nickname === nickname);
      const values = player?.pendingValues || {};
      console.log(`[${nickname}] Server requested values, sending:`, values);
      callback(values);
    });

    // Handle voting phase
    socket.on("start-vote", (categoryData) => {
      const player = players.find((p) => p.nickname === nickname);
      console.log(`[${nickname}] Voting started for category: ${categoryData?.category}`);
      if (player?.pendingVote !== undefined) {
        // Auto-vote if pendingVote is set
        const votes = {};
        if (categoryData?.values) {
          Object.keys(categoryData.values).forEach((playerId) => {
            votes[playerId] = player.pendingVote;
          });
        }
        socket.emit("vote", votes);
        console.log(`[${nickname}] Auto-voted:`, player.pendingVote ? "accept" : "reject");
      }
    });

    // Connect!
    socket.connect();

    return { nickname, socket, playerId, httpToken, pendingValues: {}, pendingVote: undefined };
  } catch (err) {
    console.error(`[${nickname}] Error: ${err.message}`);
    return null;
  }
}

// Create all players
const players = [];

for (let i = 1; i <= PLAYER_COUNT; i++) {
  const player = await createMockPlayer(i);
  if (player) {
    players.push(player);
  }
  // Small delay between connections
  await new Promise((r) => setTimeout(r, 200));
}

console.log(`\n${players.length} players connected.\n`);

// Interactive command interface
import * as readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printHelp() {
  console.log(`
Available commands:
  help                       - Show this help
  list                       - List all connected players
  chat <n|all> <message>     - Send chat message (n = player number or 'all')
  ready <n|all>              - Mark player(s) as ready
  values <n|all> <cat:val,...> - Submit category values (e.g., "name:John,animal:Dog")
  vote <n|all> <accept|reject> - Vote accept/reject for current category
  confirm <n|all>            - Confirm votes
  quit                       - Leave room and exit
`);
}

function getPlayers(selector) {
  if (selector === "all") {
    return players;
  }
  const num = parseInt(selector, 10);
  const player = players.find((p) => p.nickname === `Player${num}`);
  return player ? [player] : [];
}

function handleCommand(line) {
  const parts = line.trim().split(" ");
  const cmd = parts[0]?.toLowerCase();

  switch (cmd) {
    case "help":
      printHelp();
      break;

    case "list":
      console.log("Connected players:");
      players.forEach((p) => console.log(`  - ${p.nickname}`));
      break;

    case "chat": {
      const targets = getPlayers(parts[1]);
      const message = parts.slice(2).join(" ");
      if (!targets.length) {
        console.log("Player not found. Use player number or 'all'");
        break;
      }
      if (!message) {
        console.log("Usage: chat <n|all> <message>");
        break;
      }
      targets.forEach((p) => {
        p.socket.emit("chat", message);
        console.log(`[${p.nickname}] Sent chat: ${message}`);
      });
      break;
    }

    case "ready": {
      const targets = getPlayers(parts[1]);
      if (!targets.length) {
        console.log("Player not found. Use player number or 'all'");
        break;
      }
      targets.forEach((p) => {
        p.socket.emit("ready");
        console.log(`[${p.nickname}] Marked as ready`);
      });
      break;
    }

    case "values": {
      const targets = getPlayers(parts[1]);
      const valuesStr = parts[2];
      if (!targets.length) {
        console.log("Player not found. Use player number or 'all'");
        break;
      }
      if (!valuesStr) {
        console.log("Usage: values <n|all> <cat:val,cat:val,...>");
        break;
      }
      const values = {};
      valuesStr.split(",").forEach((pair) => {
        const [cat, val] = pair.split(":");
        if (cat && val) values[cat] = val;
      });
      targets.forEach((p) => {
        // Store values to be sent when server requests them
        p.pendingValues = values;
        console.log(`[${p.nickname}] Set pending values:`, values);
      });
      break;
    }

    case "vote": {
      const targets = getPlayers(parts[1]);
      const voteType = parts[2]?.toLowerCase();
      if (!targets.length) {
        console.log("Player not found. Use player number or 'all'");
        break;
      }
      if (!["accept", "reject"].includes(voteType)) {
        console.log("Usage: vote <n|all> <accept|reject>");
        break;
      }
      targets.forEach((p) => {
        p.pendingVote = voteType === "accept";
        console.log(`[${p.nickname}] Will vote: ${voteType}`);
      });
      break;
    }

    case "confirm": {
      const targets = getPlayers(parts[1]);
      if (!targets.length) {
        console.log("Player not found. Use player number or 'all'");
        break;
      }
      targets.forEach((p) => {
        p.socket.emit("confirm-vote");
        console.log(`[${p.nickname}] Confirmed votes`);
      });
      break;
    }

    case "quit":
    case "exit":
      cleanup();
      break;

    default:
      if (cmd) console.log(`Unknown command: ${cmd}. Type 'help' for commands.`);
  }
}

async function cleanup() {
  console.log("\nLeaving room and disconnecting all players...");

  for (const p of players) {
    try {
      await leaveRoom(p.httpToken, ROOM_ID);
      console.log(`[${p.nickname}] Left room`);
    } catch (err) {
      console.error(`[${p.nickname}] Failed to leave: ${err.message}`);
    }
    p.socket.disconnect();
  }

  rl.close();
  process.exit(0);
}

printHelp();
rl.on("line", handleCommand);
rl.on("close", cleanup);

// Handle exit
process.on("SIGINT", cleanup);
