interface WordRoomPageProps {
  params: {
    gameId: string;
  };
}

const WordRoomPage: React.FC<WordRoomPageProps> = ({ params: { gameId } }) => {
  return (
    <div>
      <h1>Game Id: {gameId}</h1>
    </div>
  );
};

export default WordRoomPage;
