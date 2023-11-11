export function getMetadata<T>(key: string, target: any): T {
  const isObject = typeof target === "object" ? target !== null : typeof target === "function";
  return isObject ? Reflect.getMetadata(key, target) : undefined;
}

export function setMetadata(key: string, value: any, target: any) {
  Reflect.defineMetadata(key, value, target);
}
