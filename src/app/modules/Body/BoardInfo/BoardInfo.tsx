import { useNavigate } from 'react-router-dom';
import { IBoardPreview } from '../../../Interfaces/BoardPreview';
import style from './BoardInfo.module.scss';

interface BoardProps extends IBoardPreview {
  handleDelete?: () => void;
  handleEdit?: () => void;
  styleName?: string;
}

export const BoardInfo = ({
  id,
  title,
  description,
  updated,
  handleDelete,
  handleEdit,
}: BoardProps) => {
  const navigate = useNavigate();
  const clickHandler = () => navigate(`/BoardPage/${id}`);
  return (
    <div
      role="button"
      tabIndex={0}
      className={style.board}
      onClick={clickHandler}
      onKeyDown={clickHandler}
    >
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
          <br />
          {description ?? ''}&#160;
        </div>
      </div>
    </div>
  );
};