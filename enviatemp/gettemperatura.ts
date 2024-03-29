import { Weather, Location } from "./type.ts";
import {load} from "https://deno.land/std@0.202.0/dotenv/mod.ts";
const env=await load();

export const getWeather= async(location:Location): Promise<Weather> =>{
    const BASE_URL= "http://api.weatherapi.com/v1";
    const WEATHER_API_KEY= env["WEATHER_API_KEY"] || Deno.env.get("WEATHER_API_KEY");
    if(!WEATHER_API_KEY){
        throw new Error("WEATHER_API_KEY is not defined");
    }
    const url= `${BASE_URL}/current.json?key=${WEATHER_API_KEY}&q=${location.city}`;
    const response= await fetch(url);
    if(response.status !== 200){
        throw new Error("Cannot fetch weather");
    }
    const data = await response.json();
    return{
        location,
        temperature: data.current.temp_c,
        description:data.current.condition.text,
    };
};