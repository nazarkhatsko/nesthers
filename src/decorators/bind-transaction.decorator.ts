export function BindTransaction(contract: string | any, action: string) {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // will be implemented ...
  };
}
