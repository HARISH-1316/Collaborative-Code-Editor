export const isLoggedIn = async (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log("abcde");
    return next();
  } else {
    res.json({
      failure: true,
      message: "User is not authenticated",
    });
  }
};
