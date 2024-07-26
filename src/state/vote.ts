import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface VoteState {
  myVotes: Votes;
  categoryVoteData?: CategoryVoteData | null;
  votes?: AllPlayersVotes | null;
  voteCount?: number | null;
  setCategoryVoteData: (categoryVoteData: CategoryVoteData | null) => void;
  setAllPlayerVotes: (votes: AllPlayersVotes | null) => void;
  setVoteCount: (voteCount: number | null) => void;
  setMyVotes: (myVotes: Votes) => void;
}

const useVoteStore = create<VoteState>()(
  devtools((set) => ({
    categoryVoteData: null,
    votes: null,
    voteCount: null,
    myVotes: {},
    setCategoryVoteData: (categoryVoteData) =>
      set(() => ({ categoryVoteData })),
    setAllPlayerVotes: (votes) => set(() => ({ votes })),
    setVoteCount: (voteCount) => set(() => ({ voteCount })),
    setMyVotes: (myVotes) => set(() => ({ myVotes })),
  }))
);

export default useVoteStore;
