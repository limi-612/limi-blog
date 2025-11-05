---
title: Uniapp跨平台开发面试题
date: 2024/12/20
tags:
 - Uniapp
 - 跨平台
 - 小程序
categories:
 - Uniapp
---

## Uniapp基础概念

### 1. Uniapp框架特点与优势

**Uniapp的核心价值：**
1. **一套代码，多端运行：** 解决了多平台开发的成本问题
2. **Vue.js语法：** 降低学习成本，Vue开发者可以快速上手
3. **丰富的组件库：** 提供大量开箱即用的UI组件
4. **完善的生态：** 有活跃的社区和丰富的插件市场
5. **原生性能：** App端接近原生应用的性能表现

**支持平台详解：**
- **H5：** 浏览器端，支持响应式布局
- **小程序：** 微信、支付宝、百度、字节跳动、QQ等
- **App：** iOS和Android原生应用
- **快应用：** 各大手机厂商的快应用平台
- **PC端：** 桌面应用（通过Electron）

**技术架构特点：**
1. **编译时适配：** 根据目标平台编译为不同的代码
2. **运行时适配：** 通过条件编译实现平台差异化
3. **统一API：** 封装了各平台的差异，提供统一的调用方式
4. **原生能力：** 可以调用各平台的原生功能

**项目结构详解：**
```
项目根目录/
├── pages/                  # 页面文件夹
│   ├── index/
│   │   ├── index.vue      # 页面文件
│   │   └── index.js       # 页面逻辑（可选）
│   └── user/
├── components/             # 组件文件夹
│   ├── common/            # 公共组件
│   └── business/          # 业务组件
├── static/                 # 静态资源文件夹
│   ├── images/            # 图片资源
│   ├── fonts/             # 字体文件
│   └── icons/             # 图标资源
├── store/                  # Vuex状态管理
│   ├── index.js           # store入口
│   └── modules/           # 模块化store
├── utils/                  # 工具函数
│   ├── request.js         # 网络请求封装
│   ├── storage.js         # 本地存储封装
│   └── common.js          # 公共工具函数
├── App.vue                 # 应用入口组件
├── main.js                 # 应用入口文件
├── manifest.json           # 应用配置文件
├── pages.json              # 页面路由配置
└── uni.scss               # 全局样式文件
```

**核心配置文件作用：**
- **manifest.json：** 配置应用名称、图标、权限等应用信息
- **pages.json：** 配置页面路由、导航栏、标签栏等
- **App.vue：** 应用级别的配置和生命周期
- **main.js：** 应用初始化入口
- **uni.scss：** 全局样式变量和混合

**与传统开发的对比：**
- **传统方式：** 每个平台都需要单独开发，成本高、周期长
- **Uniapp方式：** 一次开发，多平台运行，大幅降低开发成本

**适用场景：**
1. **中小型项目：** 快速原型开发和MVP验证
2. **多平台应用：** 需要同时支持多个平台的项目
3. **企业应用：** 内部管理系统、OA系统等
4. **电商应用：** 商城、购物平台等

**限制和注意事项：**
1. **性能限制：** 复杂动画和高性能需求可能不如原生
2. **平台差异：** 不同平台仍然存在一些差异需要适配
3. **包体积：** 打包后的应用体积可能比原生应用大
4. **版本更新：** 需要跟随各平台的版本更新

**面试要点：**
- Uniapp是基于Vue.js的跨平台开发框架
- 通过编译时和运行时适配实现一套代码多端运行
- 适合中小型项目和多平台应用开发
- 需要考虑平台差异和性能优化

### 2. Uniapp生命周期系统

**生命周期的重要性：**
生命周期是Uniapp应用和页面管理的核心机制，理解和正确使用生命周期可以：
1. **优化性能：** 在适当的时机初始化和清理资源
2. **提升体验：** 处理用户交互和页面状态
3. **数据管理：** 合理管理数据的加载和更新
4. **资源管理：** 防止内存泄漏和资源浪费

#### 应用级生命周期（App.vue）

