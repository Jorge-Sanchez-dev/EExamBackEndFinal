import { GraphQLError } from "graphql"
import { API_Hora, API_Phone, API_Weather} from "./types.ts";

export const validatephone = async(phone:string) => {
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY) throw new GraphQLError("API_KEY not found");
    const url = `https://api.api-ninjas.com/v1/validatephone?number=${phone}`
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status !== 200) throw new GraphQLError("Error in the API")
    const result:API_Phone = await data.json()
    if(!result.is_valid) throw new GraphQLError("Phone does not exist")
    return {
        ciudad: result.country
    }
}

export const sacarTiempo = async(ciudad:string) => {
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY) throw new GraphQLError("API_KEY not found");
    const url = `https://api.api-ninjas.com/v1/weather?city=${ciudad}`
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status !== 200) throw new GraphQLError("Error in the API")
    const result:API_Weather = await data.json()
    return {
        temperatura: result.temp
    }
}

export const sacarHora = async(ciudad:string) => {
    const API_KEY = Deno.env.get("API_KEY")
    if(!API_KEY) throw new GraphQLError("API_KEY not found");
    const url = `//https://api.api-ninjas.com/v1/worldtime?city=${ciudad}`
    const data = await fetch(url,{
        headers: {
            'X-Api-Key': API_KEY
          },
    })
    if(data.status !== 200) throw new GraphQLError("Error in the API")
    const result:API_Hora = await data.json()
    return {
        horaLocal: result.datetime
    }
}

