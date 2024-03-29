import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import type { NextPage } from 'next';
import { APP_NAME } from '../../config/constants';
import AnimatedBackground from '../../components/shared/AnimatedBackground';
import useNickname from '../../helpers/hooks/useNickname';
import { WORD_GAME_NAME } from '../../config/word';
import WordLogo from '../../components/words/shared/WordLogo';
import { useRouter } from 'next/router';
import Footer from '../../components/shared/Footer';

const Word: NextPage = () => {
  const nickname = useNickname();
  const router = useRouter();

  return (
    <div className="word-main pt-8 h-screen text-white">
      <Head>
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
        <title>
          {APP_NAME} - {WORD_GAME_NAME}
        </title>
      </Head>

      <div className="bg-[url('../../public/wordbackground.svg')] bg-cover fixed top-0 left-0 w-full h-full"></div>

      {/* <AnimatedBackground /> */}

      <div className="content relative z-10 mx-auto">
        <div className="game-content text-center sm:text-right p-1 sm:pr-10">
          <WordLogo
            size="100"
            onClick={() => router.push('/word')}
            className="cursor-pointer"
          />
          <h2 dir="rtl" className="text-5xl mb-10 mt-5">
            مرحبا <span className="text-[#6fed37]">{nickname}</span>!
            <Link href="/getstarted"><span className="text-[17px] cursor-pointer hover:text-primary">(تغيير)</span></Link>
          </h2>
          <p className="text-2xl leading-10">
            لعبة "كلمة" هي نسخة الكترونية للعبة القديمة والممتعة التي لعبناها
            صغارا، عند بداية الجولة
            <br />
            بحرف معين، يتسابق اللاعبون على كتابة كلمات تبدأ بذلك الحرف تبعا
            للتصنيفات الموجودة
            <br />
            وتنتهي الجولة عندما ينتهي أول شخص من الكتابة
          </p>
        </div>

        <div className="buttons text-center mt-16 sm:mt-28 pb-10">
          <Link href="/">
            <button className="homepage text-xl xs:block xs:mx-auto mb-8 sm:mb-0 sm:mr-8 px-12 py-3 text-[#6fed37] rounded-2xl border-[#6fed37] border hover:bg-[rgba(109,255,0,.2)] hover:text-[#0f0] transition-all">
              الواجهة الرئيسية
            </button>
          </Link>

          <Link href="/word/room?mode=create">
            <button className="start-new-main text-xl xs:block xs:mx-auto px-12 py-3 text-white rounded-2xl bg-gradient-to-r from-btngradient-from to-btngradient-to border-0 border-transparent relative active:top-[2px] shadow-[0px_4px_0px_0px_rgba(0,0,0,.3)] active:shadow-[0px_2px_0px_0px_rgba(0,0,0,.3)]">
              ابدأ لعبة جديدة
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Word;
