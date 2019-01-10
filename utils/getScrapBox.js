const axios = require("axios");

//scrapboxからデータを取得する関数
//引数としてプロジェクト名を取る
//"nazotabi"を渡すと"https://scrapbox.io/nazotabi"のコンテンツを全部取得してくる
const getScrapBox = (projectURL) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://scrapbox.io/api/pages/${projectURL}`)
            .then(response => {
                resolve(response.data);
            })
            .catch(e => {
                reject(e);
            });
    });
};

//他の箇所(app.js等)でも使えるようにエクスポートする
module.exports = getScrapBox;