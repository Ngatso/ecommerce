import { ActionArgs, ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  let formdata = await request.formData();
  let user = formdata.get("user") as string;
  return user;
};
