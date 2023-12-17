import { ethers } from "ethers";

export interface OnEventOptions {
  address: ethers.AddressLike;
  topics?: ethers.TopicFilter;
}
