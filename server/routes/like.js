const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

router.post("/getLikes", async (req, res) => {
    let variable = req.body.movieId ?
        { userId: req.body.userId, movieId: req.body.movieId } :
        { commentId: req.body.commentId }

    try {        
        const likes = await Like.find(variable);

        return res.status(200).json({ success: true, likes })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/getDislikes", async (req, res) => {
    let variable = req.body.movieId ?
        { userId: req.body.userId, movieId: req.body.movieId } :
        { commentId: req.body.commentId }

    try {
        const dislikes = await Dislike.find(variable);

        return res.status(200).json({ success: true, dislikes })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/upLike", async (req, res) => {
    let variable = req.body.movieId ?
        { movieId: req.body.movieId, userId: req.body.userId } :
        { commentId: req.body.commentId, userId: req.body.userId }

    const like = new Like(variable);

    try {
        await like.save();

        await Dislike.findOneAndDelete(variable);

        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/unLike", async (req, res) => {
    let variable = req.body.movieId ?
        { movieId: req.body.movieId, userId: req.body.userId } :
        { commentId: req.body.commentId, userId: req.body.userId }

    try {
        await Like.findOneAndDelete(variable);

        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/upDislike", async (req, res) => {
    let variable = req.body.movieId ?
        { movieId: req.body.movieId, userId: req.body.userId } :
        { commentId: req.body.commentId, userId: req.body.userID }

    const dislike = new Dislike(variable);

    try {
        await dislike.save();

        await Like.findOneAndDelete(variable);

        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

router.post("/unDislike", async (req, res) => {
    let variable = req.body.movieId ?
        { movieId: req.body.movieId, userId: req.body.userId } :
        { commentId: req.body.commentId, userId: req.body.userId }

    try {
        await Dislike.findOneAndDelete(variable);

        return res.status(200).json({ success: true })
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

module.exports = router;
