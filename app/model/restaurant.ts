import { City } from "@prisma/client";
import { db } from "~/services/db.server";


export type restaurantType = {
  id: string;
  name: string;
  type?: string;
  description?: string;
  opening?: string;
  contactPhone?: string;
  contactEmail?: string;
  thumbnail?: string;
  photos: string[];
  area?: string;
  city?: City;
  state?: string;
  menuLink?: string;
  website?: string;
  latitude?: number;
  longitude?: number;
};
export function getRestaurants() {
  try {
    let restaurants = db.restaurant.findMany();
    return restaurants;
  } catch (e) {
    return [];
  }
}
export function getRestaurant(name:string) {
  try {
    let restaurant = db.restaurant.findUnique(
      {
        where: {
          name,
        }
      }
    );
    return restaurant;
  } catch (e) {
    return [];
  }
}
export function getRestuarantsByCity(city: City) {
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
  city :string,
  menu:string,
) {
  try {
    const res = db.restaurant.create({
      data: {
        name: name,
        city: city,
        menu_link:menu,
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