**应用生命周期的作用范围：** 整个应用的生命周期，从启动到退出。

**onLaunch：**
- **触发时机：** 应用初始化完成时（全局只触发一次）
- **适用场景：** 全局配置初始化、用户登录状态检查、应用版本检查
- **注意事项：** 不要在此执行耗时操作，会影响启动速度

**onShow：**
- **触发时机：** 应用启动或从后台进入前台时
- **适用场景：** 刷新数据、检查网络状态、重新获取焦点

**onHide：**
- **触发时机：** 应用从前台进入后台时
- **适用场景：** 暂停音频播放、保存用户数据、清理定时器

**onError：**
- **触发时机：** 应用发生脚本错误或API调用报错时
- **适用场景：** 错误日志上报、用户反馈收集

#### 页面级生命周期

**页面生命周期的作用范围：** 单个页面的生命周期，从加载到销毁。

**onLoad：**
- **触发时机：** 页面加载时（一个页面只会调用一次）
- **参数：** 接收页面跳转传递的参数
- **适用场景：** 初始化页面数据、获取路由参数、设置页面标题

**onShow：**
- **触发时机：** 页面显示/切入前台时（每次都会触发）
- **适用场景：** 刷新页面数据、重新获取用户位置、启动定时器

**onReady：**
- **触发时机：** 页面初次渲染完成时（一个页面只会调用一次）
- **适用场景：** 获取节点信息、初始化第三方库、设置组件尺寸

**onHide：**
- **触发时机：** 页面隐藏/切入后台时
- **适用场景：** 暂停视频播放、清理定时器、保存表单数据

**onUnload：**
- **触发时机：** 页面卸载时
- **适用场景：** 清理定时器、取消网络请求、解绑事件监听

#### 特殊生命周期（用户交互）

**onPullDownRefresh：**
- **触发时机：** 用户下拉刷新时
- **配置要求：** 需在pages.json中开启`enablePullDownRefresh`
- **注意事项：** 必须调用`uni.stopPullDownRefresh()`停止刷新

**onReachBottom：**
- **触发时机：** 页面上拉触底时
- **配置参数：** 可通过`onReachBottomDistance`设置触发距离
- **适用场景：** 分页加载、无限滚动

**onShareAppMessage：**
- **触发时机：** 用户点击右上角分享按钮时（仅小程序）
- **返回值：** 必须返回分享信息对象

```javascript
// 应用生命周期完整示例 (App.vue)
export default {
    onLaunch() {
        console.log('App Launch - 应用启动');
        
        // 1. 初始化全局配置
        this.initGlobalConfig();
        
        // 2. 检查用户登录状态
        this.checkLoginStatus();
        
        // 3. 检查应用更新
        this.checkUpdate();
    },
    
    onShow() {
        console.log('App Show - 应用显示');
        // 刷新全局数据
        this.refreshGlobalData();
    },
    
    onHide() {
        console.log('App Hide - 应用隐藏');
        // 保存用户数据
        this.saveUserData();
    },
    
    onError(err) {
        console.error('App Error:', err);
        // 错误上报
        this.reportError(err);
    },
    
    methods: {
        initGlobalConfig() {
            // 初始化全局配置
            const systemInfo = uni.getSystemInfoSync();
            this.globalData.systemInfo = systemInfo;
        },
        
        checkUpdate() {
            // #ifdef APP-PLUS
            plus.runtime.getProperty(plus.runtime.appid, (info) => {
                console.log('应用版本:', info.version);
            });
            // #endif
        }
    }
};

// 页面生命周期完整示例
export default {
    data() {
        return {
            title: 'Hello Uniapp',
            list: [],
            page: 1,
            loading: false
        };
    },
    
    onLoad(options) {
        console.log('页面加载，参数:', options);
        // 初始化页面数据
        this.initPageData(options);
    },
    
    onShow() {
        console.log('页面显示');
        // 刷新数据（如果需要）
        this.refreshData();
    },
    
    onReady() {
        console.log('页面渲染完成');
        // 获取节点信息
        this.getNodeInfo();
    },
    
    onHide() {
        console.log('页面隐藏');
        // 清理定时器
        this.clearTimers();
    },
    
    onUnload() {
        console.log('页面卸载');
        // 清理资源
        this.cleanup();
    },
    
    onPullDownRefresh() {
        console.log('下拉刷新');
        this.refreshData().finally(() => {
            uni.stopPullDownRefresh();
        });
    },
    
    onReachBottom() {
        console.log('上拉加载更多');
        if (!this.loading) {
            this.loadMore();
        }
    },
    
    onShareAppMessage() {
        return {
            title: '分享标题',
            path: '/pages/index/index',
            imageUrl: '/static/share.jpg'
        };
    },
    
    methods: {
        initPageData(options) {
            // 初始化页面数据
        },
        
        refreshData() {
            // 刷新数据
            return new Promise((resolve) => {
                // 刷新逻辑
                setTimeout(resolve, 1000);
            });
        },
        
        loadMore() {
            // 加载更多数据
            this.loading = true;
            // 加载逻辑
            setTimeout(() => {
                this.loading = false;
            }, 1000);
        }
    }
};
```

