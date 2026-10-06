import { compare, hash } from "bcryptjs";
import type { HashComparer } from "../hash-comparer";
import type { HashGenerator } from "../hash-generator";

export class BcryptHasher implements HashGenerator, HashComparer {
    hash(plain: string): Promise<string> {
        return hash(plain, 8)
    }

    compare(plain: string, hash: string): Promise<boolean> {
        return compare(plain, hash)
    }
}