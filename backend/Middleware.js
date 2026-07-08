export const isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({
      failure: true,
      message: "User is not authenticated",
    });
  }
};
