import { toast } from "react-hot-toast";


export async function validateTitle(values){
    const errors = titleVerify({},values);

    return errors;
}


function titleVerify(error = {}, values){
    if(!values.category){
        error.title = toast.error("Title is required...!")
    }
    return error;
}

