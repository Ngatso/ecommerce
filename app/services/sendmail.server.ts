import sgMail from "@sendgrid/mail";
import { render } from "@react-email/render";
import { EventEmail } from "~/component/UI/Email";
//ES6




export const sendMail = (subject: string, data:any) => {
  const emailHtml = render(EventEmail({ data }));
  const msg = {
    to: [
      "tenkus47@gmail.com",
      "ngatso733@gmail.com",
      "contact@ngatso.in",
    ],
    from: {
      name: "Ngatso India",
      email: "contact@ngatso.in",
    }, // Use the email address or domain you verified above
    subject: subject,
    html: emailHtml,
  };
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  sgMail.send(msg).then(
    (e) => {
      console.log('success');
    },
    (error) => {
      console.error('error');
    }
  );
};
