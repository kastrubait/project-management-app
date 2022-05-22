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
  firstField: string;
  secondField: string;
  thirdFiled: string;
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
  firstField,
  secondField,
  thirdFiled,
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
        <h3>Edit form</h3>
        <Tippy content={<span>Go Back</span>}>
          <button data-tip="Go Back" className={styles.closeButton} onClick={GoBackHandler}>
            X
          </button>
        </Tippy>

        {isSavedForm && (
          <div style={{ color: 'red', fontSize: 30, marginTop: -34.5 }}>
            {t('Your data is saved')}
          </div>
        )}
        <Tippy content={<span>Your name here please</span>}>
          <input
            {...register('arg0', { required: true, maxLength: 15, minLength: 5 })}
            placeholder={`${t(firstField)}... `}
          />
        </Tippy>
        {errors?.arg0?.type === 'required' && <p>{t(firstFieldHelper)}</p>}
        {errors?.arg0?.type === 'minLength' && <p>{t('Name must be more than 5 characters')}</p>}
        {errors?.arg0?.type === 'maxLength' && <p>{t('Name cannot exceed 15 characters')}</p>}
        <Tippy content={<span>Your login here please</span>}>
          <input
            {...register('arg1', { required: true, maxLength: 15, minLength: 5 })}
            placeholder={`${t(secondField)}...`}
          />
        </Tippy>
        {errors?.arg1?.type === 'required' && <p>{t(secondFieldHelper)}</p>}
        {errors?.arg1?.type === 'minLength' && <p>{t('Login must be more than 5 characters')}</p>}
        {errors?.arg1?.type === 'maxLength' && <p>{t('Login cannot exceed 15 characters')}</p>}
        <Tippy content={<span>Your password here please</span>}>
          <input
            {...register('arg2', { required: true, maxLength: 15, minLength: 5 })}
            placeholder={`${t(thirdFiled)}...`}
          />
        </Tippy>
        {errors?.arg2?.type === 'required' && <p>{t(thirdFieldHelper)}</p>}
        {errors?.arg2?.type === 'minLength' && (
          <p>{t('Password must be more than 5 characters')}</p>
        )}
        {errors?.arg2?.type === 'maxLength' && <p>{t('Password cannot exceed 15 characters')}</p>}
        <Tippy content={<span>Save your data</span>}>
          <button type="submit" className={styles.buttonSubmitForm}>
            {t(submitButton)}
          </button>
        </Tippy>

        <Modal isVisible={isVisible} title={t('Warning')} content={content} onClose={onClose} />
        <div>
          <Tippy placement="bottom" content={<span>Attention! This process is irreversible!</span>}>
            <input
              className={styles.buttonDeleteUser}
              type="button"
              value={t(openModalButton)}
              onClick={() => setIsVisible(true)}
            />
          </Tippy>
        </div>
      </form>
    </>
  );
};

export default EditProfileForm;
