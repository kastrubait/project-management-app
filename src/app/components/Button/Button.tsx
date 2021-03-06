import style from './Button.module.scss';

interface ButtonProps {
  name: string;
  handleClick: () => void;
  styleName?: string;
}

const Button = ({ name, handleClick, styleName }: ButtonProps) => {
  return (
    <button className={styleName || style.button} onClick={handleClick}>
      <span>{name}</span>
    </button>
  );
};

export default Button;
