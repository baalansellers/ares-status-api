import express from "express";
import cors from "cors";
import axios from "axios";
import cheerio from "cheerio";

const PORT = process.env.PORT || 8080;

const app = express();
const corsOptions: cors.CorsOptions = {
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/skywarn-status", async (req, res) => {
  const resp = await axios.get("https://srcares.dreamhosters.com/activation/");
  const $ = await cheerio.load(resp.data);

  const imageURL = $("figure.skywarn-status img").attr("src");

  //console.log(imageURL);

  res.status(200).send({ imageURI: imageURL });
});

app.get("/ares-status-src", async (req, res) => {
  const resp = await axios.get("https://srcares.dreamhosters.com/activation/");
  const $ = await cheerio.load(resp.data);

  const imageURL = $("figure.ares-status img").attr("src");

  //console.log(imageURL);

  res.status(200).send({ imageURI: imageURL });
});

app.get("/ares-status-nfl", async (req, res) => {
  const resp = await axios.get("https://arrl-nfl.org/ares/activation-status/");
  const $ = await cheerio.load(resp.data);

  //Unfortunately, we'll have to go with the first image in the content div
  const imageURL = $("div.entry-content img").attr("src");

  //console.log(imageURL);

  res.status(200).send({ imageURI: imageURL });
});

app.listen(PORT, () => {
  console.log(`Server started on port:${PORT}. Press Ctrl+C to quit.`);
});
