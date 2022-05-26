import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

interface СonfirmationProps {
  entity: string;
  handleClick: () => void;
  styleName?: string;
}

export const Сonfirmation = ({ entity, handleClick }: СonfirmationProps) => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20, fontSize: 20 }}>
      {t('You are soure for delete')} <strong>{entity}</strong> ?
      <Button name={`${t('delete')}`} handleClick={handleClick} />
    </div>
  );
};
