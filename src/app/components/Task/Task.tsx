import { SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  deleteTaskThunk,
  downloadFile,
  getAllColumnThunk,
  setCurrentTaskd,
  updateAfterUploadFile,
  updateTaskThunk,
  uploadFile,
} from '../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { Modal } from '../Modal/Modal';
import style from './Task.module.scss';
import { ITaskData } from '../../Interfaces/ITask';
import { Сonfirmation } from '../Confirmation/Confirmation';
import ScreenImage from '../ScreenImage/ScreenImage';
import { TASK } from '../../shared/constants';

export interface TaskForm {
  title: string;
  description: string;
  userId: string;
  file: FileList;
}

interface TaskProps {
  columnId?: string;
  task: ITaskData;
}

const Task = ({ task }: TaskProps) => {
  const { t } = useTranslation();
  const users = useAppSelector((state) => state.header.users);
  const file = useAppSelector((state) => state.body.file);
  const [isVisible, setIsVisible] = useState(false);
  const [isDiableEdtiMode, setIsDiableEdtiMode] = useState(true);
  const [isVisibleApprove, setIsVisibleApprove] = useState(false);
  const [isVisibleImg, setIsVisibleImg] = useState(false);
  const [nameImg, setNameImg] = useState('');
  const [changeNameImg, setChangeNameImg] = useState('');

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
    setChangeNameImg('');
    reset();
  };

  const onCloseImg = () => {
    setIsVisibleImg(false);
  };

  const EditClickHandler = () => {
    setIsDiableEdtiMode(false);
  };

  const loadHandler = (e: SyntheticEvent<HTMLSpanElement>) => {
    console.log(e.currentTarget.dataset);
    dispatch(
      downloadFile({ taskId: task.id, filename: e.currentTarget.dataset.filename as string })
    );
    setNameImg(e.currentTarget.dataset.filename as string);
    setIsVisibleImg(true);
  };

  const changeHandler = (e: SyntheticEvent<HTMLInputElement>) => {
    const filename = e.currentTarget.value.split('\\');
    setChangeNameImg(filename[filename.length - 1]);
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

    const formData = new FormData();

    formData.set('taskId', task.id);
    formData.set('file', data.file[0]);

    dispatch(uploadFile(formData));

    dispatch(updateTaskThunk({ columnId: task.columnId, taskId: task.id, newData: newTask }));

    dispatch(getAllColumnThunk(task.boardId));
    setIsDiableEdtiMode(true);
    dispatch(updateAfterUploadFile(task.columnId));
  };

  const handleDelete = (e: SyntheticEvent<HTMLSpanElement>) => {
    e.stopPropagation();
    setIsVisibleApprove(true);
  };

  const onApprove = () => {
    dispatch(deleteTaskThunk({ taskId: task.id, columnId: task.columnId }));
    setIsVisibleApprove(false);
  };

  const onCancel = () => {
    setIsVisibleApprove(false);
  };

  const content = (
    <form className={style.userForm} onSubmit={handleSubmit(onSubmitForm)}>
      <div className={style.topForm}>
        <label htmlFor="title" className={style.labelInput}>
          <strong>{t('title')}:&#160;</strong>
          <span className={style.error}>{errors.title?.message}</span>
          <input
            type="text"
            autoFocus
            disabled={isDiableEdtiMode}
            className={style.inputForm}
            {...register('title', {
              required: { value: true, message: `*${t('is required')}` },
              minLength: {
                value: 4,
                message: `*${t('is too short')}`,
              },
              maxLength: {
                value: 25,
                message: `*${t('is too long')}`,
              },
            })}
          />
        </label>
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
            disabled={isDiableEdtiMode}
            name="description"
          />
        </label>
        <div className={style.formfileContainer}>
          <label htmlFor="author" className={style.labelInput}>
            <strong>{t('perfomer')}:&#160;</strong>
            <select
              disabled={isDiableEdtiMode}
              className={style.selectForm}
              {...register('userId')}
            >
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </label>
          {isDiableEdtiMode ? (
            <label htmlFor="author" className={style.labelInput}>
              <strong>{t('image')}</strong>
              <div className={style.imageContainer}>
                {task.files?.map((file) => (
                  <span
                    data-filename={file.filename}
                    key={file.filename + file.fileSize}
                    role="button"
                    onClick={loadHandler}
                    className={style.fileContainer}
                  >
                    {file.filename}
                  </span>
                ))}
              </div>
            </label>
          ) : (
            <div className={style.fileUpload}>
              <div className={style.filename}>
                {changeNameImg ? changeNameImg : t('File not selected')}
              </div>
              <label>
                <input
                  className={style.inputFile}
                  type="file"
                  autoFocus
                  accept="image/*"
                  disabled={isDiableEdtiMode}
                  onChangeCapture={changeHandler}
                  {...register('file')}
                />
                {t('Select file')}
              </label>
            </div>
          )}
        </div>
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
        warn={true}
        title={`${t('delete')}?`}
        content={
          <Сonfirmation
            entity={`${t(TASK)} "${task.title}"`}
            handleCancel={onCancel}
            handleOK={onApprove}
          />
        }
        onClose={onClose}
      />
      <Modal
        isVisible={isVisibleImg}
        title={nameImg}
        content={<ScreenImage src={file} />}
        onClose={onCloseImg}
      />
      <section onClick={handleClick} className={style.task}>
        <div className={style.titleTask}>{task.title}</div>
        <span role="button" tabIndex={0} className={style.taskDelete} onClick={handleDelete}></span>
      </section>
    </>
  );
};

export default Task;
