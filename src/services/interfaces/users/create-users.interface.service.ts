export interface ICreateUserService<T> {
  execute(payload: T): Promise<T>;
}
