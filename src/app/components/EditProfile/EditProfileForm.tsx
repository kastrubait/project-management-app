import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormProps } from '../../Interfaces/Interfaces';
import { updateUserThunk } from '../../store/reducers/HeaderSlice';
import { useAppDispatch } from '../../store/redux';
import styles from './EditProfileForm.module.scss';

const EditProfileForm: FC = () => {
  const [isSavedForm, setIsSavedForm] = useState<boolean>(false);
  const [state, setState] = useState<IFormProps>();
  console.log(`state`, state);

  const dispatch = useAppDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormProps>();

  const onSubmit: SubmitHandler<IFormProps> = (data: IFormProps) => {
    dispatch(updateUserThunk({ data }));
    setState(data);
    setIsSavedForm(true);
    setTimeout(() => {
      setIsSavedForm(false);
    }, 2300);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <>
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
          Submit form data
        </button>
        <input className={styles.buttonDeleteUser} type="button" value="Delete user" />
      </>
    </form>
  );
};
export default EditProfileForm;
