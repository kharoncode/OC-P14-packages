# OC-P14-HRNet-Packages

## Table of Contents

-  [Installation](#installation)
-  [Modal](#modal)
-  [DataTable](#datatable)

## Instalation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install hrnet-packages
    $ yarn add hrnet-packages

## Modal

### Props Type

    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    children: string | JSX.Element;
    style?: { [key: string]: string };

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

    container : container with blur effect (by default)
    modalContainer : modal's container
    closeButton : close's button

    Exemplte :
    const style = {
        container: 'container' or styles.container
    }

## DataTable

### Props Type

    data: {[key:string]:{[key:string:string | number]}};
    columns: { title: string; data: string }[];
    style?: { [key: string]: string };

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
        container: 'container' or styles.container
    }

### Style Keys

    container : container's style
    container_base : containre's structure
    columnsContainer : container of all column's title cells
    rowsContainer : container of all rows
