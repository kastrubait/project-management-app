import style from './ScreenImage.module.scss';

interface imageProps {
  src: string;
}

const ScreenImage = ({ src }: imageProps) => {
  return <img className={style.img} src={src} />;
};

export default ScreenImage;