**生命周期最佳实践：**
1. **合理分配任务：** 在适当的生命周期中执行对应的任务
2. **避免内存泄漏：** 在onUnload中清理定时器和事件监听
3. **优化用户体验：** 在onShow中刷新数据，在onHide中暂停操作
4. **错误处理：** 在onError中统一处理错误和上报

**面试要点：**
- 应用生命周期和页面生命周期的区别和作用范围
- 每个生命周期的触发时机和适用场景
- onLoad和onShow的区别：onLoad只执行一次，onShow每次显示都执行
- 在适当的生命周期中清理资源，防止内存泄漏

## 跨平台适配

### 1. 条件编译
```javascript
// 平台判断
// #ifdef H5
console.log('运行在H5平台');
// #endif

// #ifdef MP-WEIXIN
console.log('运行在微信小程序');
// #endif

// #ifdef APP-PLUS
console.log('运行在App');
// #endif

// #ifndef H5
console.log('不是H5平台');
// #endif

// 多平台条件
// #ifdef MP-WEIXIN || MP-ALIPAY
console.log('运行在微信或支付宝小程序');
// #endif

// CSS条件编译
/* #ifdef H5 */
.h5-only {
    background-color: #007aff;
}
/* #endif */

/* #ifdef MP-WEIXIN */
.weixin-only {
    background-color: #09bb07;
}
/* #endif */

// 组件条件编译
<template>
    <view>
        <!-- #ifdef H5 -->
        <web-view src="https://example.com"></web-view>
        <!-- #endif -->
        
        <!-- #ifdef MP-WEIXIN -->
        <button open-type="share">分享</button>
        <!-- #endif -->
        
        <!-- #ifdef APP-PLUS -->
        <button @click="openNativeMap">打开原生地图</button>
        <!-- #endif -->
    </view>
</template>
```

### 2. API适配
```javascript
// 统一API封装
class PlatformAPI {
    // 获取系统信息
    static getSystemInfo() {
        return new Promise((resolve) => {
            uni.getSystemInfo({
                success: (res) => {
                    resolve({
                        platform: res.platform,
                        system: res.system,
                        version: res.version,
                        screenWidth: res.screenWidth,
                        screenHeight: res.screenHeight,
                        statusBarHeight: res.statusBarHeight,
                        safeArea: res.safeArea
                    });
                }
            });
        });
    }
    
    // 存储数据
    static setStorage(key, data) {
        return new Promise((resolve, reject) => {
            uni.setStorage({
                key,
                data,
                success: resolve,
                fail: reject
            });
        });
    }
    
    // 获取存储数据
    static getStorage(key) {
        return new Promise((resolve, reject) => {
            uni.getStorage({
                key,
                success: (res) => resolve(res.data),
                fail: reject
            });
        });
    }
    
    // 网络请求
    static request(options) {
        return new Promise((resolve, reject) => {
            uni.request({
                ...options,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res.data);
                    } else {
                        reject(new Error(`请求失败: ${res.statusCode}`));
                    }
                },
                fail: reject
            });
        });
    }
    
    // 显示提示
    static showToast(title, icon = 'none') {
        uni.showToast({
            title,
            icon,
            duration: 2000
        });
    }
    
    // 显示加载
    static showLoading(title = '加载中...') {
        uni.showLoading({ title });
    }
    
    static hideLoading() {
        uni.hideLoading();
    }
    
    // 页面跳转
    static navigateTo(url) {
        uni.navigateTo({ url });
    }
    
    static redirectTo(url) {
        uni.redirectTo({ url });
    }
    
    static switchTab(url) {
        uni.switchTab({ url });
    }
}
```

