import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import style from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div className={style.page}>
      <div className={style.notFound}>
        <div className={style.notFoundTitle}>
          <h1>{t('Oops!')}</h1>
          <h2>{t('404 - The Page can not be found')}</h2>
        </div>
        <Link className={style.link} to="/">
          {t('Go to homepage')}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
