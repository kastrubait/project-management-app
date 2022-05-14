import { useState } from 'react';
import EditProfileForm from '../EditProfile/EditProfileForm';
import { Modal } from '../Modal/Modal';
import ModalBasic from '../ModalBasic/ModalBasic';
import style from './Task.module.scss';

const Task = () => {
  const [isVisible, setIsVisible] = useState(false);
  console.log(`isVisible:`, isVisible);

  const handleClick = () => {
    setIsVisible(true);
  };

  const TITLE = 'Create Task';

  const isVisibleSetter = () => {
    setIsVisible(false);
  };

  const onClose = () => {
    setIsVisible(false);
  };

  const content = (
    <EditProfileForm
      firstField={'Your name'}
      secondField={'Your Login'}
      thirdFiled={'Your Password'}
      firstFieldHelper={'Name is required'}
      secondFieldHelper={'Login is required'}
      thirdFieldHelper={'Password is required'}
      submitButton={'Edit profile'}
      openModalButton={'Delete user'}
      modalText={'You are soure for delete user'}
      modalConfirmText={'User removed successfully'}
    />
  );
  const [modalActive, setModalActive] = useState(false);
  return (
    <>
      <ModalBasic active={modalActive} setActive={setModalActive} />
      {/* <Modal isVisible={isVisible} title={TITLE} content={content} onClose={onClose} /> */}
      <section onClick={() => setModalActive(true)} className={style.task}>
        <ul>
          <li>Title:</li>
          <li>Description:</li>
          <li>Order:</li>
          <li>UserID:</li>
          <li>ColumnID:</li>
          <li>BoardID:</li>
        </ul>
      </section>
    </>
  );
};

export default Task;
