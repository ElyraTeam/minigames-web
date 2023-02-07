import { NextPage } from "next";
import WordRoomSettings from "../../components/words/room/WordRoomSettings";

const WordCreate: NextPage = () => {

  return (
    <div className="word-create-main h-screen flex justify-center items-center relative">
      <WordRoomSettings />
    </div>
  );
};

export default WordCreate;
