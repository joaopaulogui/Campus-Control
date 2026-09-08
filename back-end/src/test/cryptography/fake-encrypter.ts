import type { Encrypter } from "../../cryptography/encrypter";

export class FakeEncrypter implements Encrypter {
    async encrypt(payload: Record<string, unknown>): Promise<string> {
        return JSON.stringify(payload)
    }

    async decrypt<T = Record<string, unknown>>(token: string): Promise<T> {
        return JSON.parse(token)
    }
}