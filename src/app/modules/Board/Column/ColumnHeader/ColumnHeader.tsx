import { FC, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IColumn } from '../../../../Interfaces/IColumn';
import style from '../../Column/Column.module.scss';

interface HeaderProps {
  columnId: string;
  titleData: IColumn;
  editMode: boolean;
  toggleEditTitle: () => void;
  onSubmit: (data: IColumn) => void;
}

export const ColumnHeader: FC<HeaderProps> = ({
  columnId,
  titleData,
  editMode,
  toggleEditTitle,
  onSubmit,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IColumn>();

  const [title, setTitle] = useState({} as IColumn);

  useEffect(() => {
    if (editMode) {
      setTitle({ ...titleData } as IColumn);
    }
  }, [editMode]);

  useEffect(() => {
    reset(title);
  }, [title]);

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
            role="submit"
            data-columnid={columnId}
            tabIndex={0}
            className={style.columnSubmit}
          ></span>
        </form>
      )}
    </div>
  );
};
