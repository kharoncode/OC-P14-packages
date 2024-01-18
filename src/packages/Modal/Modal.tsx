import styles from './modal.module.css';

type propsType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Modal = (props: propsType) => {
   const { open, setOpen } = props;
   //const display = open ? 'flex' : 'none';
   return (
      <div className={styles.container}>
         <div className={styles.modalContainer}>
            <button
               className={styles.closeButton}
               onClick={() => setOpen(!open)}
            >
               Close
            </button>
            MODAL
         </div>
      </div>
   );
};
