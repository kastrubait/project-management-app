import Button from '../components/Button/Button';
import style from './WelcomePage.module.scss';
import { useNavigate } from 'react-router-dom';
import { develops } from '../modules/Footer/Footer';

const WelcomePage = () => {
  const navigate = useNavigate();
  const handleLogIn = () => {
    //navigate('/login')
  };

  const handleSignUp = () => {
    //navigate('/singup')
  };

  return (
    <div className={style.containerPage}>
      <div className={style.containerButton}>
        <Button name="Log in" handleClick={handleLogIn} />
        <Button name="Sign up" handleClick={handleSignUp} />
      </div>
      <div className={style.description}>Project Management App</div>
      <h4>
        When you’re working on a large project, to-do lists can fall short. There’s simply too much
        going on and too many people involved. Instead, you need to use dedicated project management
        software.
      </h4>
      <h3>
        <a href="https://rs.school/react/">RS School</a> students created Project Management App
        developed:
      </h3>
      <div className={style.smallFilmCardContainer}>
        {develops.map((develop) => (
          <article key={develop.id} className={style.smallFilmCard}>
            <div className={style.smallFilmCardImage}>
              <img src={develop.image} alt={develop.name} width="200" height="250" />
            </div>
            <h3 className={style.smallFilmCardTitle}>{develop.name}</h3>
          </article>
        ))}
      </div>
    </div>
  );
};

export default WelcomePage;
