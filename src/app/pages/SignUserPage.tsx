import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { IFormProps } from '../Interfaces/Interfaces';
import { useAppDispatch } from '../store/redux';
import { addPassword, addUserThunk, authUserThunk } from '../store/reducers/HeaderSlice';
import styles from '../components/EditProfile/EditProfileForm.module.scss';

export const SignUserPage = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<string>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormProps>();

  const onSubmit = (data: IFormProps) => {
    if (id === 'up') {
      dispatch(addUserThunk({ data }));
      dispatch(addPassword(data.password));
    } else {
      dispatch(authUserThunk({ data }));
      dispatch(addPassword(data.password));
    }
    navigate('/');
  };

  const handleClickCancel = () => {
    navigate('/welcomePage');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <>
        {id === 'up' ? (
          <Fragment>
            <div style={{ fontSize: 24, marginTop: -34.5 }}>{t('Create an account')}</div>
            <input
              {...register('name', {
                required: `${t('Name is required')}`,
                minLength: {
                  value: 3,
                  message: `${t('Name must be at least 3 letters long')}`,
                },
              })}
              placeholder={`${t('Your Name')}...`}
            />
            <div style={{ height: 26 }}>
              {errors?.name && (
                <p className="text-danger" style={{ color: 'red' }}>
                  {errors?.name?.message}
                </p>
              )}
            </div>
          </Fragment>
        ) : (
          <div style={{ fontSize: 24, marginTop: -34.5 }}>{t('Log in')}</div>
        )}

        <input
          {...register('login', {
            required: `${t('Login is required')}`,
            minLength: {
              value: 3,
              message: `${t('Login must be at least 3 letters long')}`,
            },
          })}
          placeholder={`${t('Your Login')}...`}
        />
        <div style={{ height: 26 }}>
          {errors?.login && (
            <p className="text-danger" style={{ color: 'red' }}>
              {errors?.login?.message}
            </p>
          )}
        </div>

        <input
          {...register('password', {
            required: `${t('Password is required')}`,
            minLength: {
              value: 6,
              message: `${t('Password must be at least 6 letters long')}`,
            },
          })}
          placeholder={`${t('Your password')}...`}
        />
        <div style={{ height: 26 }}>
          {errors?.password && (
            <p className="text-danger" style={{ color: 'red' }}>
              {errors?.password?.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.buttonSubmitForm}>
          {id === 'in' ? `${t('Sign in')}` : `${t('Sign up')}`}
        </button>
        <input
          className={styles.buttonDeleteUser}
          type="button"
          value={t('Cancel')}
          onClick={handleClickCancel}
        />
      </>
    </form>
  );
};

export default SignUserPage;
