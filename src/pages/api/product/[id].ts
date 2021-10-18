import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handleProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    console.log("req.query.id", req.query.id);

    try {
      const { data } = await axios.get(
        `${process.env.DJANGO_API_URL}/api/products/${req.query.id}`
      );
      return res.json({ data });
    } catch (e) {
      console.log(e);
    }
  }
}
