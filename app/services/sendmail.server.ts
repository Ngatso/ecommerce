import sgMail from "@sendgrid/mail";

//ES6

export const sendMail = (subject: string, html = "") => {
  const msg = {
    // templateId: "d-5a0dd7dc32864884a39b0cb4cff1a600",
    to: ["ngatso733@gmail.com", "contact@ngatso.in","ta3tsering@gmail.com"],
    from: {
      name: "Ngatso India",
      email: "contact@ngatso.in",
    }, // Use the email address or domain you verified above
    subject: subject,
    // dynamicTemplateData: {
    //   Preheader: subject,
    //   subject: html,
    // },
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
