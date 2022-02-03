import { FaExclamationTriangle } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';

interface AlertProps {
  body: string;
  show: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const Alert: React.FC<AlertProps> = ({ body, show, onConfirm, onCancel }) => {
  return (
    <CSSTransition in={show} classNames="bounce" unmountOnExit timeout={300}>
      <div className="leave-box absolute w-[400px] shadow-2xl rounded-2xl text-center text-black p-5 top-1/2 left-1/4 right-1/4 bg-white z-50">
        <FaExclamationTriangle className="text-[#f00] mx-auto text-4xl" />
        <h3 className="mt-2 mb-5">{body}</h3>
        <div className="buttons">
          <button
            className="mr-5 hover:opacity-50 transition-opacity"
            onClick={onCancel}
          >
            إلغاء
          </button>
          <button
            className="bg-[#f00] text-white py-1 px-4 rounded-xl hover:bg-opacity-70 transition-colors"
            onClick={onConfirm}
          >
            تأكيد
          </button>
        </div>
      </div>
    </CSSTransition>
  );
};

export default Alert;
