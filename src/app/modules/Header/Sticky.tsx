import { useState, useEffect, useRef, FC, useCallback } from 'react';
import style from './Sticky.module.scss';

interface StickyProps {
  children?: JSX.Element;
}

const Sticky: FC<StickyProps> = ({ children }) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (ref && ref.current && ref.current.getBoundingClientRect()) {
      /*  console.log(ref.current.getBoundingClientRect().top); */

      setSticky(ref.current.getBoundingClientRect().top <= 0);
      console.log(ref.current.getBoundingClientRect().top == 0);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // <div className="sticky--inner">{children}</div>
  return (
    <div className={`style.stickyWrapper ${isSticky && style.sticky}`} ref={ref}>
      <div className={`style.header ${isSticky && style.dodgeHeader}`}>{children}</div>
    </div>
  );
};

export default Sticky;
