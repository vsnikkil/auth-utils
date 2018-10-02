import { pbkdf2 , randomBytes } from "crypto";

/**
 * Generate random bytes
 */
export const generateRandomBytes = async (len = 64) => new Promise((resolve, reject) => {
    randomBytes(len, (error, buffer) => {
        if (error) {
            reject(error);
        }

        resolve(buffer);
    });
});

/**
 * Generate digest with pbkdf2
 */
export const generateHash = async (password, {
    iterations = 1e5,
    keylen = 255,
    digest = "sha512",
    salt,
} = {}) => {
    const saltProvided = salt !== undefined;
    
    if (!saltProvided) {
        salt = await generateRandomBytes();
    }

    const hash = await new Promise((resolve, reject) => {
        pbkdf2(password, salt, iterations, keylen, digest,
            (error, derivedKey) => {
                if (error) {
                    reject(error);
                }

                resolve(derivedKey);
            }
        );
    });

    if (saltProvided) return hash;
    
    return [salt, hash];
};
