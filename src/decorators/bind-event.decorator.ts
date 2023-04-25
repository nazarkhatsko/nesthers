export function BindEvent(contract: string | any, event: string): MethodDecorator {
  return (target: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) => {
    // will be implemented ...
  };
}
