import { connectToDb } from "@/lib/mongoDbConnect";
import { category } from "@/Models/CategoriesSchema";

export default async function handler(req, res) {
    await connectToDb();
    const methodType = req.method
    if(methodType === "POST"){
        if(req.body){
            await category.create(req.body)
            res.status(200).json({ message: 'Categories have been sent successfully' })
        }else {
            res.status(400).json({ message: 'FAILED !' })
        }
    }

    if(methodType === "GET"){
        const categories = await category.find()
        res.status(200).json(categories)
    }

    if(methodType === "DELETE"){
        const {id} = req.body
        await category.deleteOne({_id : id})
        res.status(200).json({message : "Category Deleted Successfully !"})
    }
}