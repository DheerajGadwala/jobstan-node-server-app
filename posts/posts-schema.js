import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
                                        title: String,
                                        pay: Number,
                                        description: String,
                                        skills: String,
                                        company: String,
                                        recruiter_id: String,
                                        createdAt: {
                                            type: Date,
                                            default: Date.now
                                        },
                                        recruiter_name: String,
                                        applicants: {type: Array, default: []}
                                    }, {collection: 'posts'})

export default postsSchema;