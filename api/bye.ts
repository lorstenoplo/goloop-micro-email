import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";
import "dotenv/config";

type input = {
  to: string;
  username: string;
};

const sendByeEmail = async (req: VercelRequest, res: VercelResponse) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const { to, username }: input = JSON.parse(req.body);
  console.log(req.body);
  const msg = {
    to, // Change to your recipient
    from: "nishanthdipali@gmail.com", // Change to your verified sender
    templateId: process.env.SENDGRID_BYE_TEMPLATE_ID!,
    dynamic_template_data: {
      username,
    },
  };

  try {
    await sgMail.send(msg);
    res.send("email sent");
    console.log("Bye Email sent");
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
};

export default sendByeEmail;
