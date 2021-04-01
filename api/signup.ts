import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";
import "dotenv/config";

const sendWelcomeEmail = async (req: VercelRequest, res: VercelResponse) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const { to }: { to: string } = req.body;

  const msg = {
    to, // Change to your recipient
    from: "nishanthdipali@gmail.com", // Change to your verified sender
    templateId: process.env.SENDGRID_TEMPLATE_ID!,
    dynamic_template_data: {
      subject: "Welcome to the shop",
    },
  };
  try {
    await sgMail.send(msg);
    res.status(200).send("email sent");
    console.log("Email sent");
  } catch (error) {
    res.status(500).json({ error });
    console.error(error);
  }
};

export default sendWelcomeEmail;
