import { db } from "~/services/db.server";

export async function getEvents() {
  try {
    const res = db.event.findMany();
    return res;
  } catch (e) {
    console.log(e);
  }
}
