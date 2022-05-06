const router = require("express").Router();
const Blog = require("../models/blogSchema");

//Create a new blog post
router.post("/create", async (req, res) => {
  try {
    const blogPost = new Blog({
      title: req.body.title,
      desc: req.body.desc,
      img: req.body.img,
      pin: req.body.pin,
      author: req.body.author,
    });
    await blogPost.save();
    const { pin, ...other } = blogPost._doc;
    res.status(201).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
});
//Get a single blog post
router.get("/:id", async (req, res) => {
  const post = await Blog.findById(req.params.id);
  !post && res.status(404).json("Post not Found");
  const { pin, ...other } = post._doc;
  if (req.body.pin === post.pin) {
    res.status(200).json(other);
  } else {
    res.status(203).json("Pin is incorrect");
  }
});

//Update a blog post
router.put("/update/:id", async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (post.author === req.body.id) {
      await post.updateOne({ $set: req.body });
      await post.save();
      const { pin, ...other } = post._doc;
      res.status(200).json(other);
    } else {
      res.status(401).json("You dont have acess to that post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get All of the post from a particluar author
router.get("/author/:id", async (req, res) => {
  try {
    const posts = await Blog.find({ author: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
