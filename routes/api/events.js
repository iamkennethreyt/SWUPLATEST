const Validator = require("validator");

const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Event model
const Event = require("../../models/Event");

// @route   GET api/posts
// @desc    Get posts
// @access  Public
router.get("/", (req, res) => {
  Event.find()
    .sort({ date: -1 })
    .then(posts => res.json(posts))
    .catch(err => res.status(404).json({ nopostsfound: "No events found" }));
});

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    if (Validator.isEmpty(req.body.title)) {
      return res.status(404).json({ title: "Title Field is Required" });
    }

    if (Validator.isEmpty(req.body.details)) {
      return res.status(404).json({ details: "Details Field is Required" });
    }

    if (Validator.isEmpty(req.body.date)) {
      return res.status(404).json({ Date: "Date Field is Required" });
    }

    const newPost = new Event({
      title: req.body.title,
      details: req.body.name,
      date: req.body.date
    });

    newPost.save().then(post => res.json(post));
  }
);

// @route   DELETE api/posts/:id
// @desc    Delete post
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Event.findById(req.params.id)
      .then(post => {
        // Delete
        post.remove().then(() => res.json({ success: true }));
      })
      .catch(err => res.status(404).json({ postnotfound: "No post found" }));
  }
);

module.exports = router;
