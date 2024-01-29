import jwt from 'jsonwebtoken'

// signing jwt
export async function signJwtToken(payload:any, options = {}) {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET!;
    const token = jwt.sign(payload, secret, options);
    return token;
}


// verifying jwt
export function verifyJwtToken(token:any) {
    try {
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET!;
        const payload = jwt.verify(token, secret);
        return payload;
    } catch (error) {
        console.error(error);
        return null;
    }
}