import { Inject } from "@nestjs/common";
import { getConnectionToken } from "../utils/token.util";

export function InjectConnection(name?: string) {
  return Inject(getConnectionToken(name));
}
