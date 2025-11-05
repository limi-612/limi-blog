---
title: HTML5高级特性面试题
date: 2024/12/20
tags:
 - HTML5
 - Web API
 - 语义化
categories:
 - 面试题
---

## HTML5新特性

### 1. 语义化标签的重要性

**语义化标签的优势：**
1. **提高可访问性：** 屏幕阅读器能更好理解页面结构
2. **SEO优化：** 搜索引擎能更好理解内容结构
3. **代码可读性：** 开发者能更容易理解页面结构
4. **维护性：** 更清晰的结构便于后期维护

**主要语义化标签：**
- **header：** 页面或区域的头部，包含导航、logo等
- **nav：** 导航链接区域
- **main：** 页面主要内容，每个页面只能有一个
- **article：** 独立的文章内容
- **section：** 文档中的区域或章节
- **aside：** 侧边栏或辅助内容
- **footer：** 页面或区域的底部
- **time：** 时间或日期
- **address：** 联系信息

**传统与语义化对比：**
- 传统：大量使用div和span，缺乏语义
- 语义化：使用有意义的标签，结构更清晰

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>语义化页面示例</title>
</head>
<body>
    <!-- 页面头部 -->
    <header>
        <nav>
            <ul>
                <li><a href="#home">首页</a></li>
                <li><a href="#about">关于</a></li>
            </ul>
        </nav>
    </header>
    
    <!-- 主要内容区域 -->
    <main>
        <!-- 文章内容 -->
        <article>
            <header>
                <h1>文章标题</h1>
                <!-- 时间标签，datetime属性为机器可读格式 -->
                <time datetime="2024-12-20">2024年12月20日</time>
            </header>
            
            <!-- 文章章节 -->
            <section>
                <h2>章节标题</h2>
                <p>章节内容...</p>
            </section>
            
            <!-- 相关内容侧边栏 -->
            <aside>
                <h3>相关链接</h3>
                <ul>
                    <li><a href="#">相关文章1</a></li>
                </ul>
            </aside>
        </article>
    </main>
    
    <!-- 页面底部 -->
    <footer>
        <!-- 联系信息 -->
        <address>
            联系方式: <a href="mailto:example@email.com">example@email.com</a>
        </address>
    </footer>
</body>
</html>
```

**面试要点：**
- 语义化标签提高了可访问性和SEO
- 每个标签都有其特定的语义和使用场景
- main标签在每个页面中只能使用一次
- 语义化标签不仅仅是样式，更重要的是语义

### 2. HTML5表单增强功能

**HTML5表单的重大改进：**
1. **新的输入类型：** 提供更丰富的输入控件
2. **内置验证：** 无需JavaScript即可实现基本验证
3. **更好的用户体验：** 移动设备上会显示对应的键盘
4. **无障碍支持：** 更好的辅助技术支持

**新的输入类型详解：**
- **email：** 邮箱输入，自动验证邮箱格式
- **tel：** 电话号码输入，移动设备显示数字键盘
- **url：** 网址输入，自动验证URL格式
- **number：** 数字输入，支持min、max、step属性
- **range：** 滑块控件，用于选择数值范围
- **date/time：** 日期时间选择器
- **color：** 颜色选择器
- **search：** 搜索框，可显示清除按钮

**新的表单属性：**
- **placeholder：** 占位符文本
- **required：** 必填验证
- **pattern：** 正则表达式验证
- **autocomplete：** 自动完成提示
- **autofocus：** 自动获取焦点
- **multiple：** 多选支持

**datalist元素：**
- 提供输入建议列表
- 结合input的list属性使用
- 用户可以选择也可以自由输入

```html
<form>
    <!-- 邮箱输入，自动验证格式 -->
    <input type="email" placeholder="请输入邮箱" required>
    
    <!-- 电话输入，移动设备显示数字键盘 -->
    <input type="tel" placeholder="请输入电话">
    
    <!-- 网址输入，自动验证URL格式 -->
    <input type="url" placeholder="请输入网址">
    
    <!-- 数字输入，限制范围和步长 -->
    <input type="number" min="0" max="100" step="5" placeholder="0-100">
    
    <!-- 滑块控件 -->
    <input type="range" min="0" max="100" value="50">
    
    <!-- 日期时间选择 -->
    <input type="date">
    <input type="time">
    <input type="datetime-local">
    
    <!-- 颜色选择器 -->
    <input type="color">
    
    <!-- 搜索框 -->
    <input type="search" placeholder="搜索...">
    
    <!-- 带验证的文本输入 -->
    <input type="text" 
           placeholder="用户名（只能包含字母和数字）" 
           pattern="[a-zA-Z0-9]+"
           autocomplete="username"
           autofocus
           required>
    
    <!-- 数据列表提供输入建议 -->
    <datalist id="browsers">
        <option value="Chrome">
        <option value="Firefox">
        <option value="Safari">
        <option value="Edge">
    </datalist>
    <input list="browsers" placeholder="选择或输入浏览器">
    
    <button type="submit">提交</button>
