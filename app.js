const express = require("express");
const app = express();
const getScrapBox = require("./utils/getScrapBox");
const port = process.env.PORT || 3000;
const projectURL = process.env.PROJECT_URL || "nazotabi";

//EJSをViewエンジンとして用いるよう設定
app.set("view engine", "ejs");

//トップページにアクセスされた場合
app.get("/", async (req, res) => {
    res.render('index', {
        title: "Nazotabi",
    });
});

app.get("/generate", async (req, res) => {
    const scrapboxData = await getScrapBox(projectURL);
    const filteredData = scrapboxData.pages.filter(page => !page.descriptions.includes("#メタデータ"));
    res.render('index', {
        title: "TouchSqueeze",
        filteredList: filteredData
    });
});

app.listen(port, () => {
    console.log("server is ready>:)");
});