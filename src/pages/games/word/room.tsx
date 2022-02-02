import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaPlusSquare,
  FaRedoAlt,
  FaCheck,
} from "react-icons/fa";
import { changeRoomOptions, createRoom, joinRoom } from "../../../api/rooms";
import { setRoom } from "../../../state/reducers/room";
import { useRouter } from "next/router";
import { setToken } from "../../../state/reducers/local";
import localPlayer from "../../../api/socket";
import { useAppSelector } from "../../../state/hooks";
import Footer from "../../../components/shared/Footer";
import useNickname from "../../../helpers/hooks/useNickname";
import AnimatedBackground from "../../../components/shared/AnimatedBackground";

const DEFAULT_CATEGORIES_ARABIC = [
  "ولد",
  "بنت",
  "حيوان",
  "جماد",
  "نبات",
  "بلد",
  "فيلم",
  "حشرة",
  "لون",
  "مدينة",
];

const charsArabic: string[] = [
  "أ",
  "ب",
  "ت",
  "ث",
  "ج",
  "ح",
  "خ",
  "د",
  "ذ",
  "ر",
  "ز",
  "س",
  "ش",
  "ص",
  "ض",
  "ط",
  "ظ",
  "ع",
  "غ",
  "ف",
  "ق",
  "ك",
  "ل",
  "م",
  "ن",
  "هـ",
  "و",
  "ى",
];

