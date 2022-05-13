import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { IFormProps } from '../../Interfaces/Interfaces';
import { deleteUserThunk, updateUserThunk } from '../../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';
import styles from './EditProfileForm.module.scss';

const EditProfileForm: FC = () => {
  const navigate = useNavigate();
  const [isSavedForm, setIsSavedForm] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.header.status);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormProps>();

  const onSubmit: SubmitHandler<IFormProps> = (data: IFormProps) => {
    dispatch(updateUserThunk({ data }));
    setIsSavedForm(true);
    setTimeout(() => {
      setIsSavedForm(false);
    }, 2300);
  };

  function ButtonModalHandleClick() {
    dispatch(deleteUserThunk());
  }
  const title = 'Warning';

  const content =
    status === 'resolved' ? (
      <div style={{ padding: 20, color: 'red', fontSize: 25, marginLeft: 44 }}>
        User removed successfully !
      </div>
    ) : (
      <div style={{ padding: 20, fontSize: 20 }}>
        You are soure for delete user ?
        <Button
          name={'Delete user'}
          styleName={styles.editProfileButtonModify}
          handleClick={ButtonModalHandleClick}
        />
      </div>
    );

  const onClose = () => setIsVisible(false);
  const isVisibleSetter = () => {
    setIsVisible(true);
  };
  const GoBackHandler = () => {
    navigate('/welcomePage');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <>
        <button onClick={GoBackHandler} style={{ marginLeft: 425, marginTop: -15 }}>
          X
        </button>
        {isSavedForm && (
          <div style={{ color: 'red', fontSize: 30, marginTop: -34.5 }}>Your data is saved</div>
        )}
        <input {...register('name', { required: true })} placeholder="Your name.." />
        {errors.name && 'Name is required'}
        <input {...register('login', { required: true })} placeholder="Your login.." />
        {errors.login && 'Login is required'}
        <input {...register('password', { required: true })} placeholder="Your password.." />
        {errors.password && 'Password is required'}
        <button type="submit" className={styles.buttonSubmitForm}>
          Edit profile
        </button>
        <Modal isVisible={isVisible} title={title} content={content} onClose={onClose} />
        <div>
          <input
            className={styles.buttonDeleteUser}
            type="button"
            value="Delete user"
            onClick={isVisibleSetter}
          />
        </div>
      </>
    </form>
  );
};
export default EditProfileForm;
