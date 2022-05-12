import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IBindingData, IFormData } from '../../Interfaces/FormData';
import { updateBoardThunk } from '../../store/reducers/HeaderSlice';
import { useAppDispatch } from '../../store/redux';

import style from './Form.module.scss';

interface FormProps {
  edit: boolean;
  type: string;
  editFields?: IFormData;
  bindingFields: IBindingData;
}

export const Form = ({ edit, type, editFields, bindingFields }: FormProps) => {
  const dispatch = useAppDispatch();
  const [fields, setFields] = useState({} as IFormData);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    const { title } = data;
    const { boardId } = bindingFields;
    if (boardId) {
      dispatch(updateBoardThunk({ id: boardId, title }));
    }
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
    <>
      <form className={style.userForm} onSubmit={handleSubmit(onSubmit)}>
        <div className={style.topForm}>
          <label htmlFor="title" className={style.labelInput}>
            <strong>title: </strong>
            <span className={style.error}>{errors.title?.message}</span>
            <br />
            <input
              type="text"
              {...register('title', {
                required: { value: true, message: '*is required' },
                minLength: {
                  value: 5,
                  message: '*too shoot',
                },
                maxLength: {
                  value: 75,
                  message: '*is too long title',
                },
              })}
            />
          </label>
        </div>
        <input type="submit" value="Confirm" className={style.button} />
      </form>
    </>
  );
};
