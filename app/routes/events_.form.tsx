import {
  ActionFunction,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import { Form, useNavigation, useOutletContext } from "@remix-run/react";
import { useRef ,useState} from "react";
import { sendMail } from "~/services/sendmail.server";
import { useActionData } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
export const action: ActionFunction = async ({ request }) => {
  const uploadHandler = unstable_composeUploadHandlers(
    unstable_createFileUploadHandler({
      maxPartSize: 5_000_000,
      file: ({ filename }) => filename,
    }),
    // parse everything else into memory
    unstable_createMemoryUploadHandler()
  );
  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler // <-- we'll look at this deeper next
  );
  const { fname, lname, email, organisation, venue, date, imageUrl } =
    Object.fromEntries(formData);
 
  let subject='event post request'
  try {
    sendMail(subject, {
      fname,lname,email,organisation,venue,date,imageUrl
    });
    return {
      message: "email successfully sent. organiser will contact u soon",
    };
  } catch (e) {
    return { message: "error sending mail" };
  }
};

export default function AddEvent() {
  const imageRef = useRef<HTMLImageElement>(null);
  const response = useActionData();
  const navigation = useNavigation();
  const { supabase } = useOutletContext();
  const [imageUrl, setImageUrl] = useState('');
  async function handleImage(e) {
    let file = e.target.files[0];
    const { data, error} = await supabase.storage
      .from("images")
      .upload(uuidv4(), file);
    if (data) {
      let filename = data.path;
      let respond = await supabase.storage.from("images").getPublicUrl(filename);
      let fileUrl=respond.data.publicUrl
      setImageUrl(fileUrl);

    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <center>
      <h1 className="text-5xl font-bold mt-2">Submit your Event on Ngatso.</h1>
      <p className="max-w-xl py-3">
        Provide as much detail as possible. Your post will be reviewed by our
        team. The process will take about 24 hours to approve. If we find any
        doubt we will contact you directly. Thank you for choosing us.
      </p>
      <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
        <div className="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <div className="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Add new Event
            </h3>
          </div>
          <Form method="post" encType="multipart/form-data">
            <div className="grid gap-4 mb-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="fname"
                  id="first-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="John"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lname"
                  id="last-name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="Doe"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="organisation"
                  className="inline-flex items-center mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Organisation
                  <button
                    type="button"
                    data-tooltip-target="tooltip-dark"
                    data-tooltip-style="dark"
                    className="ml-1"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-900 dark:hover:text-white dark:text-gray-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only">Details</span>
                  </button>
                  <div
                    id="tooltip-dark"
                    role="tooltip"
                    className="inline-block absolute invisible z-10 py-2 px-3 max-w-sm text-xs font-normal text-white bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700"
                  >
                    for Private event write 'Private'
                    <div className="tooltip-arrow" data-popper-arrow></div>
                  </div>
                </label>
                <input
                  type="text"
                  name="organisation"
                  id="organisation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="for Private event write 'Private'"
                  required
                />
              </div>
              <div>
                <label htmlFor="venue">Venue</label>
                <input
                  type="text"
                  name="venue"
                  id="venue"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="where the event is being held"
                  required
                />
              </div>
              <div>
                <label htmlFor="date">Date</label>
                <input
                  type="datetime-local"
                  name="date"
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="when the event is being held"
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="biography"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Describe Event
                </label>
                <div className="w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                  <div className="py-2 px-4 bg-white rounded-b-lg dark:bg-gray-800">
                    <textarea
                      id="biography"
                      rows={8}
                      className="block px-0 w-full text-sm text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                      placeholder="Write a description here"
                      required
                    ></textarea>
                  </div>
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  htmlFor="file"
                >
                  Upload Poster
                </label>
                <div className="items-center w-full sm:flex">
                  {imageUrl!=='' && (
                    <img
                    className="mb-4 w-20 h-20 shadow sm:mr-4 sm:mb-0"
                    ref={imageRef}
                    src={imageUrl}
                    alt="poster"
                    />
                  )}
                  <div className="w-full">
                    <input hidden value={imageUrl} name='imageUrl' readOnly/>
                    <input
                      className="w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                      aria-describedby="file_input_help"
                      id="file"
                      type="file"
                      name="file"
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
            </div>

            <div className="flex items-center space-x-4">
              <button
                type="submit"
                className="w-full text-black inline-flex items-center justify-center bg-gray-200 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <svg
                  className="-ml-1 w-5 h-5 sm:mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                {navigation.formData?.get("fname") ? "submiting" : "Submit"}
              </button>
            </div>
          </Form>
          {response?.message && <div>{response.message}</div>}
        </div>
      </div>
    </center>
  );
}
