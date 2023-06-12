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

export async function deleteAllSelection(monasteryIds: string[]) {
  try {
    await db.$transaction(
      monasteryIds.map((id) =>
        db.monastery.delete({
          where: { id },
        })
      )
    );

    console.log("Items deleted successfully.");
  } catch (e) {
    console.log(e);
  }
}