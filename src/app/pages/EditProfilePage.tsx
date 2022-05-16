import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { IFormProps } from '../Interfaces/Interfaces';
import { useAppSelector } from '../store/redux';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { t } = useTranslation();
  const { userLogin, userId, userName } = useAppSelector((state) => state.header);
  const [editprofileData, setEditProfileData] = useState<IFormProps>();
  return (
    <>
      <div className={styles.card}>
        <div>{`${t('Your ID')}: ${userId}`}</div>
        <div>{`${t('Your Login')}: ${userLogin}`}</div>
        <div>{`${t('Your Name')}: ${userName}`}</div>
      </div>
      <EditProfileForm
        setDataForm={setEditProfileData}
        firstField={'Your name'}
        secondField={'Your Login'}
        thirdFiled={'Your Password'}
        firstFieldHelper={'Name is required'}
        secondFieldHelper={'Login is required'}
        thirdFieldHelper={'Password is required'}
        submitButton={'Edit profile'}
        openModalButton={'Delete user'}
        modalText={'You are soure for delete user'}
        modalConfirmText={'User removed successfully'}
      />
    </>
  );
}
export default EditProfilePage;
