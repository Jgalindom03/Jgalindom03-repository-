import mongoose from "npm:mongoose@7.6.2"
import { Mascota } from "../type.ts"

const Schema= mongoose.Schema;
const mascotaSchema= new Schema({
nombre:{ type:String, required:true},
descripcion:{ type:String, required:true},
tipo:{ type:String, required:true},
},
{timestamps:true}
);

export type MascotaModelType= mongoose.Document & Omit<Mascota, "id">;
export default mongoose.model<MascotaModelType>("Mascota", mascotaSchema);