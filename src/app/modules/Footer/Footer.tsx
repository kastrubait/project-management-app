import { Link } from 'react-router-dom';
import style from './Footer.module.scss';
import develop from '../../assets/develop/develop.png';

export const develops = [
  {
    id: 1,
    name: 'Georgiy Beloklokov',
    link: 'https://github.com/georgiybeloklokov',
    image: develop,
  },
  {
    id: 2,
    name: 'Tatsiana Kastrubai',
    link: 'https://github.com/kastrubait',
    image: develop,
  },
  {
    id: 3,
    name: 'Maksim Atroschenko',
    link: 'https://github.com/max7290599',
    image: develop,
  },
];

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.dev}>
        {develops.map((develop) => (
          <Link key={develop.id} className={style.github} to={develop.link}>
            {develop.name}
          </Link>
        ))}
      </div>
      <Link className={style.rss} to="https://rs.school/react">
        <span className={style.year}>22</span>
      </Link>
    </div>
  );
};

export default Footer;
