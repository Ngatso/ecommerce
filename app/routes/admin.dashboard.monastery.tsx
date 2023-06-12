import { ActionArgs, LoaderArgs } from "@remix-run/node";
import {
  Form,
  useActionData,
  useFetcher,
  useLoaderData,
} from "@remix-run/react";
import { createMonastery, deleteAllSelection, getMonastery } from "~/model/monastery";
import { useEffect, useState } from "react";
import { Modal } from "flowbite-react";
export const loader = async ({ request }: LoaderArgs) => {
  let monasteries = await getMonastery();
  return { monasteries };
};

export const action = async ({ request }: ActionArgs) => {
  let formData = await request.formData();
  if (request.method === "POST") {
    let { name,location,image,city } =
      Object.fromEntries(formData);

    let res = await createMonastery(
        name,
        location,
        city,
        image
    );
  }
  if (request.method === "DELETE") {
    let { eventIds } = Object.fromEntries(formData);
    let events = JSON.parse(eventIds as string);
    let res = await deleteAllSelection(events);
    console.log(res);
  }
  return { message: "sent" };
};

export default function Monasteries() {
  const { monasteries } = useLoaderData();
  const [openAdd, setOpenAdd] = useState(false);
  const deleteFetcher = useFetcher();
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      setSelectedItems(monasteries.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };
  const handleRemove = () => {
    if (selectedItems.length === 0) {
      alert("nothing is selected");
      return;
    }
    deleteFetcher.submit(
      {
        eventIds: JSON.stringify(selectedItems),
      },
      {
        method: "DELETE",
      }
    );
  };
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
        <button
          type="button"
          onClick={handleRemove}
          className="flex items-center justify-center m-2 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
        >
          Remove Event
        </button>
      </div>
      <Modal
        show={openAdd}
        dismissible
        onClose={() => setOpenAdd(false)}
        className="h-screen"
      >
        <EventForm />
      </Modal>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all"
                  type="checkbox"
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="checkbox-all" className="sr-only">
                  checkbox
                </label>
              </div>
            </th>
            <th scope="col" className="px-4 py-3 min-w-[14rem]">
              Name
            </th>
            <th scope="col" className="px-4 py-3 min-w-[10rem]">
              Location
            </th>
            <th scope="col" className="px-4 py-3 min-w-[7rem]">
              City
            </th>
            <th scope="col" className="px-4 py-3 min-w-[7rem]">
              Image
            </th>
            <th scope="col" className="px-4 py-3">
              <span className="sr-only">Actions</span>
            </th>
          </tr>
        </thead>
        {monasteries.map((monastery) => {
          return (
            <Monastery
              monastery={monastery}
              key={monastery.id}
              setSelectedItems={setSelectedItems}
              selectedItems={selectedItems}
            />
          );
        })}
      </table>
    </div>
  );
}

function Monastery({ monastery, setSelectedItems, selectedItems }: any) {
  const handleSelectItem = (itemId) => {
    if (selectedItems.includes(itemId)) {
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      setSelectedItems([...selectedItems, itemId]);
    }
  };

  return (
    <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="px-4 py-3 w-4">
        <div className="flex items-center">
          <input
            id="checkbox-table-search-1"
            type="checkbox"
            checked={selectedItems.includes(monastery.id)}
            onChange={() => handleSelectItem(monastery.id)}
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label htmlFor="checkbox-table-search-1" className="sr-only">
            checkbox
          </label>
        </div>
      </td>
      <th
        scope="row"
        className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white flex items-center"
      >
        {monastery.name}
      </th>
      <td className="px-4 py-3">
        {JSON.stringify(monastery.image)}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {monastery.location}
      </td>
      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {monastery.city}
      </td>
     
    </tr>
  );
}

function EventForm() {
  const actionData = useActionData();

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
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Event name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="location"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Dharamsala"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Images
                </label>
                <input
                  name="image"
                  id="image"
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
          {actionData?.message && <div>{actionData?.message}</div>}
        </div>
      </div>
    </div>
  );
}