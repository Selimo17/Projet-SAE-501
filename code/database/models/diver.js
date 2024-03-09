import mongoose, { Schema } from "mongoose";
import { isEmptyValidator } from "../validator.js";

const diverSchema = new Schema({
        title: String,
        yt_link: String,
        image: String,
});

diverSchema
    .path("title")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un titre, le champ ne peut pas être nul ou vide"
    );

diverSchema
    .path("yt_link")
    .validate(
        isEmptyValidator,
        "Veuillez mettre le lien de la vidéo, le champ ne peut être vide"
    );

diverSchema.pre('findOneAndUpdate', function(next) {
        this.options.runValidators = true;
        next();
    });

export default mongoose.model("Diver", diverSchema);