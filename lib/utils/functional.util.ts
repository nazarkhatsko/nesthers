export type Functional<T> = {
  [K in keyof T]: T[K] | (() => T[K]);
};

export type NonFunctional<T> = {
  [K in keyof T]: T[K] extends () => infer R ? R : T[K];
};

export const getFunctionalParams = <T extends any>(params: Functional<T>): NonFunctional<T> => {
  const newParams: any = {};
  for (const key in params) {
    const value = params[key];
    if (typeof value === "function") {
      newParams[key] = value();
    } else {
      newParams[key] = value;
    }
  }
  return newParams;
};
