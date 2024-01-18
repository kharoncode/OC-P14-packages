import styled from 'styled-components';
import styles from './modal.module.css';

type propsType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   style?: string;
};

const Container = styled.div<{ display: string; $style: string }>`
   display: ${({ display }) => display};
   ${({ $style }) => $style}
`;

const defaultContainerStyle = `
   position: absolute;
   justify-content: center;
   top: 0;
   left: 0;
   width: 100%;
   backdrop-filter: blur(5px);
   height: 100vh;
   `;

export const Modal = (props: propsType) => {
   const { open, setOpen, style } = props;
   const display = open ? 'flex' : 'none';
   const containerStyle = style ? style : defaultContainerStyle;
   return (
      <Container display={display} $style={containerStyle}>
         <div className={styles.modalContainer}>
            <button
               className={styles.closeButton}
               onClick={() => setOpen(!open)}
            >
               Close
            </button>
            Employee Created!
         </div>
      </Container>
   );
};
