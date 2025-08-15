import type { ReactNode } from "react";
import { X } from "lucide-react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  isTitleEditable?: boolean;
  onTitleEdit?: () => void;
  isEditingTitle?: boolean;
  editTitle?: string;
  onTitleChange?: (value: string) => void;
  onTitleKeyDown?: (e: React.KeyboardEvent) => void;
  onTitleBlur?: () => void;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  isTitleEditable = false,
  onTitleEdit,
  isEditingTitle = false,
  editTitle = "",
  onTitleChange,
  onTitleKeyDown,
  onTitleBlur,
}: ModalProps) {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className={`modal-content`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          {isEditingTitle ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => onTitleChange?.(e.target.value)}
              onKeyDown={onTitleKeyDown}
              onBlur={onTitleBlur}
              className="modal-title form-control"
              maxLength={100}
              autoFocus
            />
          ) : (
            <h2
              className={`modal-title ${isTitleEditable ? "modal-title--editable" : ""}`}
              onClick={isTitleEditable ? onTitleEdit : undefined}
            >
              {title}
            </h2>
          )}
          <button className="modal-close-button" onClick={onClose}>
            <X />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
