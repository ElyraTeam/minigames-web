import { useEffect, useRef } from "react";
import usePlatform from "../../helpers/hooks/usePlatform";

interface AnimatedBackground { }

const AnimatedBackground: React.FC<AnimatedBackground> = ({ }) => {
    const mainDiv = useRef<HTMLDivElement>(null);
    const topLine = useRef<HTMLDivElement>(null);
    const midLine = useRef<HTMLDivElement>(null);
    const bottomLine = useRef<HTMLDivElement>(null);
    const { isMobile } = usePlatform();

    useEffect(() => {
        if (isMobile) {
            if (mainDiv.current) mainDiv.current.style.display = "none";
        }

        let numRightTop = 1;
        let numRightMid = 1;
        let numRightBottom = 1;

        setInterval(() => {
            if (numRightTop === 1900) {
                if (topLine.current) topLine.current.style.transform = `translateX(1px) translateY(130px)`;
                numRightTop = 2;
            }

            if (topLine.current) topLine.current.style.transform = `translateX(${numRightTop}px) translateY(130px)`;

            numRightTop++;
        }, 10)

        setInterval(() => {
            if (numRightMid === 1900) {
                if (midLine.current) midLine.current.style.transform = `translateX(1px) translateY(130px)`;
                numRightMid = 2;
            }

            if (midLine.current) midLine.current.style.transform = `translateX(${numRightMid}px) translateY(130px)`;

            numRightMid++;
        }, 8)

        setInterval(() => {
            if (numRightBottom === 1900) {
                if (bottomLine.current) bottomLine.current.style.transform = `translateX(1px) translateY(130px)`;
                numRightBottom = 2;
            }

            if (bottomLine.current) bottomLine.current.style.transform = `translateX(${numRightBottom}px) translateY(130px)`;

            numRightBottom++;
        }, 7)
    }, []);

    return (
        <div className="main-animatedbackground w-full h-full bg-[#4] text-center overflow-hidden fixed bottom-0 left-0 flex items-end flex-col flex-nowrap bg-[#2b87d3]" dir="rtl" ref={mainDiv}>
            <div className="top-line line w-full m-[5px] whitespace-nowrap" ref={topLine}>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ث</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">أ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ض</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">و</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ح</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">د</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ى</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ل</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ك</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ك</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ث</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">أ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ض</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">و</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ح</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">د</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ى</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ل</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ك</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ك</div>
            </div>
            <div className="mid-line line w-full m-[5px] whitespace-nowrap" ref={midLine}>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">غ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">ف</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">ع</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">خ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">ج</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">ق</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">و</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">هـ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">س</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">س</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">غ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">ف</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">ع</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">خ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">ج</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">ق</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">و</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">هـ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#56FFE8]">س</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#FFBE66]">س</div>
            </div>
            <div className="bottom-line line w-full m-[5px] whitespace-nowrap" ref={bottomLine}>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">م</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">هـ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">غ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ف</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ب</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ح</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ع</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ق</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ن</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ن</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">م</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">هـ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">غ</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ف</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ب</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ح</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ع</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ق</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#F8F811]">ن</div>
                <div className="box relative inline-block text-white w-[180px] h-[180px] text-[7em] text-center leading-[1.5] mx-[5px] shadow-[0 8px 16px 0 rgba(0,0,0,.3)] bg-[#11F820]">ن</div>
            </div>
            <div className="overlay absolute w-full h-full top-0 left-0 opacity-[.8] bg-animatedbackground-overlay"></div>
        </div>
    )
};

export default AnimatedBackground;