import Button from '../Button/Button';
import style from './Confirmation.module.scss';

interface СonfirmationProps {
  entity: string;
  handleClick: () => void;
  styleName?: string;
}

export const Сonfirmation = ({ entity, handleClick }: СonfirmationProps) => {
  return (
    <div className={style.content}>
      You are soure for delete {entity} ?
      <Button name={'Delete'} handleClick={handleClick} />
    </div>
  );
};
