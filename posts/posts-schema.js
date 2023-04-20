import mongoose from "mongoose";

const postsSchema = mongoose.Schema({
                                        title: String,
                                        pay: Number,
                                        description: String,
                                        skills: String,
                                        company: String,
                                        recruiter_id: String,
                                        applicants: {type: Array, default: []}
                                    }, {collection: 'posts'})

export default postsSchema;