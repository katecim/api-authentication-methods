import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com/";

const myUsername = "Kate";
const myPassword = "1234";
const myAPIKey = "a4fa1794-146f-4da7-b66b-0c4c9ac00e30";
const myBearerToken = "8e9633b2-7413-49f0-a123-c735ef46ff77";

app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
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
