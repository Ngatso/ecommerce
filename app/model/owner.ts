import type { contactType } from "./contact";

export type ownerType = {
  id: string;
  name: string;
  qualification?: string;
  description?: string;
  image: string[];
  contact?: contactType;
  contactId?: number;
};
