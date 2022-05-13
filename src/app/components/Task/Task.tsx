import { useState } from 'react';
import { Modal } from '../Modal/Modal';
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
    <>
      <input
        /*  className={styles.buttonDeleteUser} */
        type="button"
        value="Delete user"
        onClick={isVisibleSetter}
      />
      {/* <Button
        name={'Create..'}
        styleName={styles.buttonNewBoard}
        handleClick={ButtonNewBoardHandleClick}
      /> */}
    </>
  );

  return (
    <section onClick={handleClick} className={style.task}>
      <Modal isVisible={isVisible} title={TITLE} content={content} onClose={onClose} />
      <ul>
        <li>Title:</li>
        <li>Description:</li>
        <li>Order:</li>
        <li>UserID:</li>
        <li>ColumnID:</li>
        <li>BoardID:</li>
      </ul>
    </section>
  );
};

export default Task;
