export type PropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];
export type Properties<T> = Pick<T, PropertyNames<T>>;
type DefaultOmit = 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'isDeleted' | 'update';
export type UpdateEntityArgs<T, O extends keyof Omit<T, DefaultOmit>> = Partial<
  Omit<Properties<T>, DefaultOmit | O>
>;
