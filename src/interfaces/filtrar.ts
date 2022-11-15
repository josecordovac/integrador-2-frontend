import { NavigateFunction } from "react-router-dom";
import { HeadTable, Pagination } from "./headTable";

export interface FiltrarProps<T> {
  headTable: HeadTable[];
  ruta: string; 
  tableName: string; 
  fields: JSX.Element;
  resultListTable: T[];
  functionSearchTable( rowsPerPage: number, page: number):void;
  clearData():void;
  pagination: Pagination;
};

export interface TbRegistroProps<T> {
  headTable: HeadTable[];
  ruta: string; 
  tableName: string; 
  navigator: NavigateFunction;
  resultListTable: T[];
  pagination: Pagination;
  onChangePage(ev: any, page: any):void;
  onChangeRow(ev: any):void;
}

// interface FiltrarProps<T, Y> {
//   headTable: HeadTable[];
//   ruta: string; 
//   tableName: string; 
//   data: T;
//   setData: React.Dispatch<React.SetStateAction<T>> 
//   fields: JSX.Element;
//   listProyect: Y[];
// };

// interface TbRegistroProps<T, Y> {
//   headTable: HeadTable[];
//   ruta: string; 
//   tableName: string; 
//   data: T;
//   navigator: NavigateFunction;
//   listProyect: Y[];
// }