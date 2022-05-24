import develop from '../../assets/develop/develop.png';
import { LINK_TO_THE_COURSE } from '../../shared/constants';
import style from './Footer.module.scss';

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
console.log(
  develops[2].name
    .split(' ')
    .map((word) => word[0])
    .join('')
);

const Footer = () => {
  return (
    <div className={style.footer}>
      <div className={style.dev}>
        {develops.map((develop) => (
          <div key={develop.id}>
            <a className={style.github} href={develop.link}>
              {develop.name}
            </a>
            <a className={style.avatar} href={develop.link} title={develop.name}>
              {develop.name
                .split(' ')
                .map((word) => word[0])
                .join('')}
            </a>
          </div>
        ))}
      </div>
      <a className={style.rss} href={LINK_TO_THE_COURSE}>
        <span className={style.year}>{new Date().getFullYear()}</span>
      </a>
    </div>
  );
};

export default Footer;
