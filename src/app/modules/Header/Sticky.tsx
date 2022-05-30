import { useState, useEffect, useRef, FC, useCallback } from 'react';
import style from './Sticky.module.scss';

interface StickyProps {
  children?: JSX.Element;
}

const Sticky: FC<StickyProps> = ({ children }) => {
  const [isSticky, setSticky] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const header = document.getElementById('myHeader');
    const sticky = header?.offsetTop || 0.1;
    if (window.pageYOffset > sticky) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return (
    <div className={`style.stickyWrapper ${isSticky && style.sticky}`}>
      <div id="myHeader" className={`style.header ${isSticky && style.dodgeHeader}`} ref={ref}>
        {children}
      </div>
    </div>
  );
};

export default Sticky;
