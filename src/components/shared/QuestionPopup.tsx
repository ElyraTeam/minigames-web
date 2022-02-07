import classNames from "classnames";
import { useState } from "react";
import { FaQuestion } from "react-icons/fa";

interface QuestionPopupprops {
    mainDivClass?: string
}

const QuestionPopup: React.FC<QuestionPopupprops> = ({ children, mainDivClass }) => {
    return (
        <div className={classNames("questionpopup-main relative group inline-block", mainDivClass)}>
            <FaQuestion className="bg-[#67ea9b] text-white hover:bg-[#1e8893] w-6 h-6 p-[6px] cursor-pointer rounded-3xl" />
            <div className="answer-content absolute shadow-[0_8px_8px_0_rgba(0,0,0,0.3)] hidden group-hover:block text-[14px] whitespace-nowrap bg-white py-4 px-8 text-black top-[40px] left-1/2 translate-x-[-50%] rounded-xl z-50">
                {children}
            </div>
        </div>
    )
};

export default QuestionPopup;
