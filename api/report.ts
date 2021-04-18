import { VercelRequest, VercelResponse } from "@vercel/node";
import sgMail from "@sendgrid/mail";
import "dotenv/config";

type input = {
  to: string;
  from: string;
  text: string;
};

const sendReportEmail = async (req: VercelRequest, res: VercelResponse) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
  const { to, from, text }: input = JSON.parse(req.body);

  const msg = {
    to, // Change to your recipient
    from: to, // Change to your verified sender
    subject: `Report from ${from}`,
    text,
  };

  try {
    await sgMail.send(msg);
    res.json({ report: true });
    console.log("Email sent");
  } catch (error) {
    res.status(500).json({ error, report: null });
    console.error(error);
  }
};

export default sendReportEmail;
