import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import style from './Sticky.module.scss';

function editProfileButtonHandler() {}
function editCreateNewBoardButtonHandler() {}
function editLogOutButtonHandler() {}

const Header = () => (
  <div className={style.header}>
    <Link to="/EditProfilePage">
      <Button
        name={'Edit profile'}
        styleName={style.editProfileButton}
        handleClick={editProfileButtonHandler}
      />
    </Link>

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
export default Header;
