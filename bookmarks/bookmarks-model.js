import mongoose from "mongoose";
import bookmarksSchema from "./bookmarks-schema.js";

const bookmarksModel = mongoose.model('BookmarksModel', bookmarksSchema)

export default bookmarksModel