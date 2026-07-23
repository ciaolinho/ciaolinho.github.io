// games data source
const gamesData = [
  {
    "file": "games/home_game.html",
    "title": "森林運動會：球球特攻隊",
    "desc": "幼兒智能動作分析與互動探索遊戲，透過手勢與動作進行趣味特攻挑戰！",
    "category": "steam",
    "icon": "fa-basketball",
    "badge": "熱門首推"
  },
  {
    "file": "games/rock_paper_scissors.html",
    "title": "剪刀石頭布猜拳遊戲",
    "desc": "經典剪刀石頭布，與電腦 AI 進行猜拳對決，看看誰的運氣和速度最快！",
    "category": "adventure",
    "icon": "fa-hand-back-fist",
    "badge": "趣味猜拳"
  },
  {
    "file": "games/space_hero.html",
    "title": "太空小英雄：雷達鎖定與殞石清除",
    "desc": "操控太空梭鎖定太空中漂浮的隕石並進行精準清除，成為捍衛宇宙的小英雄！",
    "category": "adventure",
    "icon": "fa-rocket",
    "badge": "射擊挑戰"
  },
  {
    "file": "games/animal_call.html",
    "title": "動物點名與彩色泡泡彈",
    "desc": "認識森林裡的小動物，並使用彩色泡泡彈和可愛小動物進行互動！",
    "category": "adventure",
    "icon": "fa-paw",
    "badge": "動物認知"
  },
  {
    "file": "games/chase_beast.html",
    "title": "追打馬年獸",
    "desc": "新年傳說挑戰，快速反應追打出沒的年獸，考驗小朋友的手眼協調能力！",
    "category": "adventure",
    "icon": "fa-dragon",
    "badge": "節慶遊戲"
  },
  {
    "file": "games/stationery.html",
    "title": "文具失蹤案",
    "desc": "教室裡的文具不見了？化身偵探尋找隱藏的橡皮擦、鉛筆等文具吧！",
    "category": "adventure",
    "icon": "fa-pen-clip",
    "badge": "偵探解謎"
  },
  {
    "file": "games/vehicles.html",
    "title": "交通工具大認知",
    "desc": "認識路上、海裡、天空中的各種交通工具，完成運輸小任務！",
    "category": "adventure",
    "icon": "fa-car-side",
    "badge": "認知學習"
  },
  {
    "file": "games/chef.html",
    "title": "妙廚遊戲：美味餐廳",
    "desc": "化身小廚師，依據客人的點單調配好吃的料理，學習烹飪步驟與食材搭配！",
    "category": "adventure",
    "icon": "fa-utensils",
    "badge": "模擬經營"
  },
  {
    "file": "games/nature_explorer.html",
    "title": "自然探險家：尋找葉子",
    "desc": "跟著探險小隊認識不同形狀的樹葉、昆蟲與大自然的神奇奧秘！",
    "category": "steam",
    "icon": "fa-compass",
    "badge": "自然觀察"
  },
  {
    "file": "games/money_challenge.html",
    "title": "小小理財家大挑戰",
    "desc": "我的夢想玩具屋理財挑戰！學習如何儲蓄、聰明消費與認識貨幣價值！",
    "category": "steam",
    "icon": "fa-piggy-bank",
    "badge": "理財教育"
  },
  {
    "file": "games/little_doctor.html",
    "title": "小小醫師大冒險",
    "desc": "扮演牙醫或護理師，幫生病的小動物看病、包紮並宣導健康衛教知識！",
    "category": "adventure",
    "icon": "fa-user-doctor",
    "badge": "角色扮演"
  },
  {
    "file": "games/bopomofo_learning.html",
    "title": "注音符號學習樂園",
    "desc": "聲母、韻母趣味拼讀關卡，透過遊戲發音與練習，輕鬆奠定語文基礎！",
    "category": "bopomofo",
    "icon": "fa-graduation-cap",
    "badge": "國語拼音"
  },
  {
    "file": "games/bopomofo_cards.html",
    "title": "注音配對閃卡",
    "desc": "3D翻轉卡牌，挑戰注音符號與單字圖片的拼讀配對，加深識字記憶力！",
    "category": "bopomofo",
    "icon": "fa-address-card",
    "badge": "語文閃卡"
  },
  {
    "file": "games/card_game.html",
    "title": "記憶卡牌遊戲",
    "desc": "翻牌連連看！找出相同圖案的卡牌，考驗小朋友的記憶力與專注度！",
    "category": "bopomofo",
    "icon": "fa-clone",
    "badge": "記憶配對"
  },
  {
    "file": "games/wild_west.html",
    "title": "荒野雙雄生存對決",
    "desc": "西部荒野警匪對決，快速出擊完成限時挑戰，好玩又刺激的敏捷遊戲！",
    "category": "adventure",
    "icon": "fa-gun",
    "badge": "反應訓練"
  },
  {
    "file": "games/checkers.html",
    "title": "歡樂跳棋遊戲",
    "desc": "經典跳棋對奕，和朋友或電腦互相跳過對方棋子，最先抵達終點的人獲勝！",
    "category": "adventure",
    "icon": "fa-chess-board",
    "badge": "益智棋類"
  },
  {
    "file": "games/soap_steam.html",
    "title": "皂肥皂 STEAM 科學",
    "desc": "探索肥皂如何去除細菌的科學原理，製作泡泡並學習洗手衛生好習慣！",
    "category": "steam",
    "icon": "fa-soap",
    "badge": "衛教科學"
  },
  {
    "file": "games/exercise_assessment.html",
    "title": "幼兒動作發展評估表",
    "desc": "幼兒大肌肉、精細動作與協調度之專業發展檢測，掌握孩子的成長黃金期。",
    "category": "admin",
    "icon": "fa-stethoscope",
    "badge": "動作評估"
  },
  {
    "file": "games/class_management.html",
    "title": "班級管理與工具箱",
    "desc": "教師班級管理專用表格與計分板工具，協助維持秩序並促進分組互動。",
    "category": "admin",
    "icon": "fa-users-gear",
    "badge": "教師工具"
  },
  {
    "file": "games/little_gardener.html",
    "title": "小小園丁：植物成長記",
    "desc": "澆水、施肥並記錄植物的成長變化，認識光合作用與植物生長環境！",
    "category": "steam",
    "icon": "fa-seedling",
    "badge": "植物觀察"
  },
  {
    "file": "games/burger_house.html",
    "title": "漢堡屋角色扮演指引",
    "desc": "漢堡店的角色扮演教學指導手冊，指引幼兒扮演顧客與店員的對話情境。",
    "category": "admin",
    "icon": "fa-burger",
    "badge": "教學指引"
  }
];

