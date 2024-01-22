import { useEffect } from 'react';
import closeIcone from '../../assets/icones/close.svg';
import styles from './modal.module.css';

type propsType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   children: string | JSX.Element;
   background?: string;
   modal?: string;
};

export const Modal = (props: propsType) => {
   const { open, setOpen, children } = props;
   useEffect(() => {
      const container = document.querySelector(
         `.${styles.container}`
      ) as HTMLElement;
      container.style.display = open ? 'flex' : 'none';
   }, [open]);

   return (
      <div className={styles.container}>
         <div className={styles.modalContainer}>
            <img
               className={styles.closeButton}
               src={closeIcone}
               alt="Close"
               onClick={() => setOpen(false)}
            />
            {children}
         </div>
      </div>
   );
};
