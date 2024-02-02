![Static Badge](https://img.shields.io/badge/Author-Collin_R%C3%A9mi-blue)

[![npm version](https://badge.fury.io/js/hrnet-packages.svg)](https://badge.fury.io/js/hrnet-packages)

# OC-P14-HRNet-Packages

## Table of Contents

-  [Introduction](#introduction)
-  [Installation](#installation)
-  [Modal](#modal)
-  [DataTable](#datatable)

## Introduction

HRNet Packages is a set of packages used by the HRNet application, which is an application that manages employee files.

It currently contains two components:

-  Modal: displays a modal containing text or an element/component

-  DataTable: displays data in the form of a table. Offers the option of sorting the elements of the table in ascending/descending order according to the category indicated at the head of the column, of performing a search to filter the elements present, and of choosing the quantity of data to be displayed per page.

## Instalation

To install, you can use [npm](https://npmjs.org/) or [yarn](https://yarnpkg.com):

    $ npm install --save hrnet-packages
    $ yarn add hrnet-packages

## Using style props

Each package can be customised by applying your own className (ccs or module.css) to replace the default ones. There are two types of className:

-  className : contains the design
-  className_base: contains the structure (Modifying it may have an impact on the architecture of the element. Do it carefully)

By modifying only the className, you only affect the design of the element, without affecting the structure.

## Modal

### Props Type

```ts
open: boolean;
setOpen: React.Dispatch<React.SetStateAction<boolean>>;
children: string | JSX.Element;
style?: { [key: string]: string }; (optional)
```

-  open / setOpen : boolean state
-  children : what you want to display
-  style (optional) : the className you wish to apply to the elements

### Prerequisites

before using the modal, add a useState

```js
const [open, setOpen] = useState(false);
```

and link setOpen(true) when you want to activate it

### Exemple

```js
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
```

### Style Keys

-  container / container_base : container with blur effect (by default)
-  modalContainer / modalContainer_base : modal's container
-  closeButton / closeButton_base : close's button

Exemple :

```js
const yourModalStyles = {
   container: styles.yourContainer, (module.css)
   modalContainer: 'yourModalContainer' (css)
}
```

## DataTable

### Props Type

```ts
data: {[key:string]:{[key:string:string | number]}};
columns: { title: string; data: string }[];
style?: {
    dataTable?: { [key: string]: string };
    column?: { [key: string]: string };
    search?: { [key: string]: string };
    pageList?: { [key: string]: string };
    tableInfo?: { [key: string]: string };
};
```

-  data : these are the data to be displayed in the table.
-  columns : these are the titles of the columns in your table and the elements to which they are linked.
-  style (optional) : the className you wish to apply to the elements of each component

### Exemples

```js
const data = {
   parker_250427062000: {
      id: 'peter_250427062000',
      firstName: 'Peter',
      lastName: 'Parker',
      dateOfBirth: '1/06/1996',
      startDate: '7/06/2017',
      department: 'Marketing',
      street: '20 Ingram Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
   },
   banner_250427062000: {
      id: 'banner_250427062000',
      firstName: 'Bruce',
      lastName: 'Banner',
      dateOfBirth: '22/11/1967',
      startDate: '11/04/2012',
      department: 'Engineering',
      street: '20 Ingram Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
   },
};
```

```js
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
];
```

```js
const yourDataTableStyles = {
   dataTable: { container: 'yourDataTableContainer', cell: styles.yourCell },
   search: { searchInput: styles.yourSearchInput },
};
```

### Style Keys

-  dataTable :
   -  container / container_base : container
   -  header_base : contains the select for the number of data items displayed per page and the input search
   -  selectContainer_base : label and input of the select
   -  selectContainer_select_base : select element
   -  columnsContainer_base : contains all the column headers
   -  noData : text displayed when there is no data
   -  rowContainer / rowContainer_base : contains all rows
   -  row / row_base(alone or :hover or :nth-child) : affect all rows
   -  cell / cell_base : affects all cells except those in the column header
   -  footer_base : contains an indication of the number of elements contained and displayed in the table and page number
   -  activeCell : cells linked to the selected column
-  column :
   -  cell / cell_base(alone or :hover) : all cells in the column header
   -  arrow : affect all arrows
   -  inactiveArrow : only double arrows
   -  arrowsContainer_base : contain arrow when the column is selected
-  search :
   -  container_base : component's container
   -  searchInput / searchInput_base : input
   -  resetButton / resetButton_base : reset button
-  pageList :
   -  pagesList_base : contains page numbers and scrolling arrows
   -  arrowIcone(alone or :hover) : scrolling arrows
   -  pageButton : page buttons
   -  activePage (alone or :hover) : page selected
-  tableInfo :
   -  container / container_base : all the text
   -  number : only the numbers
