import styles from './column.module.css';
import { useState } from 'react';
import type { column, data, dataContent } from '../../DataTable';

type props = {
   column: column;
   data: data;
   setNewData: React.Dispatch<React.SetStateAction<data>>;
   isColumnSelected: string;
   setIsColumnSelected: React.Dispatch<React.SetStateAction<string>>;
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
         }}
      >
         {column.title}
      </div>
   );
};

export default Column;
