export type style = {
   container?: {
      container?: string;
      container_base?: string;
      header?: string;
      header_base?: string;
      selectContainer_base?: string;
      selectContainer_select_base?: string;
      columnsContainer_base?: string;
      noData?: string;
      rowContainer?: string;
      row?: string;
      cell?: string;
      cell_base?: string;
      footer_base?: string;
      activeCell?: string;
   };
   column?: {
      cell?: string;
      cell_base?: string;
      arrow?: string;
      inactiveArrow?: string;
      arrowsContainer_base?: string;
   };
   search?: {
      container_base?: string;
      searchInput?: string;
      searchInput_base?: string;
      resetButton?: string;
      resetButton_base?: string;
   };
   pageList?: {
      pagesList_base?: string;
      arrowIcone?: string;
      pageButton?: string;
      activePage?: string;
   };
   tableInfo?: {
      container?: string;
      container_base?: string;
      number?: string;
   };
};
