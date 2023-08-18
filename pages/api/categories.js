import { Category } from "@/components/models/Category";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "POST") {
    const { name } = req.body;
    try {
      const categoryDoc = await Category.create({
        name,
      });
      res.json(categoryDoc);
    } catch (error) {
      console.log(error);
    }
  }
}
