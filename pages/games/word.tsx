import Image from "next/image"
import Link from "next/link";
import Head from "next/head";
import type { NextPage } from 'next';

const Word: NextPage = () => {
    return (
        <div className="word-main pt-8 pr-10">
            <Head>
                <title>BianMinis - Word</title>
            </Head>

            <div className="game-content text-right">
                <Link href="/"><Image src="/wordlogo.svg" width="100" height="100" className="cursor-pointer" /></Link>
                <h2 className="text-5xl mb-10 mt-5 font-cairo">! مرحبا <span className="text-primary">جاست</span></h2>
                <p className="text-2xl font-cairo">لعبة "كلمة" هي نسخة الكترونية للعبة القديمة والممتعة التي لعبناها صغارا، عند بداية الجولة<br />
                    بحرف معين، يتسابق اللاعبون على كتابة كلمات تبدأ بذلك الحرف تبعا للتصنيفات الموجودة<br />
                    وتنتهي الجولة عندما ينتهي أول شخص من الكتابة</p>
            </div>

            <div className="buttons text-center mt-36 mb-10">
                <Link href="/"><button className="homepage mr-8 px-12 py-3 text-primary rounded-xl border-primary border font-cairo">الواجهة الرئيسية</button></Link>
                <button className="start-new px-12 py-3 text-white rounded-xl font-cairo bg-gradient-to-r from-btngradient-from to-btngradient-to">ابدأ لعبة جديدة</button>
            </div>
        </div>
    )
}

export default Word;