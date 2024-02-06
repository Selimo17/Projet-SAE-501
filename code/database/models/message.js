import mongoose from "mongoose";
import validator from "validator";



const messageShema = new Shema ({

    lastname: 
        {type : String,
        required:[true, "Nom de famille requis"]}, 


    firtname:
        {type : String,
        required:[true, "Prenom requis"]}, 


    email:
        {type : String,
        required:[true, "E-mail requis"],
        validator: [validator.isEmail, "E-mail non valide "]}, 

    Content: String,


    type: {
        type: String,
        enum:["non_precise", "autre" , "etudiant" , "parent"],
        default: "non_precise" 

    }
}, 

{
timestamps : true,
//timestamps : {createdAt : "created_at"}
}
)

export default mongoose.model("Message", messageShema);