export const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.status(401).json({
    success: false,
    code: "NOT_AUTHENTICATED",
    message: "User is not authenticated",
  });
};
