import { useEffect, useState } from 'react';
import styles from './dataTable.module.css';
import Column from './components/column/Column';
import Search from './components/search/Search';
import backIcone from '../../assets/icones/back.svg';
import nextIcone from '../../assets/icones/next.svg';
import { UseStyle } from '../utils/useStyle';

export type dataContent = {
   [key: string]: number | string;
};

export type data = { [key: string]: dataContent };

export type column = { title: string; data: string };

export type columns = column[];

type props = {
   data: data;
   columns: columns;
   style?: {
      container?: { [key: string]: string };
      column?: { [key: string]: string };
      search?: { [key: string]: string };
   };
};

const columnSelected = (
   isColumnSelected: string,
   itemClassName: string,
   styleActiveItem: string
) => {
   const items_elts = document.querySelectorAll(`.${itemClassName}`);
   const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
   if (columnItem_elts) {
      items_elts.forEach((el) => el.classList.remove(styleActiveItem));
      columnItem_elts.forEach((el) => el.classList.add(styleActiveItem));
   }
};

export const DataTable = (props: props) => {
   const { data, columns, style } = props;
   const columnsId = columns.map((el) => el.data);
   const [dataList, setDataList] = useState(Object.keys(data));
   const [isColumnSelected, setIsColumnSelected] = useState('null');
   const [tableLength, setTableLength] = useState(10);
   const [page, setPage] = useState(1);
   const [classes, setclasses] = useState(styles);
   const maxEntriesCurrentPage = page * tableLength;

   UseStyle(style ? style.container : undefined, styles, classes, setclasses);

   useEffect(() => {
      columnSelected(isColumnSelected, classes.item_base, classes.activeItem);
   }, [isColumnSelected, classes]);

   useEffect(() => {
      const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
      if (columnItem_elts) {
         columnItem_elts.forEach((el) => el.classList.add(classes.activeItem));
      }
      /* eslint-disable */
   }, [page, dataList, tableLength]);
   /* eslint-enable */

   return (
      <div className={`${classes.container} ${classes.container_base}`}>
         <div className={classes.header_base}>
            <div className={classes.selectContainer_base}>
               <label htmlFor="showSelect">Show</label>
               <select
                  className={classes.selectContainer_select_base}
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
            <Search
               data={data}
               style={style ? style.search : undefined}
               setDataList={setDataList}
               setPage={setPage}
            />
         </div>
         <div className={classes.columnsContainer_base}>
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
                     style={style ? style.column : undefined}
                     activeItem={classes.activeItem}
                  />
               );
            })}
         </div>
         {dataList.length > 0 ? (
            <div
               className={`${classes.rowsContainer} ${classes.rowContainer_base}`}
            >
               {dataList
                  .slice((page - 1) * tableLength, maxEntriesCurrentPage)
                  .map((el: string) => {
                     return (
                        <div key={`${el}-row`} className={classes.row_base}>
                           {columnsId.map((id) => {
                              return (
                                 <div
                                    key={`${el}-${id}`}
                                    className={`${classes.item_base} ${classes.item} ${id}`}
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
            <div className={classes.noData}>No data available in table</div>
         )}

         <div className={classes.info_base}>
            {dataList.length === Object.keys(data).length ? (
               <div>
                  Showing{' '}
                  {dataList.length === 0
                     ? 0
                     : maxEntriesCurrentPage - (tableLength - 1)}{' '}
                  to{' '}
                  {maxEntriesCurrentPage > dataList.length
                     ? dataList.length
                     : maxEntriesCurrentPage}{' '}
                  of {Object.keys(data).length} entries
               </div>
            ) : (
               <div>
                  Showing{' '}
                  {dataList.length === 0
                     ? 0
                     : maxEntriesCurrentPage - (tableLength - 1)}{' '}
                  to{' '}
                  {maxEntriesCurrentPage > dataList.length
                     ? dataList.length
                     : maxEntriesCurrentPage}{' '}
                  of {dataList.length} entries (filtered from{' '}
                  {Object.keys(data).length} total entries)
               </div>
            )}

            {dataList.length > tableLength ? (
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

                  {[...Array(Math.ceil(dataList.length / tableLength))].map(
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
                  {page === Math.ceil(dataList.length / tableLength) ? (
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
      </div>
   );
};
