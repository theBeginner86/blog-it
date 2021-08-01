const mongoose = require('mongoose');
const {Schema} = mongoose;

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
        default: ''
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    author: {
        type: String,
        required: true,
        default: ''
    },
    dateCreated: {
        type: String,
        required: false,
        default: ''
    },
});


BlogSchema.pre('save', async function (next) {
	const blog = this;
    console.log('here');
    const timeElapsed = Date.now();
    const todayDate = new Date(timeElapsed);
    blog.dateCreated = todayDate.toUTCString(); 
	next();
});

module.exports = mongoose.model('Blog', BlogSchema);
