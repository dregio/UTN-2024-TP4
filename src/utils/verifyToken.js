import jwt from 'jsonwebtoken';
import { SESSION_SECRET } from '../../src/config.js';

export default function verifyToken(token) {
	try {
		return jwt.verify(token, SESSION_SECRET);
	}
	catch (error) {
		throw new Error("Invalid token");
	}
}