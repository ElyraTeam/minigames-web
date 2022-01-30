import classNames from "classnames";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Credit from "../../components/about/Credit";
import Card from "../../components/shared/Card";
import OutlineButton from "../../components/shared/OutlineButton";
import SlideButton from "../../components/shared/SlideButton";
import SocialLink from "../../components/shared/SocialLink";
import WordLogo from "../../components/words/shared/WordLogo";
import { APP_NAME, CREDITS, TEAM_NAME } from "../../config/constants";
import { shuffle } from "../../helpers/utils";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { setNickname } from "../../state/reducers/local";

const Home: NextPage = () => {
  const router = useRouter();
  const [showCreds, setShowCreds] = useState(false);
  const [nickname, setName] = useState("");
  const [creds, setCreds] = useState<UserCredit[]>([]);
  const stateNickname = useAppSelector((state) => state.localSlice.nickname);
  const useDispatch = useAppDispatch();
  useEffect(() => {
    setCreds(shuffle(CREDITS));
  }, []);

  function updateNickname() {
    if (nickname && nickname != "") {
      useDispatch(setNickname(nickname));
      router.replace(`/games/word`);
    }
  }

  return (
    <div className="getstarted-main">
      <Head>
        <title>{APP_NAME} - Get Started</title>
      </Head>

      <div className="flex flex-col h-screen justify-center items-center text-center">
        <WordLogo size="100" />
        <h2 className="text-2xl font-semibold mt-6 mb-16">!مرحبا بك في كلمة</h2>
        <SlideButton
          onInputTextChange={setName}
          center
          label="ابدأ اللعب"
          initialValue={stateNickname}
          onKeyPress={(k) => k == "Enter" && updateNickname()}
          placeholderLabel="اكتب اسمك"
        >
          <Image
            onClick={updateNickname}
            src="/assets/svg/send.svg"
            width="25"
            height="25"
          />
        </SlideButton>
        <div className="mt-8 text-lg">
          تطوير{" "}
          <span
            className="text-btngradient-from cursor-pointer"
            onClick={() => setShowCreds(!showCreds)}
          >
            فريق {TEAM_NAME}
          </span>
        </div>
        <div className="flex justify-center mt-6">
          <SocialLink link="">
            <Image src="/assets/svg/facebook.svg" width="25" height="25" />
          </SocialLink>
          <SocialLink link="">
            <Image src="/assets/svg/twitter.svg" width="25" height="25" />
          </SocialLink>
          <SocialLink link="">
            <Image src="/assets/svg/github.svg" width="25" height="25" />
          </SocialLink>
        </div>

        <Card
          className={classNames(
            "absolute w-[30rem] bg-white rounded-2xl transition-transform duration-500 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20",
            {
              "scale-[0]": !showCreds,
            }
          )}
        >
          {creds.map((u, i) => (
            <div>
              <Credit credit={u} className="my-4" />
              {i >= 0 && i != CREDITS.length - 1 && (
                <hr className="border-[#eee] border-b-[2px]" />
              )}
            </div>
          ))}
          <OutlineButton
            className="w-28 self-center mt-8"
            onClick={() => setShowCreds(false)}
          >
            إغلاق
          </OutlineButton>
        </Card>

        <div
          className={classNames(
            "overlay absolute h-full w-full top-0 left-0 cursor-pointer bg-[rgba(0,0,0,0.4)] z-10",
            {
              hidden: !showCreds,
            }
          )}
          onClick={() => setShowCreds(false)}
        ></div>
      </div>
    </div>
  );
};

export default Home;
