export interface Results  {
  dataList: object[] | [];
  dataObject: object[] | [];
  message: string | undefined;
  ok: boolean;
  err: string | undefined;
  total: number;
}

export interface Config {
  url: string;
  queryId: number;  
  params?: object;
  fnOk(params: any):void;
  fnError?(params: any):void;
  StartRow?: number;
  EndRow?: number,
}