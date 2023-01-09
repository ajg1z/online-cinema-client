export const getKeys = <T extends Record<string | number | symbol, any>>(
  obj: T,
) => Object.keys(obj) as Array<keyof T>;
