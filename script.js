// 配置参数
const MAX_WINDOWS = 350;
const CREATION_INTERVAL = 100; // 毫秒
const DURATION = 90000; // 90秒
const IMAGE_INTERVAL = 5000; // 图片切换间隔
const IMAGE_FADE_DURATION = 1000; // 图片渐变时间

// 路径配置
const IMAGE_PATH = 'images/';
const MAX_IMAGES = 11;

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
    'rgba(255, 182, 193, 0.9)', // 浅粉色
    'rgba(255, 105, 180, 0.9)',  // 热粉色
    'rgba(255, 192, 203, 0.9)',  // 粉色
    'rgba(255, 20, 147, 0.9)',   // 深粉色
    'rgba(255, 130, 180, 0.9)',  // 浅紫红色
    'rgba(233, 150, 122, 0.9)',  // 秘鲁色
    'rgba(255, 160, 122, 0.9)',  // 浅珊瑚色
    'rgba(255, 99, 71, 0.9)',    // 番茄色
    'rgba(255, 69, 0, 0.9)',     // 红橙色
    'rgba(255, 215, 0, 0.9)',    // 金色
    'rgba(255, 182, 193, 0.9)',  // 浅粉色
    'rgba(255, 105, 180, 0.9)',  // 热粉色
    'rgba(255, 192, 203, 0.9)',  // 粉色
    'rgba(255, 20, 147, 0.9)',   // 深粉色
    'rgba(255, 130, 180, 0.9)'   // 浅紫红色
];

const textPinks = [
    '#ffffff',  // 白色
    '#ffe4e1',  // 薄雾玫瑰色
    '#fff0f5',  // 淡紫红
    '#ffc0cb',  // 粉色
    '#ff69b4',  // 热粉色
    '#ff1493',  // 深粉色
    '#db7093',  // 苍白紫罗兰红色
    '#c71585',  // 中紫罗兰红色
    '#ff85a2',  // 浅粉红
    '#ff7782'   // 亮红色
];

let messageWindows = [];
let currentImageIndex = 0;
let isRunning = false;
let imageIntervalId = null;
let creationIntervalId = null;

// 获取随机位置
function getRandomPosition(element) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    
    const x = Math.floor(Math.random() * (windowWidth - elementWidth));
    const y = Math.floor(Math.random() * (windowHeight - elementHeight));
    
    return { x, y };
}

// 创建消息窗口
function createLoveMessage() {
    if (messageWindows.length >= MAX_WINDOWS) {
        clearInterval(creationIntervalId);
        return;
    }
    
    const div = document.createElement('div');
    div.className = 'love-message';
    
    // 随机选择消息
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    div.textContent = randomMessage;
    
    // 随机背景色和文字颜色
    div.style.backgroundColor = bgPinks[Math.floor(Math.random() * bgPinks.length)];
    div.style.color = textPinks[Math.floor(Math.random() * textPinks.length)];
    
    // 随机大小
    const size = Math.floor(Math.random() * 20) + 14;
    div.style.fontSize = `${size}px`;
    
    // 随机宽度
    const width = Math.floor(Math.random() * 100) + 150;
    div.style.maxWidth = `${width}px`;
    
    document.body.appendChild(div);
    
    // 设置随机位置
    const position = getRandomPosition(div);
    div.style.left = `${position.x}px`;
    div.style.top = `${position.y}px`;
    
    // 设置随机动画延迟
    div.style.animationDelay = `${Math.random() * 2}s`;
    
    messageWindows.push(div);
    
    // 随机移动效果
    moveRandomly(div);
}

// 随机移动元素
function moveRandomly(element) {
    const move = () => {
        if (!element.parentNode) return;
        
        const position = getRandomPosition(element);
        const duration = Math.floor(Math.random() * 5000) + 3000;
        
        element.style.transition = `left ${duration}ms ease, top ${duration}ms ease`;
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;
        
        setTimeout(move, duration);
    };
    
    move();
}

