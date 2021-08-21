const speakeasy = require("speakeasy");

module.exports = {
    otpGenerate() {
        let secret = speakeasy.generateSecret({ length: 20 });
        let token = speakeasy.totp({
            secret: secret.ascii,
            algorithm: 'sha256',
            counter: 1
        });
        let SecretToStr = JSON.stringify(secret);
        let SecretToB64 = Buffer.from(SecretToStr).toString("base64");
        return {
            otpKey: token,
            otpSecret: SecretToB64
        }
    }
}