import { FC, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IFormData } from '../../Interfaces/Interfaces';
import { useAppSelector } from '../../store/redux';
import Button from '../Button/Button';
import { Modal } from '../Modal/Modal';
import Task from '../Task/Task';
import styles from './EditProfileForm.module.scss';

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
  modalConfirmText: string;
  setDataForm: (data: IFormData) => void;
  /* buttonHandleClick () => void; */
  GoBackHandler: () => void;
  buttonDeleteUserHandler: () => void;
  formId?: string;
  TextUpdateModalButton?: string;
  updateTaskHandler?: () => void;
}

const EditProfileForm: FC<IEditProfileForm> = ({
  formId,
  buttonDeleteUserHandler,
  GoBackHandler,
  /* buttonHandleClick, */
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
  modalConfirmText,
  TextUpdateModalButton,
  updateTaskHandler,
}) => {
  const { t } = useTranslation();

  const [isSavedForm, setIsSavedForm] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);

  const status = useAppSelector((state) => state.header.status);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormData>();

  const onSubmit: SubmitHandler<IFormData> = (data: IFormData) => {
    console.log(`test data`, data);
    setDataForm(data);
    setIsSavedForm(true);
    setTimeout(() => {
      setIsSavedForm(false);
    }, 2300);
  };

  const content =
    status === 'resolved' ? (
      <div style={{ padding: 20, color: 'red', fontSize: 25, marginLeft: 44 }}>
        {t(modalConfirmText)} !
      </div>
    ) : (
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
      <Task />
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <>
          {formId === 'editProfileForm' ? (
            <button onClick={() => setIsVisible(true)} style={{ marginLeft: 425, marginTop: -15 }}>
              X
            </button>
          ) : (
            <button
              className={styles.buttonSubmitForm}
              type="submit"

              /* onClick={updateTaskHandler} */
            >
              {TextUpdateModalButton}
            </button>
          )}

          {isSavedForm && (
            <div style={{ color: 'red', fontSize: 30, marginTop: -34.5 }}>
              {t('Your data is saved')}
            </div>
          )}
          <input
            {...register('arg0', { required: true })}
            placeholder={`${t(firstField)}... `}
            className={styles.inputForm}
          />
          {errors.arg0 && t(firstFieldHelper)}
          <input
            {...register('arg1', { required: true })}
            placeholder={`${t(secondField)}...`}
            className={styles.inputForm}
          />
          {errors.arg1 && t(secondFieldHelper)}
          <input
            {...register('arg2', { required: true })}
            placeholder={`${t(thirdFiled)}...`}
            className={styles.inputForm}
          />
          {errors.arg2 && t(thirdFieldHelper)}
          <button type="submit" className={styles.buttonSubmitForm}>
            {t(submitButton)}
          </button>
          <Modal isVisible={isVisible} title={t('Warning')} content={content} onClose={onClose} />
          <div>
            <input
              className={styles.buttonDeleteUser}
              type="button"
              value={t(openModalButton)}
              onClick={() => setIsVisible(true)}
            />
          </div>
        </>
      </form>
    </>
  );
};
export default EditProfileForm;
