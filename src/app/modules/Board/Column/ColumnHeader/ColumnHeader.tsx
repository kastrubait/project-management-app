import { FC, useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import style from '../../Column/Column.module.scss';

interface HeaderProps {
  columnId: string;
  title: string;
  editMode: boolean;
  toggleEditTitle: () => void;
}

type HeaderData = {
  title: string;
};

export const ColumnHeader: FC<HeaderProps> = ({ columnId, title, editMode, toggleEditTitle }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<HeaderData>();

  const onSubmit: SubmitHandler<HeaderData> = (data: HeaderData) => {
    console.log(data);
    toggleEditTitle();
  };

  useEffect(() => {
    if (editMode) {
      setValue('title', title ?? '');
    }
  }, [title, setValue]);

  return (
    <div>
      {editMode && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.title && errors.title?.message}
          <input
            type="text"
            autoFocus
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
          <span
            role="button"
            tabIndex={0}
            className={style.columnCancel}
            onClick={() => toggleEditTitle()}
          ></span>
          <span
            role="button"
            data-columnid={columnId}
            tabIndex={0}
            className={style.columnSubmit}
          ></span>
        </form>
      )}
    </div>
  );
};
