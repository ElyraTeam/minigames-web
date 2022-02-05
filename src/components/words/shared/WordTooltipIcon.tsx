import classNames from 'classnames';

interface WordTooltipIconProps {
    text: string;
    className?: string;
    addMargin?: boolean
}

const WordTooltipIcon: React.FC<WordTooltipIconProps> = ({ text, className, children, addMargin }) => {
    return (
        <div className={classNames("icon-cont relative inline-block z-40", addMargin ? "mr-6" : "")}>
            <div className="group">
                {children}
                <div className={classNames("absolute bg-[#5a5b5c] hidden group-hover:block whitespace-nowrap p-2 rounded-xl text-white bottom-[-50px] z-90 text-[16px] font-normal", className)}>{text}</div>
            </div>
        </div>
    );
};

export default WordTooltipIcon;
