import { VercelRequest, VercelResponse } from "@vercel/node";

// const __prod__ = process.env.NODE_ENV;

const allowCors = (fn: any) => async (
  req: VercelRequest,
  res: VercelResponse
) => {
  res.setHeader("Access-Control-Allow-Credentials", "include");
  //   res.setHeader(
  //     "Access-Control-Allow-Origin",
  //     __prod__ ? "https://goloop-micro-auth.vercel.app" : "http://localhost:5000"
  //   );
  // another common pattern
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin!);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (_req: VercelRequest, res: VercelResponse) => {
  const d = new Date();
  res.end(d.toString());
};

export default allowCors(handler);
