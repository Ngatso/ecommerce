import { db } from "~/services/db.server";

export function getRestaurants() {
  try {
    let restaurant = db.restaurant.findMany();
    return restaurant;
  } catch (e) {
    console.log(e);
  }
}

export function getRestuarantsByCity(city: string) {
  try {
    let restaurant = db.restaurant.findMany({
      where: {
        city,
      },
    });
    return restaurant;
  } catch (e) {
    console.log(e);
  }
}
