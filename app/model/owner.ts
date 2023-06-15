import type { metaType } from "./meta";

export type ownerType = {
  id: string;
  name: string;
  qualification?: string;
  description?: string;
  image: string[];
  meta?: metaType;
  metaId?: number;
};
