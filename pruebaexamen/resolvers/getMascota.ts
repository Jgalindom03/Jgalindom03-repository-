import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const getMascota = async (req: Request, res: Response) => {
  try {
    const { nombre } = req.params;
    const mascota = await MascotaModel.findOne({ nombre }).exec();
    if (!mascota) {
      res.status(404).send("Person not found");
      return;
    }
    res.status(200).send({
        nombre:mascota.nombre,
        descripcion:mascota.descripcion,
        tipo:mascota.tipo,
        id:mascota.id.toString(),
    });
  } catch (error) {
    res.status(404).send(error.message);
    return;
  }
};

export default getMascota;