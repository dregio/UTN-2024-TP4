import verifyToken from "../utils/verifyToken.js";
import { LangFromReq, msg } from "../utils/multiLanguage.js";

export default function verifyTokenMiddleware(req, res, next) {
	const lang = LangFromReq(req);
	const authString = req.headers.authorization;
	
	if (!authString || !authString.startsWith("Bearer ")) {
		return res.status(401).send(lang.tr(msg.NO_TOKEN_PROVIDED));
	}
	
	try {
		const token = authString.split(" ")[1];
		const verified = verifyToken(token);
		req.user = verified;
		next();
	}
	catch (error) {
		res.status(400).json(lang.resMsjObj(error, msg.INVALID_TOKEN));
	}
}