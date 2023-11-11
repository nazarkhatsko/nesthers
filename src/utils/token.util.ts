export function getConnectionToken(name?: string): string {
  return name && name.slice(-10) === "Connection" ? name : `${name ?? ""}Connection`;
}

export function getWalletToken(name: string): string {
  return name.slice(-6) === "Wallet" ? name : `${name}Wallet`;
}

export function getContractToken(name: string): string {
  return name.slice(-8) === "Contract" ? name : `${name}Contract`;
}
