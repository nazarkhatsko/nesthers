export interface FilterArg<T> {
  index: number;
  key?: keyof T;
}

export function wrapFuncFilterArgs<T>(data: T, callback: Function, filterArgs: FilterArg<T>[]) {
  const params = [];

  const args = filterArgs.sort((a, b) => {
    if (a.index < b.index) return -1;
    if (a.index > b.index) return 1;
    return 0;
  });

  for (const { key } of args) {
    if (key) {
      params.push(data[key]);
    } else {
      params.push(data);
    }
  }

  callback(...params);
}
