// import { Link } from "react-router-dom";
import { Link } from "react-router-dom";
import { logo } from "../assets/index";
import styles from "../styles/style";

const Header = () => (
    <header className={`flex flex-1 items-center justify-between w-full py-8 fixed left-0 ${styles.paddingX} z-50 bg-[#16181b]`}>
        <div className="flex-1">
            <Link to={'/'}>
                <img src={logo} alt="logo" className="w-[150px] h-[30px]" />
            </Link>
        </div>

        <div className="flex-1">
            <input
                type="text"
                placeholder="Search"
                className="w-full rounded-[5px]"
            />
        </div>

        <div className="flex-[0.5] text-right">
            <a href="!#">Code Link</a>
        </div>
    </header>
);

export default Header;