## 组件开发

### 1. 自定义组件
```vue
<!-- components/custom-button/custom-button.vue -->
<template>
    <button 
        class="custom-button"
        :class="[`custom-button--${type}`, `custom-button--${size}`]"
        :disabled="disabled"
        @click="handleClick"
    >
        <text class="custom-button__text">{{ text }}</text>
    </button>
</template>

<script>
export default {
    name: 'CustomButton',
    
    props: {
        text: {
            type: String,
            default: '按钮'
        },
        type: {
            type: String,
            default: 'default',
            validator: (value) => {
                return ['default', 'primary', 'success', 'warning', 'danger'].includes(value);
            }
        },
        size: {
            type: String,
            default: 'medium',
            validator: (value) => {
                return ['small', 'medium', 'large'].includes(value);
            }
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    
    methods: {
        handleClick() {
            if (!this.disabled) {
                this.$emit('click');
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.custom-button {
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s;
    
    &--default {
        background-color: #f0f0f0;
        color: #333;
    }
    
    &--primary {
        background-color: #007aff;
        color: white;
    }
    
    &--small {
        padding: 8px 16px;
        font-size: 12px;
    }
    
    &--medium {
        padding: 12px 24px;
        font-size: 14px;
    }
    
    &--large {
        padding: 16px 32px;
        font-size: 16px;
    }
    
    &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
}
</style>
```

### 2. 组件通信
```javascript
// 父子组件通信
// 父组件
<template>
    <view>
        <child-component 
            :message="parentMessage"
            @child-event="handleChildEvent"
        />
    </view>
</template>

<script>
import ChildComponent from '@/components/child-component/child-component.vue';

export default {
    components: {
        ChildComponent
    },
    
    data() {
        return {
            parentMessage: 'Hello from parent'
        };
    },
    
    methods: {
        handleChildEvent(data) {
            console.log('收到子组件事件:', data);
        }
    }
};
</script>

// 子组件
<template>
    <view @click="sendToParent">
        <text>{{ message }}</text>
    </view>
</template>

<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        }
    },
    
    methods: {
        sendToParent() {
            this.$emit('child-event', {
                message: 'Hello from child',
                timestamp: Date.now()
            });
        }
    }
};
</script>

// 兄弟组件通信 (事件总线)
// utils/event-bus.js
class EventBus {
    constructor() {
        this.events = {};
    }
    
    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
    
    off(event, callback) {
        if (this.events[event]) {
            this.events[event] = this.events[event].filter(cb => cb !== callback);
        }
    }
}

export default new EventBus();

// 使用事件总线
import EventBus from '@/utils/event-bus.js';

// 组件A
EventBus.emit('custom-event', { message: 'Hello' });

// 组件B
EventBus.on('custom-event', (data) => {
    console.log('收到事件:', data);
});
```

## 状态管理

