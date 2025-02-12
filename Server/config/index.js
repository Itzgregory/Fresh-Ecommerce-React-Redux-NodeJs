const variables = require('./Env/variables')
const dBConecction = require('./DB/connection')
const generateNormalToken = require('./jwt/jwt')
const securityConfig =require('./secuirity/secuirty')
module.exports = {
    variables: variables,
    dBConecction: dBConecction,
    generateNormalToken: generateNormalToken,
    securityConfig: securityConfig

}