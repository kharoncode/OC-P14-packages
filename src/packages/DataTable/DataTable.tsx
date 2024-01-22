import { useState } from 'react';
import styles from './dataTable.module.css';
import Column from './components/column/Column';
import Search from './components/search/Search';

export type dataContent = {
   [key: string]: number | string;
};

export type data = dataContent[];

export type column = { title: string; data: string };

export type columns = column[];

type props = {
   data: data;
   columns: columns;
};

export const DataTable = (props: props) => {
   const { data, columns } = props;
   const columnsId = columns.map((el) => el.data);
   const [newData, setNewData] = useState(data);
   const [isColumnSelected, setIsColumnSelected] = useState(columns[0].data);

   return (
      <div className={styles.container}>
         <Search data={data} setNewData={setNewData} />
         <div className={styles.columnsContainer}>
            {columns.map((el: column) => {
               return (
                  <Column
                     key={el.data}
                     column={el}
                     data={newData}
                     setNewData={setNewData}
                     isColumnSelected={isColumnSelected}
                     setIsColumnSelected={setIsColumnSelected}
                  />
               );
            })}
         </div>
         {newData.length > 0 ? (
            <div className={styles.rowsContainer}>
               {newData.map((el: dataContent) => {
                  return (
                     <div key={el.id} className={styles.row}>
                        {columnsId.map((id) => {
                           return (
                              <div
                                 key={`${el.id}-${id}`}
                                 className={`${styles.item} ${id}`}
                              >
                                 {el[id]}
                              </div>
                           );
                        })}
                     </div>
                  );
               })}
            </div>
         ) : (
            <div className={styles.noData}>No data available in table</div>
         )}

         <div className={styles.info}>
            <div>Showing {data.length} entries</div>
            <div>Prev / Next</div>
         </div>
      </div>
   );
};
