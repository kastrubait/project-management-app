import { Link, useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import style from './Sticky.module.scss';

function editProfileButtonHandler() {}
function editCreateNewBoardButtonHandler() {}
function editLogOutButtonHandler() {}

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className={style.header}>
      <Button
        name={'Edit profile'}
        styleName={style.editProfileButton}
        handleClick={() => navigate('/EditProfilePage')} //editProfileButtonHandler
      />

      <Button
        name={'Create New Board'}
        styleName={style.editProfileButton}
        handleClick={editCreateNewBoardButtonHandler}
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
