import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { logOutUser } from '../../store/reducers/HeaderSlice';
import { useAppDispatch, useAppSelector } from '../../store/redux';
import { createBoardThunk } from '../../store/reducers/BodySlice';
import style from './Sticky.module.scss';
import { useTranslation } from 'react-i18next';
import { Form } from '../../components/Form/Form';
import { ActionForm } from '../../Interfaces/ActionForm';
import { ACTION, BOARD } from '../../shared/constants';
import { IFormData } from '../../Interfaces/FormData';

const Header = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useAppDispatch();

  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);

  const [isVisible, setIsVisible] = useState(false);

  const onClose = () => setIsVisible(false);

  const [entityAction, setEntityAction] = useState({} as ActionForm);

  const onSubmitForm = (data: IFormData) => {
    const { title, description } = data;
    switch (entityAction.type) {
      case 'board':
        if (!entityAction.edit) {
          dispatch(createBoardThunk({ title, description }));
        }
        setIsVisible(false);
        break;
      default:
        return null;
    }
  };

  const isVisibleSetter = () => {
    setEntityAction(ACTION.CREATE(BOARD, {}));
    setIsVisible(true);
    navigate('/');
  };

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    i18n.changeLanguage(e.target.value);
  };

  function logOutButtonHandler() {
    dispatch(logOutUser());
  }

  const navigate = useNavigate();

  return (
    <div className={style.header}>
      <Modal
        isVisible={isVisible}
        title={t('Create new board')}
        content={<Form {...entityAction} onSubmitForm={onSubmitForm} />}
        onClose={onClose}
      />
      {isAuthUser && (
        <>
          <Button
            data-tip="Edit profile"
            name={t('Edit profile')}
            styleName={style.editProfileButton}
            handleClick={() => navigate('/EditProfilePage')}
          />
          <Button
            name={t('Create new board')}
            styleName={style.editProfileButton}
            handleClick={isVisibleSetter}
          />
        </>
      )}
      {isAuthUser && (
        <Button
          name={t('Log out')}
          styleName={style.editProfileButton}
          handleClick={logOutButtonHandler}
        />
      )}

      <select defaultValue={'en'} className={style.styled} onChange={handleLanguageChange}>
        <option value="en">Eng</option>
        <option value="ru">Rus</option>
      </select>
    </div>
  );
};

export default Header;
