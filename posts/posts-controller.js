import * as postDao from './posts-dao.js';
import * as userDao from "../users/users-dao.js"

const UsersController = (app) => {

    const createPost = async (req, res) => {
        const post = req.body;
        const currentPost = await postDao.createPost(post);
        res.json(currentPost);
    }

    const deletePost = async (req, res) => {
        const postId = req.params.post_id;
        const status = await postDao.deletePost(postId);
        res.json(postId);
    }

    const getPostsByUserId = async (req, res) => {
        const userId = req.params.user_id;
        const user = await userDao.findUserByUserId(userId);
        let posts = await postDao.findAllPosts();
        if (user.role === "APPLICANT") {
            const appFollowingArray = user.appFollowing;
            // Filtering posts that are posted by recruiters that applicant follows and also the
            // posts that applicant hasn't applies yet
            posts = posts.filter(post =>
                                     !post.applicants.includes(userId) &&
                                     appFollowingArray.includes(post.recruiter_id));
        } else {
            posts = posts.filter(post => post.recruiter_id === userId);
        }
        res.json(posts);
    }


    app.post('/createPost', createPost);
    app.delete('/deletePost/:post_id', deletePost);
    app.get('/getPosts/:user_id', getPostsByUserId);
}

export default UsersController