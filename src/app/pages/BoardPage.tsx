import React, { SyntheticEvent, useEffect, useRef, useState, DragEvent, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form } from '../components/Form/Form';
import { Modal } from '../components/Modal/Modal';
import { ActionForm } from '../Interfaces/ActionForm';
import { IColumnData } from '../Interfaces/IColumn';
import { Column } from '../modules/Board/Column/Column';
import { Сonfirmation } from '../components/Confirmation/Confirmation';
import { ACTION, BGCOL_HEADER, COLUMN, WARING } from '../shared/constants';
import {
  getAllColumnThunk,
  deleteColumnThunk,
  updateColumnThunk,
  createColumnThunk,
} from '../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../store/redux';
import { IFormData } from '../Interfaces/FormData';

import style from './BoardPage.module.scss';
import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner';

type QuizParams = {
  id: string;
};

function BoardPage() {
  const dispatch = useAppDispatch();
  const selectorColumns = useAppSelector((state) => state.body.columns);
  const [columns, setColumns] = useState(selectorColumns);
  const { t } = useTranslation();
  const [showForm, setShowForm] = useState(false);
  const [entityAction, setEntityAction] = useState({} as ActionForm);
  const [confirm, setConfirm] = useState<string>('');
  const [isVisibleApprove, setIsVisibleApprove] = useState(false);

  const board = useAppSelector((state) => state.body.board);

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

  const dropColumn = async () => {
    const copyListItems = [...columns];
    const dragItemContent = copyListItems[dragItem.current];
    await dispatch(updateColumnThunk({ ...dragItemContent, order: dragOverItem.current + 1 }));
    dragItem.current = -1;
    dragOverItem.current = -1;
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
          dispatch(createColumnThunk({ title }));
        }
        if (entityAction.edit && columnId) {
          dispatch(updateColumnThunk({ id: columnId, title, order }));
        }
        setShowForm(false);
        break;
      case 'task':
        // TODO
        console.log('create task');
        break;
      default:
        return null;
    }
  };

  const onApprove = async () => {
    await dispatch(deleteColumnThunk(confirm));
    setConfirm('');
    setIsVisibleApprove(false);
    setShowForm(false);
  };

  useEffect(() => {
    dispatch(getAllColumnThunk(id ?? ''));
  }, [id, dispatch]);

  useEffect(() => {
    setColumns(selectorColumns);
  }, [selectorColumns]);

  return (
    <section className={style.boardContainer}>
      <div className={style.boardHeader}>
        <h3>{board.title}</h3>
        <span>
          <button className={style.boardHederButton} onClick={handleGoBack}>
            ◀ <strong>{t('Go back')}</strong>
          </button>
          <button className={style.boardHederButton} onClick={handleCreate}>
            ✚ <strong>{t('Create column')}</strong>
          </button>
        </span>
      </div>
      <ul className={style.boardContent}>
        {columns.map((item: IColumnData, index) => (
          <Suspense key={item.id} fallback={<LoadingSpinner />}>
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
                <Column {...item} handleDelete={handleDelete} styleName={BGCOL_HEADER} />
              )}
              <Modal
                isVisible={isVisibleApprove}
                title={`${t(WARING)}`}
                content={
                  <Сonfirmation entity={`${t(COLUMN)} "${item.title}"`} handleClick={onApprove} />
                }
                onClose={onCloseСonfirmation}
              />
            </li>
          </Suspense>
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
