import { useEffect, useState } from 'react';
import styles from './dataTable.module.css';
import Column from './components/column/Column';
import Search from './components/search/Search';
import { UseStyle } from '../utils/useStyle';
import PageList from './components/pageList/PageList';
import TableInfo from './components/tableInfo/TableInfo';
import { style } from './styleType';

export type data = {
   [key: string]: {
      [key: string]: number | string;
   };
};

export type column = { title: string; data: string };

type props = {
   data: data;
   columns: column[];
   style?: style;
};

const columnSelected = (
   isColumnSelected: string,
   cellClassName: string,
   styleActiveCell: string
) => {
   const cells_elts = document.querySelectorAll(`.${cellClassName}`);
   const columnCell_elts = document.querySelectorAll(`.${isColumnSelected}`);
   if (columnCell_elts) {
      cells_elts.forEach((el) => el.classList.remove(styleActiveCell));
      columnCell_elts.forEach((el) => el.classList.add(styleActiveCell));
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
      columnSelected(isColumnSelected, classes.cell_base, classes.activeCell);
   }, [isColumnSelected, classes]);

   useEffect(() => {
      const columnCell_elts = document.querySelectorAll(`.${isColumnSelected}`);
      if (columnCell_elts) {
         columnCell_elts.forEach((el) => el.classList.add(classes.activeCell));
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
                  onChange={(e) => {
                     setTableLength(Number(e.target.value));
                     setPage(1);
                  }}
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
                     activeCell={classes.activeCell}
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
                                    className={`${classes.cell_base} ${classes.cell} ${id}`}
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

         <div className={classes.footer_base}>
            <TableInfo
               dataListLength={dataList.length}
               dataLength={Object.keys(data).length}
               tableLength={tableLength}
               maxEntriesCurrentPage={maxEntriesCurrentPage}
               style={style ? style.tableInfo : undefined}
            />
            <PageList
               dataListLength={dataList.length}
               tableLength={tableLength}
               page={page}
               setPage={setPage}
               style={style ? style.pageList : undefined}
            />
         </div>
      </div>
   );
};