</form>
```

**浏览器兼容性处理：**
- 不支持的浏览器会降级为text类型
- 可以通过JavaScript检测支持情况
- 建议结合JavaScript做兼容性处理

**面试要点：**
- HTML5表单提供了丰富的输入类型和验证功能
- 新的输入类型提高了用户体验和数据质量
- datalist提供了灵活的输入建议功能
- 需要考虑浏览器兼容性和降级处理

## Web Storage

### 1. localStorage vs sessionStorage
```javascript
// localStorage - 持久存储
localStorage.setItem('user', JSON.stringify({
    id: 1,
    name: 'John'
}));

const user = JSON.parse(localStorage.getItem('user'));
localStorage.removeItem('user');
localStorage.clear();

// sessionStorage - 会话存储
sessionStorage.setItem('token', 'abc123');
const token = sessionStorage.getItem('token');

// 存储事件监听
window.addEventListener('storage', (e) => {
    console.log('Storage changed:', {
        key: e.key,
        oldValue: e.oldValue,
        newValue: e.newValue,
        url: e.url
    });
});

// 存储工具类
class StorageUtil {
    static set(key, value, type = 'local') {
        const storage = type === 'local' ? localStorage : sessionStorage;
        const data = {
            value,
            timestamp: Date.now(),
            expires: null
        };
        storage.setItem(key, JSON.stringify(data));
    }
    
    static get(key, type = 'local') {
        const storage = type === 'local' ? localStorage : sessionStorage;
        const item = storage.getItem(key);
        
        if (!item) return null;
        
        try {
            const data = JSON.parse(item);
            if (data.expires && Date.now() > data.expires) {
                storage.removeItem(key);
                return null;
            }
            return data.value;
        } catch {
            return null;
        }
    }
    
    static setWithExpiry(key, value, ttl, type = 'local') {
        const data = {
            value,
            timestamp: Date.now(),
            expires: Date.now() + ttl
        };
        const storage = type === 'local' ? localStorage : sessionStorage;
        storage.setItem(key, JSON.stringify(data));
    }
}
```

## Canvas绘图

### 1. 基础绘图
```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// 设置画布大小
canvas.width = 800;
canvas.height = 600;

// 绘制矩形
ctx.fillStyle = '#ff0000';
ctx.fillRect(10, 10, 100, 50);

ctx.strokeStyle = '#0000ff';
ctx.lineWidth = 2;
ctx.strokeRect(120, 10, 100, 50);

// 绘制圆形
ctx.beginPath();
ctx.arc(100, 150, 50, 0, 2 * Math.PI);
ctx.fillStyle = '#00ff00';
ctx.fill();

// 绘制路径
ctx.beginPath();
ctx.moveTo(250, 100);
ctx.lineTo(300, 150);
ctx.lineTo(200, 150);
ctx.closePath();
ctx.stroke();

// 绘制文本
ctx.font = '20px Arial';
ctx.fillStyle = '#000000';
ctx.fillText('Hello Canvas', 10, 250);

// 绘制图像
const img = new Image();
img.onload = () => {
    ctx.drawImage(img, 0, 300, 200, 100);
};
img.src = 'image.jpg';
```

### 2. 动画实现
```javascript
class CanvasAnimation {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
    }
    
    createParticle() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            radius: Math.random() * 5 + 2,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
        };
    }
    
    updateParticle(particle) {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // 边界检测
        if (particle.x < 0 || particle.x > this.canvas.width) {
            particle.vx *= -1;
        }
        if (particle.y < 0 || particle.y > this.canvas.height) {
            particle.vy *= -1;
        }
    }
    
    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.radius, 0, 2 * Math.PI);
        this.ctx.fillStyle = particle.color;
        this.ctx.fill();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    start() {
        // 创建粒子
        for (let i = 0; i < 50; i++) {
            this.particles.push(this.createParticle());
        }
        this.animate();
    }
    
    stop() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}
```

## Web Workers

### 1. 主线程与Worker通信
```javascript
// main.js - 主线程
const worker = new Worker('worker.js');

// 发送数据到Worker
worker.postMessage({
    type: 'CALCULATE',
    data: [1, 2, 3, 4, 5]
});

// 接收Worker返回的数据
worker.onmessage = (e) => {
    const { type, result } = e.data;
    
    switch (type) {
        case 'CALCULATION_COMPLETE':
            console.log('计算结果:', result);
            break;
        case 'PROGRESS':
            console.log('进度:', result);
            break;
    }
};

// 错误处理
worker.onerror = (error) => {
    console.error('Worker错误:', error);
};

// worker.js - Worker线程
self.onmessage = (e) => {
    const { type, data } = e.data;
    
    switch (type) {
        case 'CALCULATE':
            performHeavyCalculation(data);
            break;
    }
};

