// ========================
// 配置参数
// ========================
const MAX_WINDOWS = 520;            // 窗口最大数量（保持不变）
const CREATION_INTERVAL = 100;      // 创建间隔（保持不变）
const DURATION = 90000;             // 90 秒
const IMAGE_INTERVAL = 5000;        // 图片切换间隔
const IMAGE_FADE_DURATION = 1000;   // 图片渐变时间

// 路径配置
const IMAGE_PATH = 'images/';
const MAX_IMAGES = 25;

// 表白内容
const messages = [
    "风风，你是我生命中最美的风景~",
    "风风，每一天因你而精彩💖",
    "风风，我爱你比昨天多一点，比明天少一点~",
    "风风，你是我心动的理由✨",
    "风风，余生请多指教~",
    "风风，遇见你是我最大的幸运~",
    "风风，我的心只属于你💕",
    "风风，想和你一起看遍所有风景~",
    "风风，你是我的阳光，温暖我的心~",
    "风风，有你的日子就是天堂~",
    "风风，我喜欢你，像风走了八千里，不问归期~",
    "风风，你是我藏在星星里的浪漫~",
    "风风，一想到你，我就很开心~",
    "风风，愿我们的爱情像星星一样永恒~",
    "风风，你是我生命中最重要的人~",
    "风风，和你在一起的每一刻都很珍贵~",
    "风风，我愿意陪你到世界尽头~",
    "风风，你是我的快乐源泉~",
    "风风，我对你的爱无法用言语表达~",
    "风风，你是我最想共度一生的人~",
    "风风，每一天爱你多一点~",
    "风风，你是我的小确幸~",
    "风风，有你在，一切都很美好~",
    "风风，你是我眼中最美的星星~",
    "风风，我想和你一起慢慢变老~",
    "风风，你的笑容是我最大的幸福~",
    "风风，你是我生命中的奇迹~",
    "风风，我爱你，从过去到未来~",
    "风风，你是我每天醒来的动力~",
    "风风，和你在一起，时间过得太快~",
    "风风，你是我的唯一~",
    "风风，我对你的爱永不停息~",
    "风风，你填满了我的心~",
    "风风，你是我最甜蜜的负担~",
    "风风，我会一直守护你~",
    "风风，你的存在让世界更美好~",
    "风风，我想和你创造更多回忆~",
    "风风，你是我的命中注定~",
    "风风，我喜欢你的一切~",
    "风风，爱你到永远~",
    "风风，你是我生命中的阳光~",
    "风风，我想和你一起看日出日落~",
    "风风，你的拥抱是最温暖的港湾~",
    "风风，我会珍惜我们的每一刻~",
    "风风，你是我最大的幸福~",
    "风风，我对你的爱如潮水般涌来~",
    "风风，和你在一起是我做过最正确的决定~",
    "风风，愿我们的爱情永远甜蜜~",
    "风风，谢谢你出现在我的生命里~",
    "风风，我想和你走过四季，看尽繁华~"
];

// 粉色系配色
const bgPinks = [
    'rgba(255, 182, 193, 0.9)',
    'rgba(255, 105, 180, 0.9)',
    'rgba(255, 192, 203, 0.9)',
    'rgba(255, 20, 147, 0.9)',
    'rgba(255, 130, 180, 0.9)',
    'rgba(233, 150, 122, 0.9)',
    'rgba(255, 160, 122, 0.9)',
    'rgba(255, 99, 71, 0.9)',
    'rgba(255, 69, 0, 0.9)',
    'rgba(255, 215, 0, 0.9)',
    'rgba(255, 182, 193, 0.9)',
    'rgba(255, 105, 180, 0.9)',
    'rgba(255, 192, 203, 0.9)',
    'rgba(255, 20, 147, 0.9)',
    'rgba(255, 130, 180, 0.9)'
];

const textPinks = [
    '#ffffff',
    '#ffe4e1',
    '#fff0f5',
    '#ffc0cb',
    '#ff69b4',
    '#ff1493',
    '#db7093',
    '#c71585',
    '#ff85a2',
    '#ff7782'
];

// 全局状态
let messageWindows = [];
let isRunning = false;
let imageIntervalId = null;
let creationIntervalId = null;

// 图片预加载相关
let preloadedImages = [];
let displayedImages = [];
let imagesPreloaded = false;

// 图片容器（全局一个，反复复用）
let globalImageContainer = null;

// ========================
// 工具函数
// ========================

// 随机位置
function getRandomPosition(element) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = element.offsetWidth || 160;
    const elementHeight = element.offsetHeight || 60;

    const x = Math.floor(Math.random() * Math.max(10, windowWidth - elementWidth));
    const y = Math.floor(Math.random() * Math.max(10, windowHeight - elementHeight));

    return { x, y };
}

// 预加载所有图片
function preloadImages() {
    if (imagesPreloaded) return;
    imagesPreloaded = true;

    for (let i = 1; i <= MAX_IMAGES; i++) {
        const img = new Image();
        img.src = `${IMAGE_PATH}${i}.jpg`;
        preloadedImages.push(img);
    }
}

