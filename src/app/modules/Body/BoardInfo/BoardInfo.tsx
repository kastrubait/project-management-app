/* eslint-disable @typescript-eslint/no-explicit-any */
import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoardPreview } from '../../../Interfaces/BoardPreview';
import { setCurrentBoardId, setCurrentBoardTitle } from '../../../store/reducers/BodySlice';
import { useAppDispatch } from '../../../store/redux';
import style from './BoardInfo.module.scss';

interface BoardProps extends IBoardPreview {
  handleEdit?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const BoardInfo = ({ id, title, description, handleEdit, handleDelete }: BoardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const clickHandler = () => {
    dispatch(setCurrentBoardId(id ?? ''));
    dispatch(setCurrentBoardTitle(title ?? ''));
    navigate(`/BoardPage/${id}`);
  };
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
          <span
            data-id={id}
            role="button"
            tabIndex={0}
            className={style.boardEdit}
            onClick={handleEdit}
          ></span>
          <span
            role="button"
            data-id={id}
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
