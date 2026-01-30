import aj from "../utils/arcjet.js";
import { isSpoofedBot } from "@arcjet/inspect";

export const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req);
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ msg: "Too Many Requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ msg: "No bots allowed" });
      } else {
        return res.status(403).json({ msg: "Forbidden" });
      }
    } else if (decision.results.some(isSpoofedBot)) {
      res.status(403).end(JSON.stringify({ error: "Forbidden" }));
    }
    next();
  } catch (err) {
    console.err("Arcjet middleware error", err);
    next();
  }
};
