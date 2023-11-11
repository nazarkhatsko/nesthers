import { Inject } from "@nestjs/common";
import { getContractToken } from "../utils/token.util";

export function InjectContract(name: string) {
  return Inject(getContractToken(name));
}
