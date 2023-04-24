import * as bookmarksDao from './bookmarks-dao.js';

const BookmarksController = (app) => {

    const createBookmark = async (req, res) => {
        const bookmark = req.body;
        console.log("reach node server")
        const currentBookmark = await bookmarksDao.createBookmark(bookmark);
        res.json(currentBookmark);
    }

    const deleteBookmark = async (req, res) => {
        const bookmarkId = req.params.bookmark_id;
        const status = await bookmarksDao.deleteBookmark(bookmarkId);
        res.json(bookmarkId);
    }

    const checkBookmark = async (req, res) => {
        // console.log("reach check node server");
        const bookmarkId = req.params.id;
        const [postId, userId] = bookmarkId.split(',');
        const bookmark = await bookmarksDao.getBookmark(postId, userId);
        // console.log(bookmark);
        // console.log("------------------------------")

        if (bookmark) {
            res.status(200).json({ message: 'true', bookmark: bookmark });
        } else {
            console.log(postId);
            res.status(404).json({ message: 'false' });
        }
    };

    app.post('/createBookmark', createBookmark);
    app.delete('/deleteBookmark/:bookmark_id', deleteBookmark);
    app.get('/checkBookmark/:id', checkBookmark);
}

export default BookmarksController