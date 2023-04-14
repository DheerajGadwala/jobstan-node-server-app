import mongoose from "mongoose";

const usersSchema = mongoose.Schema({
                                        name: String,
                                        username: {type: String, unique: true, required: true},
                                        password: {type: String, required: true},
                                        email: String,
                                        phone: String,
                                        address: String,
                                        role: {type: String, enum: ['SEARCHER', 'POSTER', 'ADMIN']},
                                        jobPosterOrganization: {type: String, default: ""},
                                        orgDesc: {type: String, default: ""},
                                        searcherSkills: {type: String, default: ""},
                                        searcherLocation: {type: Number, default: 0},
                                        approvalStatus: {type: String, enum: ['PENDING', 'APPROVED'], default: 'PENDING'},
                                    }, {collection: 'users'})

export default usersSchema;