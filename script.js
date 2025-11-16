// 全局变量
let windows = [];
let displayedImages = [];
let imageElements = [];
let imageTimeout;
let isMusicPlaying = false;
let endTimeout;

// 粉色背景数组
const bgPinks = [
    'rgba(255, 182, 193, 0.9)', 'rgba(255, 105, 180, 0.9)', 'rgba(255, 192, 203, 0.9)',
    'rgba(255, 228, 225, 0.9)', 'rgba(255, 218, 185, 0.9)', 'rgba(255, 174, 185, 0.9)',
    'rgba(255, 148, 172, 0.9)', 'rgba(255, 135, 162, 0.9)', 'rgba(255, 112, 152, 0.9)',
    'rgba(255, 90, 145, 0.9)', 'rgba(255, 70, 138, 0.9)', 'rgba(255, 50, 131, 0.9)',
    'rgba(248, 131, 121, 0.9)', 'rgba(252, 165, 165, 0.9)', 'rgba(251, 207, 232, 0.9)'
];

// 粉色文字数组
const textPinks = [
    '#ff1493', '#ff69b4', '#db7093', '#ff69b4', '#ff1493',
    '#c71585', '#ff00ff', '#ff69b4', '#db7093', '#ff69b4'
];

// 可爱表白内容（50条）
const loveMessages = [
    '风风，你是我心里最亮的星✨',
    '风风，今天的你也超可爱的呢！',
    '风风，见到你就开心到冒泡～',
    '风风，我喜欢你，超喜欢的那种！',
    '风风，你一笑，我的世界都亮了☀️',
    '风风，想和你一起看遍所有风景',
    '风风，你是我的心动信号💕',
    '风风，和你在一起的时光最珍贵',
    '风风，你的眼睛里有星星哦',
    '风风，每天想你一千遍～',
    '风风，你是我藏在心里的糖🍬',
    '风风，遇见你是最好的幸运',
    '风风，想把全世界最好的都给你',
    '风风，我超喜欢你的！',
    '风风，你是我的小确幸',
    '风风，和你聊天就是最幸福的事',
    '风风，你好呀，我的心动女孩',
    '风风，你的笑容治愈了一切',
    '风风，今天也很想你呢',
    '风风，你是我生命中的小太阳',
    '风风，喜欢你没有理由～',
    '风风，你是我的专属天使',
    '风风，想一直牵着你的手走下去',
    '风风，你是我每天的快乐源泉',
    '风风，遇见你，我很幸运',
    '风风，你让我相信了童话',
    '风风，想和你一起看日出日落',
    '风风，你是我的唯一',
    '风风，喜欢你的一切',
    '风风，你的存在让世界更美好',
    '风风，我想你啦～',
    '风风，你是我的心动男孩',
    '风风，和你在一起时间过得好快',
    '风风，你是我不变的偏爱',
    '风风，想和你一起慢慢变老',
    '风风，你是我生命中的礼物',
    '风风，每一天都更喜欢你一点',
    '风风，你的声音好好听',
    '风风，你是我的命中注定',
    '风风，和你一起吃的饭特别香',
    '风风，你是我的快乐星球',
    '风风，喜欢看你认真的样子',
    '风风，你是我唯一的例外',
    '风风，想和你一起去很多地方',
    '风风，你一笑，我就醉了',
    '风风，我的心只为你跳动',
    '风风，你是我藏不住的喜欢',
    '风风，和你在一起就是最甜的事',
    '风风，你是我的星光',
    '风风，我喜欢你，从一而终'  
];

// 初始化函数
function init() {
    const startButton = document.getElementById('startButton');
    startButton.addEventListener('click', start);
}

// 开始动画
function start() {
    // 隐藏开始界面
    document.getElementById('startContainer').style.display = 'none';
    
    // 播放音乐
    playMusic();
    
    // 创建窗口
    createWindowsContinually();
    
    // 显示图片
    showImagesSequentially();
    
    // 90秒后清理
    endTimeout = setTimeout(() => {
        cleanup();
    }, 90000);
}

