import Image from "next/image"
import Link from "next/link";
import Head from "next/head";
import type { NextPage } from 'next';

import { FaChevronRight } from "react-icons/fa"

const Word: NextPage = () => {
    return (
        <div className="word-main pt-8 pr-10 h-screen">
            <Head>
                <title>BianMinis - Word</title>
            </Head>

            <div className="big-img absolute overflow-hidden"><Image src="/wordlogo.svg" width="800" height="800" /></div>
            <div className="overlay fixed w-full h-full inset-0 accent-pink-500 bg-black/50 z-0"></div>

            <div className="content relative z-10 text-white">
                <div className="game-content text-right">
                    <Link href="/"><Image src="/wordlogo.svg" width="100" height="100" className="cursor-pointer" /></Link>
                    <h2 className="text-5xl mb-10 mt-5">! مرحبا <span className="text-primary">جاست</span></h2>
                    <p className="text-2xl">لعبة "كلمة" هي نسخة الكترونية للعبة القديمة والممتعة التي لعبناها صغارا، عند بداية الجولة<br />
                        بحرف معين، يتسابق اللاعبون على كتابة كلمات تبدأ بذلك الحرف تبعا للتصنيفات الموجودة<br />
                        وتنتهي الجولة عندما ينتهي أول شخص من الكتابة</p>
                </div>

                <div className="buttons text-center mt-36 mb-20">
                    <Link href="/"><button className="homepage mr-8 px-12 py-3 text-primary rounded-xl border-primary border">الواجهة الرئيسية</button></Link>

                    <div className="start-new-main text-white rounded-xl inline-block relative group cursor-pointer">
                        <div className="start-new transition-all duration-500 px-12 py-3 rounded-xl bg-gradient-to-r from-btngradient-from to-btngradient-to absolute w-full h-full inser-0 group-hover:w-0 group-hover:px-0 group-hover:py-0 z-10"></div>
                        <input type="text" placeholder="Nickname" className="absolute text-black top-0 left-0 px-3 py-3 z-0 rounded-xl" />
                        <h3 className="px-12 py-3 relative z-10 group-hover:invisible">ابدأ لعبة جديدة</h3>
                        <button className="bg-primary absolute top-3 right-3 p-1"><FaChevronRight /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Word;