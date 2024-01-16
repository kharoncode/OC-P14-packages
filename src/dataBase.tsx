type dataType = {
   name: string;
};

export const DataBase = (data: dataType) => {
   const { name } = data;
   return <div>Data Base : {name}</div>;
};
