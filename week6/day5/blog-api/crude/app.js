const express = require('express');
const { fetchPosts } = require('./data/dataService');

const app = express();

app.get('/posts', async (req, res) => {
  try {
    const data = await fetchPosts();
    console.log("Data successfully fetched from API");
    res.json(data);
  } catch (error) {
    res.status(500).send("Error fetching data");
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});