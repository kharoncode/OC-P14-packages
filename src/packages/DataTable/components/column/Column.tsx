import { useEffect, useState } from 'react';
import styles from './column.module.css';
import type { column, data } from '../../DataTable';
import sortUp from '../../../../assets/icones/sortUp.svg';
import sortDown from '../../../../assets/icones/sortDown.svg';
import sort from '../../../../assets/icones/sort.svg';
import { UseStyle } from '../../../utils/useStyle';

type props = {
   column: column;
   data: data;
   list: string[];
   setDataList: React.Dispatch<React.SetStateAction<string[]>>;
   isColumnSelected: string;
   setIsColumnSelected: React.Dispatch<React.SetStateAction<string>>;
   style: CSSModuleClasses | undefined;
   activeCell: CSSModuleClasses[string];
};

const sortTable = (a: string, b: string, column: column, data: data) => {
   if (data[a][column.data] < data[b][column.data]) {
      return -1;
   }
   if (data[a][column.data] > data[b][column.data]) {
      return 1;
   }
   return 0;
};

const reverseSortTable = (a: string, b: string, column: column, data: data) => {
   if (data[a][column.data] > data[b][column.data]) {
      return -1;
   }
   if (data[a][column.data] < data[b][column.data]) {
      return 1;
   }
   return 0;
};

const Column = (props: props) => {
   const {
      column,
      data,
      list,
      setDataList,
      isColumnSelected,
      setIsColumnSelected,
      style,
      activeCell,
   } = props;
   const [reverse, setReverse] = useState(false);
   const [classes, setclasses] = useState(styles);

   UseStyle(style ? style : undefined, styles, classes, setclasses);

   useEffect(() => {
      const columnCell_elts = document.querySelectorAll(`.${isColumnSelected}`);
      if (columnCell_elts) {
         columnCell_elts.forEach((el) => el.classList.add(activeCell));
      }
      /* eslint-disable */
   }, [reverse]);
   /* eslint-enable */

   return (
      <div
         key={column.data}
         className={`${classes.cell}`}
         onClick={() => {
            let isReverse = reverse;
            if (isColumnSelected !== column.data) {
               isReverse = false;
            }
            setIsColumnSelected(column.data);
            const newList = [...list];
            isReverse
               ? setDataList(
                    newList.sort((a, b) => reverseSortTable(a, b, column, data))
                 )
               : setDataList(
                    newList.sort((a, b) => sortTable(a, b, column, data))
                 );
            setReverse(!isReverse);
         }}
      >
         {column.title}
         {isColumnSelected !== column.data ? (
            <img
               src={sort}
               alt=""
               className={`${classes.cell_inactibeArrow} ${classes.cell_arrow}`}
            />
         ) : (
            <div className={classes.arrowsContainer}>
               {reverse ? (
                  <img className={classes.cell_arrow} src={sortUp} alt="up" />
               ) : (
                  <img
                     className={classes.cell_arrow}
                     src={sortDown}
                     alt="down"
                  />
               )}
            </div>
         )}
      </div>
   );
};

export default Column;
