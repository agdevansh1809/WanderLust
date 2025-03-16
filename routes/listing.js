const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}= require("../middleware.js");
const listingController = require("../controller/listing.js");
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

router.route("/")
.get(wrapAsync(listingController.index)) //INDEX ROUTE
.post(isLoggedIn,validateListing,upload.single('listing[image]'), wrapAsync(listingController.addListing)); //ADD ROUTE

//ADD ROUTE PAGE
router.get("/new", isLoggedIn,listingController.renderNewForm);

router.route("/:id")
.get(wrapAsync(listingController.showListing)) //SHOW ROUTE
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(listingController.editListing)) //EDIT ROUTE
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing)); //DELETE ROUTE

//EDIT ROUTE PAGE
router.get("/:id/edit", isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

module.exports= router;