// 获取一张“本轮没用过”的随机图片
function getNextRandomImageIndex() {
    if (displayedImages.length >= MAX_IMAGES) {
        displayedImages = [];
    }

    const available = [];
    for (let i = 1; i <= MAX_IMAGES; i++) {
        if (!displayedImages.includes(i)) {
            available.push(i);
        }
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex];
    displayedImages.push(selected);
    return selected;
}

// ========================
// 消息窗口相关
// ========================

function createLoveMessage() {
    if (messageWindows.length >= MAX_WINDOWS) {
        clearInterval(creationIntervalId);
        return;
    }

    const div = document.createElement('div');
    div.className = 'love-message';

    // 随机消息
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    div.textContent = randomMessage;

    // 随机背景和文字颜色
    div.style.backgroundColor = bgPinks[Math.floor(Math.random() * bgPinks.length)];
    div.style.color = textPinks[Math.floor(Math.random() * textPinks.length)];

    // 随机字体大小
    const size = Math.floor(Math.random() * 20) + 14;
    div.style.fontSize = `${size}px`;

    // 随机宽度
    const width = Math.floor(Math.random() * 100) + 150;
    div.style.maxWidth = `${width}px`;

    // 加入页面再定位
    document.body.appendChild(div);

    const pos = getRandomPosition(div);
    div.style.left = `${pos.x}px`;
    div.style.top = `${pos.y}px`;

    // 使用 CSS 动画随机参数
    const duration = Math.floor(Math.random() * 12000) + 8000; // 8s ~ 20s
    const delay = Math.random() * 5;                            // 0 ~ 5s
    div.style.animationDuration = `${duration}ms`;
    div.style.animationDelay = `${delay}s`;

    messageWindows.push(div);
}

// 在窗口大小变化时，重新随机位置（CSS 动画继续）
window.addEventListener('resize', () => {
    messageWindows.forEach(win => {
        const pos = getRandomPosition(win);
        win.style.left = `${pos.x}px`;
        win.style.top = `${pos.y}px`;
    });
});

// ========================
// 图片相关（复用容器 + 预加载）
// ========================

function ensureImageContainer() {
    if (globalImageContainer) return;

    const container = document.createElement('div');
    container.className = 'image-container';

    const img = document.createElement('img');
    container.appendChild(img);

    document.body.appendChild(container);
    globalImageContainer = container;
}

function showImage() {
    preloadImages();         // 确保预加载
    ensureImageContainer();  // 确保容器存在

    const img = globalImageContainer.querySelector('img');
    if (!img || preloadedImages.length === 0) return;

    const index = getNextRandomImageIndex();
    const newSrc = preloadedImages[index - 1].src;

    // 先淡出
    globalImageContainer.style.opacity = '0';

    // 稍微延迟，等过渡开始
    setTimeout(() => {
        img.src = newSrc;
        globalImageContainer.style.opacity = '1';
    }, 50);

    // 3 秒后开始淡出
    setTimeout(() => {
        globalImageContainer.style.opacity = '0';
    }, 3000);
}

// ========================
// 音乐相关
// ========================

function playMusic() {
    const music = document.getElementById('background-music');
    if (!music) return;
    music.volume = 0.3;
    music.play().catch(err => {
        console.log('音乐播放失败：', err);
    });
}

function stopMusic() {
    const music = document.getElementById('background-music');
    if (!music) return;
    music.pause();
    music.currentTime = 0;
}

// ========================
// 整体流程
// ========================

function cleanup() {
    clearInterval(creationIntervalId);
    clearInterval(imageIntervalId);

    // 移除所有消息窗口
    messageWindows.forEach(win => {
        if (win && win.parentNode) {
            win.parentNode.removeChild(win);
        }
    });
    messageWindows = [];

    // 隐藏并移除图片容器
    if (globalImageContainer && globalImageContainer.parentNode) {
        globalImageContainer.parentNode.removeChild(globalImageContainer);
    }
    globalImageContainer = null;

    displayedImages = [];

    stopMusic();

    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
        startScreen.style.display = 'flex';
    }

    isRunning = false;
}

function startEffect() {
    if (isRunning) return;
    isRunning = true;

    const startScreen = document.getElementById('start-screen');
    if (startScreen) {
        startScreen.style.display = 'none';
    }

    // 预先加载图片 & 播放音乐
    preloadImages();
    playMusic();

    // 开始创建消息窗口
    creationIntervalId = setInterval(createLoveMessage, CREATION_INTERVAL);

    // 图片轮播
    showImage();
    imageIntervalId = setInterval(showImage, IMAGE_INTERVAL);

    // 总时长结束后清理
    setTimeout(cleanup, DURATION);
}

// 按钮点击开始
document.getElementById('start-btn').addEventListener('click', startEffect);

// 移动端为了确保音乐播放，添加触摸事件（仅第一次生效）
document.addEventListener('touchstart', () => {
    if (isRunning) {
        playMusic();
    }
}, { once: true });
