import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

// Add your credentials below. First, you need to get credentials from the Secrets API: https://secrets-api.appbrewery.com
const myUsername = "YOUR_USERNAME";
const myPassword = "YOUR_PASSWORD";
const myAPIKey = "YOUR_API_KEY";
const myBearerToken = "YOUR_BEARER_TOKEN";

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/noAuth", async (req, res) => {

  try {
    const response = await axios.get(`${API_URL}random`);
    res.render("index.ejs", { content: JSON.stringify(response.data) });
  
  } catch(error) {
    console.log(error.message);
  }
});

app.get("/basicAuth", async (req, res) => {

  try {
    const response = await axios.get(`${API_URL}all?page=2`, {
      auth: {
        username: myUsername,
        password: myPassword
      },
    });
    res.render("index.ejs", { content : JSON.stringify(response.data) })

  } catch(error) {
    console.log(error.message);
  }
});

app.get("/apiKey", async (req, res) => {

  try {
    const response = await axios.get(`${API_URL}filter?score=5`, {
      params: {
        apiKey: myAPIKey
      },
    });

    res.render("index.ejs", { content : JSON.stringify(response.data) })

  } catch(error) {
    console.log(error);
  }
});

app.get("/bearerToken", async (req, res) => {

  try {
    const response = await axios.get(`${API_URL}secrets/42`, {
      headers: {
        Authorization: `Bearer ${myBearerToken}`
      },
    });

    res.render("index.ejs", { content : JSON.stringify(response.data)} );

  } catch(error) {
    console.log(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
