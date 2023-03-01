export interface ResultListModel<T> {
  data: Array<T>;
  count: number;
}
export interface ResultModel<T> {
  data: T | null;
}

export class RequestModel<T> {
  constructor() {}
  body: T;
}
