import styles from './column.module.css';
import { useState } from 'react';
import type { column, data } from '../../DataTable';
import sortUp from '../../../../assets/icones/sortUp.svg';
import sortDown from '../../../../assets/icones/sortDown.svg';
import sort from '../../../../assets/icones/sort.svg';

type props = {
   column: column;
   data: data;
   list: string[];
   setDataList: React.Dispatch<React.SetStateAction<string[]>>;
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
   const {
      column,
      data,
      list,
      setDataList,
      isColumnSelected,
      setIsColumnSelected,
   } = props;
   const [reverse, setReverse] = useState(false);

   const sortTable = (a: string, b: string, column: column, data: data) => {
      if (data[a][column.data] < data[b][column.data]) {
         return -1;
      }
      if (data[a][column.data] > data[b][column.data]) {
         return 1;
      }
      return 0;
   };

   const reverseSortTable = (
      a: string,
      b: string,
      column: column,
      data: data
   ) => {
      if (data[a][column.data] > data[b][column.data]) {
         return -1;
      }
      if (data[a][column.data] < data[b][column.data]) {
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
            const newList = [...list];
            isReverse
               ? setDataList(
                    newList.sort((a, b) => reverseSortTable(a, b, column, data))
                 )
               : setDataList(
                    newList.sort((a, b) => sortTable(a, b, column, data))
                 );
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
