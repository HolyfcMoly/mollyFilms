import {
    GiFilmStrip,
    GiFilmSpool,
    GiFist,
    GiDrippingKnife,
    GiSandsOfTime,
    GiDualityMask,
    GiCactus,
    GiPistolGun,
    GiSkullMask,
} from "react-icons/gi";
import { CiStar } from "react-icons/ci";
import { VscCompass } from "react-icons/vsc";
import { RiBearSmileLine, RiHeartsLine } from "react-icons/ri";
import { MdOutlineTheaterComedy, MdFamilyRestroom } from "react-icons/md";
import { BiCameraMovie } from "react-icons/bi";
import {
    PiMusicNoteLight,
    PiDetectiveLight,
    PiMagicWandThin,
} from "react-icons/pi";
import { LiaTvSolid } from "react-icons/lia";
import { FaPersonMilitaryRifle } from "react-icons/fa6";
import { IoPlanetOutline } from "react-icons/io5";

const genresAndCategories = [
    {
        //categories
        popular: <GiFilmStrip />,
        top_rated: <CiStar />,
        upcoming: <GiFilmSpool />,
        // genres
        28: <GiFist />, //action
        12: <VscCompass />, //adventure
        16: <RiBearSmileLine />, //animation
        35: <GiDualityMask />, //comedy
        80: <GiPistolGun />, //crime
        99: <BiCameraMovie />, //history
        18: <MdOutlineTheaterComedy />, //drama
        10751: <MdFamilyRestroom />, //family
        14: <PiMagicWandThin />, //fantasy
        36: <GiSandsOfTime />,
        27: <GiSkullMask />, //horror
        10402: <PiMusicNoteLight />, //music
        9648: <PiDetectiveLight />, //detective
        10749: <RiHeartsLine />, //romance
        878: <IoPlanetOutline />, //fantasy - фантастика
        10770: <LiaTvSolid />, //Tv
        53: <GiDrippingKnife />, //triller
        10752: <FaPersonMilitaryRifle />, //War
        37: <GiCactus />, //vestern
    },
];

const ImgByGenre = ({ value }) => {
    let img = null;
    let obj = genresAndCategories;
    obj.map((item) => {
        img = item[value];
    });

    return img;
};

export default ImgByGenre;
