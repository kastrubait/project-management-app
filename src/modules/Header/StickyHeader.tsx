import { useState, useEffect, useRef, useCallback } from 'react';

const StickyHeader = (defaultSticky = false) => {
  const [isSticky, setIsSticky] = useState(defaultSticky);
  const tableRef = useRef<HTMLTableElement>(null);

  const toggleSticky = useCallback(
    ({ top, bottom }: { top: number; bottom: number }) => {
      if (top <= 0 && bottom > 2 * 68) {
        !isSticky && setIsSticky(true);
      } else {
        isSticky && setIsSticky(false);
      }
    },
    [isSticky]
  );

  useEffect(() => {
    const handleScroll = () => {
      toggleSticky(tableRef.current?.getBoundingClientRect() as DOMRect);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [toggleSticky]);

  return { tableRef, isSticky };
};

export default StickyHeader;
