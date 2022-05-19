import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { IFormData } from '../Interfaces/Interfaces';
import { deleteUserThunk, updateUserThunk } from '../store/reducers/HeaderSlice';
import { useAppDispatch } from '../store/redux';
import styles from './EditProfilePage.module.scss';

function EditProfilePage() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [dataForm, setDataForm] = useState<IFormData>();
  const formId = 'editProfileForm';
  /* const buttonHandleClick = () => {
    if (dataForm) {
      dispatch(updateUserThunk({ dataForm }));
    }
  }; */

  useEffect(() => {
    if (dataForm) {
      dispatch(updateUserThunk({ dataForm }));
    }
  }, [dataForm, dispatch]);

  const navigate = useNavigate();

  const GoBackHandler = () => {
    navigate('/welcomePage');
  };
  const buttonDeleteUserHandler = () => {
    dispatch(deleteUserThunk());
  };

  return (
    <>
      <EditProfileForm
        formId={formId}
        buttonDeleteUserHandler={buttonDeleteUserHandler}
        GoBackHandler={GoBackHandler}
        setDataForm={setDataForm}
        firstField={'Your name'}
        secondField={'Your Login'}
        thirdFiled={'Your Password'}
        firstFieldHelper={'Name is required'}
        secondFieldHelper={'Login is required'}
        thirdFieldHelper={'Password is required'}
        submitButton={'Save profile'}
        openModalButton={'Delete user profile'}
        modalText={'You are soure for delete user'}
        modalConfirmText={'User removed successfully'}
      />
    </>
  );
}
export default EditProfilePage;
