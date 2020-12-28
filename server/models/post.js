import mongoose from 'mongoose'
import moment from 'moment'

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        index: true //검색 시에 검색 기능 향상
    },
    contents: {
        type: String,
        required: true
    },
    views: {
        type: Number,
        default: -2 //처음 작성한 경우에도 조회수가 기록이 되므로, 일단 -2로...
    },
    fileUrl: {
        type: String,
        default: "https://source.unsplash.com/random/301x201"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'category',
    },
    date: {
        type: String,
        default: moment().format("YYYY-MM-DD hh:mm:ss")
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        },
    ],
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }
});

const Post = mongoose.model("post", PostSchema);

export default Post;