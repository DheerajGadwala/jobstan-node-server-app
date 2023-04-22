import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
                                        name: String,
                                        email: String,
                                        username: {type: String, unique: true, required: true},
                                        password: {type: String, required: true},
                                        phone: String,
                                        address: String,
                                        role: {type: String, enum: ['APPLICANT', 'RECRUITER', 'ADMIN']},
                                        appUniv: {type: String, default: ""},
                                        appMajor: {type: String, default: ""},
                                        appSkills: {type: Array, default: []},
                                        appFollowing: {type: Array, default: []},
                                        recComp: {type: String, default: ""},
                                        recCompDesc: {type: String, default: ""},
                                        recPositions: {type: Array, default: []},
                                        approvalStatus: {type: String, enum: ['PENDING', 'APPROVED'], default: 'PENDING'},
                                    }, {collection: 'users'})

export default usersSchema;
