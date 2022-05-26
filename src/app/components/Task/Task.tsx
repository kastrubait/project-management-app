import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  deleteTaskThunk,
  getAllColumnThunk,
  setCurrentTaskd,
  updateTaskThunk,
} from '../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { Modal } from '../Modal/Modal';
import style from './Task.module.scss';
import { ITaskData } from '../../Interfaces/ITask';
import { Сonfirmation } from '../Confirmation/Confirmation';
import { WARING } from '../../shared/constants';

export interface TaskForm {
  title: string;
  description: string;
  userId: string;
}

interface TaskProps {
  columnId?: string;
  task: ITaskData;
}

const Task = ({ task }: TaskProps) => {
  const { t } = useTranslation();
  const users = useAppSelector((state) => state.header.users);
  const [isVisible, setIsVisible] = useState(false);
  const [isDiableEdtiMode, setIsDiableEdtiMode] = useState(true);
  const [isVisibleApprove, setIsVisibleApprove] = useState(false);

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm<TaskForm>({
    defaultValues: {
      title: task.title,
      description: task.description,
      userId: task.userId,
    },
  });

  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsVisible(true);
  };

  const onClose = () => {
    setIsVisible(false);
    setIsDiableEdtiMode(true);
    setIsVisibleApprove(false);
    reset();
  };

  const EditClickHandler = () => {
    setIsDiableEdtiMode(false);
  };

  const onSubmitForm = (data: TaskForm) => {
    setIsVisible(false);
    dispatch(setCurrentTaskd(task.id));
    const newTask = {
      title: data.title,
      order: task.order,
      description: data.description,
      userId: data.userId,
      boardId: task.boardId,
      columnId: task.columnId,
    };
    dispatch(updateTaskThunk(newTask));
    dispatch(getAllColumnThunk(task.boardId));
    setIsDiableEdtiMode(true);
  };

  const handleDelete = (e: SyntheticEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsVisibleApprove(true);
  };

  const onApprove = () => {
    dispatch(deleteTaskThunk({ taskId: task.id, columnId: task.columnId }));
    setIsVisibleApprove(false);
  };

  const content = (
    <form className={style.userForm} onSubmit={handleSubmit(onSubmitForm)}>
      <div className={style.topForm}>
        <label htmlFor="title" className={style.labelInput}>
          <strong>{t('title')}:&#160;</strong>
          <span className={style.error}>{errors.title?.message}</span>
          <br />
          <input
            type="text"
            autoFocus
            disabled={isDiableEdtiMode}
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
            disabled={isDiableEdtiMode}
            name="description"
          />
        </label>
        <br />
        <label htmlFor="author" className={style.labelInput}>
          <strong>{t('perfomer')}:&#160;</strong>
          <select disabled={isDiableEdtiMode} className={style.selectForm} {...register('userId')}>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {isDiableEdtiMode ? (
        <input
          type="button"
          value={`${t('Edit')}`}
          className={style.buttonEditForm}
          onClick={EditClickHandler}
        />
      ) : (
        <input
          type="submit"
          value={`${t('Confirm')}`}
          className={style.buttonSubmitForm}
          disabled={!isDirty}
        />
      )}
    </form>
  );

  return (
    <>
      <Modal isVisible={isVisible} title={task.title} content={content} onClose={onClose} />
      <Modal
        isVisible={isVisibleApprove}
        title={WARING}
        content={<Сonfirmation entity={task.title} handleClick={onApprove} />}
        onClose={onClose}
      />
      <section onClick={handleClick} className={style.task}>
        <div className={style.titleTask}>{task.title}</div>
        <span
          role="button"
          tabIndex={0}
          className={style.columnDelete}
          onClick={handleDelete}
        ></span>
      </section>
    </>
  );
};

export default Task;
