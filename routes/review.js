const express = require("express");
const router = express.Router({mergeParams: true});
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const reviewCotroller = require("../controller/review.js");

//ADD REVIEW
router.post("/",validateReview,isLoggedIn,wrapAsync(reviewCotroller.addReview));

//DELETE REVIEW
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewCotroller.destroyReview));

module.exports = router;


