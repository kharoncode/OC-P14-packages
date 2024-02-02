import { useState } from 'react';
import styles from './tableInfo.module.css';
import { UseStyle } from '../../../utils/useStyle';

type props = {
   dataListLength: number;
   dataLength: number;
   tableLength: number;
   maxEntriesCurrentPage: number;
   style: CSSModuleClasses | undefined;
};

const plural = (length: number, world: string) => {
   const content = length > 1 ? `${world}s` : world;
   return content;
};

const TableInfo = (props: props) => {
   const {
      dataListLength,
      dataLength,
      tableLength,
      maxEntriesCurrentPage,
      style,
   } = props;
   const [classes, setclasses] = useState(styles);
   UseStyle(style ? style : undefined, styles, classes, setclasses);

   return (
      <div className={`${classes.container} ${classes.container_base}`}>
         <p>Showing</p>
         <span className={classes.number}>
            {dataListLength === 0
               ? 0
               : maxEntriesCurrentPage - (tableLength - 1)}
         </span>
         <p>to</p>
         <span className={classes.number}>
            {maxEntriesCurrentPage > dataListLength
               ? dataListLength
               : maxEntriesCurrentPage}
         </span>
         <p>of</p>
         {dataListLength === dataLength ? (
            <div className={classes.container_base}>
               <span className={classes.number}>{dataLength}</span>{' '}
               <p>{plural(dataLength, 'entrie')}</p>
            </div>
         ) : (
            <div className={classes.container_base}>
               <span className={classes.number}>{dataListLength}</span>{' '}
               <p>{plural(dataListLength, 'entrie')} (filtered from</p>{' '}
               <span className={classes.number}>{dataLength}</span>{' '}
               <p>total {plural(dataLength, 'entrie')})</p>
            </div>
         )}
      </div>
   );
};

export default TableInfo;
