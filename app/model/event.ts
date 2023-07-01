import { City } from "@prisma/client";
import { db } from "~/services/db.server";

export type eventType = {
  id: string;
  title: string;
  description?: string;
  poster: string;
  venue?: string;
  area?: string;
  city?: string;
  state?: string;
  date?: Date;
  duration?: string;
  registerUrl?: string;
};



export async function getEvents() {
  try {
    const res = await db.event.findMany();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function getEventsByCity(city:City) {
  try {
    const res = await db.event.findMany({
      where:{city}
    });
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function getEvent(title: string) {
  try {
    const res = db.event.findUnique({
      where: { title },
    });
    return res;
  } catch (e) {
    console.log(e);
  }
 }

export async function createEvent(title,description,city,venue,date,registerUrl,imageUrl,area,state,duration) {
  try {
    const res = db.event.create({
      data: {
        title,
        description,
        city,
        registerUrl,
        date:date,
        venue,
        poster: imageUrl,
        area,
        state,
        duration
      }
    })
    return res;
  } catch (e) {
    console.log(e)
  }
}

export async function deleteEvent(id:string) {
  try {
   
      await  db.event.delete({
          where: { id },
        })

    console.log("Items deleted successfully.");
  } catch (e) {
    console.log(e)
  }
}