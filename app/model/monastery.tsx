import { db } from "~/services/db.server";
import type { metaType } from "./meta";


export type monasteryType = {
  id: string;
  name: string;
  location?: string;
  meta?: metaType;
  metaId?: number;
  city?: string;
  image: string[];
};

export function getMonasteries() {
  try {
    let monastery = db.monastery.findMany();
    return monastery;
  } catch (e) {
    console.log(e);
  }
}

export function getMonastery(name: string) {
  try {
    let monastery = db.monastery.findFirst({
      where: {
        name,
      },
    });
    return monastery;
  } catch (e) {
    console.log(e);
  }
}


export function getMonasteryByCity(city: string) {
  try {
    let monastery = db.monastery.findMany({
      where: {
        city,
      },
    });
    return monastery;
  } catch (e) {
    console.log(e);
  }
}

export async function createMonastery(
  name: string,
  location: string,
  city: string,
  image: string
) {
  try {
    const res = db.monastery.create({
      data: {
        name: name,
        location: location,
        city: city,
        image: image,
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteMonastery(id: string) {
  try {
    await db.monastery.delete({
      where: { id },
    });
    console.log("Items deleted successfully.");
  } catch (e) {
    console.log(e);
  }
}