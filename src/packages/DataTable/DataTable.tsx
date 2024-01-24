import { useEffect, useState } from 'react';
import './dataTable.css';
import styles from './dataTable.module.css';
import Column from './components/column/Column';
import Search from './components/search/Search';
import backIcone from '../../assets/icones/back.svg';
import nextIcone from '../../assets/icones/next.svg';

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

const columnSelected = (isColumnSelected: string) => {
   const items_elts = document.querySelectorAll(`.${styles.item}`);
   const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
   if (columnItem_elts) {
      items_elts.forEach((el) => el.classList.remove(`active`));
      columnItem_elts.forEach((el) => el.classList.add(`active`));
   }
};

export const DataTable = (props: props) => {
   const { data, columns } = props;
   const columnsId = columns.map((el) => el.data);
   const [dataList, setDataList] = useState(Object.keys(data));
   const [isColumnSelected, setIsColumnSelected] = useState('null');
   const [tableLength, setTableLength] = useState(10);
   const [page, setPage] = useState(1);

   useEffect(() => {
      columnSelected(isColumnSelected);
   }, [isColumnSelected]);

   useEffect(() => {
      const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
      if (columnItem_elts) {
         columnItem_elts.forEach((el) => el.classList.add(`active`));
      }
      /* eslint-disable */
   }, [page, dataList]);

   return (
      <div className={styles.container}>
         <div className={styles.headerContainer}>
            <div className={styles.selectContainer}>
               <label htmlFor="showSelect">Show</label>
               <select
                  name="showSelect"
                  id="showSelect"
                  onChange={(e) => setTableLength(Number(e.target.value))}
               >
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
               </select>
               entries
            </div>
            <Search data={data} setDataList={setDataList} setPage={setPage} />
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
               {dataList
                  .slice((page - 1) * tableLength, page * tableLength)
                  .map((el: string) => {
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
            {dataList.length === Object.keys(data).length ? (
               <div>
                  Showing{' '}
                  {dataList.length === 0
                     ? 0
                     : page * tableLength - (tableLength - 1)}{' '}
                  to{' '}
                  {page * tableLength > dataList.length
                     ? dataList.length
                     : page * tableLength}{' '}
                  of {Object.keys(data).length} entries
               </div>
            ) : (
               <div>
                  Showing{' '}
                  {dataList.length === 0
                     ? 0
                     : page * tableLength - (tableLength - 1)}{' '}
                  to{' '}
                  {page * tableLength > dataList.length
                     ? dataList.length
                     : page * tableLength}{' '}
                  of {dataList.length} entries (filtered from{' '}
                  {Object.keys(data).length} total entries)
               </div>
            )}

            {dataList.length > tableLength ? (
               <div className={styles.pagesList}>
                  {page === 1 ? (
                     <></>
                  ) : (
                     <img
                        src={backIcone}
                        alt="Prev"
                        onClick={() => {
                           setPage(page - 1);
                        }}
                     />
                  )}

                  {[...Array(Math.ceil(dataList.length / tableLength))].map(
                     (_e, i) => {
                        return (
                           <button
                              className={`${styles.pageButton} ${
                                 page === i + 1 ? styles.activePage : ''
                              }`}
                              key={i}
                              onClick={() => setPage(i + 1)}
                           >
                              {i + 1}
                           </button>
                        );
                     }
                  )}
                  {page === Math.ceil(dataList.length / tableLength) ? (
                     <></>
                  ) : (
                     <img
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
      </div>
   );
};
