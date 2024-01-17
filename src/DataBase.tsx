import styles from './dataBase.module.css';
type employee = {
   id: string;
   firstName: string;
   lastName: string;
   dateOfBirth: string;
   startDate: string;
   department: string;
   street: string;
   city: string;
   state: string;
   zipCode: number;
};

type employeeList = employee[];

type props = {
   employeeList: employeeList;
};

export const DataBase = (props: props) => {
   const { employeeList } = props;
   return (
      <div className={styles.container}>
         {employeeList.map((el: employee) => {
            return <div key={el.id}>First id : {el.id}</div>;
         })}
      </div>
   );
};
