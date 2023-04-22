import postsModel from "./posts-model.js";
// import usersModel from "../users/users-model"

export const createPost = async (post) =>
    await postsModel.create(post)

// export const findPostById = async (_id) =>
//     await postsModel.findOne({_id})

export const findPostsByFilter = async(filter) => {
    let predicate = {};
    if (filter["title"]) {
        predicate = {...predicate, "title": filter["title"]};
    }
    // if (filter["pay"]) {
    //     predicate = {...predicate, "pay": { $gt: Number(filter["pay"]) }};
    // }
    if (filter["company"]) {
        predicate = {...predicate, "company": filter["company"]};
    }
    return await postsModel.find(predicate);
}

// export const updatePostApplicants = async(_id, applicant_id) =>
//     await postsModel.updateOne({_id}, {$push: {applicants:applicant_id}});

export const findAllPosts = async () =>
    await postsModel.find()

export const deletePost = async(post_id) =>
    await postsModel.deleteOne({_id: post_id});

export const updatePost = async (postIdToUpdate, updates) =>
    await postsModel.updateOne({_id: postIdToUpdate}, {$set: updates})

