import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationSchema } from './validationSchema';
import { IFormData } from '../../Interfaces/FormData';
import { updateBoardThunk } from '../../store/reducers/HeaderSlice';
import { useAppDispatch } from '../../store/redux';

import style from './Form.module.scss';

interface FormProps {
  edit: boolean;
  type: string;
  editFields?: IFormData;
}

export const Form = ({ edit, type, editFields }: FormProps) => {
  const dispatch = useAppDispatch();
  const [fields, setFields] = useState({} as IFormData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: yupResolver(validationSchema),
    shouldUnregister: false,
  });

  const onSubmit = (data: IFormData) => {
    // dispatch(updateBoardThunk({ data }));
    console.log(data);
  };

  useEffect(() => {
    if (edit) {
      setFields({ ...editFields } as IFormData);
    }
  }, []);

  useEffect(() => {
    reset(fields);
  }, [fields]);

  return (
    <form className={style.userForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={style.topForm}>
        <label htmlFor="title" className={style.labelInput}>
          <strong>title</strong>
          <span className={style.error}>{errors.title?.message}</span>
          <br />
          <input type="text" {...register('title')} />
        </label>
      </div>
      <input type="submit" value="Confirm" className={style.button} />
    </form>
  );
};
