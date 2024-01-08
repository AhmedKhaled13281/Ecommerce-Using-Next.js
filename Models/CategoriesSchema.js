import mongoose , {model , Schema , models} from 'mongoose'

const CategoriesSchema = new Schema({
    categoryName : {type : String , required: true},
})

export const category = models?.category || model('category' , CategoriesSchema)