function performHeavyCalculation(numbers) {
    let result = 0;
    const total = numbers.length;
    
    for (let i = 0; i < numbers.length; i++) {
        // 模拟复杂计算
        for (let j = 0; j < 1000000; j++) {
            result += numbers[i] * Math.random();
        }
        
        // 发送进度
        self.postMessage({
            type: 'PROGRESS',
            result: Math.round((i + 1) / total * 100)
        });
    }
    
    // 发送最终结果
    self.postMessage({
        type: 'CALCULATION_COMPLETE',
        result: result
    });
}
```

## Geolocation API

### 1. 获取地理位置
```javascript
class GeolocationService {
    static getCurrentPosition() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('浏览器不支持地理定位'));
                return;
            }
            
            const options = {
                enableHighAccuracy: true, // 高精度
                timeout: 10000, // 超时时间
                maximumAge: 60000 // 缓存时间
            };
            
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude, accuracy } = position.coords;
                    resolve({
                        lat: latitude,
                        lng: longitude,
                        accuracy: accuracy,
                        timestamp: position.timestamp
                    });
                },
                (error) => {
                    let message = '';
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            message = '用户拒绝了地理定位请求';
                            break;
                        case error.POSITION_UNAVAILABLE:
                            message = '位置信息不可用';
                            break;
                        case error.TIMEOUT:
                            message = '获取位置超时';
                            break;
                    }
                    reject(new Error(message));
                },
                options
            );
        });
    }
    
    static watchPosition(callback) {
        if (!navigator.geolocation) {
            throw new Error('浏览器不支持地理定位');
        }
        
        return navigator.geolocation.watchPosition(
            callback,
            (error) => console.error('位置监听错误:', error),
            { enableHighAccuracy: true }
        );
    }
    
    static clearWatch(watchId) {
        navigator.geolocation.clearWatch(watchId);
    }
}

// 使用示例
async function getLocation() {
    try {
        const position = await GeolocationService.getCurrentPosition();
        console.log('当前位置:', position);
        
        // 监听位置变化
        const watchId = GeolocationService.watchPosition((position) => {
            console.log('位置更新:', position.coords);
        });
        
        // 5秒后停止监听
        setTimeout(() => {
            GeolocationService.clearWatch(watchId);
        }, 5000);
        
    } catch (error) {
        console.error('获取位置失败:', error.message);
    }
}
```

## File API

### 1. 文件处理
```javascript
// 文件选择和读取
const fileInput = document.getElementById('fileInput');

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    
    Array.from(files).forEach(file => {
        processFile(file);
    });
});

function processFile(file) {
    console.log('文件信息:', {
        name: file.name,
        size: file.size,
        type: file.type,
        lastModified: new Date(file.lastModified)
    });
    
    const reader = new FileReader();
    
    // 读取为文本
    if (file.type.startsWith('text/')) {
        reader.onload = (e) => {
            console.log('文件内容:', e.target.result);
        };
        reader.readAsText(file);
    }
    
    // 读取为图片
    if (file.type.startsWith('image/')) {
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.style.maxWidth = '200px';
            document.body.appendChild(img);
        };
        reader.readAsDataURL(file);
    }
    
    // 进度监听
    reader.onprogress = (e) => {
        if (e.lengthComputable) {
            const progress = (e.loaded / e.total) * 100;
            console.log(`读取进度: ${progress}%`);
        }
    };
}

// 拖拽上传
const dropZone = document.getElementById('dropZone');

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    Array.from(files).forEach(processFile);
});
```

## 音视频API

### 1. 媒体控制
```javascript
// 获取用户媒体
async function getUserMedia() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 },
                facingMode: 'user' // 前置摄像头
            },
            audio: {
                echoCancellation: true,
                noiseSuppression: true
            }
        });
        
        const video = document.getElementById('video');
        video.srcObject = stream;
        
        return stream;
    } catch (error) {
        console.error('获取媒体失败:', error);
    }
}

// 屏幕录制
async function getDisplayMedia() {
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });
        
        const video = document.getElementById('screenVideo');
        video.srcObject = stream;
        
        return stream;
    } catch (error) {
        console.error('屏幕录制失败:', error);
    }
}

// 录制功能
class MediaRecorder {
    constructor(stream) {
        this.mediaRecorder = new MediaRecorder(stream);
        this.chunks = [];
        
        this.mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
                this.chunks.push(e.data);
            }
        };
        
        this.mediaRecorder.onstop = () => {
            const blob = new Blob(this.chunks, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = 'recording.webm';
            a.click();
            
            URL.revokeObjectURL(url);
            this.chunks = [];
        };
    }
    
    start() {
        this.mediaRecorder.start();
    }
    
    stop() {
        this.mediaRecorder.stop();
    }
}
```

HTML5提供了丰富的API和特性，掌握这些现代Web开发技术对前端工程师至关重要。