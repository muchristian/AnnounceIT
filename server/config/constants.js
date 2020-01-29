export default {
    PORT: process.env.PORT || 3000,
    PROXY: process.env.PROXY || '/api/v2',
    JwtPrivateKey:  process.env.jwtKey || "jwtprivatekey"
};