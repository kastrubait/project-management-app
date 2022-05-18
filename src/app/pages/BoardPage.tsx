import React, { SyntheticEvent, useEffect, useRef, useState, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form } from '../components/Form/Form';
import { Modal } from '../components/Modal/Modal';
import { ActionForm } from '../Interfaces/ActionForm';
import { IColumnData } from '../Interfaces/IColumn';
import { Column } from '../modules/Board/Column/Column';
import { Сonfirmation } from '../components/Confirmation/Confirmation';
import { ACTION, BG_HEADER, COLUMN, WARING } from '../shared/constants';
import {
  getAllColumnThunk,
  deleteСolumnThunk,
  updateColumnThunk,
  incrementOrderColumnsThunk,
  decrementOrderColumnsThunk,
  createColumnThunk,
} from '../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../store/redux';
import { IFormData } from '../Interfaces/FormData';

import style from './BoardPage.module.scss';

type QuizParams = {
  id: string;
};

function BoardPage() {
  const dispatch = useAppDispatch();
  // const [columns, setColumns] = useState([] as IColumnData[]);
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);
  const [confirm, setConfirm] = useState<string>('');
  const [isVisibleApprove, setIsVisibleApprove] = useState(false);

  const firstTimeRender = useRef(true);

  const board = useAppSelector((state) => state.body.board);
  const columnsT = useAppSelector((state) => state.body.columns);
  const boardId = useAppSelector((state) => state.body.boardId);
  const status = useAppSelector((state) => state.body.status);
  const { id } = useParams<QuizParams>();

  const navigate = useNavigate();

  const dragItem = useRef() as React.MutableRefObject<number>;
  const dragOverItem = useRef() as React.MutableRefObject<number>;

  const dragStart = (_event: DragEvent<HTMLLIElement>, position: number) => {
    dragItem.current = position;
  };

  const dragEnter = (_event: DragEvent<HTMLLIElement>, position: number) => {
    dragOverItem.current = position;
  };

  const dropColumn = async (_event: DragEvent<HTMLLIElement>) => {
    const copyListItems = [...columnsT];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);

    const asc = dragItem.current - dragOverItem.current;
    const updateFragment =
      asc > 0
        ? copyListItems.slice(dragOverItem.current + 1, Math.abs(asc) + 2)
        : copyListItems.slice(dragItem.current, Math.abs(asc) + 1);

    await dispatch(updateColumnThunk({ ...dragItemContent, order: -1 }));
    if (asc > 0) {
      await dispatch(incrementOrderColumnsThunk(updateFragment));
    } else {
      await dispatch(decrementOrderColumnsThunk(updateFragment));
    }
    await dispatch(updateColumnThunk({ ...dragItemContent, order: dragOverItem.current }));
    dragItem.current = -1;
    dragOverItem.current = -1;
    dispatch(getAllColumnThunk(boardId));
  };

  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsVisibleApprove(true);
    setConfirm(event.currentTarget.dataset.columnid as string);
  };

  const handleCreate = () => {
    setShowForm(true);
    setEntityAction(ACTION.CREATE(COLUMN, { boardId: id }));
  };

  const handleGoBack = (event: SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate(-1);
  };

  const onCloseForm = () => setShowForm(false);
  const onCloseСonfirmation = () => setIsVisibleApprove(false);

  const onSubmitForm = (data: IFormData) => {
    const { title, order } = data;
    const { columnId } = entityAction.bindingFields;
    switch (entityAction.type) {
      case 'column':
        if (!entityAction.edit) {
          const nextOrder = columnsT.length;
          dispatch(createColumnThunk({ title, order: nextOrder }));
        }
        if (entityAction.edit && columnId) {
          dispatch(updateColumnThunk({ id: columnId, title, order }));
        }
        setShowForm(false);
        break;
      default:
        return null;
    }
  };

  const onApprove = async () => {
    await dispatch(deleteСolumnThunk(confirm));
    const positionDelColumn = columnsT.find((el) => el.id === confirm);
    const { order } = positionDelColumn!;
    const updateFragment = columnsT.slice(order! + 1);
    await dispatch(decrementOrderColumnsThunk(updateFragment));
    await dispatch(getAllColumnThunk(boardId));
    setConfirm('');
    setIsVisibleApprove(false);
    setShowForm(false);
  };

  useEffect(() => {
    if (!firstTimeRender.current) {
      dispatch(getAllColumnThunk(id ?? ''));
    }
  }, [columnsT]);

  useEffect(() => {
    dispatch(getAllColumnThunk(id ?? ''));
  }, [confirm]);

  return (
    <section className={style.boardContainer}>
      <div className={style.boardHeader}>
        <h3>{board.title}</h3>
        <span>
          <button className={style.boardHederButton} onClick={handleGoBack}>
            {t('Go back')}
          </button>
          <button className={style.boardHederButton} onClick={handleCreate}>
            {t('Create column')}
          </button>
          {Boolean(columnsT.length) && (
            <button
              className={style.boardHederButton}
              onClick={() => console.log('click Add task')} // TODO
            >
              {t('Add task')}
            </button>
          )}
        </span>
      </div>
      <ul className={style.boardContent}>
        {columnsT.map((item: IColumnData, index) => (
          <li
            key={item.id}
            className={style.element}
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={dropColumn}
            onDragOver={(e) => e.preventDefault()}
            draggable
          >
            {!showForm && (
              <Column {...item} handleDelete={handleDelete} styleName={BG_HEADER[index % 8]} />
            )}
            <Modal
              isVisible={isVisibleApprove}
              title={WARING}
              content={<Сonfirmation entity={COLUMN} handleClick={onApprove} />}
              onClose={onCloseСonfirmation}
            />
          </li>
        ))}
      </ul>
      <Modal
        isVisible={showForm}
        title={`${t('Create')} ${entityAction.type}`}
        content={<Form {...entityAction} onSubmitForm={onSubmitForm} />}
        onClose={onCloseForm}
      />
    </section>
  );
}
export default BoardPage;
