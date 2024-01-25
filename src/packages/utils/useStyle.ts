import { useEffect } from 'react';

export const UseStyle = (
   style: { [key: string]: string } | undefined,
   styles: CSSModuleClasses,
   className: CSSModuleClasses,
   setClassName: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
   console.log('useStyle');
   useEffect(() => {
      if (style) {
         const newStyle: { [key: string]: string } = {};
         Object.keys(className).map((key) => {
            newStyle[key] = style[key] ? style[key] : styles[key];
         });
         setClassName(newStyle);
      }
      /* eslint-disable */
   }, []);
   /* eslint-enable */
};
