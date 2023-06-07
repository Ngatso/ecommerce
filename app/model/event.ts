import { db } from "~/services/db.server";

export async function getEvents() {
  try {
    const res = db.event.findMany();
    return res;
  } catch (e) {
    console.log(e);
  }
}

export async function createEvent(title,description,city,venue,date,registerUrl) {
  try {
    const res = db.event.create({
      data: {
        title,
        description,
        city,
        registerUrl,
        date:date,
        venue,
      }
    })
    return res;
  } catch (e) {
    console.log(e)
  }
}

export async function deleteAllSelection(eventIds) {
  try {
    await db.$transaction(
      eventIds.map((id) =>
        db.event.delete({
          where: { id },
        })
      )
    );

    console.log("Items deleted successfully.");
  } catch (e) {
    console.log(e)
  }
}