import {Cipher, createCipher, createDecipher, Decipher, HexBase64BinaryEncoding, Utf8AsciiBinaryEncoding} from 'crypto';

const PASSWORD = 'adsfds221213askjldfk!-dsd@sdafas asd asjsda';

export default class Crypto {
    private static ALGORITHM = 'aes-256-ctr';
    private static INPUT_ENCODING: Utf8AsciiBinaryEncoding = 'utf8';
    private static OUTPUT_ENCODING: HexBase64BinaryEncoding = 'hex';

    private password: string;
    private cipher: Cipher;
    private decipher: Decipher;

    constructor(password: string = PASSWORD) {
        this.password = password;
        this.cipher = createCipher(Crypto.ALGORITHM, this.password);
        this.decipher = createDecipher(Crypto.ALGORITHM, this.password);
    }

    encrypt(plainText: string): string {
        return this
            .cipher
            .update(plainText, Crypto.INPUT_ENCODING, Crypto.OUTPUT_ENCODING) + this.cipher.final(Crypto.OUTPUT_ENCODING);
    }

    decrypt(encryptedText: string): string {
        return this
            .decipher
            .update(encryptedText, Crypto.OUTPUT_ENCODING, Crypto.INPUT_ENCODING) + this.decipher.final(Crypto.INPUT_ENCODING);
    }
}