import type { Encrypter } from "../encrypter";
import jwt, { type SignOptions, type VerifyOptions } from "jsonwebtoken"

export class JwtEncrypter implements Encrypter {
    constructor(
        private readonly privateKey: string,
        private readonly signOptions?: SignOptions,
    ) {}

    async encrypt(payload: Record<string, unknown>): Promise<string> {
        const bufferPrivateKey = Buffer.from(this.privateKey, "base64")

        return new Promise((resolve, reject) => {
            jwt.sign(payload, bufferPrivateKey, { ...this.signOptions, algorithm: "RS256" },
                (err, token) =>{
                    if(err || !token) {
                        return reject(err ?? new Error())
                    }
                    resolve(token)
                }
            )
        })
    }
}