### 1. Vuex集成
```javascript
// store/index.js
import { createStore } from 'vuex';

const store = createStore({
    state: {
        user: null,
        token: '',
        systemInfo: {}
    },
    
    mutations: {
        SET_USER(state, user) {
            state.user = user;
        },
        
        SET_TOKEN(state, token) {
            state.token = token;
        },
        
        SET_SYSTEM_INFO(state, info) {
            state.systemInfo = info;
        }
    },
    
    actions: {
        async login({ commit }, credentials) {
            try {
                const response = await PlatformAPI.request({
                    url: '/api/login',
                    method: 'POST',
                    data: credentials
                });
                
                commit('SET_USER', response.user);
                commit('SET_TOKEN', response.token);
                
                // 存储到本地
                await PlatformAPI.setStorage('token', response.token);
                await PlatformAPI.setStorage('user', response.user);
                
                return response;
            } catch (error) {
                throw error;
            }
        },
        
        async logout({ commit }) {
            commit('SET_USER', null);
            commit('SET_TOKEN', '');
            
            // 清除本地存储
            uni.removeStorageSync('token');
            uni.removeStorageSync('user');
        },
        
        async initApp({ commit }) {
            try {
                // 获取系统信息
                const systemInfo = await PlatformAPI.getSystemInfo();
                commit('SET_SYSTEM_INFO', systemInfo);
                
                // 恢复登录状态
                const token = await PlatformAPI.getStorage('token');
                const user = await PlatformAPI.getStorage('user');
                
                if (token && user) {
                    commit('SET_TOKEN', token);
                    commit('SET_USER', user);
                }
            } catch (error) {
                console.error('应用初始化失败:', error);
            }
        }
    },
    
    getters: {
        isLoggedIn: (state) => !!state.token,
        userInfo: (state) => state.user,
        platform: (state) => state.systemInfo.platform
    }
});

export default store;

// main.js
import { createSSRApp } from 'vue';
import App from './App.vue';
import store from './store';

export function createApp() {
    const app = createSSRApp(App);
    app.use(store);
    return { app };
}
```

### 2. 数据持久化
```javascript
// utils/storage.js
class Storage {
    // 设置数据
    static set(key, value, expire = null) {
        const data = {
            value,
            expire: expire ? Date.now() + expire : null
        };
        
        try {
            uni.setStorageSync(key, JSON.stringify(data));
        } catch (error) {
            console.error('存储失败:', error);
        }
    }
    
    // 获取数据
    static get(key) {
        try {
            const data = uni.getStorageSync(key);
            if (!data) return null;
            
            const parsed = JSON.parse(data);
            
            // 检查是否过期
            if (parsed.expire && Date.now() > parsed.expire) {
                this.remove(key);
                return null;
            }
            
            return parsed.value;
        } catch (error) {
            console.error('读取失败:', error);
            return null;
        }
    }
    
    // 删除数据
    static remove(key) {
        try {
            uni.removeStorageSync(key);
        } catch (error) {
            console.error('删除失败:', error);
        }
    }
    
    // 清空所有数据
    static clear() {
        try {
            uni.clearStorageSync();
        } catch (error) {
            console.error('清空失败:', error);
        }
    }
    
    // 获取所有键
    static keys() {
        try {
            const info = uni.getStorageInfoSync();
            return info.keys;
        } catch (error) {
            console.error('获取键列表失败:', error);
            return [];
        }
    }
}

export default Storage;
```

## 网络请求

