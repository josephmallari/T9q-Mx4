import type { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: "small" | "medium" | "large";
  isTitleEditable?: boolean;
  onTitleEdit?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = "medium",
  isTitleEditable = false,
  onTitleEdit,
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content modal-content--${size}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2
            className={`modal-title ${isTitleEditable ? "modal-title--editable" : ""}`}
            onClick={isTitleEditable ? onTitleEdit : undefined}
          >
            {title}
          </h2>
          <button className="modal-close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
