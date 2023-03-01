export interface IUpdateUserService<T> {
  execute(id: string, payload: T): Promise<T>;
}
