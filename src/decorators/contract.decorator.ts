export interface ContractOptions {
  name: string;
  address: string | (() => string);
  abi: object[] | (() => object[]);
}

export function Contract(options: ContractOptions) {
  return (constructor: Function) => {
    // will be implemented ...
  };
}
