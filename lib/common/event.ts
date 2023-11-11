import { ethers } from "ethers";
import { EventOptions } from "../intefaces/event-options.interface";

export class Event extends ethers.EventLog {
  constructor(options: EventOptions) {
    super(options.log, options.iface, options.fragment);
  }
}
