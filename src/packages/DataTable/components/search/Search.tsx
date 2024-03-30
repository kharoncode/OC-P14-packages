import { data } from '../../DataTable';
import styles from './search.module.css';
import reset from '../../../../assets/icones/close.svg';
import { ChangeEvent, useState } from 'react';
import { UseStyle } from '../../../utils/useStyle';

type props = {
   data: data;
   style: CSSModuleClasses | undefined;
   setDataList: React.Dispatch<React.SetStateAction<string[]>>;
   setPage: React.Dispatch<React.SetStateAction<number>>;
};

const Search = (props: props) => {
   const { data, style, setDataList, setPage } = props;
   const [classes, setclasses] = useState(styles);
   const list = Object.keys(data);

   UseStyle(style ? style : undefined, styles, classes, setclasses);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let tempList = list; /*List to be displayed in the table*/
      const values = e.target.value;
      if (values !== '') {
         values.split(' ').map((value) => {
            /*new list created for a word*/
            const temp = list.filter((el) =>
               Object.values(data[el]).some((val) =>
                  val
                     .toString()
                     .toLowerCase()
                     .includes(value.toString().toLowerCase())
               )
            );
            const newList: string[] = [];
            /*keep only the elements in common between the original list and the list resulting from the search for a word*/
            tempList.map((el) => {
               temp.map((tempEl) => {
                  if (el === tempEl) {
                     newList.push(el);
                  }
               });
            });

            tempList = newList;
         });
         setPage(1);
         setDataList(tempList);
      } else {
         tempList = list;
         setDataList(list);
      }
   };

   return (
      <div className={classes.container_base}>
         <label htmlFor="search">Search :</label>
         <input
            id="search"
            className={`${classes.searchInput} ${classes.searchInput_base}`}
            type="text"
            onChange={(e) => {
               handleChange(e);
            }}
         />
         <img
            className={`${classes.resetButton_base} ${classes.resetButton}`}
            src={reset}
            alt=""
            onClick={() => {
               const searchInput_elt = document.getElementById(
                  'search'
               ) as HTMLInputElement;
               searchInput_elt.value = '';
               setDataList(list);
            }}
         />
      </div>
   );
};

export default Search;
