import * as userDao from './users-dao.js';

const UsersController = (app) => {

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const pendingApplicants = async (req, res) => {
        const pendingApplicants = await userDao.findPendingApplicants();
        res.json(pendingApplicants)
    }

    const pendingRecruiters = async (req, res) => {
        const pendingRecruiters = await userDao.findPendingRecruiters();
        res.json(pendingRecruiters)
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
    app.get('/pendingApplicants', pendingApplicants);
    app.get('/pendingRecruiters', pendingRecruiters);
    app.post('/updateUser/:uid', approveUser);
    app.post('/profile', profile);
}

export default UsersController