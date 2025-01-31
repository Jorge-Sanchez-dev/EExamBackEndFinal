import {OptionalId} from "mongodb";

export type ContactModel = OptionalId<{
  name: string,
  phone: string,
  direcion: string,
  ciudad: string,
  temperatura: string,
  horaLocal: string
}>;

// https://api-ninjas.com/api/validatephone
export type API_Phone = {
    is_valid: string,
    country: string,
    timezones: string // para sacar la hora local
}

//https://api.api-ninjas.com/v1/weather?city=
export type API_Weather = {
  temp: string
}

//https://api.api-ninjas.com/v1/worldtime?city=
export type API_Hora = {
  datetime: string
}