let currentCategory = 'all';

// Load games grid
function renderGames() {
    const grid = document.getElementById('gamesGrid');
    const searchVal = document.getElementById('gameSearch').value.toLowerCase();
    grid.innerHTML = '';

    const filtered = gamesData.filter(game => {
        const matchesCategory = (currentCategory === 'all' || game.category === currentCategory);
        const matchesSearch = game.title.toLowerCase().includes(searchVal) || game.desc.toLowerCase().includes(searchVal);
        return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="no-results">找不到相符的遊戲或工具，請嘗試其他關鍵字。</div>`;
        return;
    }

    filtered.forEach(game => {
        const card = document.createElement('div');
        card.className = `game-card ${game.category}`;
        card.setAttribute('onclick', `openGame('${game.file}', '${game.title}')`);
        card.innerHTML = `
            <div class="card-header">
                <div class="card-icon-wrapper">
                    <i class="fa-solid ${game.icon}"></i>
                </div>
                <span class="badge-mini">${game.badge}</span>
            </div>
            <div class="card-body">
                <h3 class="card-title">${game.title}</h3>
                <p class="card-desc">${game.desc}</p>
            </div>
            <div class="card-footer">
                <span class="play-badge"><i class="fa-solid fa-play"></i> 點擊開啟</span>
                <div class="card-arrow"><i class="fa-solid fa-arrow-right"></i></div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Switch category
function switchCategory(category, btnElement) {
    currentCategory = category;
    
    // update tab class active
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    btnElement.classList.add('active');

    renderGames();
}

// Filter games on search keyup
function filterGames() {
    renderGames();
}

// Open game in iframe overlay
function openGame(file, title) {
    const overlay = document.getElementById('playerOverlay');
    const iframe = document.getElementById('gameIframe');
    const titleEl = document.getElementById('playerTitle');

    titleEl.textContent = title;
    iframe.src = file;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden'; // lock scroll
}

// Close game iframe
function closeGame() {
    const overlay = document.getElementById('playerOverlay');
    const iframe = document.getElementById('gameIframe');

    overlay.classList.remove('active');
    iframe.src = '';
    document.body.style.overflow = 'auto'; // restore scroll
}

// Initial render
window.onload = () => {
    renderGames();
};
