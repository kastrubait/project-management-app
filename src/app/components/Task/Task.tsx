import { useState } from 'react';
import EditProfileForm from '../EditProfile/EditProfileForm';
import { Modal } from '../Modal/Modal';
import style from './Task.module.scss';
interface ITaskProps {
  title: string;
  description: string;
  order: number;
}

const Task = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dataTask, setDataTask] = useState<ITaskProps>();
  console.log(`test dataTask`, dataTask);

  const handleClick = () => {
    setIsVisible(true);
  };

  const TITLE = 'Create Task';

  const onClose = () => {
    setIsVisible(false);
  };

  const content = (
    <div className={style.taskForm}>
      <EditProfileForm
        setDataForm={setDataTask}
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
      />
    </div>
  );

  return (
    <>
      <Modal isVisible={isVisible} title={TITLE} content={content} onClose={onClose} />
      <section onClick={handleClick} className={style.task}>
        <ul>
          <li>Title:</li>
          <li>Description:</li>
          <li>Order:</li>
        </ul>
      </section>
    </>
  );
};

export default Task;
