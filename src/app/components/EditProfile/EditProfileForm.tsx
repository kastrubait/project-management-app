import { FC, useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IFormData } from '../../Interfaces/Interfaces';
import { setStatus } from '../../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';
import styles from './EditProfileForm.module.scss';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface IEditProfileForm {
  firstFieldHelper: string;
  secondFieldHelper: string;
  thirdFieldHelper: string;
  submitButton: string;
  openModalButton: string;
  modalText: string;
  setDataForm: (data: IFormData) => void;
  GoBackHandler: () => void;
  buttonDeleteUserHandler: () => void;
}

const EditProfileForm: FC<IEditProfileForm> = ({
  buttonDeleteUserHandler,
  GoBackHandler,
  setDataForm,
  firstFieldHelper,
  secondFieldHelper,
  thirdFieldHelper,
  submitButton,
  openModalButton,
  modalText,
}) => {
  const { t } = useTranslation();

  const [isSavedForm, setIsSavedForm] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const status = useAppSelector((state) => state.header.status);
  const { userName, userLogin, userPassword } = useAppSelector((state) => state.header);
  const dispatch = useAppDispatch();
  console.log(`status`, status);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>();

  useEffect(() => {
    if (status === 'resolved') {
      setIsSavedForm(true);
      setTimeout(() => {
        setIsSavedForm(false);
      }, 2300);
      dispatch(setStatus(null));
    }
  }, [status, dispatch]);

  const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
    console.log(`test data`, data);
    setDataForm(data);
  };

  const content = (
    <div style={{ padding: 20, fontSize: 20 }}>
      {t(modalText)} ?
      <Button
        name={t(openModalButton)}
        styleName={styles.editProfileButton}
        handleClick={buttonDeleteUserHandler}
      />
    </div>
  );

  const onClose = () => setIsVisible(false);

  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.headerForm}>
          <h3>{t('Edit profile')}</h3>
          {isSavedForm && <p className={styles.serviceMessage}>{t('Your data is saved')}</p>}
          <Tippy content={<span>Go Back</span>}>
            <button type="button" data-tip="Go Back" onClick={GoBackHandler}>
              X
            </button>
          </Tippy>
        </div>

        <Tippy content={<span>Your name here please</span>}>
          <input
            {...register('name', { required: true, maxLength: 15, minLength: 5 })}
            placeholder={userName}
          />
        </Tippy>
        {errors?.name?.type === 'required' && <p>{t(firstFieldHelper)}</p>}
        {errors?.name?.type === 'minLength' && <p>{t('Name must be more than 5 characters')}</p>}
        {errors?.name?.type === 'maxLength' && <p>{t('Name cannot exceed 15 characters')}</p>}
        <Tippy content={<span>Your login here please</span>}>
          <input
            {...register('login', { required: true, maxLength: 15, minLength: 5 })}
            placeholder={userLogin}
          />
        </Tippy>
        {errors?.login?.type === 'required' && <p>{t(secondFieldHelper)}</p>}
        {errors?.login?.type === 'minLength' && <p>{t('Login must be more than 5 characters')}</p>}
        {errors?.login?.type === 'maxLength' && <p>{t('Login cannot exceed 15 characters')}</p>}
        <Tippy content={<span>Your password here please</span>}>
          <input
            {...register('password', { required: true, maxLength: 15, minLength: 5 })}
            placeholder={userPassword}
          />
        </Tippy>
        {errors?.password?.type === 'required' && <p>{t(thirdFieldHelper)}</p>}
        {errors?.password?.type === 'minLength' && (
          <p>{t('Password must be more than 5 characters')}</p>
        )}
        {errors?.password?.type === 'maxLength' && (
          <p>{t('Password cannot exceed 15 characters')}</p>
        )}
        <div className={styles.serviceButtons}>
          <Tippy content={<span>Save your data</span>}>
            <button type="submit" className={styles.buttonSubmitForm}>
              {t(submitButton)}
            </button>
          </Tippy>

          <Modal isVisible={isVisible} title={t('Warning')} content={content} onClose={onClose} />

          <Tippy placement="bottom" content={<span>Attention! This process is irreversible!</span>}>
            <button
              className={styles.buttonDeleteUser}
              type="button"
              onClick={() => setIsVisible(true)}
            >
              {t(openModalButton)}
            </button>
          </Tippy>
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
