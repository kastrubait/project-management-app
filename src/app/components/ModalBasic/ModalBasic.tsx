import { FC } from 'react';
import ReactDOM from 'react-dom';
import style from './ModalBasic.module.scss';

interface IModalBasicProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
  children?: JSX.Element;
}

const ModalBasic: FC<IModalBasicProps> = ({ active, setActive }) => {
  if (!active) return null;
  return ReactDOM.createPortal(
    <section className={active ? style.modal_active : style.modal} onClick={() => setActive(false)}>
      <div className={style.modal_content} onClick={() => setActive(true)}>
        &times;
      </div>
    </section>,
    document.body
  );
};
export default ModalBasic;
