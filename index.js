const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

const BlogPost = require('./models/blog');

mongoose.connect('mongodb://127.0.0.1:27017/mongooseAssociation', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Connected to MongoDB on ${db.host}:${db.port}`);
});

db.on('error', (err) => {
  console.log(`Error: ${err}`);
});

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('This is the GET / route.');
});

app.get('/blog', (req, res) => {
  BlogPost.create({
    title: 'Mongoose for All Mongoose',
    body: 'This is a super cool post.'
  });

  const post2 = new BlogPost({
    title: 'SEI 1019',
    body: `Software engineers are nerds, and they're proud of it.`
  });
  post2.save();

  res.send('Post completed.');
});

app.get('/comment', (req, res) => {
  const post3 = new BlogPost({
    title: 'Rad Post',
    body: 'This post is straight from 1993.'
  });

  const myComment = {
    header: 'What a Dummy',
    content: 'He needs to give it a rest.'
  };
  post3.comments.push(myComment);

  post3.save();

  res.send('Post with comment completed.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`The server is up and running on PORT ${PORT}`);
});
