const { User } = require('../models/User');

let auth = async (req, res, next) => {
    // 인증 처리를 하는곳

    // 클라이언트 쿠키에서 토큰을 가져온다.
    let token = req.cookies.w_auth;

    if (!token) {
        // 로그인하지 않은 사용자에 대해 인증이 되지 않음을 알림
        return res.status(200).json({
            isAuth: false,
            message: "Not authenticated",
        });        
    }

    // 토큰을 복호화 한 후 유저를 찾는다.  
    try {  
        const user = await User.findByToken(token);
        console.log("findByToken");
            
        if (!user) return res.json({ isAuth: false, error: true, message: "User not found" });

        req.token = token;
        req.user = user;        
        next();        
    } catch (err) {
        return res.status(401).json({ isAuth: false, error: true, message: "Authentication failed" });
    }
    // 유저가 있으면 인증 OKay
}

module.exports = { auth };
