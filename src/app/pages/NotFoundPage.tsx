import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  return (
    <div className={style.page}>
      <div className={style.notFound}>
        <div className={style.notFoundTitle}>
          <h1>Oops!</h1>
          <h2>404 - The Page can not be found</h2>
        </div>
        <Link className={style.link} to="/">
          Go to homepage
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
