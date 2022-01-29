import classNames from "classnames";
import { useState } from "react";

interface SlideButtonProps {
  label: string;
  placeholderLabel?: string;
  height?: number;
  width?: number;
  center?: boolean;
  className?: string;
  maxLength?: number;
  initialValue?: string;
  onInputTextChange?: (text: string) => void;
  onKeyPress?: (key: string) => void;
}

const SlideButton: React.FC<SlideButtonProps> = ({
  label,
  height = 96,
  width = 150,
  center,
  placeholderLabel,
  className = "",
  maxLength = 10,
  children,
  initialValue,
  onInputTextChange,
  onKeyPress,
}) => {
  const [isFocus, setFocused] = useState(false);

  return (
    <div
      className={classNames("h-14 w-72 relative group", className, {
        "self-center": center,
      })}
      dir="rtl"
    >
      <div
        className={classNames(
          "absolute h-full w-full opacity-0 scale-x-0 group-hover:scale-x-100 group-hover:opacity-100 transition-all duration-300 origin-right",
          { "opacity-100 scale-x-100": isFocus }
        )}
      >
        <input
          className="focus:outline-none border-2 border-transparent focus:border-light rounded-2xl px-4 shadow-[0_2px_8px_0_rgba(0,0,0,0.35)] w-full h-full"
          type="text"
          value={initialValue}
          placeholder={placeholderLabel}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) =>
            onInputTextChange && onInputTextChange(e.target.value)
          }
          onKeyPress={(e) => onKeyPress && onKeyPress(e.key)}
          maxLength={maxLength}
        />
        {children && (
          <div className="absolute left-5 top-1/4 h-full cursor-pointer">
            {children}
          </div>
        )}
      </div>

      <button
        className={`bg-gradient-to-r from-btngradient-from to-btngradient-to text-white rounded-2xl text-2xl shadow-[0_6px_8px_0_rgba(0,0,0,0.2)] h-full w-full cursor-none`}
      >
        {label}
      </button>
    </div>
  );
};

export default SlideButton;
