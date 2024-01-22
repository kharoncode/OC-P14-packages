import { data } from '../../DataTable';
import styles from './search.module.css';

type props = {
   data: data;
   setNewData: React.Dispatch<React.SetStateAction<data>>;
};

const Search = (props: props) => {
   const { data, setNewData } = props;
   return (
      <div className={styles.container}>
         <label htmlFor="fitler">Search :</label>
         <input
            id="filter"
            type="text"
            onChange={(e) => {
               const newData = [...data].filter((el) =>
                  Object.keys(el).some((key) =>
                     el[key]
                        .toString()
                        .toLowerCase()
                        .includes(e.target.value.toString().toLowerCase())
                  )
               );
               if (newData.length !== 0) {
                  setNewData(newData);
               } else {
                  setNewData(data);
               }
            }}
         />
      </div>
   );
};

export default Search;
