import Button from '../Button/Button';
import style from './Сonfirmation.module.scss';

interface СonfirmationProps {
  status: string | null;
  entity: string;
  handleClick: () => void;
  styleName?: string;
}

export const Сonfirmation = ({ status, entity, handleClick }: СonfirmationProps) => {
  const isResolved = status === 'resolved';
  return (
    <>
      {!isResolved && (
        <div style={{ padding: 20, fontSize: 20 }}>
          You are soure for delete <strong>{entity}</strong> ?
          <Button
            name={'Delete'}
            // styleName={style.editProfileButtonModify}
            handleClick={handleClick}
          />
        </div>
      )}
      {isResolved && (
        <div style={{ padding: 20, color: 'red', fontSize: 25, marginLeft: 44 }}>
          {entity} removed successfully !
        </div>
      )}
    </>
  );
};
