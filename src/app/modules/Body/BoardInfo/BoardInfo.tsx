import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBoardPreview } from '../../../Interfaces/BoardPreview';
import {
  deleteBoardThunk,
  setCurrentBoardId,
  setInitialColumns,
} from '../../../store/reducers/BodySlice';
import { useAppDispatch } from '../../../store/redux';
import { useTranslation } from 'react-i18next';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from './BoardInfo.module.scss';
import { Modal } from '../../../components/Modal/Modal';
import { Сonfirmation } from '../../../components/Confirmation/Confirmation';
import { BOARD } from '../../../shared/constants';

interface BoardProps extends IBoardPreview {
  handleEdit?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const BoardInfo = ({ id, title, description, handleEdit }: BoardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [isVisibleApprove, setIsVisibleApprove] = useState(false);
  const [confirm, setConfirm] = useState<string>('');

  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsVisibleApprove(true);
    setConfirm(event.currentTarget.dataset.id as string);
  };

  const onApprove = async () => {
    await dispatch(deleteBoardThunk(confirm));
    setConfirm('');
    setIsVisibleApprove(false);
  };

  const onCancel = () => {
    setIsVisibleApprove(false);
  };

  const onClose = () => setIsVisibleApprove(false);

  const clickHandler = () => {
    dispatch(setInitialColumns());
    dispatch(setCurrentBoardId(id ?? ''));
    navigate(`/BoardPage/${id}`);
  };
  return (
    <>
      <Modal
        isVisible={isVisibleApprove}
        warn={true}
        title={`${t('delete')}?`}
        content={
          <Сonfirmation
            entity={`${t(BOARD)} "${title}"`}
            handleCancel={onCancel}
            handleOK={onApprove}
          />
        }
        onClose={onClose}
      />
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
    </>
  );
};
