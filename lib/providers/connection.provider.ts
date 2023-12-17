import { Provider } from "@nestjs/common";
import { ConnectionOptions } from "../intefaces/connection-options.interface";
import { getConnectionToken } from "../utils/token.util";

export function getConnectionProvider(options: ConnectionOptions): Provider {
  return {
    provide: getConnectionToken(options.name),
    useFactory: () => options.instance,
  };
}