### 1. 请求封装
```javascript
// utils/request.js
class Request {
    constructor() {
        this.baseURL = 'https://api.example.com';
        this.timeout = 10000;
        this.interceptors = {
            request: [],
            response: []
        };
    }
    
    // 添加请求拦截器
    addRequestInterceptor(interceptor) {
        this.interceptors.request.push(interceptor);
    }
    
    // 添加响应拦截器
    addResponseInterceptor(interceptor) {
        this.interceptors.response.push(interceptor);
    }
    
    // 发送请求
    async request(options) {
        // 合并配置
        const config = {
            url: this.baseURL + options.url,
            method: options.method || 'GET',
            data: options.data,
            header: {
                'Content-Type': 'application/json',
                ...options.header
            },
            timeout: options.timeout || this.timeout
        };
        
        // 执行请求拦截器
        for (const interceptor of this.interceptors.request) {
            try {
                await interceptor(config);
            } catch (error) {
                return Promise.reject(error);
            }
        }
        
        return new Promise((resolve, reject) => {
            uni.request({
                ...config,
                success: async (response) => {
                    // 执行响应拦截器
                    for (const interceptor of this.interceptors.response) {
                        try {
                            response = await interceptor(response) || response;
                        } catch (error) {
                            reject(error);
                            return;
                        }
                    }
                    resolve(response);
                },
                fail: reject
            });
        });
    }
    
    // 便捷方法
    get(url, params, options = {}) {
        return this.request({
            url,
            method: 'GET',
            data: params,
            ...options
        });
    }
    
    post(url, data, options = {}) {
        return this.request({
            url,
            method: 'POST',
            data,
            ...options
        });
    }
    
    put(url, data, options = {}) {
        return this.request({
            url,
            method: 'PUT',
            data,
            ...options
        });
    }
    
    delete(url, options = {}) {
        return this.request({
            url,
            method: 'DELETE',
            ...options
        });
    }
}

// 创建实例
const request = new Request();

// 添加请求拦截器
request.addRequestInterceptor(async (config) => {
    // 添加token
    const token = Storage.get('token');
    if (token) {
        config.header.Authorization = `Bearer ${token}`;
    }
    
    // 显示加载
    uni.showLoading({ title: '加载中...' });
});

// 添加响应拦截器
request.addResponseInterceptor(async (response) => {
    // 隐藏加载
    uni.hideLoading();
    
    // 统一处理响应
    if (response.statusCode === 200) {
        const { code, data, message } = response.data;
        
        if (code === 200) {
            return data;
        } else if (code === 401) {
            // 未授权，跳转登录
            uni.navigateTo({ url: '/pages/login/login' });
            throw new Error('未授权');
        } else {
            uni.showToast({
                title: message || '请求失败',
                icon: 'none'
            });
            throw new Error(message);
        }
    } else {
        uni.showToast({
            title: '网络错误',
            icon: 'none'
        });
        throw new Error('网络错误');
    }
});

export default request;
```

## 性能优化

### 1. 页面优化
```javascript
// 页面预加载
// pages.json
{
    "pages": [
        {
            "path": "pages/index/index",
            "style": {
                "navigationBarTitleText": "首页",
                "enablePullDownRefresh": true,
                "onReachBottomDistance": 50
            }
        }
    ],
    "preloadRule": {
        "pages/index/index": {
            "network": "all",
            "packages": ["important"]
        }
    }
}

// 分包加载
// pages.json
{
    "pages": [
        // 主包页面
    ],
    "subPackages": [
        {
            "root": "pages/user",
            "name": "user",
            "pages": [
                {
                    "path": "profile/profile",
                    "style": {
                        "navigationBarTitleText": "个人资料"
                    }
                }
            ]
        }
    ]
}

// 组件懒加载
export default {
    components: {
        // 异步组件
        AsyncComponent: () => import('@/components/async-component/async-component.vue')
    }
};
```

### 2. 图片优化
```vue
<template>
    <view>
        <!-- 懒加载图片 -->
        <image 
            :src="imageSrc"
            lazy-load
            mode="aspectFill"
            @load="onImageLoad"
            @error="onImageError"
        />
        
        <!-- 渐进式图片 -->
        <image 
            :src="highQualityImage"
            :style="{ opacity: imageLoaded ? 1 : 0 }"
            @load="imageLoaded = true"
        />
        <image 
            :src="lowQualityImage"
            :style="{ opacity: imageLoaded ? 0 : 1 }"
        />
    </view>
</template>

<script>
export default {
    data() {
        return {
            imageLoaded: false,
            lowQualityImage: 'low-quality.jpg',
            highQualityImage: 'high-quality.jpg'
        };
    },
    
    computed: {
        imageSrc() {
            // 根据网络状态选择图片质量
            const networkType = this.$store.state.networkType;
            return networkType === 'wifi' ? 'high-quality.jpg' : 'low-quality.jpg';
        }
    },
    
    methods: {
        onImageLoad() {
            console.log('图片加载成功');
        },
        
        onImageError() {
            console.log('图片加载失败');
            // 使用默认图片
            this.imageSrc = 'default.jpg';
        }
    }
};
</script>
```

