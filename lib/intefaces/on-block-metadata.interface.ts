import { OnBlockOptions } from "./on-block-options.interface";
import { ArgMetadata } from "./arg-metadata.interface";
import { Block } from "../common/block";

export interface OnBlockMetadata {
  options: OnBlockOptions;
  args: ArgMetadata<keyof Block>[];
}
