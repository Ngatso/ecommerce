import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function seed() {
  try {
    // Create the contact
    const contact = await prisma.contact.create({
      data: {
        name: "Majnu ka Tilla Tibetan Settlement Office",
        mobile: "123456789",
        email: "MT_tibetan_office@test.org",
        website: "www.majnukatilla.org",
      },
    });

    // Create the event
    const event = await prisma.event.create({
      data: {
        title: "His Holiness Birthday",
        description:
          "Tibetan settlement office of Majnu Ka Tilla is organising a grand celebration of His Holiness the Dalai Lama's birthday. All are welcome to join the celebration.",
        poster: ["url1", "url2"],
        venue: "Tibetan Children's Village School ground",
        date: new Date("2023-07-06"),
        registerUrl: "www.majnukatilla.org/hhd_birthday",
        contactId: contact.id,
      },
    });

    const contact2 = await prisma.contact.create({
      data: {
        name: "Majnu ka Tilla Tibetan Settlement Office",
        mobile: "123456789",
        email: "MT_tibetan_office@test.org",
        website: "www.majnukatilla.org",
      },
    });

    // Create the monastery
    const monastery = await prisma.monastery.create({
      data: {
        name: "Monastery_1",
        location: "Tibetan Children's Village School ground",
        contactId: contact2.id,
        image: ["url1", "url2"],
      },
    });

    const contact3 = await prisma.contact.create({
      data: {
        name: "Ama Cafe",
        mobile: "092891 08826",
        email: "admin@amacafe.co",
        website: "https://amacafe.co/",
      },
    });
    const restaurant = await prisma.restaurant.create({
      data: {
        name: "Ama Cafe",
        photos: ["url1", "url2"],
      
      },
    });

    console.log("Data seeded successfully!");
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seed();