// 显示图片
function showImage() {
    // 移除旧图片
    const oldImageContainer = document.querySelector('.image-container');
    if (oldImageContainer) {
        oldImageContainer.style.opacity = '0';
        setTimeout(() => {
            if (oldImageContainer.parentNode) {
                oldImageContainer.parentNode.removeChild(oldImageContainer);
            }
        }, IMAGE_FADE_DURATION);
    }
    
    // 创建新图片
    const imageContainer = document.createElement('div');
    imageContainer.className = 'image-container';
    imageContainer.style.opacity = '0';
    
    const img = document.createElement('img');
    const randomImageIndex = Math.floor(Math.random() * MAX_IMAGES) + 1;
    img.src = `${IMAGE_PATH}${randomImageIndex}.jpg`;
    img.alt = `风风的照片 ${randomImageIndex}`;
    
    img.onload = () => {
        document.body.appendChild(imageContainer);
        // 延迟一点时间再显示，确保DOM已更新
        setTimeout(() => {
            imageContainer.style.opacity = '1';
        }, 10);
    };
    
    imageContainer.appendChild(img);
    
    // 设置3秒后开始淡出
    setTimeout(() => {
        if (imageContainer.parentNode) {
            imageContainer.style.opacity = '0';
            setTimeout(() => {
                if (imageContainer.parentNode) {
                    imageContainer.parentNode.removeChild(imageContainer);
                }
            }, IMAGE_FADE_DURATION);
        }
    }, 3000);
}

// 播放音乐
function playMusic() {
    const music = document.getElementById('background-music');
    music.volume = 0.3; // 设置音量为30%
    music.play().catch(error => {
        console.log('音乐播放失败:', error);
        // 在用户交互后重试播放
        setTimeout(() => {
            music.play().catch(e => console.log('重试播放失败:', e));
        }, 1000);
    });
}

// 停止音乐
function stopMusic() {
    const music = document.getElementById('background-music');
    music.pause();
    music.currentTime = 0;
}

// 清理所有窗口
function cleanup() {
    clearInterval(creationIntervalId);
    clearInterval(imageIntervalId);
    
    // 移除所有消息窗口
    messageWindows.forEach(window => {
        if (window.parentNode) {
            window.parentNode.removeChild(window);
        }
    });
    messageWindows = [];
    
    // 移除图片
    const imageContainer = document.querySelector('.image-container');
    if (imageContainer && imageContainer.parentNode) {
        imageContainer.parentNode.removeChild(imageContainer);
    }
    
    // 停止音乐
    stopMusic();
    
    // 显示开始屏幕
    document.getElementById('start-screen').style.display = 'flex';
    
    isRunning = false;
}

// 开始效果
function startEffect() {
    if (isRunning) return;
    
    isRunning = true;
    
    // 隐藏开始屏幕
    document.getElementById('start-screen').style.display = 'none';
    
    // 播放音乐
    playMusic();
    
    // 开始创建消息窗口
    creationIntervalId = setInterval(createLoveMessage, CREATION_INTERVAL);
    
    // 开始显示图片
    showImage(); // 立即显示第一张
    imageIntervalId = setInterval(showImage, IMAGE_INTERVAL);
    
    // 设置定时清理
    setTimeout(cleanup, DURATION);
}

// 添加开始按钮事件监听
document.getElementById('start-btn').addEventListener('click', startEffect);

// 为了确保移动设备上的音乐播放，添加触摸事件监听
document.addEventListener('touchstart', () => {
    if (isRunning) {
        playMusic();
    }
}, { once: true });

// 处理窗口大小变化，重新定位所有消息窗口
window.addEventListener('resize', () => {
    messageWindows.forEach(window => {
        const position = getRandomPosition(window);
        window.style.left = `${position.x}px`;
        window.style.top = `${position.y}px`;
    });
});