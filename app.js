const express = require("express");
const moment = require('moment');
const bodyParser = require("body-parser");
moment.locale('ja');
const app = express();
const getScrapBox = require("./utils/getScrapBox");
const getRandomPair = require("./utils/getRandomPair");
const port = process.env.PORT || 3000;
const projectURL = process.env.PROJECT_URL || "dresscode";

//EJSをViewエンジンとして用いるよう設定
app.set("view engine", "ejs");
app.use( express.static( "image" ) );

//bodyParserを使用
app.use(bodyParser.urlencoded({extended: true}));

//トップページにアクセスされた場合
app.get("/", async (req, res) => {
    res.render('index', {
        title: "dresscode",
    });
});

//謎旅を生成する
app.get("/api/generate", async (req, res) => {
    /*スクボの全データを取得してくる*/
    const scrapboxData = await getScrapBox(projectURL);
    /*"#tops"タグのついた記事を抽出して配列に格納*/
    const places = scrapboxData.pages.filter(page => page.descriptions.includes("#tops"));
    /*"#activity"タグのついた記事を抽出して配列に格納*/
    const activities = scrapboxData.pages.filter(page => page.descriptions.includes("#bottoms"));
    /*ランダムなペアを取得する*/
    const randomPair = getRandomPair(places, activities);

    res.render('suggest', {
        title: "dresscode",
        placeName: randomPair[0].title,
        placeImage: randomPair[0].image,
        activityName: randomPair[1].title,
        activityImage: randomPair[1].image
    });
});

app.listen(port, () => {
    console.log("server is ready>:)");
});
