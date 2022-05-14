import React, { SyntheticEvent, useEffect, useRef, useState, DragEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form } from '../components/Form/Form';
import { Modal } from '../components/Modal/Modal';
import { ActionForm } from '../Interfaces/ActionForm';
import { IColumnData } from '../Interfaces/IColumn';
import { Column } from '../modules/Board/Column/Column';
import { ACTION, COLUMN, WARING } from '../shared/constants';
import {
  getAllColumnThunk,
  deleteСolumnThunk,
  updateColumnThunk,
  updateAllColumnThunk,
} from '../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../store/redux';
import { Сonfirmation } from '../components/Confirmation/Confirmation';

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

  const title = useAppSelector((state) => state.body.boardTitle);
  let columnsT = useAppSelector((state) => state.body.columns);
  const boardId = useAppSelector((state) => state.body.boardId);
  const { id } = useParams<QuizParams>();

  const navigate = useNavigate();

  const dragItem = useRef() as React.MutableRefObject<number>;
  const dragOverItem = useRef() as React.MutableRefObject<number>;

  const dragStart = (_event: DragEvent<HTMLLIElement>, position: number) => {
    dragItem.current = position;
    console.log('start->', position);
  };

  const dragEnter = (_event: DragEvent<HTMLLIElement>, position: number) => {
    dragOverItem.current = position;
    console.log('enter->', position);
  };

  const drop = (_event: DragEvent<HTMLLIElement>) => {
    const copyListItems = [...columnsT];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    const updateListItems = copyListItems.map((item, i) => {
      if (i !== item.order) {
        return { ...item, order: i };
      } else {
        return { ...item };
      }
    });
    const updateFragment = updateListItems.slice(
      dragItem.current,
      Math.abs(dragItem.current - dragOverItem.current) + 1
    );
    dispatch(updateAllColumnThunk(updateFragment));
    dragItem.current = -1;
    dragOverItem.current = -1;
    columnsT = [...updateListItems];
    dispatch(getAllColumnThunk(boardId));
    console.log('drop->', updateListItems);
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

  const onClose = () => setIsVisibleApprove(false);

  const onApprove = () => {
    dispatch(deleteСolumnThunk(confirm));
    dispatch(getAllColumnThunk(boardId));
    setConfirm('');
    setIsVisibleApprove(false);
    setShowForm(false);
  };

  useEffect(() => {
    if (!firstTimeRender.current) {
      console.log('titlle->', title, columnsT);
    }
  }, [title, columnsT]);

  useEffect(() => {
    dispatch(getAllColumnThunk(id ?? ''));
  }, [confirm]);

  return (
    <section className={style.boardContainer}>
      <div className={style.boardHeader}>
        <h3>{title}</h3>
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
            onDragEnd={drop}
            onDragOver={(e) => e.preventDefault()}
            draggable
          >
            {!showForm && <Column {...item} handleDelete={handleDelete} />}
            <Modal
              key={item.id}
              isVisible={showForm}
              title={`${t('Create')} ${entityAction.type}`}
              content={<Form {...entityAction} />}
              onClose={() => setShowForm(false)}
            />
            <Modal
              isVisible={isVisibleApprove}
              title={WARING}
              content={<Сonfirmation status={status} entity={COLUMN} handleClick={onApprove} />}
              onClose={onClose}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
export default BoardPage;
