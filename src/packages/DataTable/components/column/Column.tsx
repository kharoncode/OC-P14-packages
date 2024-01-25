import { useEffect, useState } from 'react';
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
   styles?: CSSModuleClasses;
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
      styles,
   } = props;
   const [reverse, setReverse] = useState(false);

   useEffect(() => {
      const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
      if (columnItem_elts) {
         columnItem_elts.forEach((el) => el.classList.add(styles.activeItem));
      }
      /* eslint-disable */
   }, [reverse]);
   /* eslint-enable */

   return (
      <div
         key={column.data}
         className={`${styles.item} ${styles.column_item}`}
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
               className={`${styles.column_item_inactibeArrow} ${styles.column_item_arrow}`}
            />
         ) : (
            <div className={styles.column_arrowsContainer}>
               {reverse ? (
                  <img
                     className={styles.column_item_arrow}
                     src={sortUp}
                     alt="up"
                  />
               ) : (
                  <img
                     className={styles.column_item_arrow}
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
