import styles from './column.module.css';
import { useState } from 'react';
import type { column, data, dataContent } from '../../DataTable';
import sortUp from '../../../../assets/icones/sortUp.svg';
import sortDown from '../../../../assets/icones/sortDown.svg';
import sort from '../../../../assets/icones/sort.svg';

type props = {
   column: column;
   data: data;
   setNewData: React.Dispatch<React.SetStateAction<data>>;
   isColumnSelected: string;
   setIsColumnSelected: React.Dispatch<React.SetStateAction<string>>;
};

const columnSelected = (
   isColumnSelected: string,
   prevColumnSelected: string
) => {
   const prevColumnItem_elts = document.querySelectorAll(
      `.${prevColumnSelected}`
   );
   const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
   prevColumnItem_elts.forEach((el) => el.classList.remove(`${styles.active}`));
   columnItem_elts.forEach((el) => el.classList.add(`${styles.active}`));
};

const Column = (props: props) => {
   const { column, data, setNewData, isColumnSelected, setIsColumnSelected } =
      props;
   const [reverse, setReverse] = useState(false);

   const sortTable = (a: dataContent, b: dataContent, column: column) => {
      if (a[column.data] < b[column.data]) {
         return -1;
      }
      if (a[column.data] > b[column.data]) {
         return 1;
      }
      return 0;
   };

   const reverseSortTable = (
      a: dataContent,
      b: dataContent,
      column: column
   ) => {
      if (a[column.data] > b[column.data]) {
         return -1;
      }
      if (a[column.data] < b[column.data]) {
         return 1;
      }
      return 0;
   };

   return (
      <div
         key={column.data}
         className={styles.item}
         onClick={() => {
            let isReverse = reverse;
            if (isColumnSelected !== column.data) {
               isReverse = false;
            }
            setIsColumnSelected(column.data);
            const newData = [...data];
            isReverse
               ? setNewData(
                    newData.sort((a, b) => reverseSortTable(a, b, column))
                 )
               : setNewData(newData.sort((a, b) => sortTable(a, b, column)));
            setReverse(!isReverse);
            columnSelected(column.data, isColumnSelected);
         }}
      >
         {column.title}
         {isColumnSelected !== column.data ? (
            <img src={sort} alt="" className={styles.arrowInactive} />
         ) : (
            <div className={styles.arrowsContainer}>
               {reverse ? (
                  <img src={sortUp} alt="up" />
               ) : (
                  <img src={sortDown} alt="down" />
               )}
            </div>
         )}
      </div>
   );
};

export default Column;
