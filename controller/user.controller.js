const User = require("../model/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userController = {};

userController.createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({name: name});

        if(user) {
            throw new Error('이미 가입되어 있는 유저입니다');
        }

        //패스워드 암호화
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        // console.log('hash', hash);

        const newUser = new User({ name, email, password:hash });
        await newUser.save();
        res.status(200).json({ status: 'success', userData: newUser });

    } catch (error) {
        res.status(400).json({ status: 'fail', error: error });
    }
}

userController.loginUser = async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ name:name }, "-createdAt -updatedAt -__v");
        if(user) {
            //bcrypt에서 유저가 입력한 패스워드와 암호화된 패스워드가 일치하는지 비교해주는 로직.
            const isMath = bcrypt.compareSync(password, user.password);
            if(isMath) {
                const token = user.generateToken();
                return res.status(200).json({ status: 'success', user, token });
            }
        }
        throw new Error('아이디 또는 비밀번호가 일치하지 않습니다')
    } catch (error) {
        res.status(400).json({ status: 'fail', error: error });
    }
}

module.exports = userController;