import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IBindingData, IFormData } from '../../Interfaces/FormData';
import { createColumnThunk, updateColumnThunk } from '../../store/reducers/BodySlice';
import { updateBoardThunk } from '../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';

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
  const columns = useAppSelector((state) => state.body.columns);

  const getNextColumnOrder = (): number => {
    const last = columns.slice(-1)[0];
    let newOrder = last.order ?? 0;
    return newOrder++;
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    const { title, order } = data;
    const { boardId, columnId } = bindingFields;
    switch (type) {
      case 'board':
        if (edit && boardId) {
          dispatch(updateBoardThunk({ id: boardId, title }));
        }
        break;
      case 'column':
        if (!edit) {
          data.title = title;
          data.order = getNextColumnOrder();
          console.log('->', data);
          dispatch(createColumnThunk({ data }));
        }
        if (edit && columnId) {
          data.title = title;
          data.order = order;
          console.log('->', data);
          dispatch(updateColumnThunk({ id: columnId, ...data }));
        }
        break;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (edit) {
      setFields({ ...editFields } as IFormData);
    } else {
      console.log('PIP');
      setFields({} as IFormData);
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
                  value: 4,
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
