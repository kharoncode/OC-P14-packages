import { data } from '../../DataTable';
import styles from './search.module.css';
import reset from '../../../../assets/icones/close.svg';

type props = {
   data: data;
   setNewData: React.Dispatch<React.SetStateAction<data>>;
};

const Search = (props: props) => {
   const { data, setNewData } = props;
   return (
      <div className={styles.container}>
         <label htmlFor="search">Search :</label>
         <input
            id="search"
            type="text"
            onChange={(e) => {
               const value = e.target.value;
               const newData = [...data].filter((el) =>
                  Object.keys(el).some((key) =>
                     el[key]
                        .toString()
                        .toLowerCase()
                        .includes(value.toString().toLowerCase())
                  )
               );
               if (value !== '') {
                  if (newData.length !== 0) {
                     setNewData(newData);
                  } else {
                     setNewData([]);
                  }
               } else {
                  setNewData(data);
               }
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
               setNewData(data);
            }}
         />
      </div>
   );
};

export default Search;
