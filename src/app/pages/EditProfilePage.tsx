import { useTranslation } from 'react-i18next';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { useAppSelector } from '../store/redux';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { t } = useTranslation();
  const { userLogin, userId, userName } = useAppSelector((state) => state.header);

  return (
    <>
      <div className={styles.card}>
        <div>{`${t('Your ID')}: ${userId}`}</div>
        <div>{`${t('Your Login')}: ${userLogin}`}</div>
        <div>{`${t('Your Name')}: ${userName}`}</div>
      </div>
      <EditProfileForm />
    </>
  );
}
export default EditProfilePage;
