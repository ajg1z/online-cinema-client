export function isArrayString(value: any) {
  if (
    value &&
    Array.isArray(value) &&
    value.every((el) => typeof el === `string`)
  )
    return true;
  return false;
}
