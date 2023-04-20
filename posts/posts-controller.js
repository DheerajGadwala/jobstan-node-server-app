import * as postDao from './posts-dao.js';

const UsersController = (app) => {

    const createPost = async (req, res) => {
        const post = req.body;
        const currentPost = await postDao.createPost(post);
        res.json(currentPost);
    }

    const addApplicant = async (req, res) => {
        await postDao.updatePostApplicants(req.body.postId, req.body.applicantId);
        res.sendStatus(200);
    }

    const deletePost = async (req, res) => {
        await postDao.deletePost(req.body.postId);
        res.sendStatus(200);
    }

    const getFilteredPosts = async (req, res) => {
        const filteredPosts = await postDao.findPostsByFilter(req.body.filters);
        res.json(filteredPosts);
    }

    const previousPosts = async (req, res) => {
        const response = await postDao.findPostsByFilter({"recruiter_id": req.params.recruiter_id});
        res.json(response);
    }

    app.post('/createPost', createPost);
    app.put('/addApplicant', addApplicant);
    app.delete('/delete', deletePost);
    app.get('/filteredPosts', getFilteredPosts);
    app.get('/previousPosts/:recruiter_id', previousPosts);
}

export default UsersController