import { close } from '../../assets';

const CloseBtn = ({btnClass, open, setOpen}) =>  (
    <button
        className={`sfhd:h-12 sfhd:w-12 ss:h-auto ss:w-auto h-6 w-6 ${btnClass}`}
        onClick={(e) => {
            setOpen(!open);
            e.stopPropagation();
        }}
    >
        <img
            src={close}
            className="w-full h-full object-cover"
        />
    </button>
)


export default CloseBtn
