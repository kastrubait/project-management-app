/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form } from '../components/Form/Form';
import { Modal } from '../components/Modal/Modal';
import { ActionForm } from '../Interfaces/ActionForm';
import { IColumnData } from '../Interfaces/IColumn';
import { Column } from '../modules/Board/Column/Column';
import { ACTION, COLUMN, WARING } from '../shared/constants';
import { getAllColumnThunk, deleteСolumnThunk } from '../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../store/redux';
import { Сonfirmation } from '../components/Confirmation/Confirmation';

import style from './BoardPage.module.scss';

type QuizParams = {
  id: string;
};

function BoardPage() {
  const dispatch = useAppDispatch();
  const [columns, setColumns] = useState([] as IColumnData[]);
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);
  const [confirm, setConfirm] = useState<string>('');
  const [isVisibleApprove, setIsVisibleApprove] = useState(false);

  const firstTimeRender = useRef(true);

  const title = useAppSelector((state) => state.body.boardTitle);
  const columnsT = useAppSelector((state) => state.body.columns);
  const boardId = useAppSelector((state) => state.body.boardId);
  const { id } = useParams<QuizParams>();

  const navigate = useNavigate();

  const dragItem = useRef() as React.MutableRefObject<number>;
  const dragOverItem = useRef() as React.MutableRefObject<number>;

  const dragStart = (event: any, position: any) => {
    dragItem.current = position;
    console.log(event.target.innerHTML);
  };

  const dragEnter = (event: any, position: any) => {
    dragOverItem.current = position;
    console.log(event.target.innerHTML);
  };

  const drop = (e: any) => {
    const copyListItems = [...columns];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = -1;
    dragOverItem.current = -1;
    setColumns(copyListItems);
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
    setColumns(columnsT);
    firstTimeRender.current = false;
  }, []);

  useEffect(() => {
    if (!firstTimeRender.current) {
      console.log('titlle->', title, columns);
    }
  }, [columns, title]);

  useEffect(() => {
    dispatch(getAllColumnThunk(id ?? ''));
    console.log(entityAction);
  }, [entityAction]);

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
