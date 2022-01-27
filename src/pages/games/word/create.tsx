import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  FaArrowLeft,
  FaArrowRight,
  FaTimes,
  FaPlusSquare,
  FaRedoAlt,
} from 'react-icons/fa';
import { createRoom, joinRoom } from '../../../api/rooms';
import { setRoom } from '../../../state/reducers/room';
import { useRouter } from 'next/router';
import { setToken } from '../../../state/reducers/local';
import localPlayer from '../../../api/socket';

const DEFAULT_CATEGORIES_ARABIC = [
  'ولد',
  'بنت',
  'حيوان',
  'جماد',
  'نبات',
  'بلد',
  'فيلم',
  'حشرة',
  'لون',
  'مدينة',
];

const charsArabic: string[] = [
  'أ',
  'ب',
  'ت',
  'ث',
  'ج',
  'ح',
  'خ',
  'د',
  'ذ',
  'ر',
  'ز',
  'س',
  'ش',
  'ص',
  'ض',
  'ط',
  'ظ',
  'ع',
  'غ',
  'ف',
  'ق',
  'ك',
  'ل',
  'م',
  'ن',
  'هـ',
  'و',
  'ى',
];

const WordCreate: NextPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [categoriesArabic, setCategories] = useState(DEFAULT_CATEGORIES_ARABIC);
  const [charsSelected, setCharsSelected] = useState<string[]>(
    charsArabic.slice(0, 8)
  );
  const [newCategory, setNewCategory] = useState('');
  const [newCategoryError, setNewCategoryError] = useState<string | null>(null);
  const [maxPlayers, setMaxPlayers] = useState<number>(8);
  const [rounds, setRounds] = useState<number>(charsSelected.length);

  function charClick(char: string) {
    if (charsSelected.includes(char)) {
      setCharsSelected(charsSelected.filter((c) => c != char));
    } else {
      setCharsSelected([...charsSelected, char]);
    }
  }

  function deleteCategory(categoryName: string) {
    if (categoriesArabic.length === 3) return;
    setCategories(categoriesArabic.filter((cat) => cat != categoryName));
  }

  function resetCategories() {
    setCategories(DEFAULT_CATEGORIES_ARABIC);
  }

  function addCategory(categoryName: string) {
    if (categoryName.length == 0) return;
    if (categoriesArabic.includes(categoryName))
      return setNewCategoryError('لا يمكنك اضافة نفس الكلمة مرتين');
    setCategories([...categoriesArabic, categoryName]);
    setNewCategory('');
    setNewCategoryError(null);
  }

  async function makeRoom() {
    const options: RoomOptions = {
      letters: charsSelected,
      rounds,
      maxPlayers,
      categories: categoriesArabic,
    };
    const { roomId } = await createRoom('test', options);
    if (!roomId) return; // TODO: show error
    const { authToken } = await joinRoom('test', roomId);
    if (!authToken) return; // TODO: show error
    dispatch(setToken(authToken));
    dispatch(setRoom({ id: roomId, options }));
    router.replace(`/games/word/${roomId}`);
    localPlayer.authenticate({ authToken, roomId, nickname: 'test' });
  }

  return (
    <div className="word-create-main h-screen flex justify-center items-center">
      <Head>
        <title>Word - Create</title>
      </Head>

      <div className="bg-[url('../../public/wordbackground.svg')] bg-cover z-0 fixed top-0 left-0 w-full h-full"></div>

      <div className="main-content-box absolute bg-light sm:px-8 pb-5 pt-3 rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)] max-w-4xl ">
        <Image src="/wordlogo.svg" width="85" height="85" alt="logo" />

        <div className="content-box bg-dark lg:px-8 md:px-8 py-8 rounded-2xl mb-5 mt-3 mx-5 scrollbar overflow-y-scroll max-h-96">
          <div className="choose-chars overflow-hidden">
            <h2 className="mb-5 text-white text-2xl font-semibold">الحروف</h2>
            <div
              className="chars grid lg:grid-cols-12 md:grid-cols-10 grid-cols-6"
              dir="rtl"
            >
              {charsArabic.map((char, i) => {
                return (
                  <div
                    key={charsArabic.indexOf(char)}
                    onClick={() => charClick(char)}
                    className={
                      'py-2 px-3 text-lg m-2 bg-white cursor-pointer rounded-full font-semibold flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] transition-colors hover:bg-primary hover:text-white w-10 ' +
                      (charsSelected.includes(char) ? 'active' : '')
                    }
                  >
                    {char}
                  </div>
                );
              })}
            </div>

            <div className="choose-categories mt-16">
              <h2 className="mb-5 text-white text-2xl font-semibold">
                الفئات
                <FaRedoAlt
                  className="inline ml-2 bg-[#92E4AB] p-2 rounded-full cursor-pointer text-3xl"
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
                      ></FaTimes>
                      {category}
                    </div>
                  );
                })}
              </div>
              <div className="add-category mt-8 relative inline-block text-white">
                <input
                  type="text"
                  placeholder="أضف فئة"
                  className="bg-transparent border-0 border-b-2 border-b-[#eee] p-2 text-right text-white placeholder:text-white focus:outline-none text-lg focus:border-b-light transition-[border]"
                  maxLength={15}
                  value={newCategory}
                  onChange={(input) => setNewCategory(input.target.value)}
                />
                <FaPlusSquare
                  className="absolute top-2 left-2 rounded-full text-2xl cursor-pointer"
                  onClick={() => addCategory(newCategory)}
                />
              </div>
              {newCategoryError && (
                <p className="text-[#f00] mt-4 font-semibold">
                  {newCategoryError}
                </p>
              )}
            </div>
          </div>
          <div className="choose-categories mt-16">
            <h2 className="mb-8 text-white text-2xl font-semibold">
              الاعدادات
            </h2>
            <div className="flex justify-center align-middle text-white text-center font-light">
              <div className="mr-12">
                <span className="text-lg">عدد الجولات</span>
                <br />
                <select
                  className="bg-transparent border-b-2 my-1 w-12 focus:outline-none"
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
              </div>
              <div>
                <span className="text-lg">عدد اللاعبين</span>
                <br />
                <select
                  className="bg-transparent border-b-2 my-1 w-12 focus:outline-none"
                  onChange={(e) => setMaxPlayers(+e.target.value)}
                  value={maxPlayers}
                >
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <Link href="/">
          <h3 className="text-white mr-10 text-xl cursor-pointer float-right hover:text-black font-semibold">
            الرئيسية <FaArrowRight className="inline ml-2" />
          </h3>
        </Link>
        <h3
          className="text-white ml-10 text-xl cursor-pointer float-left hover:text-black font-semibold"
          onClick={makeRoom}
        >
          <FaArrowLeft className="inline mr-2" />
          إنشاء غرفة
        </h3>
      </div>
    </div>
  );
};

export default WordCreate;
