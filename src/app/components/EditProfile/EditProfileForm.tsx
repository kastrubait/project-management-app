import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormProps } from '../../Interfaces/Interfaces';
import styles from './EditProfileForm.module.scss';

const EditProfileForm: FC = () => {
  const [isSavedForm, setIsSavedForm] = useState<boolean>(false);
  const [state, setState] = useState<IFormProps>();
  console.log(`state`, state);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormProps>();

  const onSubmit: SubmitHandler<IFormProps> = (data: IFormProps) => {
    setState(data);
    setIsSavedForm(true);
    setTimeout(() => {
      setIsSavedForm(false);
    }, 2300);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
      <>
        <input {...register('name', { required: true })} placeholder="Your name.." />
        {errors.name && 'Name is required'}
        <input {...register('login', { required: true })} placeholder="Your login.." />
        {errors.login && 'Login is required'}
        <input {...register('password', { required: true })} placeholder="Your password.." />
        {errors.password && 'Password is required'}
        <button type="submit">Submit form data</button>
        <div>
          {isSavedForm && (
            <div data-testid="toggle-data-is-saved" style={{ color: 'red', fontSize: 30 }}>
              Your data is saved
            </div>
          )}
        </div>
      </>
    </form>
  );
};
export default EditProfileForm;
