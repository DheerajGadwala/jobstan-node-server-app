import * as userDao from './users-dao.js';

const UsersController = (app) => {

    const logout = (req, res) => {
        req.session.destroy()
        res.sendStatus(200)
    }

    const register = async (req, res) => {
        const user = req.body;
        const existingUser = await userDao
            .findUserByUsername(user.username)
        if (existingUser) {
            res.sendStatus(403)
            return
        }
        const currentUser = await userDao.createUser(user)
        res.json(currentUser)
    }

    const login = async (req, res) => {
        const credentials = req.body
        const existingUser = await userDao
            .findUserByCredentials(
                credentials.username, credentials.password)
        if (existingUser) {
            req.session['currentUser'] = existingUser
            res.json(existingUser)
            return
        }
        console.log(credentials)
        res.sendStatus(403)
    }

    const pendingApplicants = async (req, res) => {
        const pendingApplicants = await userDao.findPendingApplicants();
        res.json(pendingApplicants)
    }

    const pendingRecruiters = async (req, res) => {
        const pendingRecruiters = await userDao.findPendingRecruiters();
        res.json(pendingRecruiters)
    }

    const getRecruiters = async (req, res) => {
        const currentUser = req.params.uid;
        const user = await userDao.findUserByUserId(currentUser);
        const appFollowing = user.appFollowing;
        const getRecruiters = await userDao.findRecruiters();
        const filteredRecruiters = getRecruiters.filter(recruiter => !appFollowing.includes(recruiter._id));
        res.json(filteredRecruiters)
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

    const updateProfile = async (req, res) => {
        const profileId = req.params.uid;
        const updates = req.body;
        const profile = await userDao.updateProfileDao(profileId, updates)
        const finalProfile = await userDao.findUserByUserId(profileId)
        req.session['currentUser'] = finalProfile
        res.json(finalProfile)
    }

    app.post('/logout', logout);
    app.get('/pendingApplicants', pendingApplicants);
    app.get('/pendingRecruiters', pendingRecruiters);
    app.get('/getRecruiters/:uid', getRecruiters);
    app.post('/updateUser/:uid', approveUser);
    app.post('/register', register);
    app.post('/login', login);
    app.post('/profile', profile);
    app.put('/updateProfile/:uid', updateProfile);
}

export default UsersController