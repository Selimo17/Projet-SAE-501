import mongoose, { Schema } from "mongoose";

import { isEmptyValidator } from "../validator.js";

import CommentArticle from "./comment-article.js"

const articleSchema = new Schema(
    {
        title: String,
        abstract: String,
        content: String,
        image: {
            type: String,
            required: [true, "Image obligatoire"]
        },
        yt_link_id: String,
        is_active: {
            type: Boolean,
            default: false,
            cast: (v) => Boolean(v),
        },
        list_comments: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "CommentArticle",
            },
        ],
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Author",
            default: null,
        },
    },
    {
        timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    }
);

articleSchema
    .path("title")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un titre, le champ ne peut pas être nul ou vide"
    );

articleSchema
    .path("content")
    .validate(
        isEmptyValidator,
        "Veuillez mettre un corps de texte, le champ ne peut pas être nul ou vide"
    );

articleSchema.pre('findOneAndDelete', { document: true, query: true }, async function(next) {
    try {
        // Deletes all related comments when an Article is deleted
        await CommentArticle.deleteMany({ article: this.getQuery()._id });
    } catch (e) {}

    next();
});

articleSchema.pre('findOneAndUpdate', function(next) {
    this.options.runValidators = true;
    next();
});

export default mongoose.model("Article", articleSchema);
