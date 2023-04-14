import * as userDao from './users-dao.js';

const UsersController = (app) => {

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const pendingJobSearchers = async (req, res) => {
        const pendingJobSearchers = await userDao.findPendingJobSearchers();
        res.json(pendingJobSearchers)
    }

    const pendingJobPosters = async (req, res) => {
        const pendingJobPosters = await userDao.findPendingJobPosters();
        res.json(pendingJobPosters)
    }

    const approveUser = async (req, res) => {
        const userToUpdate = req.params.uid;
        const user = await userDao.findUserByUserId(userToUpdate);
        const status = await userDao.updateUserApproval(userToUpdate);
        res.json(user)
    }

    const profile = (req, res) => {
        if (req.session['currentUser']) {
            res.send(req.session['currentUser'])
        } else {
            res.sendStatus(403)
        }
    }


    app.post('/logout', logout);
    app.get('/pendingJobSearchers', pendingJobSearchers);
    app.get('/pendingJobPosters', pendingJobPosters);
    app.post('/updateUser/:uid', approveUser);
    app.post('/profile', profile);
}

export default UsersController