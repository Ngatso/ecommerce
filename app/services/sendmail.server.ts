import sgMail from "@sendgrid/mail";

//ES6

export const sendMail = (subject: string, html = "") => {
  const msg = {
    to: ["ngatso733@gmail.com", "contact@ngatso.in"],
    from: {
      name: "Ngatso India",
      email: "ngatso733@gmail.com",
    }, // Use the email address or domain you verified above
    subject: subject,
    html: html,
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  sgMail.send(msg).then(
    (e) => {
      console.log(e);
    },
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
};
