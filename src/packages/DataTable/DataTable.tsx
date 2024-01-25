import { useEffect, useState } from 'react';
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
   style?: { [key: string]: string };
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
   const [className, setClassName] = useState(styles);
   const maxEntriesCurrentPage = page * tableLength;

   useEffect(() => {
      columnSelected(isColumnSelected, className.item, className.activeItem);
   }, [isColumnSelected, className]);

   useEffect(() => {
      const columnItem_elts = document.querySelectorAll(`.${isColumnSelected}`);
      if (columnItem_elts) {
         columnItem_elts.forEach((el) =>
            el.classList.add(className.activeItem)
         );
      }
      /* eslint-disable */
   }, [page, dataList]);
   /* eslint-enable */

   useEffect(() => {
      if (style) {
         const newStyle: { [key: string]: string } = {};
         Object.keys(className).map((key) => {
            newStyle[key] = style[key] ? style[key] : styles[key];
         });
         setClassName(newStyle);
      }
   }, [style, className]);

   return (
      <div className={`${className.container} ${className.container_base}`}>
         <div className={className.header}>
            <div className={className.selectContainer}>
               <label htmlFor="showSelect">Show</label>
               <select
                  className={className.selectContainer_select}
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
         <div className={className.columnsContainer}>
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
                     styles={className}
                  />
               );
            })}
         </div>
         {dataList.length > 0 ? (
            <div
               className={`${className.rowsContainer} ${className.rowContainer_base}`}
            >
               {dataList
                  .slice((page - 1) * tableLength, maxEntriesCurrentPage)
                  .map((el: string) => {
                     return (
                        <div key={`${el}-row`} className={className.row}>
                           {columnsId.map((id) => {
                              return (
                                 <div
                                    key={`${el}-${id}`}
                                    className={`${className.item} ${id}`}
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
            <div className={className.noData}>No data available in table</div>
         )}

         <div className={className.info}>
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
               <div className={className.pagesList}>
                  {page === 1 ? (
                     <></>
                  ) : (
                     <img
                        className={className.arrowIcone}
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
                              className={`${className.pageButton} ${
                                 page === i + 1 ? className.activePage : ''
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
                        className={className.arrowIcone}
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
