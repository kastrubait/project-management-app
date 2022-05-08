import { SyntheticEvent } from 'react';
import { IColumnData } from '../../../Interfaces/IColumn';
import style from './BoardInfo.module.scss';

interface ColumnProps extends IColumnData {
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const Column = ({ id, title, order, handleDelete }: ColumnProps) => {
  return (
    <div role="button" tabIndex={0} className={style.Column}>
      <div className={style.columnHeader}>
        <h3>{title}</h3>
        <span>
          <span
            role="button"
            tabIndex={0}
            className={style.columnDelete}
            onClick={handleDelete}
          ></span>
        </span>
      </div>
      <div className={style.columnBody}>
        <div className={style.columnContent}>tasks list</div>
      </div>
    </div>
  );
};
