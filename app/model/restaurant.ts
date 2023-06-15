import { db } from "~/services/db.server";
import { metaType } from "./meta";


export type restaurantType = {
  id: string;
  name: string;
  photos: string[];
  location?: string;
  city?: string;
  menu: string;
  meta?: metaType;
  metaId?: number;
};

export function getRestaurants() {
  try {
    let restaurants = db.restaurant.findMany();
    return restaurants;
  } catch (e) {
    return [];
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

export async function deleteRestaurant(id:string) {
  try {
    await
        db.restaurant.delete({
          where: { id },
        })
      

    console.log("Items deleted successfully.");
  } catch (e) {
    console.log(e);
  }
}