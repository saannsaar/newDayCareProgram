const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const DaycareWorker = require('../models/DaycareWorker')
const Parent = require('../models/Parent')
const logger = require('../utils/logger')
loginRouter.post('/', async (request, response) => {
   
    const {email, password, user_type} = request.body
    
    if (user_type === 'worker_user') {
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
        id: user.id,
    }

    //Tokenin voimassaoloaika on 60*60 sekuntia, eli 1 tunti
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: 60*60})

    response.status(200).send({token, email: user.email, name: user.name, id: user.id, user_type})
    }
    
    if (user_type === 'parent_user') {
        const user = await Parent.findOne({email})
        // Tsekataan onko pyynnön mukana oleva "password" oikea, koska
    //tietokantaan ei ole talletettu salasanaa vaan hash, tehdään bcrypt.compare metodilla vertailu
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)

    // Jos väärä käyttäjä tai ei ole olemassa vastataan 401 unauthorized
    if (!(user && passwordCorrect)) {
        logger.error(`LOGINERROR, USER ${user.email}, ERRORMESSAGE: Invalid email or password`)
        return response.status(401).json({error: "invalid email or password"})
        
    }

    const userForToken = {
        email: user.email,
        id: user.id,
    }

    //Tokenin voimassaoloaika on 60*60 sekuntia, eli 1 tunti
    const token = jwt.sign(userForToken, process.env.JWT_SECRET, {expiresIn: 60*60})

    response.status(200).send({token, email: user.email, name: user.name, id: user.id, user_type})
    }
    
})

module.exports = loginRouter