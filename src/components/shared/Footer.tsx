import { FaHeart } from "react-icons/fa";

interface FooterProps { }

const Footer: React.FC<FooterProps> = ({ }) => {
    return (
        <div className="footer absolute bottom-0 left-0 w-full text-white overflow-hidden p-2 z-10">
            <p className="float-left">Made with <FaHeart className="inline text-[#f00]" /> by BianMinis Team</p>
            <p className="float-right">All right reversed &copy; 2022</p>
        </div>
    )
};

export default Footer;