## 原生能力

### 1. 设备API
```javascript
// 设备信息
class DeviceAPI {
    // 获取设备信息
    static async getDeviceInfo() {
        return new Promise((resolve) => {
            uni.getSystemInfo({
                success: (res) => {
                    resolve({
                        brand: res.brand,
                        model: res.model,
                        system: res.system,
                        platform: res.platform,
                        screenWidth: res.screenWidth,
                        screenHeight: res.screenHeight,
                        windowWidth: res.windowWidth,
                        windowHeight: res.windowHeight,
                        statusBarHeight: res.statusBarHeight,
                        safeArea: res.safeArea
                    });
                }
            });
        });
    }
    
    // 获取网络状态
    static async getNetworkType() {
        return new Promise((resolve) => {
            uni.getNetworkType({
                success: (res) => {
                    resolve(res.networkType);
                }
            });
        });
    }
    
    // 监听网络状态变化
    static onNetworkStatusChange(callback) {
        uni.onNetworkStatusChange(callback);
    }
    
    // 获取位置信息
    static async getLocation() {
        return new Promise((resolve, reject) => {
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
                    resolve({
                        latitude: res.latitude,
                        longitude: res.longitude,
                        speed: res.speed,
                        accuracy: res.accuracy,
                        altitude: res.altitude,
                        verticalAccuracy: res.verticalAccuracy,
                        horizontalAccuracy: res.horizontalAccuracy
                    });
                },
                fail: reject
            });
        });
    }
    
    // 选择图片
    static async chooseImage(options = {}) {
        return new Promise((resolve, reject) => {
            uni.chooseImage({
                count: options.count || 1,
                sizeType: options.sizeType || ['original', 'compressed'],
                sourceType: options.sourceType || ['album', 'camera'],
                success: (res) => {
                    resolve(res.tempFilePaths);
                },
                fail: reject
            });
        });
    }
    
    // 预览图片
    static previewImage(urls, current = 0) {
        uni.previewImage({
            urls,
            current
        });
    }
    
    // 扫码
    static async scanCode() {
        return new Promise((resolve, reject) => {
            uni.scanCode({
                success: (res) => {
                    resolve({
                        result: res.result,
                        scanType: res.scanType,
                        charSet: res.charSet,
                        path: res.path
                    });
                },
                fail: reject
            });
        });
    }
}
```

### 2. 文件操作
```javascript
// 文件管理
class FileManager {
    // 上传文件
    static async uploadFile(filePath, url, formData = {}) {
        return new Promise((resolve, reject) => {
            const uploadTask = uni.uploadFile({
                url,
                filePath,
                name: 'file',
                formData,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(JSON.parse(res.data));
                    } else {
                        reject(new Error('上传失败'));
                    }
                },
                fail: reject
            });
            
            // 监听上传进度
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度:', res.progress);
            });
        });
    }
    
    // 下载文件
    static async downloadFile(url, savePath) {
        return new Promise((resolve, reject) => {
            const downloadTask = uni.downloadFile({
                url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        resolve(res.tempFilePath);
                    } else {
                        reject(new Error('下载失败'));
                    }
                },
                fail: reject
            });
            
            // 监听下载进度
            downloadTask.onProgressUpdate((res) => {
                console.log('下载进度:', res.progress);
            });
        });
    }
    
    // 保存图片到相册
    static async saveImageToPhotosAlbum(filePath) {
        return new Promise((resolve, reject) => {
            uni.saveImageToPhotosAlbum({
                filePath,
                success: resolve,
                fail: reject
            });
        });
    }
}
```

Uniapp作为跨平台开发框架，通过统一的API和组件体系，大大提高了多端开发效率。