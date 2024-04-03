import React, { memo, useRef } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = memo(({ openIn, modalClass, containerClass ='', children }) => {
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
});
Modal.displayName = 'Modal';
export default Modal;
