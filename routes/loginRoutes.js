const express = require('express');

const router = express.Router();
const User = require('../model/UserModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//login
router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }

        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email, rank: user.rank },
                process.env.TOKEN_KEY,
            )
            user.token = token;
            return res.status(200).json(user)
        }
        res.status(400).send("Invalid credentials");
    }
    catch (err) {
        console.log(err);
    }
})

module.exports = router;