// 播放音乐
function playMusic() {
    const music = document.getElementById('backgroundMusic');
    
    // 尝试播放音乐
    music.play()
        .then(() => {
            isMusicPlaying = true;
            console.log('音乐播放成功');
        })
        .catch(error => {
            console.log('音乐播放失败，请尝试点击页面后再播放:', error);
            // 添加备用播放方式，在用户交互时播放
            document.addEventListener('click', tryPlayMusicAgain, { once: true });
        });
}

// 再次尝试播放音乐
function tryPlayMusicAgain() {
    if (!isMusicPlaying) {
        const music = document.getElementById('backgroundMusic');
        music.play().then(() => {
            isMusicPlaying = true;
            console.log('音乐播放成功');
        }).catch(error => {
            console.log('音乐仍然无法播放:', error);
        });
    }
}

// 随机创建窗口
function createWindowsContinually() {
    let windowCount = 0;
    const maxWindows = 520; // 窗口数量限制为520个
    
    const createInterval = setInterval(() => {
        if (windowCount < maxWindows) {
            createWindow();
            windowCount++;
        } else {
            clearInterval(createInterval);
        }
    }, 100); // 每100毫秒创建一个窗口
}

// 创建单个窗口
function createWindow() {
    const window = document.createElement('div');
    window.className = 'love-window';
    
    // 随机大小
    const width = Math.floor(Math.random() * 150) + 100;
    const height = Math.floor(Math.random() * 80) + 50;
    window.style.width = `${width}px`;
    
    // 随机背景色和文字色
    const bgColor = bgPinks[Math.floor(Math.random() * bgPinks.length)];
    const textColor = textPinks[Math.floor(Math.random() * textPinks.length)];
    window.style.backgroundColor = bgColor;
    window.style.color = textColor;
    
    // 随机位置
    const maxX = window.innerWidth - width;
    const maxY = window.innerHeight - height;
    const x = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);
    window.style.left = `${x}px`;
    window.style.top = `${y}px`;
    
    // 随机文字
    const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    window.textContent = message;
    
    // 随机字体大小
    const fontSize = Math.floor(Math.random() * 4) + 14;
    window.style.fontSize = `${fontSize}px`;
    
    // 添加到页面
    document.body.appendChild(window);
    windows.push(window);
    
    // 添加动画效果
    animateWindow(window, x, y);
}

// 窗口动画
function animateWindow(window, startX, startY) {
    const speedX = (Math.random() - 0.5) * 2;
    const speedY = (Math.random() - 0.5) * 2;
    
    function move() {
        const currentX = parseFloat(window.style.left);
        const currentY = parseFloat(window.style.top);
        const width = window.offsetWidth;
        const height = window.offsetHeight;
        
        // 边界检测
        let newX = currentX + speedX;
        let newY = currentY + speedY;
        
        if (newX < 0 || newX > window.innerWidth - width) {
            // 反转水平方向
            newX = Math.max(0, Math.min(newX, window.innerWidth - width));
        }
        
        if (newY < 0 || newY > window.innerHeight - height) {
            // 反转垂直方向
            newY = Math.max(0, Math.min(newY, window.innerHeight - height));
        }
        
        window.style.left = `${newX}px`;
        window.style.top = `${newY}px`;
        
        requestAnimationFrame(move);
    }
    
    move();
}

