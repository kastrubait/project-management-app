import { FC, useState } from 'react';

import { useForm, SubmitHandler } from 'react-hook-form';
import { IFormProps } from '../../Interfaces/Interfaces';
import styles from './EditProfileForm.module.scss';

const EditProfileForm: FC = () => {
  const [isSavedForm, setIsSavedForm] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [state, setState] = useState<IFormProps[]>([]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormProps>();

  const onSubmit: SubmitHandler<IFormProps> = (data: IFormProps) => {
    setState([
      ...state,
      {
        ...data,
      },
    ]);
    setIsSavedForm(true);
    setTimeout(() => {
      setIsSavedForm(false);
    }, 2300);
  };

  const isFormValidSetter = () => {
    setIsFormValid(true);
  };

  return (
    <form className={styles.login} onSubmit={handleSubmit(onSubmit)}>
      <>
        <input
          {...register('name', { required: 'Name is required', maxLength: 20 })}
          error={Boolean(errors.name)}
          helperText={errors.name?.message}
          onChange={isFormValidSetter}
          type="name"
          name="name"
          placeholder="Your Name.."
        />
        <input
          {...register('login', { required: 'Login is required' })}
          error={Boolean(errors.login)}
          helperText={errors.login?.message}
          onChange={isFormValidSetter}
          type="login"
          name="login"
          placeholder="Your login.."
        />
        <input
          {...register('password', { required: 'Password is required' })}
          error={Boolean(errors.password)}
          helperText={errors.password?.message}
          onChange={isFormValidSetter}
          type="password"
          name="password"
          placeholder="Your password.."
        />

        <button /* className={styles.button} */ /* disabled={!isFormValid} */ type="submit">
          Submit form data
        </button>
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
