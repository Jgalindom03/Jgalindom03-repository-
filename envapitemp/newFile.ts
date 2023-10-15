import { Request, Response } from "npm:express@4.18.2";
import { getLocation } from "./getlocalizacion.ts";
import { getWeather } from "./gettemperatura.ts";
import { app } from "./main.ts";

app
  .get("/", (req: Request, res: Response) => {
    res.status(200).send("Hello world");
  })
  .get("/location/:countrycode/:zipcode", (
    async (req: Request, res: Response) => {
      try {
        const zipcode = req.params.zipcode;
        const countrycode = req.params.countrycode;

        if(isNaN(Number(zipcode))) {
          res.status(400).send("zipcode must be a number");
          return;
        }
        if(countrycode.length !== 2) {
          res.status(400).send("Country code must be 2 characters");
          return;
        }
        const location = await getLocation(zipcode, countrycode);
        res.status(200).send(location);
      } catch(e) {
        res.status(500).send(e.message);
      }
    }
  )
    .get(
      "/weather/:countrycode/:zipcode",
      async (req: Request, res: Response) => {
        try {
          const zipcode = req.params.zipcode;
          const countrycode = req.params.zipcode;

          if(isNaN(Number(zipcode))) {
            res.status(400).send("zipcode must be a number");
            return;
          }
          if(countrycode.length !== 2) {
            res.status(400).send("Country code must be 2 characters");
            return;
          }
          const location = await getLocation(zipcode, countrycode);
          const weather = await getWeather(location);
          res.status(200).send({
            location: weather.location,
            temperature: weather.temperature,
            description: weather.description,
          });
        }
        catch(error) {
          res.status(200).send(error.message);
        }
      }
    ));