// 顺序显示图片
function showImagesSequentially() {
    if (displayedImages.length >= 25) {
        // 重置已显示图片数组
        displayedImages = [];
    }
    
    // 生成未显示的图片索引
    let availableImages = [];
    for (let i = 1; i <= 25; i++) {
        if (!displayedImages.includes(i)) {
            availableImages.push(i);
        }
    }
    
    if (availableImages.length === 0) {
        // 所有图片都显示过了，重置
        displayedImages = [];
        availableImages = Array.from({length: 25}, (_, i) => i + 1);
    }
    
    // 随机选择一张未显示的图片
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    const imageNum = availableImages[randomIndex];
    displayedImages.push(imageNum);
    
    // 创建图片容器
    const container = document.createElement('div');
    container.className = 'image-container';
    
    // 随机位置 - 不再在正中间
    const containerWidth = 150; // 图片容器宽度
    const containerHeight = 150; // 图片容器高度
    const maxX = window.innerWidth - containerWidth;
    const maxY = window.innerHeight - containerHeight;
    
    // 避免在正中间区域出现
    let x, y;
    do {
        x = Math.floor(Math.random() * maxX);
        y = Math.floor(Math.random() * maxY);
    } while (
        Math.abs(x - (window.innerWidth - containerWidth) / 2) < 100 && 
        Math.abs(y - (window.innerHeight - containerHeight) / 2) < 100
    );
    
    container.style.left = `${x}px`;
    container.style.top = `${y}px`;
    container.style.opacity = '0';
    
    // 创建图片元素
    const img = document.createElement('img');
    img.src = `images/${imageNum}.jpg`;
    img.alt = `Love image ${imageNum}`;
    
    // 图片加载完成后显示
    img.onload = () => {
        container.appendChild(img);
        document.body.appendChild(container);
        imageElements.push(container);
        
        // 淡入效果
        setTimeout(() => {
            container.style.opacity = '1';
        }, 100);
        
        // 2.5秒后开始淡出（之前是3秒，现在提前开始淡出）
        setTimeout(() => {
            fadeOutImage(container);
        }, 2500);
    };
    
    // 图片加载失败处理
    img.onerror = () => {
        console.log(`图片加载失败: images/${imageNum}.jpg`);
        // 移除失败的索引，继续下一张
        const index = displayedImages.indexOf(imageNum);
        if (index > -1) {
            displayedImages.splice(index, 1);
        }
    };
    
    // 设置下一张图片出现的时间 - 当前一张快消失时（2秒后，而不是之前的3-7秒）
    imageTimeout = setTimeout(showImagesSequentially, 2000);
}

// 图片淡出效果
function fadeOutImage(container) {
    let opacity = 1;
    const fadeInterval = setInterval(() => {
        opacity -= 0.05;
        container.style.opacity = opacity.toString();
        
        if (opacity <= 0) {
            clearInterval(fadeInterval);
            // 移除元素
            if (container.parentNode) {
                container.parentNode.removeChild(container);
            }
            // 从数组中移除
            const index = imageElements.indexOf(container);
            if (index > -1) {
                imageElements.splice(index, 1);
            }
        }
    }, 50);
}

// 清理函数
function cleanup() {
    // 停止创建新窗口
    clearTimeout(imageTimeout);
    clearTimeout(endTimeout);
    
    // 移除所有窗口
    windows.forEach(window => {
        if (window.parentNode) {
            window.parentNode.removeChild(window);
        }
    });
    windows = [];
    
    // 移除所有图片
    imageElements.forEach(img => {
        if (img.parentNode) {
            img.parentNode.removeChild(img);
        }
    });
    imageElements = [];
    
    // 停止音乐
    if (isMusicPlaying) {
        const music = document.getElementById('backgroundMusic');
        music.pause();
        music.currentTime = 0;
        isMusicPlaying = false;
    }
    
    // 显示开始界面
    document.getElementById('startContainer').style.display = 'block';
    
    // 重置已显示图片数组
    displayedImages = [];
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', init);

// 窗口大小变化时调整位置
window.addEventListener('resize', () => {
    windows.forEach(window => {
        const width = window.offsetWidth;
        const height = window.offsetHeight;
        const currentX = parseFloat(window.style.left);
        const currentY = parseFloat(window.style.top);
        
        // 确保窗口在可视区域内
        const maxX = window.innerWidth - width;
        const maxY = window.innerHeight - height;
        const newX = Math.max(0, Math.min(currentX, maxX));
        const newY = Math.max(0, Math.min(currentY, maxY));
        
        window.style.left = `${newX}px`;
        window.style.top = `${newY}px`;
    });
});