import { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
  useOutletContext,
} from "@remix-run/react";
import { createEvent,  deleteEvent, eventType, getEvents } from "~/model/event";
import { useRef, useState } from 'react'
import { v4 as uuidv4 } from "uuid";

import { Modal } from "flowbite-react";
export const loader = async ({request}:LoaderArgs)=>{
    let events =await getEvents();
    return {events};
}

export const action = async ({request}:ActionArgs) => {
  let formData = await request.formData();
  if (request.method === 'POST') {
    let { title, venue, date, registerUrl, city, description,imageUrl } = Object.fromEntries(formData);
  
    let res = await createEvent(
      title,
      description,
      city,
      venue,
      new Date(date),
      registerUrl,
      imageUrl
    );
  }
  if (request.method === 'DELETE') {
    let { id } = Object.fromEntries(formData);
    let res = await deleteEvent(id as string);
  }
  return {message:'sent'};
}

export default function Events() {
  const {events} = useLoaderData();
  const [openAdd, setOpenAdd] = useState(false);

  return (
    <div className="overflow-x-auto">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setOpenAdd(true)}
          className="flex  items-center justify-center m-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Add Event
        </button>
      </div>
      <Modal
        show={openAdd}
        dismissible
        onClose={() => setOpenAdd(false)}
        className="h-screen"
      >
        <EventForm close={() => setOpenAdd(false)} />
      </Modal>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-4 py-3 min-w-[14rem]">
              Title
            </th>
            <th scope="col" className="px-4 py-3 min-w-[10rem]">
              Description
            </th>
            <th scope="col" className="px-4 py-3 min-w-[7rem]">
              Venue
            </th>
            <th scope="col" className="px-4 py-3 min-w-[6rem]">
              Date
            </th>
            <th scope="col" className="px-4 py-3 min-w-[7rem]">
              RegisterUrl
            </th>
            <th scope="col" className="px-4 py-3 min-w-[12rem]">
              City
            </th>
            <th scope="col" className="px-4 py-3 min-w-[12rem]">
              poster
            </th>
            <th scope="col" className="px-4 py-3">
              operations
            </th>
          </tr>
        </thead>
        {events.map((event: eventType) => {
          const date = new Date(event.date);
          return <Event event={event} key={event.id} date={date} />;
        })}
      </table>
    </div>
  );
}

function Event({ event, date }: any) {

  const deleteFetcher = useFetcher();

  const handleRemove = (id: string) => {
    deleteFetcher.submit(
      {
        id,
      },
      {
        method: "DELETE",
      }
    );
  };
  return (
    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
      >
        {event.title}
      </th>
      <td className="px-4 py-3">
        {event.description.substring(0, 20) + "..."}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {event.venue}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {date.toLocaleString("en-US", {})}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {event.registerUrl}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {event.city}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {event.poster}
      </td>
      <td>
        <button
          disabled={deleteFetcher.formMethod==='DELETE'}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          onClick={() => handleRemove(event.id)}
        >
          {deleteFetcher.formMethod === 'DELETE' ? "removing" : "remove"}
        </button>
      </td>
    </tr>
  );
}

function EventForm({close}: {close:()=>void}) {
  const actionData = useActionData();
  const [imageUrl, setImageUrl] = useState("");
  const imageRef = useRef<HTMLImageElement>(null);

  const { supabase } = useOutletContext();

   async function handleImage(e) {
     let file = e.target.files[0];
     const { data, error } = await supabase.storage
       .from("image")
       .upload(uuidv4(), file);
     if (data) {
       let filename = data.path;

       let fileUrl = `https://fqudiggsyyiruawohnij.supabase.co/storage/v1/object/public/image/${filename}`;
       setImageUrl(fileUrl);
     }
     if (error) {
       console.log(error);
     }
   }

  if (actionData?.message) {
    close();
          }
          
  
  return (
    <div aria-hidden="true">
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Create Event
            </h3>
          </div>
          <Form method="POST">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="title"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Event name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="venue"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Venue
                </label>
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Dharamsala"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="date"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="registerUrl"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  RegisterUrl
                </label>
                <input
                  name="registerUrl"
                  id="registerUrl"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="something.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="city"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  City
                </label>
                <input
                  name="city"
                  id="city"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="city"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file"
                >
                  Upload Poster
                </label>
                <div className="items-center w-full sm:flex">
                  <img
                    className="mb-4 w-20 h-20 rounded-full sm:mr-4 sm:mb-0"
                    ref={imageRef}
                    src={imageUrl}
                    onError={e=>e.target.src="https://via.placeholder.com/150"}
                    alt="poster"
                  />
                  <div className="w-full">
                    <input hidden value={imageUrl} name="imageUrl" readOnly />
                    <input
                      className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file"
                      type="file"
                      onChange={(e) => handleImage(e)}
                    />
                    <p
                      className="mt-1 text-xs font-normal text-gray-500 dark:text-gray-300"
                      id="file_input_help"
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  description
                </label>
                <input
                  name="description"
                  id="description"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="description"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 mr-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
            <button
              type="reset"
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
            >
              remove
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
}