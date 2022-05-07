import { FC, ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import style from './Modal.module.scss';

interface ModalProps {
  title: string;
  content: ReactElement;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ title, content, onClose }: ModalProps) => {
  const keydownHandler = ({ key }: { key: string }): void => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  return ReactDOM.createPortal(
    <section className={style.modal}>
      <div className={style.modalDialog}>
        <div className={style.modalHeader}>
          <h3>{title}</h3>
          <span
            role="button"
            tabIndex={0}
            className={style.modalClose}
            onClick={onClose}
            onKeyDown={onClose}
          >
            &times;
          </span>
        </div>
      </div>
      <div className={style.modalBody}>{content}</div>
    </section>,
    document.body
  );
};
