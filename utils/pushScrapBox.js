/*スクボに書き込む関数*/
const axios = require("axios");

const pushScrapBox = (projectURL, pageName, body) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://scrapbox.io/${projectURL}/${pageName}?body=${body}`)
            .then(response => {
                if (response.status === 200) {
                    resolve(response);
                } else {
                    reject(response);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
};

//他の箇所(app.js等)でも使えるようにエクスポートする
module.exports = pushScrapBox;