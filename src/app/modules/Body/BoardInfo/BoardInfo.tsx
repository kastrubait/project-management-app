import { SyntheticEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoardPreview } from '../../../Interfaces/BoardPreview';
import { setCurrentBoardId, setInitialColumns } from '../../../store/reducers/BodySlice';
import { useAppDispatch } from '../../../store/redux';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from './BoardInfo.module.scss';

interface BoardProps extends IBoardPreview {
  handleEdit?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const BoardInfo = ({ id, title, description, handleEdit, handleDelete }: BoardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const clickHandler = () => {
    dispatch(setInitialColumns());
    dispatch(setCurrentBoardId(id ?? ''));
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
          <Tippy content={<span>{t('edit')}</span>}>
            <div
              data-id={id}
              role="button"
              tabIndex={0}
              className={style.boardEdit}
              onClick={handleEdit}
            ></div>
          </Tippy>
          <Tippy content={<span>{t('delete')}</span>}>
            <div
              role="button"
              data-id={id}
              tabIndex={0}
              className={style.boardDelete}
              onClick={handleDelete}
            ></div>
          </Tippy>
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
