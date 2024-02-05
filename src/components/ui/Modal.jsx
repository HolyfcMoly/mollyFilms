import React, { useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = ({ openIn, modalClass, containerClass ='', children }) => {
    const nodeRef = useRef(null);

    return (
            <CSSTransition
                nodeRef={nodeRef}
                in={openIn}
                timeout={300}
                classNames={`${modalClass}`}
                appear={openIn}
                unmountOnExit
            >
                <div
                    className={`z-[1000] ${containerClass}`}
                    ref={nodeRef}
                >
                    {children}
                </div>
            </CSSTransition>
    );
};

export default Modal;
