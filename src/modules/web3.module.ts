import { Global, Module, DynamicModule } from "@nestjs/common";
import { Web3ModuleOptions, Web3ModuleAsyncOptions } from "src/intefaces/web3.interface";

@Global()
@Module({})
export class Web3Module {
  static forRoot(options: Web3ModuleOptions | Web3ModuleOptions[]): DynamicModule {
    return {
      module: Web3Module,
    };
  }

  static forRootAsync(options: Web3ModuleAsyncOptions | Web3ModuleAsyncOptions[]): DynamicModule {
    return {
      module: Web3Module,
    };
  }
}
