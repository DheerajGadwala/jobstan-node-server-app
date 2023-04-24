import mongoose from "mongoose";

const bookmarksSchema = mongoose.Schema({
                                        post_id: String,
                                        user_id: String
                                    }, {collection: 'bookmarks'})

export default bookmarksSchema;