import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IColumn } from '../../../../Interfaces/IColumn';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from '../../Column/Column.module.scss';

interface HeaderProps {
  columnId: string;
  titleData: IColumn;
  editMode: boolean;
  toggleEditTitle: (event: SyntheticEvent<HTMLButtonElement>) => void;
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
  const { t } = useTranslation();

  useEffect(() => {
    if (editMode) {
      setTitle({ ...titleData } as IColumn);
    }
  }, [editMode, titleData]);

  useEffect(() => {
    reset(title);
  }, [title, reset]);

  return (
    <>
      {editMode && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.title?.type === 'required' && `${t('is required')}`}
          {errors.title?.type === 'minLength' && `${t('is too short')}`}
          {errors.title?.type === 'maxLength' && `${t('is too long')}`}
          <input
            type="text"
            autoFocus
            {...register('title', { required: true, minLength: 4, maxLength: 25 })}
          />
          <span>
            <Tippy content={<span>{t('Cancel')}</span>}>
              <button
                type="button"
                tabIndex={0}
                className={style.columnCancel}
                onClick={toggleEditTitle}
              ></button>
            </Tippy>
            <Tippy content={<span>{t('Confirm')}</span>}>
              <button
                type="button"
                data-columnid={columnId}
                tabIndex={0}
                className={style.columnSubmit}
                onClick={handleSubmit(onSubmit)}
              ></button>
            </Tippy>
          </span>
        </form>
      )}
    </>
  );
};
