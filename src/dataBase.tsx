type employee = {
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
   console.log(employeeList);
   return <div></div>;
};
