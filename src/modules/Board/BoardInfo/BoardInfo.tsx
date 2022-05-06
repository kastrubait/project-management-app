import style from './BoardInfo.module.scss';

interface BoardProps {
  title: string;
  description: string;
  updated: string;
  handleDelete?: () => void;
  handleEdit?: () => void;
  styleName?: string;
}

export const BoardInfo = ({
  title,
  description,
  updated,
  handleDelete,
  handleEdit,
}: BoardProps) => {
  return (
    <div className={style.board}>
      <div className={style.boardHeader}>
        <h3>{title}</h3>
        <span>
          <span role="button" tabIndex={0} className={style.boardEdit} onClick={handleEdit}></span>
          <span
            role="button"
            tabIndex={0}
            className={style.boardDelete}
            onClick={handleDelete}
          ></span>
        </span>
      </div>
      <div className={style.boardBody}>
        <div className={style.boardContent}>
          <span className={style.boardDate}>Updated&#160; {updated}</span>
          <br />
          {description}&#160;
        </div>
      </div>
    </div>
  );
};
