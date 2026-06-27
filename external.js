let id = ['a', 'b', 'c', 'd', 'e'];
let tx = [];
let txCount = [];
let txSp = 20; // テキストの表示速度
let dly = 0; // 次の文章までの待ち時間
let count = 0;

const changetex = [
  ['&nbsp;You scratch my back,&nbsp;', '&nbsp;I&apos;ll hit your face.&nbsp;', ' ', ' ', ' '],
  ['&nbsp;"So distribution should undo excess,&nbsp;', '&nbsp;And each man have enough."&nbsp;', ' ', ' ', ' '],
  ['&nbsp;Those who commit suicide are for the most part as Régnier depicted,&nbsp;', '&nbsp;unaware of their real motivation. Suicide, as with all our actions,&nbsp;', '&nbsp;involves a complexity of motiesv. In my case, I am driven by,&nbsp;', '&nbsp;at the very least, a vague sense of unease:&nbsp;', '&nbsp;some indistinct sense of unease towards my future.&nbsp;'],
  ['&nbsp;On the train, I looked around at the other passengers.&nbsp;', '&nbsp;They looked just like livestock.&nbsp;', ' ', ' ', ' ']
];
const changeimg = [
  "img/main1.jpg", "img/main2.jpg", "img/main3.jpg"
]
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const rantex = getRandomInt(changetex.length);
const ranimg = getRandomInt(changeimg.length);

function randomEvent() {
  for (n = 0; n < id.length; n++) {
    let newtext = document.getElementById(id[n]).textContent;
    document.getElementById(id[n]).textContent = changetex[rantex][n];
  }
  myImage.src = changeimg[ranimg];
}
window.onload = function () {
  randomEvent();
  kamikakushi();
  countSet();
  itimozi()
}
function countSet() { // 文字数カウントの初期設定
  for (n = 0; n < id.length; n++) {
    txCount[n] = 0;
  }
}
function kamikakushi() { // 要素を取得して非表示（opacity:0;）にする
  for (i = 0; i < id.length; i++) {
    id[i] = document.getElementById(id[i]);
    tx[i] = id[i].firstChild.nodeValue; // 初期の文字列
    id[i].innerHTML = '';
  }
}
function itimozi() { // 一文字ずつ表示
  id[count].innerHTML = tx[count].substr(0, ++txCount[count]) + "_"; // テキストの指定した数の間の要素を表示
  if (tx[count].length != txCount[count]) { // Count が初期の文字列の文字数と同じになるまでループ
    setTimeout("itimozi()", txSp); // 次の文字へ進む
  } else {
    id[count].innerHTML = tx[count].substr(0, ++txCount[count]); // テキストの指定した数の間の要素を表示
    count++; // 次の段落に進む為のカウントアップ
    if (count != id.length) { // id数が最後なら終了
      setTimeout("itimozi()", dly); // 次の段落へ進む
    }
  }
}

window.addEventListener('load', () => {
  const img = document.getElementById('myImage');
  setTimeout(() => {
    img.classList.add('visible');
  }, 400);
});

// 投稿データ（画像・動画対応）
const posts = [
  {
    text: "テストだよ。画像、リンクが貼れるよ。",
    time: "2026/6/27",
    image: "",
    link: "https://www.pixiv.net/users/23562545"
  },
  {
    text: "Webサイト、爆誕。",
    time: "2026/6/27",
    image: "",
    link: null
  }
];

// 投稿のレンダリング
function renderPosts() {
  const container = document.getElementById('timeline');
  container.innerHTML = '';
  posts.forEach(post => {
    const postEl = document.createElement('div');
    postEl.className = 'x-post';
    let mediaHTML = '';
    if (post.link) {
      mediaHTML = `
          <a href="${post.link}" target="_blank" rel="noopener noreferrer">${post.link}</a>
      `;
    } else if (post.image) {
      mediaHTML = `
        <div class="x-post-media">
          <img src="${post.image}">
        </div>
      `;
    }
    postEl.innerHTML = `
      <div class="x-post-content noselect">${post.text.replace(/\n/g, '<br>')}</div>
      ${mediaHTML}
      <div class="x-post-meta noselect">
        <span>${post.time}</span>
      </div>
    `;
    container.appendChild(postEl);
  });
}

window.addEventListener('DOMContentLoaded', renderPosts);
