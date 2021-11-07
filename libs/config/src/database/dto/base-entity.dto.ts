export type PropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type Properties<T> = Pick<T, PropertyNames<T>>;
export type UpdateEntityArgs<T> = Partial<
  Omit<Properties<T>, 'createdAt' | 'updatedAt' | 'deletedAt'>
>;
