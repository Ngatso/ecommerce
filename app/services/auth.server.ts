// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import invariant from "tiny-invariant";
import { FormStrategy } from "remix-auth-form";
import { findOrCreateUser } from "~/model/user.server";
let bcrypt = require("bcrypt");
// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session

export const auth = new Authenticator<string>(sessionStorage);

// Tell the Authenticator to use the form strategy
auth.use(
  new FormStrategy(async ({ form }) => {
    let username = form.get("username"); // or email... etc
    let password = form.get("password");
    // You can validate the inputs however you want
    invariant(typeof username === "string", "username must be a string");
    invariant(username.length > 0, "username must not be empty");

    invariant(typeof password === "string", "password must be a string");
    invariant(password.length > 0, "password must not be empty");

    // And if you have a password you should hash it
    let hashedPassword = await generateHash(password);

    // And finally, you can find, or create, the user
    let user = await findOrCreateUser(username, hashedPassword);
    if (!comparePassword(password, user.password)) return "";
    // And return the user as the Authenticator expects it
    return user.username;
  }),
  // each strategy has a name and can be changed to use another one
  // same strategy multiple times, especially useful for the OAuth2 strategy.
  "user-pass"
);

async function generateHash(password: string) {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    throw new Error("Error generating hash");
  }
}

async function comparePassword(password: string, hashedPassword: string) {
  try {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
  } catch (error) {
    throw new Error("Error comparing password");
  }
}
