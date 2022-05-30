import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import EditProfileForm from '../components/EditProfile/EditProfileForm';
import { IFormData } from '../Interfaces/Interfaces';
import { deleteUserThunk, getUserThunk, updateUserThunk } from '../store/reducers/HeaderSlice';
import { useAppDispatch } from '../store/redux';

function EditProfilePage() {
  const dispatch = useAppDispatch();
  const [dataForm, setDataForm] = useState<IFormData>();

  useEffect(() => {
    dispatch(getUserThunk());
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
    navigate('/welcomePage');
  };

  return (
    <EditProfileForm
      buttonDeleteUserHandler={buttonDeleteUserHandler}
      GoBackHandler={GoBackHandler}
      setDataForm={setDataForm}
      firstFieldHelper={'Name is required'}
      secondFieldHelper={'Login is required'}
      thirdFieldHelper={'Password is required'}
      submitButton={'Save profile'}
      openModalButton={'Delete user'}
      modalText={'You are soure for delete user'}
    />
  );
}

export default EditProfilePage;
