import { SyntheticEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IColumnData } from '../../../Interfaces/IColumn';
import style from './Column.module.scss';
import { ColumnHeader } from './ColumnHeader/ColumnHeader';

interface ColumnProps extends IColumnData {
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const Column = ({ id, title, order, handleDelete }: ColumnProps) => {
  const { t } = useTranslation();
  const [editMode, setMode] = useState(false);

  const toggleEditTitle = (): void => {
    setMode(!editMode);
  };

  return (
    <div className={style.column}>
      <div
        role="button"
        tabIndex={0}
        className={style.columnHeader}
        onClick={() => toggleEditTitle()}
      >
        {editMode ? (
          <ColumnHeader columnId={id} title={title} editMode toggleEditTitle={toggleEditTitle} />
        ) : (
          <>
            <h3>{title}</h3>
            <span>
              <span
                role="button"
                data-columnId={id}
                tabIndex={0}
                className={style.columnDelete}
                onClick={handleDelete}
              ></span>
            </span>
          </>
        )}
      </div>
      <div className={style.columnBody}>
        <div className={style.columnContent}>{t('tasks list')}</div>
      </div>
    </div>
  );
};
