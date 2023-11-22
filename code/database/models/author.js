import mongoose, { Schema } from "mongoose";
import validator from 'validator';

import { isEmptyValidator } from "../validator.js";
import Article from "./article.js"

const defaultColor = "#ff0000";

const authorSchema = new Schema({
    lastname: String,
    firstname: String,
    email: String,
    image: {
        type: String,
        required: [true, "Image obligatoire"]
    },
    bio: String,
    color: {
        type: String,
        default: defaultColor
    },
    list_articles: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Article",
        },
    ],
});

authorSchema
    .path("firstname")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un nom de famille, le champ ne peut pas être nul ou vide"
    );

authorSchema
    .path("lastname")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un prénom, le champ ne peut pas être nul ou vide"
    );

authorSchema
    .path("email")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un email, le champ ne peut pas être nul ou vide"
    ).validate(
        validator.isEmail,
        "Veuillez mettre un email valide"
    );

authorSchema.pre("save", function(next) {
    this.color = this.color.trim()
    if(!validator.isHexColor(this.color)) {
        this.color = defaultColor
    }

    next()
})

authorSchema.pre("findOneAndUpdate", function(next) {
    try {
        this._update.color = this._update.color.trim()
        if(!validator.isHexColor(this._update.color)) {
            this._update.color = defaultColor
        }
    } catch (error) {}

    next()
})

authorSchema.pre('findOneAndDelete', { document: true, query: true }, async function(next) {
    try {
        // Unset all articles' author
        await Article.updateMany(
            { author: this.getQuery()._id },
            { author: null }
        )
    } catch (e) {}

    next();
});

authorSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("Author", authorSchema);
