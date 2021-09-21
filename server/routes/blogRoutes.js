const express = require("express");
const router = express.Router();

const User = require("../models/user");
const Blog = require("../models/blog");

const { authenticateToken } = require('../utils/authenticateToken');
const { response } = require("express");

router.post("/compose", authenticateToken, async (req, res) => {
    const {user} = req.userid;
    const authorid = user;
    console.log("here");

    console.log(authorid);

    const {
        title,
        content,
    } = req.body;

    console.log(title, content);

    if (!title){
        return res.send({
            success: false,
            message: "Error: Title cannot be empty"
        });
    }

    if (!content){
        return res.send({
            success: false,
            message: "Error: Content cannot be empty"
        })
    }

    const newBlog = new Blog();
    

    User.find({
        _id: authorid
    }, async (err, authors) => {
        console.log(authors);
        if(err){
            return res.send({
                success: false,
                message: "Error: Server Error"
            })
        } else if (authors.length != 1) {
            return res.send({
                success: false,
                message: "Error: DB Error"
            })
        }

        const author = authors[0];
        const authorName = `${author.firstName} ${author.lastName}`;
        // console.log(author.noOfBlogs);
        const authorBlogNo = author.noOfBlogs + 1;
        // console.log(authorBlogNo);
        // console.log(author);
        // console.log(author._id);
        
        newBlog.title = title;
        newBlog.content = content;
        newBlog.author = authorName;
        newBlog.authorId = author._id;

        try {
            User.findOneAndUpdate(
            { _id: author._id}, 
            { $set: 
                {
                    noOfBlogs: authorBlogNo
                }
            }, null, (err, InfoBeforeUpdation) => {
                if(err){
                    return res.send({
                        success: false,
                        message: "Error: DB Error"
                    })
                }
            });
        } catch (err) {
            res.send({
                success: false,
                message: "Error: DB Error"
            })
        }
    
        newBlog.save((err, response) => {
            if(err){
                console.log("saving server error");
                return res.send({
                    success: false,
                    message: "Error: Server Error"
                });
            }
            console.log(response);
            return res.send({
                success: true,
                message: "Blog saved successfully"
            });
        });
    });
});

router.get("/display/all", async (req, res) => {
    Blog.find({

    }, async (err, blogs) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        return res.send({
            success: true,
            blogs: blogs 
        });
    });
})

router.get("/display/user=:id", authenticateToken, async(req, res) => {
    console.log("wordking", "params: ", req.params.id);
    const userid = req.params.id;
    Blog.find({
        authorId: userid
    }, async (err, blogs) => {
        if(err){
            return res.send({
                succes: false,
                message: "Error: DB Error"
            });
        }

        return res.send({
            success: true,
            blogs: blogs
        });
    });
})

router.post("/delete/blog=:blogid", authenticateToken, async(req, res) => {
    console.log("working params: ",  "blogid: ", req.params.blogid);
    const blogid = req.params.blogid;
    Blog.deleteOne({
        _id: blogid
    }, async(err, response) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        console.log(response);

        return res.send({
            success: true,
            message: "Blog deleted successfully"
        });
    })
});

router.post("/update/blog=:blogid", authenticateToken, async(req, res) => {
    console.log("working params: ",  "blogid: ", req.params.blogid);
    const blogid = req.params.blogid;

    const {
        title,
        content,
    } = req.body;

    console.log(title, content);

    if (!title){
        return res.send({
            success: false,
            message: "Error: Title cannot be empty"
        });
    }

    if (!content){
        return res.send({
            success: false,
            message: "Error: Content cannot be empty"
        })
    }

    Blog.updateOne({
        _id: blogid
    }, {
        $set: {
            title: title,
            content: content
        }
    }, 
    async(err, response) => {
        if(err){
            return res.send({
                success: false,
                message: "Error: DB Error"
            });
        }

        console.log(response);

        return res.send({
            success: true,
            message: "Blog Updated successfully"
        });
    });
});


module.exports = router;
