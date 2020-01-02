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
app.use(express.static( "public"));

//bodyParserを使用
app.use(bodyParser.urlencoded({extended: true}));

//トップページにアクセスされた場合
app.get("/", async (req, res) => {
    res.render('index', {
        title: "dresscode",
    });
});

//画像を保存するページ
app.get("/collect", async(req, res) =>{
    res.render('saveImage',{
        title:"dresscode"
    });
});

//服を判定するページ
app.get("/judgement",async(req,res)=>{
    /*スクボの全データを取得してくる*/
    const scrapboxData = await getScrapBox(projectURL);
    /*"#tops"タグのついた記事を抽出して配列に格納*/
    const tops = scrapboxData.pages.filter(page => page.descriptions.includes("#tops"));
    /*"#activity"タグのついた記事を抽出して配列に格納*/
    const bottoms = scrapboxData.pages.filter(page => page.descriptions.includes("#bottoms"));
    /*"#baddresscode"タグのついた記事を抽出して配列に格納*/
    const baddresscode = scrapboxData.pages.filter(page => page.descriptions.includes("#BadDresscode"));
    
    res.render('search',{
        title:"dresscode",
        baddress: baddresscode[1].body,
        topsName_0: tops[0].title,
        topsName_1: tops[1].title,
        topsImage: tops[0].image,
        bottomsName: bottoms[0].title,
        bottomsImage: bottoms[0].image
    });
});

//謎旅を生成する
app.get("/api/generate", async (req, res) => {
    /*スクボの全データを取得してくる*/
    const scrapboxData = await getScrapBox(projectURL);
    /*"#tops"タグのついた記事を抽出して配列に格納*/
    const tops = scrapboxData.pages.filter(page => page.descriptions.includes("#tops"));
    /*"#activity"タグのついた記事を抽出して配列に格納*/
    const bottoms = scrapboxData.pages.filter(page => page.descriptions.includes("#bottoms"));
    /*ランダムなペアを取得する*/
    const randomPair = getRandomPair(tops, bottoms);

    res.render('suggest', {
        title: "dresscode",
        topsName: randomPair[0].title,
        topsImage: randomPair[0].image,
        bottomsName: randomPair[1].title,
        bottomsImage: randomPair[1].image
    });
});

app.listen(port, () => {
    console.log("server is ready>:)");
});
