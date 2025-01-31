import { Collection, ObjectId } from "mongodb";
import { ContactModel } from "./types.ts";
import { validatephone,  sacarTiempo, sacarHora} from "./utils.ts";
import { GraphQLError } from "graphql";


type Context = {
    ContactCollection: Collection<ContactModel>
}

type MutationArgs = {
    id: string, 
    name: string, 
    phone: string
    direcion: string,
    ciudad: string,
    temperatura: number,
    horaLocal: string
}

export const resolvers = {
    Contact: {
        id: (parent: ContactModel) => parent._id!.toString(),
    },

    Query: {
        getRestaurant: async ( 
            _:unknown,
            args: MutationArgs,
            context:Context
        ): Promise<ContactModel> => {
            const result = await context.ContactCollection.findOne({_id: new ObjectId(args.id)})
            if(!result) throw new GraphQLError("Contact not found")
            return result;
        },
        getRestaurants: async(
            _:unknown,
            __:unknown,
            context:Context,
        ): Promise<ContactModel[]> => {
            return await context.ContactCollection.find().toArray();
        }
    },
    Mutation: {
        addRestaurant: async(
            _:unknown,
            args: MutationArgs,
            context: Context,
        ): Promise<ContactModel> => {
            const {name, phone, direcion} = args
            const {ciudad} = await validatephone(phone)
            const {temperatura} = await sacarTiempo(ciudad) //uso la API para sacar el tiempo sabiendo la ciudad con el telefono
            const {horaLocal} = await sacarHora(ciudad) //uso la API para sacar la hora sabiendo la ciudad con el telefono
            const phone_exist = await context.ContactCollection.findOne({phone})
            if(phone_exist) throw new GraphQLError("El contacto ya existe")

            const {insertedId} = await context.ContactCollection.insertOne({
                name,
                phone,
                direcion,
                ciudad,
                temperatura,
                horaLocal
            })

            return {
                _id: insertedId,
                name,
                phone,
                direcion,
                ciudad,
                temperatura,
                horaLocal
            }
        },
        deleteContact: async (
            _: unknown,
            args: MutationArgs,
            context: Context,
        ): Promise<boolean> => {
            const {deletedCount} = await context.ContactCollection.deleteOne({_id: new ObjectId(args.id)})
            if(deletedCount === 0) return false;
            return true;
        }
    }
}