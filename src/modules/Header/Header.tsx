import Button from '../../app/components/Button/Button';
import style from './Sticky.module.scss';

const Header = () => (
  <div className={style.header}>
    <Button name={'Edit profile'} styleName={style.editProfileButton} />
    <Button name={'Create New Board'} styleName={style.editProfileButton} />
    <Button name={'Log Out'} styleName={style.editProfileButton} />
    <select defaultValue={'value2'} className={style.styled}>
      <option value="value1">English</option>
      <option value="value2">Russian</option>
      <option value="value3">French</option>
    </select>
  </div>
);
export default Header;
