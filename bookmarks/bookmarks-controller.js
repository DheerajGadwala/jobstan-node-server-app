import * as bookmarksDao from './bookmarks-dao.js';

const BookmarksController = (app) => {

    const createBookmark = async (req, res) => {
        const bookmark = req.body;
        const currentBookmark = await bookmarksDao.createBookmark(bookmark);
        res.json(currentBookmark);
    }

    const deleteBookmark = async (req, res) => {
        const bookmarkId = req.params.bookmark_id;
        const status = await bookmarksDao.deleteBookmark(bookmarkId);
        res.json(bookmarkId);
    }

    const getBookmarks = async (req, res) => {
        let bookmarks = await bookmarksDao.findAllBookmarks();
        res.json(bookmarks);
    };

    app.post('/createBookmark', createBookmark);
    app.delete('/deleteBookmark/:bookmark_id', deleteBookmark);
    app.get('/getBookmarks', getBookmarks);
}

export default BookmarksController