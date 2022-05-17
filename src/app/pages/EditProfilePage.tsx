import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { IFormData } from '../Interfaces/Interfaces';
import { deleteUserThunk, updateUserThunk } from '../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../store/redux';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { userLogin, userId, userName } = useAppSelector((state) => state.header);
  const [dataForm, setDataForm] = useState<IFormData>();
  const buttonHandleClick = () => {
    if (dataForm) {
      dispatch(updateUserThunk({ dataForm }));
    }
  };
  const navigate = useNavigate();

  const GoBackHandler = () => {
    navigate('/welcomePage');
  };
  const buttonDeleteUserHendler = () => {
    dispatch(deleteUserThunk());
  };

  return (
    <>
      <div className={styles.card}>
        <div>{`${t('Your ID')}: ${userId}`}</div>
        <div>{`${t('Your Login')}: ${userLogin}`}</div>
        <div>{`${t('Your Name')}: ${userName}`}</div>
      </div>
      <EditProfileForm
        buttonDeleteUserHendler={buttonDeleteUserHendler}
        GoBackHandler={GoBackHandler}
        buttonHandleClick={buttonHandleClick}
        setDataForm={setDataForm}
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
