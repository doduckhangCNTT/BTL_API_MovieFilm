import React from "react";
import "./modal.scss";
import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
const Modal = (props) => {
  const [active, setActive] = useState(false);
  console.log(props);
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);
  return (
    <>
      {console.log(active)}
      <div id={props.id} className={`modal ${active ? "active" : ""}`}>
        {props.children}
      </div>
    </>
  );
};

Modal.propTypes = {
  active: PropTypes.bool,
  id: PropTypes.string,
};

export const ModalContent = (props) => {
  const contentRef = useRef(null);

  const closeModal = () => {
    contentRef.current.parentNode.classList.remove("active"); // loại bỏ class active ra khỏi thẻ cha bên ngoài
    if (props.onClose) props.onClose();
  };
  return (
    <div ref={contentRef} className="modal__content">
      {props.children}
      <div className="modal__content__close" onClick={closeModal}>
        <i className="bx bx-x">X</i>
      </div>
    </div>
  );
};

export default Modal;
