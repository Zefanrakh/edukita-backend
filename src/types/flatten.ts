import { Assignment } from "../entities/assignment";

type ObjectPath<
  T,
  P extends string = "",
  Depth extends unknown[] = []
> = Depth["length"] extends 10
  ? P
  : T extends object
  ? {
      [K in keyof T]: K extends string
        ? ObjectPath<
            T[K],
            `${P}${P extends "" ? "" : "."}${K}`,
            [...Depth, unknown]
          >
        : never;
    }[keyof T]
  : P;

export type Flatten<T, P extends string = ""> = Record<
  ObjectPath<T, P>,
  string
>;
