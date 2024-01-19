import styled from 'styled-components';
import closeIcone from '../../assets/icones/close.svg';

type propsType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   children: string | JSX.Element;
   background?: string;
   modal?: string;
};

const Container = styled.div<{ display: string; $style: string }>`
   position: absolute;
   justify-content: center;
   top: 0;
   left: 0;
   width: 100%;
   height: 100vh;
   display: ${({ display }) => display};
   ${({ $style }) => $style}
`;

const ModalContainer = styled.div<{ $style: string }>`
   position: relative;
   ${({ $style }) => $style}
`;

const CloseButton = styled.img`
   position: absolute;
   top: 20px;
   right: 20px;
   height: 20px;
   width: 20px;
`;

const defaultContainerStyle = `
   backdrop-filter: blur(5px);
   `;

const defaultModalStyle = `
   display: flex;
   flex-direction:column;
   align-items: center;
   gap:20px;
   margin-top: 15vh;
   padding: 30px;
   width: 80%;
   height: fit-content;
   border: solid 5px black;
   border-radius: 25px;
   background-color: white;
   color: black;
   `;

export const Modal = (props: propsType) => {
   const { open, setOpen, children, background, modal } = props;
   const display = open ? 'flex' : 'none';
   const containerStyle = background ? background : defaultContainerStyle;
   const modalStyle = modal ? modal : defaultModalStyle;

   return (
      <Container display={display} $style={containerStyle}>
         <ModalContainer $style={modalStyle}>
            <CloseButton
               src={closeIcone}
               alt="Close"
               onClick={() => setOpen(!open)}
            />
            {children}
         </ModalContainer>
      </Container>
   );
};
