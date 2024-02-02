import { useState } from 'react';
import styles from './pageList.module.css';
import { UseStyle } from '../../../utils/useStyle';
import backIcone from '../../../../assets/icones/back.svg';
import nextIcone from '../../../../assets/icones/next.svg';

type props = {
   dataListLength: number;
   tableLength: number;
   page: number;
   setPage: React.Dispatch<React.SetStateAction<number>>;
   style: CSSModuleClasses | undefined;
};

const PageList = (props: props) => {
   const { dataListLength, tableLength, page, setPage, style } = props;
   const [classes, setclasses] = useState(styles);
   UseStyle(style ? style : undefined, styles, classes, setclasses);
   return (
      <div>
         {dataListLength > tableLength ? (
            <div className={classes.pagesList_base}>
               {page === 1 ? (
                  <></>
               ) : (
                  <img
                     className={classes.arrowIcone}
                     src={backIcone}
                     alt="Prev"
                     onClick={() => {
                        setPage(page - 1);
                     }}
                  />
               )}

               {[...Array(Math.ceil(dataListLength / tableLength))].map(
                  (_e, i) => {
                     return (
                        <button
                           className={`${classes.pageButton} ${
                              page === i + 1 ? classes.activePage : ''
                           }`}
                           key={i}
                           onClick={() => setPage(i + 1)}
                        >
                           {i + 1}
                        </button>
                     );
                  }
               )}
               {page === Math.ceil(dataListLength / tableLength) ? (
                  <></>
               ) : (
                  <img
                     className={classes.arrowIcone}
                     src={nextIcone}
                     alt="Next"
                     onClick={() => {
                        setPage(page + 1);
                     }}
                  />
               )}
            </div>
         ) : (
            <></>
         )}
      </div>
   );
};

export default PageList;
