export function createArrToNum(number: number) {
  const arr: number[] = [];
  for (let i = 1; i <= number; i++) {
    arr.push(i);
  }
  return arr;
}

export function isOdd(number: number): boolean {
  return Boolean(number % 2);
}
