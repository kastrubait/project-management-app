import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { validationSchema } from './validationSchema';
import { FormControls, IFormData } from '../../Interfaces/FormData';

import style from './Form.module.scss';

interface FormProps {
  edit: boolean;
  type: string;
  editFields?: IFormData;
}

export const Form = ({ edit, type, editFields }: FormProps) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = handleSubmit((data: IFormData) => console.log(data));

  useEffect(() => {
    if (edit) {
      setValue(FormControls.title, editFields?.title ?? '');
      setValue(FormControls.order, String(editFields?.order) ?? '');
      setValue(FormControls.description, editFields?.description ?? '');
    }
  }, [edit, editFields, setValue]);

  return (
    <form action="POST" className={style.userForm} onSubmit={onSubmit}>
      <div className={style.topForm}>
        <label htmlFor={FormControls.title} className={style.labelInput}>
          <strong>title</strong>
          <span className={style.error}>{errors.title?.message}</span>
          <br />
          <input type="text" {...register(FormControls.title)} />
        </label>
      </div>
      <input type="submit" value={t('Confirm')} className={style.button} />
    </form>
  );
};
