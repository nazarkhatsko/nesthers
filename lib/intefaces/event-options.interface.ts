import { ethers } from "ethers";

export interface EventOptions {
  log: ethers.Log;
  iface: ethers.Interface;
  fragment: ethers.EventFragment;
}
