import { useTranslation } from 'react-i18next';
import Button from '../components/Button/Button';
import style from './WelcomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { develops } from '../modules/Footer/Footer';
import { useAppSelector } from '../store/redux';

const WelcomePage = () => {
  const { t } = useTranslation();
  const isAuthUser = useAppSelector((state) => state.header.isAuthUser);
  const navigate = useNavigate();
  const handleLogIn = () => {
    navigate('/sign/in');
  };

  const handleSignUp = () => {
    navigate('/sign/up');
  };

  const handleMain = () => {
    navigate('/');
  };

  return (
    <div className={style.containerPage}>
      <div className={style.containerButton}>
        {isAuthUser ? (
          <Button name={t('Go to Main Page')} handleClick={handleMain} />
        ) : (
          <>
            <Button name={t('Log in')} handleClick={handleLogIn} />
            <Button name={t('Sign up')} handleClick={handleSignUp} />
          </>
        )}
      </div>
      <div className={style.description}>Project Management App</div>
      <h3 className={style.smallFilmCardArticle}>
        {t('When you are working on a large project, to-do lists can fall short')}
      </h3>
      <h3 className={style.smallFilmCardArticle}>
        <a href="https://rs.school/react/">RS School </a>
        {t('students created Project Management App developed')}:
      </h3>
      <div className={style.smallFilmCardContainer}>
        {develops.map((develop) => (
          <a key={develop.id} href={develop.link} className={style.smallFilmCard}>
            <div className={style.smallFilmCardImage}>
              <img src={develop.image} alt={develop.name} width="200" height="250" />
            </div>
            <h3 className={style.smallFilmCardTitle}>{develop.name}</h3>
          </a>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
