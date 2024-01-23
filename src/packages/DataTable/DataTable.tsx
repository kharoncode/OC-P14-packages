import { useState } from 'react';
import styles from './dataTable.module.css';
import Column from './components/column/Column';
import Search from './components/search/Search';

export type dataContent = {
   [key: string]: number | string;
};

export type data = { [key: string]: dataContent };

export type column = { title: string; data: string };

export type columns = column[];

type props = {
   data: data;
   columns: columns;
};

export const DataTable = (props: props) => {
   const { data, columns } = props;
   const columnsId = columns.map((el) => el.data);
   const [dataList, setDataList] = useState(Object.keys(data));
   const [isColumnSelected, setIsColumnSelected] = useState(columns[0].data);

   return (
      <div className={styles.container}>
         <div className={styles.headerContainer}>
            <div className={styles.selectContainer}>
               <label htmlFor="showSelect">Show</label>
               <select name="showSelect" id="showSelect">
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
               </select>
               entries
            </div>
            <Search
               data={data}
               list={Object.keys(data)}
               setDataList={setDataList}
            />
         </div>
         <div className={styles.columnsContainer}>
            {columns.map((el: column) => {
               return (
                  <Column
                     key={el.data}
                     column={el}
                     data={data}
                     list={dataList}
                     setDataList={setDataList}
                     isColumnSelected={isColumnSelected}
                     setIsColumnSelected={setIsColumnSelected}
                  />
               );
            })}
         </div>
         {dataList.length > 0 ? (
            <div className={styles.rowsContainer}>
               {dataList.map((el: string) => {
                  return (
                     <div key={`${el}-row`} className={styles.row}>
                        {columnsId.map((id) => {
                           return (
                              <div
                                 key={`${el}-${id}`}
                                 className={`${styles.item} ${id}`}
                              >
                                 {data[el][id]}
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
            <div>Showing {Object.keys(data).length} entries</div>
            <div>Prev / Next</div>
         </div>
      </div>
   );
};
