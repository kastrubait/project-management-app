import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { IFormProps } from '../Interfaces/Interfaces';
import { useAppDispatch } from '../store/redux';
import { addPassword, addUserThunk } from '../store/reducers/HeaderSlice';

import styles from '../components/EditProfile/EditProfileForm.module.scss';
import { ApiService } from '../Api/ApiService';

export const SignUserPage = () => {
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
      ApiService.authorization(data);
    }
    navigate('/');
  };

  const handleClickCancel = () => {
    navigate('/welcomePage');
  };

  console.log(id);
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <>
        {id === 'up' ? (
          <Fragment>
            <div style={{ fontSize: 24, marginTop: -34.5 }}>Create an account</div>
            <input
              {...register('name', {
                required: 'Required field',
                minLength: {
                  value: 3,
                  message: 'Name must be at least 3 letters long',
                },
              })}
              placeholder="Your name.."
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
          <div style={{ fontSize: 24, marginTop: -34.5 }}>Log in</div>
        )}

        <input
          {...register('login', {
            required: 'Required field',
            minLength: {
              value: 3,
              message: 'Name must be at least 3 letters long',
            },
          })}
          placeholder="Your login.."
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
            required: 'Required field',
            minLength: {
              value: 6,
              message: 'Name must be at least 6 letters long',
            },
          })}
          placeholder="Your password.."
        />
        <div style={{ height: 26 }}>
          {errors?.password && (
            <p className="text-danger" style={{ color: 'red' }}>
              {errors?.password?.message}
            </p>
          )}
        </div>

        <button type="submit" className={styles.buttonSubmitForm}>
          {id === 'in' ? 'Sign in' : 'Sign up'}
        </button>
        <input
          className={styles.buttonDeleteUser}
          type="button"
          value="Cancel"
          onClick={handleClickCancel}
        />
      </>
    </form>
  );
};

export default SignUserPage;
