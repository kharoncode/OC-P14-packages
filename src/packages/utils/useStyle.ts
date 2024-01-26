import { useEffect } from 'react';

export const UseStyle = (
   style: CSSModuleClasses | undefined,
   styles: CSSModuleClasses,
   className: CSSModuleClasses,
   setClassName: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>
) => {
   useEffect(() => {
      if (style) {
         console.log('useStyle');
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
