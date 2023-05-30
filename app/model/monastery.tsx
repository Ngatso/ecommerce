import { db } from "~/services/db.server";

export function getMonastery() {
  try {
    let monastery = db.monastery.findMany();
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
