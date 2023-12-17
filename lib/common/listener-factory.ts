import { ListnerType } from "../enums/listener-type.enum";
import { IListener } from "../intefaces/ilistener.interface";
import { BlockListener } from "../listeners/block.listener";
import { EventListener } from "../listeners/event.listener";

export class ListnerFactory {
  static createListener(type: ListnerType, options: any): IListener {
    switch (type) {
      case ListnerType.BLOCK: {
        return new BlockListener(options);
      }
      case ListnerType.EVENT: {
        return new EventListener(options);
      }
    }
  }
}
