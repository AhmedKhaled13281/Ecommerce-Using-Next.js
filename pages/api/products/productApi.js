import { connectToDb } from "@/lib/mongoDbConnect";
import  {product } from "@/Models/ProductSchema";

export default async function handler(req, res) {
  const {id,  title, description, price , imageUrls , category} = req.body;
  await connectToDb();

  try {
    if (req.method === "POST") {
        const productDoc = await product.create({ title, description, price , imageUrls , category});
        res.status(200).json(productDoc);
    }
    
    if (req.method === "GET"){
      const listOfProducts = await product.find()
      res.status(200).json(listOfProducts);
    }

    if(req.method === "PUT"){
      const updatedProduct = await product.updateOne({_id : id} , {title, description, price , imageUrls , category})
      res.status(200).json({message : "Updated Successfully !"});
    }

    if(req.method === "DELETE") {
      await product.deleteOne({_id : id})
      res.status(200).json({message : "Deleted Successfully !"});
    }
  } catch (err) {
    res.status(404).json({ Message: err });
  }
}

