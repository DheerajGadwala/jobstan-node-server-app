import bookmarksModel from "./bookmarks-model.js";

export const createBookmark = async (bookmark) =>
    await bookmarksModel.create(bookmark)

export const deleteBookmark = async(bookmark_id) =>
    await bookmarksModel.deleteOne({_id: bookmark_id});

export const getBookmark = async (post_id, user_id) => {
    return await bookmarksModel.findOne({post_id: post_id, user_id: user_id});
};
