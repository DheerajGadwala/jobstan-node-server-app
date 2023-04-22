import usersModel from "./users-model.js";

export const createUser = async (user) =>
    await usersModel.create(user)

export const findUserByUsername = async (username) =>
    await usersModel.findOne({username})

export const findUserByCredentials = async (username, password) =>
    await usersModel.findOne({username, password, approvalStatus: "APPROVED"})

export const findPendingApplicants = async () =>
    await usersModel.find({role: "APPLICANT", approvalStatus: "PENDING"})

export const findPendingRecruiters = async () =>
    await usersModel.find({role: "RECRUITER", approvalStatus: "PENDING"})

export const findRecruiters = async () =>
    await usersModel.find({role: "RECRUITER", approvalStatus: "APPROVED"})

export const updateUserApproval = async (uid) =>
    await usersModel.updateOne({_id: uid}, {$set: {"approvalStatus": "APPROVED"}})

export const findUserByUserId = async (id) =>
    await usersModel.findOne({_id: id})

export const updateProfileDao = async (uid, profile) =>
    await usersModel.updateOne({_id: uid}, {$set: profile})

export const findUsersByUsername = async (username) =>
await usersModel.find({username:{$regex:"(.*?)"+username,$options:"$i"}})

export const findAllUsers = async () =>
    await usersModel.find()

export const findUsersByFilter = async(filter) => {
    let predicate = {};
    if (filter["appMajor"]) {
        predicate = {...predicate, "appMajor": filter["major"]};
    }
    // if (filter["pay"]) {
    //     predicate = {...predicate, "pay": { $gt: Number(filter["pay"]) }};
    // }
    if (filter["appUniv"]) {
        predicate = {...predicate, "appUniv": filter["appUniv"]};
    }
    return await usersModel.find(predicate);
}

    