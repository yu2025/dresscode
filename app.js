const express = require("express");
const moment = require('moment');
const bodyParser = require("body-parser");
moment.locale('ja');
const app = express();
const getScrapBox = require("./utils/getScrapBox");
const getRandomPair = require("./utils/getRandomPair");
const pushScrapBox = require("./utils/pushScrapBox");
const port = process.env.PORT || 3000;
const projectURL = process.env.PROJECT_URL || "nazotabi";

//EJSをViewエンジンとして用いるよう設定
app.set("view engine", "ejs");

//bodyParserを使用
app.use(bodyParser.urlencoded({extended: true}));

//トップページにアクセスされた場合
app.get("/", async (req, res) => {
    res.render('index', {
        title: "Nazotabi",
    });
});

//謎旅を生成する
app.get("/api/generate", async (req, res) => {
    /*スクボの全データを取得してくる*/
    const scrapboxData = await getScrapBox(projectURL);
    /*"#place"タグのついた記事を抽出して配列に格納*/
    const places = scrapboxData.pages.filter(page => page.descriptions.includes("#place"));
    /*"#activity"タグのついた記事を抽出して配列に格納*/
    const activities = scrapboxData.pages.filter(page => page.descriptions.includes("#activity"));
    /*ランダムなペアを取得する*/
    const randomPair = getRandomPair(places, activities);

    res.render('suggest', {
        title: "Nazotabi",
        placeName: randomPair[0].title,
        placeImage: randomPair[0].image,
        activityName: randomPair[1].title,
        activityImage: randomPair[1].image
    });
});

//良い謎旅をScrapBoxに登録する
//ブラウザでスクボを実行していないとスクボには書き込めないのでサーバーから書き込むのはなし
// app.post("/api/good", async (req, res) => {
//     const pushMessage = `${req.body.good_trip} ${moment().format('YYYY-MM-DD-HH-MM')}`;
//     console.log(pushMessage);
//     console.log(encodeURIComponent(pushMessage));
//     const request = await pushScrapBox("nazotabi","GoodNazotabi",encodeURIComponent(pushMessage)).catch(error => {
//         console.log(error);
//         res.status(404).end();
//     });
//     console.log(request.status);
//     res.status(200).end();
// });

// //イマイチな謎旅をScrapBoxに登録する
// app.post("/api/bad", async (req, res) => {
//     const pushMessage = `${req.body.bad_trip} 理由: ${req.body.bad_reason} ${req.body.bad_reason_text} ${moment().format('YYYY-MM-DD-HH-MM')}`;
//     console.log(pushMessage);
//     console.log(encodeURIComponent(pushMessage));
//     const request = await pushScrapBox("nazotabi","BadNazotabi",encodeURIComponent(pushMessage)).catch(error => {
//         console.log(error);
//         res.status(404).end();
//     });
//     console.log(request.status);
//     res.status(200).end();
// });

app.listen(port, () => {
    console.log("server is ready>:)");
});