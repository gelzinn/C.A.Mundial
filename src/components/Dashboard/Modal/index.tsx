import { X } from "phosphor-react";
import { useEffect, useRef } from "react";
import { ModalContainer } from "./styles";

interface ModalProps {
  title?: string;
  id?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({
  title,
  id = "modal-container",
  onClose,
  children,
}: ModalProps) {
  const handleOutsideClick = (e) => {
    if (e.target.id === id) {
      document.body.classList.remove("menu-opened");
      onClose();
    }
  };

  useEffect(() => {
    document.body.classList.add("menu-opened");
  }, []);

  return (
    <ModalContainer id={id} onClick={handleOutsideClick}>
      <div className="container">
        <div className="close">
          <X onClick={onClose} />
        </div>
        <div className="content">
          {title && (
            <header>
              <h1>{title}</h1>
            </header>
          )}
          {children}
        </div>
      </div>
    </ModalContainer>
  );
}
