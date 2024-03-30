import { useEffect } from 'react';

/**
 * If a new style has been assigned via the style props, it replaces the default style (styles), otherwise the default style (styles) is retained
 * @hook
 * @param style (new style)
 * @param styles (default style)
 * @param className
 * @param setClassName
 */
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