const WordCreate: NextPage = () => {
  const router = useRouter();
  const mode = (router.query || {}).mode || "create";
  const room = useAppSelector((state) => state.roomSlice);
  const players = useAppSelector((state) => state.playersSlice.players);
  const isInEditMode = mode == "edit" && room && room.id;
  const oldOptions = room.options;
  const [categoriesArabic, setCategories] = useState(
    oldOptions?.categories ?? DEFAULT_CATEGORIES_ARABIC
  );
  const [charsSelected, setCharsSelected] = useState<string[]>(
    oldOptions?.letters ?? charsArabic.slice(0, 8)
  );
  const [newCategory, setNewCategory] = useState("");
  const [newCategoryError, setNewCategoryError] = useState<string | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number>(
    oldOptions?.maxPlayers ?? 8
  );
  const [rounds, setRounds] = useState<number>(
    oldOptions?.rounds ?? charsSelected.length
  );
  const nickname = useNickname();
  const oldRoomId = room && room.id!;
  const minPlayers = players?.length || 0;

  function charClick(char: string) {
    if (charsSelected.includes(char)) {
      setCharsSelected(charsSelected.filter((c) => c != char));
    } else {
      setCharsSelected([...charsSelected, char]);
    }
  }

  function selectAllChars() {
    if (charsArabic.length == charsSelected.length) {
      setCharsSelected([]);
    } else {
      setCharsSelected([...charsArabic]);
    }
  }

  function deleteCategory(categoryName: string) {
    if (categoriesArabic.length === 3) return;
    setCategories(categoriesArabic.filter((cat) => cat != categoryName));
  }

  function resetCategories() {
    setCategories(DEFAULT_CATEGORIES_ARABIC);
  }

  function addCategory(categoryName: string, key?: string) {
    if (categoryName.length == 0) return;
    if (key) {
      if (key !== "Enter") return;
    }
    if (categoriesArabic.includes(categoryName))
      return setNewCategoryError("لا يمكنك اضافة نفس الكلمة مرتين");

    setCategories([...categoriesArabic, categoryName]);
    setNewCategory("");
    setNewCategoryError(null);
  }

  const backToPrevPage = () => {
    if (isInEditMode) {
      router.push(`/games/word/${oldRoomId}`);
    } else {
      router.push("/games/word");
    }
  };

  async function editRoom() {
    const options: RoomOptions = {
      letters: charsSelected,
      rounds,
      maxPlayers,
      categories: categoriesArabic,
    };
    let roomId;
    if (isInEditMode) {
      await changeRoomOptions(nickname, oldRoomId, options);
      roomId = oldRoomId;
    } else {
      roomId = await createRoom(nickname, options).then((res) => res.roomId);
    }
    if (!roomId) return; // TODO: show error
    router.replace(`/games/word/${roomId}`);
  }

  function canProceed() {
    return (
      rounds > 0 &&
      charsSelected.length >= 1 &&
      maxPlayers >= 2 &&
      categoriesArabic.length >= 1
    );
  }

  return (
    <div className="word-create-main h-screen flex justify-center items-center">
      <Head>
        <title>Word - {isInEditMode ? "Edit" : "Create"}</title>
      </Head>

      <AnimatedBackground />

      <div className="bg-[url('../../public/wordbackground.svg')] bg-cover z-0 fixed top-0 left-0 w-full h-full hidden xs:block"></div>

      <div className="main-content-box relative z-20 bg-light sm:px-8 pb-5 pt-3 sm:rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] max-w-[900px] ">
        <Link href="/">
          <Image src="/wordlogo.svg" width="85" height="85" alt="logo" />
        </Link>

        <div className="content-box bg-dark lg:px-8 md:px-8 py-8 rounded-2xl mb-5 mt-3 mx-5 scrollbar overflow-y-scroll max-h-96">
          <div className="choose-chars overflow-hidden">
            <h2 className="mb-5 text-white text-2xl font-semibold">
              الحروف
              <FaCheck
                className="inline ml-2 bg-[#92E4AB] text-[#6BCF89] p-2 rounded-full cursor-pointer text-3xl hover:text-white hover:bg-[#1a8c90]"
                onClick={selectAllChars}
              />
            </h2>
            <div className="chars flex flex-wrap xs:justify-center" dir="rtl">
              {charsArabic.map((char, i) => {
                return (
                  <div
                    key={charsArabic.indexOf(char)}
                    onClick={() => charClick(char)}
                    className={
                      "py-2 px-3 text-lg m-2 bg-white cursor-pointer rounded-full font-semibold flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] transition-colors w-10 " +
                      (charsSelected.includes(char) ? "active" : "")
                    }
                  >
                    {char}
                  </div>
                );
              })}
            </div>

            <div className="choose-categories mt-16 text-right">
              <h2 className="mb-5 text-white text-2xl font-semibold text-center">
                الفئات
                <FaRedoAlt
                  className="inline ml-2 bg-[#92E4AB] text-[#6BCF89] p-2 rounded-full cursor-pointer text-3xl hover:text-white hover:bg-[#1a8c90]"
                  onClick={resetCategories}
                />
              </h2>
              <div className="categories flex flex-wrap" dir="rtl">
                {categoriesArabic.map((category) => {
                  return (
                    <div
                      key={categoriesArabic.indexOf(category)}
                      className="relative py-3 px-8 mx-2 my-2 text-lg bg-white rounded-3xl flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] w-50"
                    >
                      <FaTimes
                        className="absolute -top-1 -right-1 bg-[#f00] text-white text-[1.6rem] rounded-3xl p-1 cursor-pointer"
                        onClick={() => deleteCategory(category)}
                      />
                      {category}
                    </div>
                  );
                })}
              </div>

              {newCategoryError && (
                <p className="text-[#f00] mt-4 font-semibold">
                  {newCategoryError}
                </p>
              )}

              <div className="add-category mt-8 relative inline-block text-white">
                <input
                  type="text"
                  placeholder="أضف فئة"
                  className="bg-transparent mr-2 border-0 border-b-2 border-b-[#eee] p-2 text-right text-white placeholder:text-white focus:outline-none text-lg focus:border-b-light transition-[border]"
                  maxLength={15}
                  value={newCategory}
                  onKeyPress={(e) => addCategory(newCategory, e.key)}
                  onChange={(input) => setNewCategory(input.target.value)}
                />
                <FaPlusSquare
                  className="absolute top-2 left-2 rounded-full text-2xl cursor-pointer"
                  onClick={() => addCategory(newCategory)}
                />
              </div>
            </div>
          </div>
          <div className="choose-categories mt-16">
            <h2 className="mb-8 text-white text-2xl font-semibold">
              الاعدادات
            </h2>
            <div className="flex justify-center align-middle text-white text-center font-light">
              <div className="mr-12">
                <select
                  dir="rtl"
                  className="bg-transparent mr-5 border-b-[1px] my-1 w-12 focus:outline-none"
                  value={rounds}
                  onChange={(e) => setRounds(+e.target.value)}
                >
                  {Array.from(
                    { length: charsSelected.length },
                    (x, i) => i + 1
                  ).map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
                <span className="text-lg pr-16 font-[500]">عدد الجولات</span>
              </div>
              <div>
                <select
                  dir="rtl"
                  className="bg-transparent mr-5 border-b-[1px] my-1 w-12 focus:outline-none"
                  onChange={(e) => setMaxPlayers(+e.target.value)}
                  value={maxPlayers}
                >
                  {Array.from(
                    { length: 13 - minPlayers },
                    (x, i) => i + minPlayers
                  ).map(
                    (num) =>
                      num >= 2 && (
                        <option key={num} value={num}>
                          {num}
                        </option>
                      )
                  )}
                </select>
                <span className="text-lg font-[500]">عدد اللاعبين</span>
              </div>
            </div>
          </div>
        </div>

        <h3
          className="text-white mr-10 text-xl cursor-pointer float-right hover:text-[#1A8B90] font-bold transition-colors"
          onClick={backToPrevPage}
        >
          {isInEditMode ? "رجوع للغرفة" : "الرئيسية"}{" "}
          <FaArrowRight className="inline ml-2" />
        </h3>
        {canProceed() && (
          <h3
            className="text-white ml-10 text-xl cursor-pointer float-left hover:text-[#1A8B90] font-bold transition-colors"
            onClick={editRoom}
          >
            <FaArrowLeft className="inline mr-2" />
            {isInEditMode ? "حفظ الاعدادات " : "إنشاء غرفة"}
          </h3>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default WordCreate;
