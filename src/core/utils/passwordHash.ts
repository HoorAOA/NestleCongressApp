export const hashPassword = async (password: string): Promise<string> => {
    if (!password) {
        return '';
    }

    const cryptoObject = (globalThis as any).crypto;
    const TextEncoderCtor = (globalThis as any).TextEncoder;

    if (!cryptoObject || !cryptoObject.subtle || !TextEncoderCtor) {
        return password;
    }

    const encoded = new TextEncoderCtor().encode(password);
    const digest = await cryptoObject.subtle.digest('SHA-256', encoded);

    return Array.from(new Uint8Array(digest))
        .map(byte => byte.toString(16).padStart(2, '0'))
        .join('');
};
