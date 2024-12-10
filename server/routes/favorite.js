const express = require('express');
const router = express.Router();
const { Favorite } = require('../models/Favorite')

router.post('/favoriteNumber', async (req, res) => {    
    try {
        // mongoDB 에서 favorite 숫자를 가져오기
        const info = await Favorite.find({ "movieId": req.body.movieId });
    
        // 그다음에 프론트에 다시 숫자 정보를 보내주기
        return res.status(200).json({ success: true, favoriteNumber: info.length })

    }
    catch(err) {
        return res.status(400).json({ success: false, message: err.message })
    }
})

router.post('/favorited', async (req, res) => {    
    try {
        // 내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB에서 가져오기
        const info = await Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom });    
        let result = false;
        if (info.length !== 0) {
            result = true;
        }

        return res.status(200).json({ success: true, favorited: result })
    }
    catch(err) {
        return res.status(400).json({ success: false, message: err.message })
    }
})

router.post('/removeFromFavorite', async (req, res) => {    
    try {        
        await Favorite.findOneAndDelete({ movieId: req.body.movieId, userFrom: req.body.userFrom })

        return res.status(200).json({ success: true })
    }
    catch(err) {
        return res.status(400).json({ success: false, message: err.message })
    }
})

router.post('/addToFavorite', async (req, res) => {    
    try {
        const favorite = new Favorite(req.body)
        await favorite.save();

        return res.status(200).json({ success: true })
    }
    catch(err) {
        return res.status(400).json({ success: false, message: err.message })
    }
})

module.exports = router;
