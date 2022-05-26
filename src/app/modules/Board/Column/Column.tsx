import { SyntheticEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal/Modal';
import Task, { TaskForm } from '../../../components/Task/Task';
import { IColumn, IColumnData } from '../../../Interfaces/IColumn';
import { ITaskData } from '../../../Interfaces/ITask';
import { filterTask } from '../../../shared/utils/filterTasks';
import { sortByOrder } from '../../../shared/utils/sortByOrder';
import {
  createTaskThunk,
  getAllColumnThunk,
  setCurrentColumnId,
  updateColumnThunk,
} from '../../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../../store/redux';
import { ColumnHeader } from './ColumnHeader/ColumnHeader';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import style from './Column.module.scss';

interface ColumnProps extends IColumnData {
  handleDelete?: (event: SyntheticEvent<HTMLSpanElement>) => void;
  styleName?: string;
}

export const Column = ({ id, title, order, handleDelete, styleName }: ColumnProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<TaskForm>();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const [editMode, setMode] = useState(false);
  const titleData = { title: title };
  const boardId = useAppSelector((state) => state.body.boardId);
  const tasks = useAppSelector((state) => state.body.tasks);

  const onCreateTaskSubmit = (data: TaskForm) => {
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
                message: `*${t('is too shoot')}`,
              },
              maxLength: {
                value: 75,
                message: `*${t('is too long title')}`,
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
                message: `*${t('is too shoot')}`,
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

  return (
    <div className={style.column}>
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
            <h3>{title}</h3>
            <span>
              <span
                role="button"
                data-columnid={id}
                tabIndex={0}
                className={style.columnAddTask}
                onClick={handleAddTask}
              ></span>
              <Tippy content={<span>{t('Confirm')}</span>}>
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
            <Task key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};
