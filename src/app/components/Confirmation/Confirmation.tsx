import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';
import style from './Confirmation.module.scss';

interface –°onfirmationProps {
  entity: string;
  handleOK: () => void;
  handleCancel: () => void;
  styleName?: string;
}

export const –°onfirmation = ({ entity, handleOK, handleCancel }: –°onfirmationProps) => {
  const { t } = useTranslation();
  return (
    <div style={{ padding: 20, fontSize: 20 }}>
      <p>
        {t('Are you sure to delete')} {entity}?
      </p>
      <Button name={`${t('OK')}`} handleClick={handleOK} styleName={style.btn_ok} />
      <Button name={`${t('Cancel')}`} handleClick={handleCancel} styleName={style.btn_cancel} />
    </div>
  );
};
