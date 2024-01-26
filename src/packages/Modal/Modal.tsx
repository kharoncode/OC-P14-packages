import { useEffect, useState } from 'react';
import closeIcone from '../../assets/icones/close.svg';
import styles from './modal.module.css';
import { UseStyle } from '../utils/useStyle';

type propsType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   children: string | JSX.Element;
   style?: { [key: string]: string };
};

export const Modal = (props: propsType) => {
   const { open, setOpen, children, style } = props;
   const [className, setClassName] = useState(styles);

   useEffect(() => {
      const container = document.querySelector(
         `.${className.container}`
      ) as HTMLElement;
      container.style.display = open ? 'flex' : 'none';
   }, [open, className]);

   UseStyle(style, styles, className, setClassName);

   return (
      <div className={`${className.container} ${className.container_base}`}>
         <div
            className={`${className.modalContainer} ${className.modalContainer_base}`}
         >
            <img
               className={`${className.closeButton} ${className.closeButton_base}`}
               src={closeIcone}
               alt="Close"
               onClick={() => setOpen(false)}
            />
            {children}
         </div>
      </div>
   );
};
