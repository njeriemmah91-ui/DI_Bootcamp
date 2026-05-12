// server.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Parser = require("rss-parser");
const path = require("path");

const app = express();
const parser = new Parser();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "public/pages"));

const RSS_URL = "https://thefactfile.org/feed/";

// Function to get all posts
async function getPosts() {
  const feed = await parser.parseURL(RSS_URL);

  return feed.items.map((item) => {
    return {
      title: item.title || "No Title",
      link: item.link || "#",
      pubDate: item.pubDate || "No Date",
      creator: item.creator || "Unknown",
      categories: item.categories || [],
      content:
        item.contentSnippet ||
        item.content ||
        "No content available",
    };
  });
}

// HOME PAGE - ALL POSTS
app.get("/", async (req, res) => {
  try {
    const posts = await getPosts();

    res.render("index", { posts });
  } catch (error) {
    res.send("Error loading RSS Feed");
  }
});

// SEARCH PAGE
app.get("/search", (req, res) => {
  res.render("search", { posts: [] });
});

// SEARCH BY TITLE
app.post("/search/title", async (req, res) => {
  try {
    const title = req.body.title.toLowerCase();

    const posts = await getPosts();

    const filteredPosts = posts.filter((post) =>
      post.title.toLowerCase().includes(title)
    );

    res.render("search", { posts: filteredPosts });
  } catch (error) {
    res.send("Error searching by title");
  }
});

// SEARCH BY CATEGORY
app.post("/search/category", async (req, res) => {
  try {
    const category = req.body.category.toLowerCase();

    const posts = await getPosts();

    const filteredPosts = posts.filter((post) =>
      post.categories.some((cat) =>
        cat.toLowerCase().includes(category)
      )
    );

    res.render("search", { posts: filteredPosts });
  } catch (error) {
    res.send("Error searching by category");
  }
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});