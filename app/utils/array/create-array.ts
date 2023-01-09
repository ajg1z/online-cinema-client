export function createArray(length: number) {
  return new Array(length).fill(``).map((_, index) => index);
}
