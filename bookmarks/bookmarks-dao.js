import bookmarksModel from "./bookmarks-model.js";

export const createBookmark = async (bookmark) =>
    await bookmarksModel.create(bookmark)

export const deleteBookmark = async(bookmark_id) =>
    await bookmarksModel.deleteOne({_id: bookmark_id});

export const findAllBookmarks = async () =>
    await bookmarksModel.find()
