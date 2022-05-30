import { SyntheticEvent, useState, DragEvent, useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal/Modal';
import Task from '../../../components/Task/Task';
import { IColumn, IColumnData } from '../../../Interfaces/IColumn';
import { ITask, ITaskData } from '../../../Interfaces/ITask';
import { filterTask } from '../../../shared/utils/filterTasks';
import { sortByOrder } from '../../../shared/utils/sortByOrder';
import {
  createTaskThunk,
  deleteColumnThunk,
  getAllColumnThunk,
  getAllTaskColumnThunk,
  setCurrentColumnId,
  updateColumnThunk,
  updateTaskThunk,
} from '../../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { ColumnHeader } from './ColumnHeader/ColumnHeader';
import { Сonfirmation } from '../../../components/Confirmation/Confirmation';
import { COLUMN } from '../../../shared/constants';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from './Column.module.scss';

interface ColumnProps extends IColumnData {
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const Column = ({ id, title, order }: ColumnProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<ITask>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const [isVisibleApprove, setIsVisibleApprove] = useState(false);
  const [confirm, setConfirm] = useState<string>('');
  const [editMode, setMode] = useState(false);
  const titleData = { title: title };
  const boardId = useAppSelector((state) => state.body.boardId);
  const selectorTasks = useAppSelector((state) => state.body.tasks);
  const [tasks, setTasks] = useState(selectorTasks);

  const onCreateTaskSubmit = (data: ITask) => {
    dispatch(setCurrentColumnId(id));
    dispatch(createTaskThunk(data));
    setIsVisible(false);
    reset();
  };

  const handleAddTask = (e: SyntheticEvent<HTMLSpanElement>): void => {
    e.stopPropagation();
    setIsVisible(true);
  };

  const toggleEditTitle = (event: SyntheticEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    setMode(!editMode);
  };

  const onCloseСonfirmation = () => setIsVisibleApprove(false);

  const handleDelete = (event: SyntheticEvent<HTMLSpanElement>) => {
    event.stopPropagation();
    setIsVisibleApprove(true);
    setConfirm(event.currentTarget.dataset.columnid as string);
  };

  const onApprove = async () => {
    await dispatch(deleteColumnThunk(confirm));
    setConfirm('');
    setIsVisibleApprove(false);
  };

  const onCancel = () => {
    setIsVisibleApprove(false);
  };

  const content = (
    <form className={style.userForm} onSubmit={handleSubmit(onCreateTaskSubmit)}>
      <div className={style.topForm}>
        <label htmlFor="title" className={style.labelInput}>
          <strong>{t('title')}:&#160;</strong>
          <span className={style.error}>{errors.title?.message}</span>
          <br />
          <input
            type="text"
            autoFocus
            className={style.inputForm}
            {...register('title', {
              required: { value: true, message: `*${t('is required')}` },
              minLength: {
                value: 4,
                message: `*${t('is too short')}`,
              },
              maxLength: {
                value: 75,
                message: `*${t('is too long')}`,
              },
            })}
          />
        </label>
        <br />
        <label htmlFor="author" className={style.labelInput}>
          <strong>{t('description')}:&#160;</strong>
          <span className={style.error}>{errors.description?.message}</span>
          <br />
          <textarea
            {...register('description', {
              required: { value: true, message: `*${t('is required')}` },
              minLength: {
                value: 5,
                message: `*${t('is too short')}`,
              },
            })}
            className={style.textarea}
            name="description"
          />
        </label>
        <button type="submit" className={style.buttonSubmitForm}>
          {t('Confirm')}
        </button>
      </div>
    </form>
  );

  const onClose = () => {
    setIsVisible(false);
  };

  const onSubmit: SubmitHandler<IColumn> = (data: IColumn) => {
    dispatch(updateColumnThunk({ id: id, title: data.title, order: order }));
    dispatch(getAllColumnThunk(boardId));
    setMode(!editMode);
  };

  const [startColumnId, setStartColumnId] = useState('');
  const [endColumnId, setEndColumnId] = useState('');

  const dragTaskItem = useRef() as React.MutableRefObject<number>;
  const dragTaskOverItem = useRef() as React.MutableRefObject<number>;

  const dragTaskStart = (
    _event: DragEvent<HTMLSpanElement>,
    position: number,
    columnId: string
  ) => {
    setStartColumnId(columnId);
    dragTaskItem.current = position;
    console.log('start->', dragTaskItem.current, columnId);
  };

  const dragTaskEnter = (event: DragEvent<HTMLSpanElement>, position: number, columnId: string) => {
    event.preventDefault();
    dragTaskOverItem.current = position;
    console.log('enter->', dragTaskOverItem.current, columnId);
    setEndColumnId(columnId);
  };

  const dropTask = async (event: DragEvent<HTMLSpanElement>) => {
    event.preventDefault();
    const copyListItems = [...sortByOrder(filterTask(tasks, id))] as ITaskData[];
    const dragItemContent = copyListItems[dragTaskItem.current - 1];
    console.log('content->', dragItemContent);
    console.log('endColumnId->', endColumnId);
    console.log('order->', dragTaskOverItem.current);
    const data = {
      title: dragItemContent.title,
      description: dragItemContent.description,
      userId: dragItemContent.userId,
      boardId: dragItemContent.boardId,
      order: dragTaskOverItem.current,
      columnId: endColumnId,
    };
    await dispatch(
      updateTaskThunk({
        columnId: startColumnId,
        taskId: dragItemContent.id,
        newData: data,
      })
    );
    dragTaskItem.current = -1;
    dragTaskOverItem.current = -1;
  };

  useEffect(() => {
    dispatch(getAllTaskColumnThunk(id ?? ''));
  }, [id, dispatch]);

  useEffect(() => {
    setTasks(selectorTasks);
  }, [selectorTasks]);

  return (
    <div className={style.column}>
      <Modal
        isVisible={isVisibleApprove}
        warn={true}
        title={`${t('delete')}?`}
        content={
          <Сonfirmation
            entity={`${t(COLUMN)} "${title}"`}
            handleCancel={onCancel}
            handleOK={onApprove}
          />
        }
        onClose={onCloseСonfirmation}
      />
      <div tabIndex={0} className={style.columnHeader} onClick={() => setMode(!editMode)}>
        {editMode ? (
          <ColumnHeader
            columnId={id}
            titleData={titleData}
            editMode
            toggleEditTitle={toggleEditTitle}
            onSubmit={onSubmit}
          />
        ) : (
          <>
            <h3>{`[ ${filterTask(tasks, id).length} ] ${title}`}</h3>
            <span>
              <Tippy content={<span>{t('Add task')}</span>}>
                <span
                  role="button"
                  data-columnid={id}
                  tabIndex={0}
                  className={style.columnAddTask}
                  onClick={handleAddTask}
                ></span>
              </Tippy>
              <Tippy content={<span>{t('Delete')}</span>}>
                <span
                  role="button"
                  data-columnid={id}
                  tabIndex={0}
                  className={style.columnDelete}
                  onClick={handleDelete}
                ></span>
              </Tippy>
            </span>
          </>
        )}
      </div>
      <div className={style.columnBody}>
        <Modal isVisible={isVisible} title={t('Create task')} content={content} onClose={onClose} />
        <div className={style.columnContent}>
          {(sortByOrder(filterTask(tasks, id)) as ITaskData[]).map((task) => (
            <span
              key={task.id}
              onDragStart={(e) => dragTaskStart(e, task.order, task.columnId)}
              onDragEnter={(e) => dragTaskEnter(e, task.order, task.columnId)}
              onDragEnd={dropTask}
              onDragOver={(e) => e.preventDefault()}
              draggable
            >
              <Task key={task.id} task={task} />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
