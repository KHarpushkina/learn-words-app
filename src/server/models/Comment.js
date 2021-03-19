import * as mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    comment_body: {
        type: String,
        required: true
    },
    _author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    _article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    },
    last_updated : {
        type: Date,
        required: true
    }
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;