import { Contract } from "src";

@Contract({
  name: "Chess",
  address: "0xf8d6e0586b0a20c7350a3b2780f5ae6a50820d2f",
  abi: require("./Chess-abi.json"),
})
export class ChessContract {}
