import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing or malformed.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("TOKEN:", token);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("DECODED TOKEN:", decoded);

    const userId =
      decoded?.user_id ||
      decoded?.userId ||
      decoded?.id ||
      decoded?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Invalid token payload.",
      });
    }

    req.user = decoded;
    req.userId = userId;

    next();

  } catch (error) {
    console.error("AUTH JWT ERROR:", error.name);
    console.error("AUTH JWT MESSAGE:", error.message);

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
      error: error.message, // temporary
    });
  }
};

export default requireAuth;