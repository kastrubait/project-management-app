import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { logOutUser } from '../../store/reducers/HeaderSlice';
import { createBoardThunk } from '../../store/reducers/BodySlice';
import { useAppDispatch } from '../../store/redux';
import style from './Sticky.module.scss';
import styles from '../../components/EditProfile/EditProfileForm.module.scss';

const Header = () => {
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);
  const TITLE = 'Create New Board';
  const onClose = () => setIsVisible(false);
  const [title, setTitle] = useState('');

  const onChangeSetter = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const ButtonNewBoardHandleClick = () => {
    dispatch(createBoardThunk(title));
  };

  const content = (
    <>
      <input
        placeholder="Enter board name ..."
        className={style.inputNewBoardModal}
        onChange={onChangeSetter}
      />
      <Button
        name={'Create..'}
        styleName={styles.buttonNewBoard}
        handleClick={ButtonNewBoardHandleClick}
      />
    </>
  );

  const isVisibleSetter = () => {
    setIsVisible(true);
  };

  function editLogOutButtonHandler() {
    dispatch(logOutUser());
  }

  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <Modal isVisible={isVisible} title={TITLE} content={content} onClose={onClose} />
      <Button
        name={'Edit profile'}
        styleName={style.editProfileButton}
        handleClick={() => navigate('/EditProfilePage')}
      />

      <Button
        name={'Create New Board'}
        styleName={style.editProfileButton}
        handleClick={isVisibleSetter}
      />
      <Button
        name={'Log Out'}
        styleName={style.editProfileButton}
        handleClick={editLogOutButtonHandler}
      />
      <select defaultValue={'value2'} className={style.styled}>
        <option value="value1">English</option>
        <option value="value2">Russian</option>
        <option value="value3">French</option>
      </select>
    </div>
  );
};

export default Header;
