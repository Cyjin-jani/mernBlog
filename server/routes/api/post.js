import express from 'express';
import auth from '../../middleware/auth';
//Model
import Post from '../../models/post';

const router = express.Router()

//frontend와 주소가 겹치면 안되기 때문에 백엔드는 주소체계를 길게 씀.
// api/post
//post 불러오기
router.get('/', async(req, res) => {
    const postFindResult = await Post.find();
    console.log(postFindResult, "All Post get");
    res.json(postFindResult)
})

//post 작성하기
router.post('/', auth, async(req, res, next) => {
    try {
        console.log(req, "req");
        const {title, contents, fileUrl, creator} = req.body;
        const newPost = await Post.create({
            title, contents, fileUrl, creator
        });
        res.json(newPost)
    } catch(e) {
        console.log(e);
    }
});

export default router;