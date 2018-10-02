const assert = require("assert");
const { generateHash, generateRandomBytes } = require("../dist/password");

const test = async () => {
    const testPassword = "test123";
    const salt = await generateRandomBytes();
    const hash = await generateHash(testPassword, { salt });

    // should generate same digest again
    assert.strictEqual(
        hash.compare(await generateHash(testPassword, { salt })),
        0
    );
};

test();
