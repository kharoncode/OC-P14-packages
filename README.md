# OC-P14-HRNet-Packages

## Table of Contents

-  [Installation](#installation)
-  [Modal](#modal)
-  [DataTable](#datatable)

## Instalation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install hrnet-packages
    $ yarn add hrnet-packages

## Style props use

Each package can be customised by applying your own className (ccs or module.css) to replace the default ones. There are several types of className:

-  name only: contains the design
-  base_name: contains the structure

By modifying only the className, you only affect the design of the element, without affecting the structure.

## Modal

### Props Type

    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: string | JSX.Element;
    customStyles?: { [key: string]: string };

### Prerequisites

before using the modal, add a useState

    const [ open, setOpen ]=useState(false)

and link setOpen(true) when you want to activate it

### Exemple

    import { Modal } from 'hrnet-packages';
    import { useState } from 'react';

    const MyElement () => {
        const [ open, setOpen ] = useState(false);

        return (
            <div>
                My Element
                <button onClick={()=>setOpen(true)}>Open Modal</button>
                <Modal open={open} setOpen={setOpen}/>
            </div>
        )

    }

    export default MyElement

### Style Keys

    container / container_base : container with blur effect (by default)
    modalContainer / modalContainer_base : modal's container
    closeButton / closeButton_base : close's button

    Exemplte :
    const style = {
        container: styles.yourContainer, (module.css)
        modalContainer: 'yourModalContainer' (css)
    }

## DataTable

### Props Type

    data: {[key:string]:{[key:string:string | number]}};
    columns: { title: string; data: string }[];
    customStyles?: {
      dataTable?: { [key: string]: string };
      column?: { [key: string]: string };
      search?: { [key: string]: string };
    };

data : these are the data to be displayed in the table.
columns : these are the titles of the columns in your table and the elements to which they are linked.
customStyles : the className you wish to apply to the elements of each component

### Exemples

    const data = {
        parker_250427062000: {
            id: "peter_250427062000",
            firstName: "Peter",
            lastName: "Parker",
            dateOfBirth: "1/06/1996",
            startDate: "7/06/2017",
            department: "Marketing",
            street: "20 Ingram Street",
            city: "New York",
            state: "NY",
            zipCode: "10001"
        },
        banner_250427062000: {
            id: "banner_250427062000",
            firstName: "Bruce",
            lastName: "Banner",
            dateOfBirth: "22/11/1967",
            startDate: "11/04/2012",
            department: "Engineering",
            street: "20 Ingram Street",
            city: "New York",
            state: "NY",
            zipCode: "10001"
        },
    }

    const columns = [
        { title: 'First Name', data: 'firstName' },
        { title: 'Last Name', data: 'lastName' },
        { title: 'Start Date', data: 'startDate' },
        { title: 'Department', data: 'department' },
        { title: 'Date of Birth', data: 'dateOfBirth' },
        { title: 'Street', data: 'street' },
        { title: 'City', data: 'city' },
        { title: 'State', data: 'state' },
        { title: 'Zip Code', data: 'zipCode' },
    ]

    const style = {
        dataTable: {container:'yourDataTableContainer'},
        search:{searchInput:styles.yourSearchInput}
    }

### Style Keys

    container : container's style
    container_base : containre's structure
    columnsContainer : container of all column's title cells
    rowsContainer : container of all rows
