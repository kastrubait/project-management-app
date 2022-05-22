import Button from '../Button/Button';
import style from './Confirmation.module.scss';

interface СonfirmationProps {
  entity: string;
  handleClick: () => void;
  styleName?: string;
}

export const Сonfirmation = ({ entity, handleClick }: СonfirmationProps) => {
  return (
    <div style={{ padding: 20, fontSize: 20 }}>
      You are soure for delete <strong>{entity}</strong> ?
      <Button
        name={'Delete'}
        // styleName={style.editProfileButtonModify}
        handleClick={handleClick}
      />
    </div>
  );
};
