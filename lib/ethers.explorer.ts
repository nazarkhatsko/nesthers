import { Injectable, OnModuleInit, Logger } from "@nestjs/common";
import { DiscoveryService, MetadataScanner } from "@nestjs/core";
import { InstanceWrapper } from "@nestjs/core/injector/instance-wrapper";
import { EthersOrchestrator } from "./ethers.orchestrator";
import { MetadataAccessor } from "./metadata.accessor";
import { ListnerType } from "./enums/listener-type.enum";

@Injectable()
export class EthersExplorer implements OnModuleInit {
  private readonly logger = new Logger(EthersExplorer.name);

  constructor(
    private readonly discoveryService: DiscoveryService,
    private readonly metadataScanner: MetadataScanner,
    private readonly ethersOrchestrator: EthersOrchestrator,
    private readonly metadataAccessor: MetadataAccessor,
  ) {}

  onModuleInit(): void {
    this.explore();
  }

  explore(): void {
    const instanceWrappers: InstanceWrapper[] = [
      ...this.discoveryService.getControllers(),
      ...this.discoveryService.getProviders(),
    ];

    for (const wrapper of instanceWrappers) {
      const { instance } = wrapper;

      if (!instance || !Object.getPrototypeOf(instance)) {
        return;
      }

      const processMethod = (name: string) =>
        wrapper.isDependencyTreeStatic()
          ? this.lookupListeners(instance, name)
          : this.warnForNonStaticProviders(wrapper, instance, name);

      // Remove this after dropping support for NestJS v9.3.2
      if (!Reflect.has(this.metadataScanner, "getAllMethodNames")) {
        this.metadataScanner.scanFromPrototype(
          instance,
          Object.getPrototypeOf(instance),
          processMethod,
        );
        return;
      }

      this.metadataScanner
        .getAllMethodNames(Object.getPrototypeOf(instance))
        .forEach(processMethod);
    }
  }

  private lookupListeners(instance: Record<string, Function>, key: string) {
    const methodRef = instance[key];
    const typeMetadata = this.metadataAccessor.getListenerTypeMetadata(methodRef);

    switch (typeMetadata) {
      case ListnerType.BLOCK: {
        const onBlockMetadata = this.metadataAccessor.getListenerOnBlockMetadata(methodRef);
        const wrapFunc = this.wrapFunctionInTryCatchBlock(methodRef, instance);

        return this.ethersOrchestrator.addOnBlock(wrapFunc, onBlockMetadata);
      }
      case ListnerType.EVENT: {
        const onEventMetadata = this.metadataAccessor.getListenerOnEventMetadata(methodRef);
        const wrapFunc = this.wrapFunctionInTryCatchBlock(methodRef, instance);

        return this.ethersOrchestrator.addOnEvent(wrapFunc, onEventMetadata);
      }
    }
  }

  private warnForNonStaticProviders(
    wrapper: InstanceWrapper<any>,
    instance: Record<string, Function>,
    key: string,
  ) {
    const methodRef = instance[key];
    const typeMetadata = this.metadataAccessor.getListenerTypeMetadata(methodRef);

    switch (typeMetadata) {
      case ListnerType.BLOCK: {
        this.logger.warn(
          `Cannot register BlockListener "${wrapper.name}@${key}" because it is defined in a non static provider.`,
        );
        break;
      }
      case ListnerType.EVENT: {
        this.logger.warn(
          `Cannot register EventListener "${wrapper.name}@${key}" because it is defined in a non static provider.`,
        );
        break;
      }
    }
  }

  private wrapFunctionInTryCatchBlock(methodRef: Function, instance: object) {
    return async (...args: unknown[]) => {
      try {
        await methodRef.call(instance, ...args);
      } catch (error) {
        this.logger.error(error);
      }
    };
  }
}
