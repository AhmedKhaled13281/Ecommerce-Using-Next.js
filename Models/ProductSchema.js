import mongoose, { model ,  Schema , models} from "mongoose";
delete mongoose.connection?.models['Product'];
const ProductSchema = new Schema({
    title : {type : String , required : true},
    description : {type : String , required : true},
    price : {type : Number , required : true},
    imageUrls : [{type: String}],
    category : {type : String , required : true}
})

export const product = models?.product || model('product', ProductSchema);
