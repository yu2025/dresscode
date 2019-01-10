/*2つの配列を引数にとってその中からランダムな組み合わせを選んでペアとして返す関数*/

const getRandomPair = (array1, array2) => {
    const randomItem1 = array1[Math.floor(Math.random() * array1.length)];
    const randomItem2 = array2[Math.floor(Math.random() * array2.length)];

    return [randomItem1, randomItem2];
};

//他の箇所(app.js等)でも使えるようにエクスポートする
module.exports = getRandomPair;