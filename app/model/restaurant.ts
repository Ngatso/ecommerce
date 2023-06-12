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

export async function createRestaurant(
  name:string,
  location:string,
  city :string,
  menu:string,
) {
  try {
    const res = db.restaurant.create({
      data: {
        name: name,
        location: location,
        city: city,
        menu: menu,
        photos:[],
      },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function deleteAllSelection(restaurantIds) {
  try {
    await db.$transaction(
      restaurantIds.map((id) =>
        db.restaurant.delete({
          where: { id },
        })
      )
    );

    console.log("Items deleted successfully.");
  } catch (e) {
    console.log(e);
  }
}