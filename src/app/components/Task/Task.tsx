import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { IFormData } from '../../Interfaces/Interfaces';
import { createTaskThunk, updateTaskThunk } from '../../store/reducers/BodySlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import EditProfileForm from '../EditProfile/EditProfileForm';
import { Modal } from '../Modal/Modal';
import style from './Task.module.scss';

const Task = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataForm, setDataForm] = useState<IFormData>();
  /*   console.log(`dataForm task test`, dataForm); */

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.body.tasks);

  const handleClick = () => {
    setIsVisible(true);
  };

  const TITLE = 'Create Task';

  const onClose = () => {
    setIsVisible(false);
  };

  const GoBackHandler = () => {
    navigate('/welcomePage');
  };
  // for delete
  /*  const buttonHandleClick = () => {
    dispatch(createTaskThunk({ dataForm }));
  }; */

  const buttonDeleteUserHandler = () => {
    /* dispatch(deleteUserThunk()); */
  };

  useEffect(() => {
    if (dataForm) {
      // dispatch(createTaskThunk({ dataForm }));
    }
  }, [dataForm, dispatch]);

  /*  const updateTaskHandler = () => {
    dispatch(updateTaskThunk({ dataForm }));
  }; */

  const content = (
    <div className={style.taskForm}>
      {/* <EditProfileForm
        /* updateTaskHandler={updateTaskHandler}
        TextUpdateModalButton={'Update Task'}
        buttonDeleteUserHandler={buttonDeleteUserHandler}
        GoBackHandler={GoBackHandler}
        buttonHandleClick={buttonHandleClick}
        setDataForm={setDataForm}
        firstField={'Your title'}
        secondField={'Your Description'}
        thirdFiled={'Your Order'}
        firstFieldHelper={'Title is required'}
        secondFieldHelper={'Description is required'}
        thirdFieldHelper={'Order is required'}
        submitButton={'Create task'}
        openModalButton={'Delete task'}
        modalText={'You are soure for delete task ?'}
        modalConfirmText={'Task removed successfully'}
      /> */}
    </div>
  );

  return (
    <>
      <Modal isVisible={isVisible} title={TITLE} content={content} onClose={onClose} />
      {tasks.map((task) => (
        <section key={task.id} onClick={handleClick} className={style.task}>
          <ul>
            <li>Title: {task.title}</li>
            <li>Description: {task.description}</li>
            <li>Order: {task.order}</li>
          </ul>
        </section>
      ))}
    </>
  );
};

export default Task;
