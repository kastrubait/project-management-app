import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IFormData } from '../../Interfaces/FormData';
import { useTranslation } from 'react-i18next';

import style from './Form.module.scss';
import { COLUMN, TASK } from '../../shared/constants';

interface FormProps {
  edit: boolean;
  type: string;
  editFields?: IFormData;
  onSubmitForm: (data: IFormData) => void;
}

export const Form = ({ edit, type, editFields, onSubmitForm }: FormProps) => {
  const [fields, setFields] = useState({} as IFormData);

  const { t } = useTranslation();

  const isTask = type === TASK;
  const isColumn = type === COLUMN;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  useEffect(() => {
    if (edit) {
      setFields({ ...editFields } as IFormData);
    } else {
      setFields({} as IFormData);
    }
  }, []);

  useEffect(() => {
    reset(fields);
  }, [fields]);

  return (
    <>
      <form className={style.userForm} onSubmit={handleSubmit(onSubmitForm)}>
        <div className={style.topForm}>
          <label htmlFor="title" className={style.labelInput}>
            <strong>{t('title')}:&#160;</strong>
            <span className={style.error}>{errors.title?.message}</span>
            <br />
            <input
              type="text"
              {...register('title', {
                required: { value: true, message: '*is required' },
                minLength: {
                  value: 4,
                  message: '*is too shoot',
                },
                maxLength: {
                  value: 75,
                  message: '*is too long title',
                },
              })}
            />
          </label>
          <br />
          {!isColumn && (
            <label htmlFor="author" className={style.labelTextarea}>
              <strong>{t('description')}:&#160;</strong>
              <span className={style.error}>{errors.description?.message}</span>
              <br />
              <textarea
                {...register('description', {
                  required: { value: true, message: '*is required' },
                  minLength: {
                    value: 5,
                    message: '*is too shoot',
                  },
                })}
                name="description"
                placeholder="description..."
              />
            </label>
          )}
        </div>
        <input type="submit" value={t('Confirm')} className={style.button} />
      </form>
    </>
  );
};
