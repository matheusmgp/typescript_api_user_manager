export interface IPagination {
  skip: number;
  limit: number;
  filter?: string | undefined | null;
}
export interface IParams {
  id: string;
}
