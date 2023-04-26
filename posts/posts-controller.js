import * as postDao from './posts-dao.js';
import * as userDao from "../users/users-dao.js"

const PostsController = (app) => {

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

    const getAllPosts = async (req, res) => {
        const posts = await postDao.findAllPosts();
        res.json(posts);
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

    const updatePost = async (req, res) => {
        const postIdToUpdate = req.params.post_id;
        const updates = req.body;
        const status = await postDao.updatePost(postIdToUpdate, updates);
        res.json(status);
    }
    const getFilteredPosts = async (req, res) => {
        let predicate = {};
        const title = req.params.title;
        const company = req.params.company;
        const userId = req.params.user_id;
        // const user = await userDao.findUserByUserId(userId);
        // const appFollowingArray = user.appFollowing;
        const applied = req.params.applied;
        if (title.length > 1) predicate = {...predicate, "title":title.substring(1)};
        if (company.length > 1) predicate = {...predicate, "company":company.substring(1)};
        let posts = await postDao.findPostsByFilter(predicate);
        // posts = posts.filter(post => appFollowingArray.includes(post.recruiter_id));
        if (applied === 'true') 
            posts = posts.filter(post => post.applicants.includes(userId));
        // else
        //     posts = posts.filter(post => !post.applicants.includes(userId));
        res.json(posts);
    }

    app.post('/createPost', createPost);
    app.delete('/deletePost/:post_id', deletePost);
    app.get('/getPosts/:user_id', getPostsByUserId);
    app.get('/getAllPosts', getAllPosts);
    app.put('/updatePost/:post_id', updatePost);
    app.get('/getFilteredPosts/:user_id/:title/:company/:applied', getFilteredPosts);
}

export default PostsController