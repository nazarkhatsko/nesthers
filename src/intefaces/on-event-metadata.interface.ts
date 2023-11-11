import { OnEventOptions } from "./on-event-options.interface";
import { ArgMetadata } from "./arg-metadata.interface";
import { Event } from "../common/event";

export interface OnEventMetadata {
  options: OnEventOptions;
  args: ArgMetadata<keyof Event>[];
}
