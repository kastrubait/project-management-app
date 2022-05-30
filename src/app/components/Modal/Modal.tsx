import { FC, ReactElement, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from './Modal.module.scss';

interface ModalProps {
  isVisible: boolean;
  warn?: boolean;
  title: string;
  content: ReactElement;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({
  isVisible,
  warn = false,
  title,
  content,
  onClose,
}: ModalProps) => {
  const { t } = useTranslation();
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

  if (!isVisible) return null;
  return ReactDOM.createPortal(
    <section className={style.modal}>
      <div className={style.modalDialog}>
        <div className={style.modalHeader}>
          <h3>
            {warn && <span className={style.warning} />}
            {title}
          </h3>
          <Tippy content={<span>{t('Close')}</span>}>
            <button tabIndex={0} className={style.modalClose} onClick={onClose} onKeyDown={onClose}>
              &times;
            </button>
          </Tippy>
        </div>
        <div className={style.modalBody}>{content}</div>
      </div>
    </section>,
    document.body
  );
};
