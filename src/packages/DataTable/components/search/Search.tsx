import { data } from '../../DataTable';
import styles from './search.module.css';
import reset from '../../../../assets/icones/close.svg';
import { ChangeEvent, useState } from 'react';

type props = {
   data: data;
   list: string[];
   setDataList: React.Dispatch<React.SetStateAction<string[]>>;
};

const Search = (props: props) => {
   const { data, setDataList } = props;
   const [tempData, setTempData] = useState(data);

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      const values = e.target.value;
      if (values !== '') {
         values.split(' ').map((value) => {
            const dataToFiltered = { ...data };
            const dataFiltered: data = {};
            const temp = Object.keys(dataToFiltered).filter((el) =>
               Object.keys(dataToFiltered[el]).some((key) =>
                  dataToFiltered[el][key]
                     .toString()
                     .toLowerCase()
                     .includes(value.toString().toLowerCase())
               )
            );
            temp.map((key) => {
               dataFiltered[key] = dataToFiltered[key];
            });
            setTempData(dataFiltered);
         });
         if (Object.keys(tempData).length !== 0) {
            setDataList(tempData);
         } else {
            setDataList({});
         }
      } else {
         setTempData(data);
         setDataList(data);
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
               setDataList(data);
            }}
         />
      </div>
   );
};

export default Search;
