interface imageProps {
  src: string;
}

const ScreenImage = ({ src }: imageProps) => {
  return <img src={src} />;
};

export default ScreenImage;
