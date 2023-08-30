const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const DaycareWorker = require('../models/DaycareWorker')

loginRouter.post('/', async (request, response) => {
    const {email, password} = request.body
    // Etsitään pyynnön mukana olevaa "email"ia vastaavaa käyttäjää tietokannasta
    const user = await DaycareWorker.findOne({email})
    // Tsekataan onko pyynnön mukana oleva "password" oikea, koska
    //tietokantaan ei ole talletettu salasanaa vaan hash, tehdään bcrypt.compare metodilla vertailu
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    // Jos väärä käyttäjä tai ei ole olemassa vastataan 401 unauthorized
    if (!(user && passwordCorrect)) {
        return response.status(401).json({error: "invalid email or password"})
    }

    const userForToken = {
        email: user.email,
        id: user._id,
    }

    //Tokenin voimassaoloaika on 60*60 sekuntia, eli 1 tunti
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: 60*60})

    response.status(200).send({token, email: user.email, name: user.name})
})

module.exports = loginRouter