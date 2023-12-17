import { getMetadata, setMetadata } from "../utils/metadata.util";
import { ArgMetadata } from "../intefaces/arg-metadata.interface";
import { ETHERS_ARGS_KEY } from "../ethers.constants";

export function Arg<T>(key?: keyof T) {
  return function (target: any, propertyKey: string | symbol, parameterIndex: number) {
    const args = getMetadata<ArgMetadata<T>[]>(ETHERS_ARGS_KEY, target[propertyKey]) || [];
    args.push({ index: parameterIndex, key });
    setMetadata(ETHERS_ARGS_KEY, args, target[propertyKey]);
  };
}
