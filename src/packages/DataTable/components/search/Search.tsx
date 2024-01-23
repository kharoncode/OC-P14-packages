import { data } from '../../DataTable';
import styles from './search.module.css';
import reset from '../../../../assets/icones/close.svg';
import { ChangeEvent } from 'react';

type props = {
   data: data;
   list: string[];
   setDataList: React.Dispatch<React.SetStateAction<string[]>>;
};

const Search = (props: props) => {
   const { data, list, setDataList } = props;

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      let tempList = [...list];
      const values = e.target.value;
      if (values !== '') {
         values.split(' ').map((value) => {
            const temp = [...list].filter((el) =>
               Object.values(data[el]).some((val) =>
                  val
                     .toString()
                     .toLowerCase()
                     .includes(value.toString().toLowerCase())
               )
            );
            const newList: string[] = [];
            tempList.map((el) => {
               temp.map((tempEl) => {
                  if (el === tempEl) {
                     newList.push(el);
                  }
               });
            });

            tempList = [...newList];
         });
         setDataList(tempList);
      } else {
         tempList = [...list];
         setDataList(list);
      }
   };

   return (
      <div className={styles.container}>
         <label htmlFor="search">Search :</label>
         <input
            id="search"
            type="text"
            onChange={(e) => {
               handleChange(e);
            }}
         />
         <img
            className={styles.reset}
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
