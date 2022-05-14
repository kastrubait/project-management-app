import { FC } from 'react';
import style from './ModalBasic.module.scss';

interface IModalBasicProps {
  active: boolean;
  setActive: (arg0: boolean) => void;
}

const ModalBasic: FC<IModalBasicProps> = ({ active, setActive }) => {
  return (
    <div className={active ? style.modal_active : style.modal} onClick={() => setActive(false)}>
      <div className={style.modal_content} onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
};
export default ModalBasic;
