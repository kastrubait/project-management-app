import { SyntheticEvent, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { IColumn, IColumnData } from '../../../Interfaces/IColumn';
import { getAllColumnThunk, updateColumnThunk } from '../../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import style from './Column.module.scss';
import { ColumnHeader } from './ColumnHeader/ColumnHeader';

interface ColumnProps extends IColumnData {
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const Column = ({ id, title, order, handleDelete, styleName }: ColumnProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [editMode, setMode] = useState(false);
  const titleData = { title: title };
  const boardId = useAppSelector((state) => state.body.boardId);

  const toggleEditTitle = (): void => {
    setMode(!editMode);
  };

  const onSubmit: SubmitHandler<IColumn> = (data: IColumn) => {
    console.log(data);
    dispatch(updateColumnThunk({ id: id, title: data.title, order: order }));
    dispatch(getAllColumnThunk(boardId));
    toggleEditTitle();
  };

  return (
    <div className={style.column}>
      <div
        role="button"
        tabIndex={0}
        className={style.columnHeader}
        onClick={() => toggleEditTitle()}
        style={{ backgroundColor: styleName }}
      >
        {editMode ? (
          <ColumnHeader
            columnId={id}
            titleData={titleData}
            editMode
            toggleEditTitle={toggleEditTitle}
            onSubmit={onSubmit}
          />
        ) : (
          <>
            <h3>{title}</h3>
            <span>
              <span
                role="button"
                data-columnid={id}
                tabIndex={0}
                className={style.columnDelete}
                onClick={handleDelete}
              ></span>
            </span>
          </>
        )}
      </div>
      <div className={style.columnBody}>
        <div className={style.columnContent}></div>
      </div>
    </div>
  );
};
