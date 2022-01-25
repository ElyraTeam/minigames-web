import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { FaArrowRight, FaTimes, FaPlusSquare } from "react-icons/fa";

const WordCreate: NextPage = () => {
    const charsArabic: string[] = ["أ", "ب", "ت", "ث", "ج", "ح", "خ", "د", "ذ", "ر", "ز", "س", "ش", "ص", "ض", "ط", "ظ", "ع", "غ", "ف", "ق", "ك", "ل", "م", "ن", "هـ", "و", "ى"]
    const categoriesArabic: string[] = ["اسم ولد", "اسم بنت", "حيوان", "جماد", "نبات", "بلد", "فيلم", "حشرة", "لون", "مدينة"]

    const clickedChars: string[] = [];


    function charClick(e: any) {
        if (e.target.classList.contains("active")) {
            e.target.classList.remove("active");
            clickedChars.splice(clickedChars.indexOf(e.target.textContent), 1);
        } else {
            e.target.classList.add("active");
            clickedChars.push(e.target.textContent);
        }
    }

    return (
        <div className="word-create-main h-screen bg-[url('../public/wordbackground.svg')] bg-cover flex justify-center items-center">
            <div className="main-content-box bg-light sm:px-8 pb-5 pt-3 rounded-2xl text-center border-4 border-white shadow-[0_16px_32px_0_rgba(0,0,0,0.4)]">
                <Head>
                    <title>Word - Create</title>
                </Head>

                <Image src="/wordlogo.svg" width="85" height="85" alt="logo" />

                <div className="content-box bg-dark lg:px-8 md:px-32 py-8 rounded-2xl mb-5 mt-3 mx-5 scrollbar overflow-y-scroll max-h-96">
                    <div className="choose-chars">
                        <h2 className="mb-5 text-white text-2xl font-semibold">اختر الحروف</h2>
                        <div className="chars grid grid-cols-7">
                            {charsArabic.map(char => {
                                return <div key={charsArabic.indexOf(char)} onClick={charClick} className="py-2 px-3 text-lg m-2 bg-white cursor-pointer rounded-full font-semibold flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)] transition-colors hover:bg-primary hover:text-white">{char}</div>
                            })}
                        </div>

                        <div className="choose-categories mt-32">
                            <h2 className="mb-5 text-white text-2xl font-semibold">اختر التصنيفات</h2>
                            <div className="categories grid grid-cols-6">
                                {categoriesArabic.map(category => {
                                    return <div key={categoriesArabic.indexOf(category)} className="py-3 px-8 mx-2 my-2 text-lg bg-white rounded-3xl flex justify-center items-center shadow-[0_4px_8px_0_rgba(0,0,0,0.3)]">{category}</div>
                                })}
                            </div>
                            <div className="add-category mt-8 relative inline-block text-white">
                                <input type="text" placeholder="أضف تصنيفا" className="bg-transparent border-0 border-b-2 p-2 text-2xl text-right text-white placeholder:text-white focus:outline-none" />
                                <FaPlusSquare className="absolute top-4 left-2 rounded-full text-2xl cursor-pointer" />
                            </div>
                        </div>
                    </div>
                </div>

                <Link href="/"><h3 className="text-white mr-10 text-xl cursor-pointer float-right hover:text-black font-semibold">الرئيسية <FaArrowRight className="inline ml-2" /></h3></Link>
            </div>
        </div>
    )
}

export default WordCreate;