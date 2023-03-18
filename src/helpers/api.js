import axios from "axios"



export async function createCategory(values){
    try {
        const { data:{message}, status } = await instance.post( '/admin/createCategory', values )
        if(status === 201) return Promise.resolve(message)
    } catch (error) {
        return Promise.reject({error})
    }
}