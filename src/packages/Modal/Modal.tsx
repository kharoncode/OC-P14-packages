import styled from 'styled-components';
import styles from './modal.module.css';
import closeIcone from '../../assets/icones/close.svg';
import { useNavigate } from 'react-router-dom';

type propsType = {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   children: string | JSX.Element;
   background?: string;
   modal?: string;
   navigation?: { link: string; style?: string; text?: string };
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

const NavButton = styled.div<{ $style: string }>`
   ${({ $style }) => $style}
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

const defaultNavButtonStyle = `
display: flex;
justify-content: center;
align-items: center;
background-color: #5955b3;
color:white;
padding:5px 10px 5px 10px;
border-radius:10px;
font-weight:500;
   `;

export const Modal = (props: propsType) => {
   const navigate = useNavigate();
   const { open, setOpen, children, background, modal, navigation } = props;
   const display = open ? 'flex' : 'none';
   const containerStyle = background ? background : defaultContainerStyle;
   const modalStyle = modal ? modal : defaultModalStyle;
   const navButtonStyle = navigation?.style
      ? navigation.style
      : defaultNavButtonStyle;
   return (
      <Container display={display} $style={containerStyle}>
         <ModalContainer $style={modalStyle}>
            <img
               src={closeIcone}
               alt="Close"
               className={styles.closeButton}
               onClick={() => setOpen(!open)}
            />
            {children}
            {navigation ? (
               <NavButton
                  $style={navButtonStyle}
                  onClick={() => {
                     navigate(`/${navigation.link}/`);
                  }}
               >
                  {navigation.text ? navigation.text : 'OK'}
               </NavButton>
            ) : (
               <></>
            )}
         </ModalContainer>
      </Container>
   );
};
