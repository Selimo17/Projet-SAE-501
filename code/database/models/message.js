import mongoose, { Schema } from "mongoose";
import validator from "validator";



const messageShema = new Schema({
    lastname:
    {
        type: String,
        required: [true, "Nom de famille requis"]
    },


    firstname:
    {
        type: String,
        required: [true, "Prenom requis"]
    },
    email:
    {
        type: String,
        required: [true, "E-mail requis"],
        validate: [validator.isEmail, "E-mail non valide "]
    },


    content:
    {
        type: String,
        required: [true, "content requis"],
    },
    type: {
        type: String,
        enum: ["non_precise", "autre", "etudiant", "parent"],
        default: "non_precise"
    }
},
    {
        timestamps: true,
        //timetamps: { createdAt: "created_at"},
    }

)

export default mongoose.model("Message", messageShema);