import type { eventType } from "./event";
import type { monasteryType } from "./monastery";
import type { ownerType } from "./owner";
import type { restaurantType } from "./restaurant";


export type contactType = {
  id: number;
  name: string;
  mobile?: string;
  email?: string;
  website?: string;
  openingTime?: string;
  closingTime?: string;
  event: eventType[];
  monastery: monasteryType[];
  owner: ownerType[];
  restaurant: restaurantType[];
};
