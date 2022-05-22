import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { IFormData } from '../Interfaces/Interfaces';
import { deleteUserThunk, updateUserThunk } from '../store/reducers/HeaderSlice';
import { useAppDispatch } from '../store/redux';

function EditProfilePage() {
  const dispatch = useAppDispatch();
  const [dataForm, setDataForm] = useState<IFormData>();

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
      />
    </>
  );
}
export default EditProfilePage;
