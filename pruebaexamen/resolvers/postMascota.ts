import { Request, Response } from "npm:express@4.18.2";
import MascotaModel from "../db/mascota.ts";

const postMascota = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion, tipo } = req.body;
    if (!nombre || !descripcion || !tipo) {
      res.status(400).send("Nombre, descripcion, tipo are required");
      return;
    }
    if(tipo !== "perros" ||tipo !== "gatos" || tipo !== "serpientes"){
        res.status(400).send("El tipo esta mal")
        return;
    }

    const newMascota = new MascotaModel({ nombre, descripcion, tipo });
    await newMascota.save();

    res.status(200).send({
      nombre:newMascota.nombre,
      descripcion:newMascota.descripcion,
      tipo:newMascota.tipo,
      id:newMascota.id.toString(),
    });
  } catch (error) {
    res.status(500).send(error.message);
    return;
  }
};

export default postMascota;