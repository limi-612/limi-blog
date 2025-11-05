---
title: 微信小程序高级开发面试题
date: 2024/12/20
tags:
 - 微信小程序
 - 小程序云开发
 - 性能优化
categories:
 - 微信小程序
---

## 小程序基础架构

### 1. 微信小程序双线程模型深度解析

**双线程模型的设计原理：**
微信小程序采用双线程架构是为了解决传统网页开发中的安全性和性能问题：
1. **安全隔离：** 防止恶意代码直接操作DOM和浏览器API
2. **性能优化：** 逻辑层和渲染层分离，避免相互阻塞
3. **统一管理：** 微信可以更好地控制和管理小程序的运行

#### 渲染层（WebView线程）
**主要职责：**
- **页面渲染：** 负责WXML和WXSS的解析和渲染
- **事件处理：** 处理用户交互事件（点击、滚动等）
- **组件管理：** 管理各种小程序组件的显示和交互

**技术实现：**
- 基于改造后的WebView
- 每个页面都有独立的WebView实例
- 支持原生组件的渲染和交互

#### 逻辑层（JSCore线程）
**主要职责：**
- **JavaScript执行：** 运行小程序的业务逻辑代码
- **数据管理：** 管理应用状态和数据
- **API调用：** 处理各种小程序API调用
- **生命周期：** 管理应用和页面的生命周期

**技术实现：**
- 基于JavaScriptCore引擎
- 所有页面共享一个JSCore实例
- 无法直接操作DOM和BOM

#### Native层（微信客户端）
**主要职责：**
- **系统能力：** 提供设备能力调用（相机、定位等）
- **网络请求：** 处理HTTP请求和响应
- **文件系统：** 管理本地文件存储
- **线程调度：** 协调渲染层和逻辑层的通信

#### 线程间通信机制

**1. 逻辑层 → 渲染层（setData）**
- **作用：** 将数据从逻辑层传递到渲染层
- **特点：** 异步执行，数据会被序列化传输
- **性能影响：** 频繁调用或大量数据传输会影响性能

**2. 渲染层 → 逻辑层（事件系统）**
- **作用：** 将用户交互事件传递到逻辑层
- **特点：** 事件对象会被序列化传输
- **事件类型：** 点击、滚动、输入等各种交互事件

```javascript
// 小程序架构特点详解

// 1. 逻辑层向渲染层传递数据（setData）
Page({
    data: {
        message: 'Hello World',
        userInfo: {},
        list: []
    },
    
    // 更新数据的正确方式
    updateData() {
        this.setData({
            message: '更新后的消息',
            'userInfo.name': '张三', // 部分更新
            'list[0]': '新的第一项' // 数组元素更新
        });
    },
    
    // setData性能优化
    optimizedUpdate() {
        // 错误做法：频繁调用setData
        // this.setData({ count: 1 });
        // this.setData({ count: 2 });
        // this.setData({ count: 3 });
        
        // 正确做法：批量更新
        this.setData({
            count: 3,
            status: 'completed',
            timestamp: Date.now()
        });
    }
});

// 2. 渲染层向逻辑层传递事件
// WXML
/*
<view class="container">
    <button bindtap="handleTap" data-id="123">点击按钮</button>
    <input bindinput="handleInput" placeholder="请输入内容" />
    <scroll-view bindscroll="handleScroll" scroll-y>
        <view wx:for="{{list}}" wx:key="id">
            {{item.name}}
        </view>
    </scroll-view>
</view>
*/

// JavaScript
Page({
    // 处理点击事件
    handleTap(e) {
        console.log('事件对象:', e);
        console.log('自定义数据:', e.currentTarget.dataset.id);
        console.log('事件类型:', e.type);
        console.log('触发时间:', e.timeStamp);
    },
    
    // 处理输入事件
    handleInput(e) {
        console.log('输入内容:', e.detail.value);
        this.setData({
            inputValue: e.detail.value
        });
    },
    
    // 处理滚动事件
    handleScroll(e) {
        console.log('滚动位置:', e.detail.scrollTop);
    }
});
```

**双线程模型的优势：**
1. **安全性：** 防止恶意代码直接操作DOM和浏览器API
2. **稳定性：** 逻辑层崩溃不会影响渲染层，反之亦然
3. **性能优化：** 渲染和逻辑并行处理，提高响应速度
4. **统一管理：** 微信可以更好地控制小程序的运行环境

**双线程模型的限制：**
1. **通信开销：** 线程间通信需要序列化，有一定性能开销
2. **开发复杂度：** 需要理解两个线程的工作机制
3. **调试困难：** 跨线程调试相对复杂
4. **功能限制：** 无法直接操作DOM，需要通过setData

**面试要点：**
- 小程序采用双线程架构：渲染层和逻辑层分离
- 通过setData和事件系统实现线程间通信
- 这种架构提高了安全性和稳定性，但也带来了一定的性能开销
- setData的性能优化是小程序开发的重点

### 2. 生命周期详解
```javascript
// 应用生命周期 (app.js)
App({
    onLaunch(options) {
        // 小程序初始化完成时触发，全局只触发一次
        console.log('小程序启动', options);
        
        // 获取用户信息
        this.getUserInfo();
        
        // 检查更新
        this.checkForUpdate();
    },
    
    onShow(options) {
        // 小程序启动，或从后台进入前台显示时触发
        console.log('小程序显示', options);
        
        // 场景值处理
        this.handleScene(options.scene);
    },
    
    onHide() {
        // 小程序从前台进入后台时触发
        console.log('小程序隐藏');
    },
    
    onError(msg) {
        // 小程序发生脚本错误或API调用报错时触发
        console.error('小程序错误:', msg);
        
        // 错误上报
        this.reportError(msg);
    },
    
    onPageNotFound(res) {
        // 小程序要打开的页面不存在时触发
        console.log('页面不存在:', res);
        
        // 重定向到首页
        wx.redirectTo({
            url: '/pages/index/index'
        });
    },
    
    globalData: {
        userInfo: null,
        systemInfo: null
    },
    
    getUserInfo() {
        // 获取用户信息逻辑
    },
    
    checkForUpdate() {
        const updateManager = wx.getUpdateManager();
        
        updateManager.onCheckForUpdate((res) => {
            console.log('检查更新结果:', res.hasUpdate);
        });
        
        updateManager.onUpdateReady(() => {
            wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否重启应用？',
                success: (res) => {
                    if (res.confirm) {
                        updateManager.applyUpdate();
                    }
                }
            });
        });
    }
});

// 页面生命周期
Page({
    data: {
        message: 'Hello World'
    },
    
    onLoad(options) {
        // 页面加载时触发，一个页面只会调用一次
        console.log('页面加载', options);
        
        // 获取页面参数
        const { id, type } = options;
        
        // 设置导航栏标题
        wx.setNavigationBarTitle({
            title: '页面标题'
        });
    },
    
    onShow() {
        // 页面显示/切入前台时触发
        console.log('页面显示');
        
        // 刷新数据
        this.refreshData();
    },
    
    onReady() {
        // 页面初次渲染完成时触发，一个页面只会调用一次
        console.log('页面渲染完成');
        
        // 获取节点信息
        this.getElementInfo();
    },
    
    onHide() {
        // 页面隐藏/切入后台时触发
        console.log('页面隐藏');
    },
    
    onUnload() {
        // 页面卸载时触发
        console.log('页面卸载');
        
        // 清理定时器
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    
    onPullDownRefresh() {
        // 监听用户下拉刷新事件
        console.log('下拉刷新');
        
        // 刷新数据
        this.loadData().then(() => {
            wx.stopPullDownRefresh();
        });
    },
    
    onReachBottom() {
        // 监听用户上拉触底事件
        console.log('上拉加载更多');
        
        this.loadMore();
    },
    
    onShareAppMessage() {
        // 监听用户点击页面内转发按钮
        return {
            title: '分享标题',
            path: '/pages/index/index?id=123',
            imageUrl: '/images/share.jpg'
        };
    },
    
    onShareTimeline() {
        // 监听右上角菜单"分享到朋友圈"按钮
        return {
            title: '分享到朋友圈的标题',
            query: 'id=123&type=share',
            imageUrl: '/images/timeline.jpg'
        };
    }
});
```

## 组件系统

### 1. 自定义组件
```javascript
// components/custom-modal/custom-modal.js
Component({
    // 组件属性
    properties: {
        visible: {
            type: Boolean,
            value: false,
            observer: function(newVal, oldVal) {
                console.log('visible changed:', newVal, oldVal);
            }
        },
        title: {
            type: String,
            value: '提示'
        },
        content: {
            type: String,
            value: ''
        },
        showCancel: {
            type: Boolean,
            value: true
        }
    },
    
    // 组件数据
    data: {
        animationClass: ''
    },
    
    // 组件生命周期
    lifetimes: {
        created() {
            // 组件实例刚刚被创建
            console.log('组件创建');
        },
        
        attached() {
            // 组件实例进入页面节点树
            console.log('组件附加到页面');
        },
        
        ready() {
            // 组件在视图层布局完成后执行
            console.log('组件布局完成');
        },
        
        moved() {
            // 组件实例被移动到节点树另一个位置
            console.log('组件移动');
        },
        
        detached() {
            // 组件实例被从页面节点树移除
            console.log('组件移除');
        }
    },
    
    // 页面生命周期
    pageLifetimes: {
        show() {
            // 页面被展示
            console.log('页面显示');
        },
        
        hide() {
            // 页面被隐藏
            console.log('页面隐藏');
        },
        
        resize(size) {
            // 页面尺寸变化
            console.log('页面尺寸变化:', size);
        }
    },
    
    // 组件方法
    methods: {
        // 显示模态框
        show() {
            this.setData({
                visible: true,
                animationClass: 'fade-in'
            });
        },
        
        // 隐藏模态框
        hide() {
            this.setData({
                animationClass: 'fade-out'
            });
            
            setTimeout(() => {
                this.setData({
                    visible: false
                });
            }, 300);
        },
        
        // 确认按钮
        onConfirm() {
            this.triggerEvent('confirm', {
                timestamp: Date.now()
            });
            this.hide();
        },
        
        // 取消按钮
        onCancel() {
            this.triggerEvent('cancel');
            this.hide();
        },
        
        // 阻止冒泡
        preventBubble() {
            // 空方法，用于阻止事件冒泡
        }
    }
});
```

```xml
<!-- components/custom-modal/custom-modal.wxml -->
<view class="modal-mask {{visible ? 'show' : ''}}" bindtap="hide" wx:if="{{visible}}">
    <view class="modal-container {{animationClass}}" catchtap="preventBubble">
        <view class="modal-header">
            <text class="modal-title">{{title}}</text>
        </view>
        
        <view class="modal-body">
            <text class="modal-content">{{content}}</text>
            <slot></slot>
        </view>
        
        <view class="modal-footer">
            <button class="modal-btn cancel-btn" bindtap="onCancel" wx:if="{{showCancel}}">
                取消
            </button>
            <button class="modal-btn confirm-btn" bindtap="onConfirm">
                确定
            </button>
        </view>
    </view>
</view>
```

### 2. 组件通信
```javascript
// 父子组件通信
// 父组件
Page({
    data: {
        modalVisible: false,
        modalTitle: '确认删除',
        modalContent: '确定要删除这条记录吗？'
    },
    
    showModal() {
        this.setData({
            modalVisible: true
        });
    },
    
    onModalConfirm(e) {
        console.log('用户确认', e.detail);
        // 执行删除操作
        this.deleteRecord();
    },
    
    onModalCancel() {
        console.log('用户取消');
    }
});

// 父组件模板
<custom-modal
    visible="{{modalVisible}}"
    title="{{modalTitle}}"
    content="{{modalContent}}"
    bind:confirm="onModalConfirm"
    bind:cancel="onModalCancel"
>
    <view>自定义内容</view>
</custom-modal>

// 兄弟组件通信 (通过父组件)
// 或使用全局事件总线
// utils/event-bus.js
class EventBus {
    constructor() {
        this.events = {};
    }
    
    on(event, handler) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(handler);
    }
    
    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(handler => handler(data));
        }
    }
    
    off(event, handler) {
        if (this.events[event]) {
            const index = this.events[event].indexOf(handler);
            if (index > -1) {
                this.events[event].splice(index, 1);
            }
        }
    }
}

const eventBus = new EventBus();
export default eventBus;
```

## 数据管理

### 1. 状态管理
```javascript
// utils/store.js - 简单状态管理
class Store {
    constructor() {
        this.state = {};
        this.listeners = [];
    }
    
    // 设置状态
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.notify();
    }
    
    // 获取状态
    getState() {
        return this.state;
    }
    
    // 订阅状态变化
    subscribe(listener) {
        this.listeners.push(listener);
        
        // 返回取消订阅函数
        return () => {
            const index = this.listeners.indexOf(listener);
            if (index > -1) {
                this.listeners.splice(index, 1);
            }
        };
    }
    
    // 通知所有监听者
    notify() {
        this.listeners.forEach(listener => listener(this.state));
    }
}

const store = new Store();

// 初始状态
store.setState({
    user: null,
    token: '',
    theme: 'light'
});

export default store;

// 在页面中使用
import store from '../../utils/store.js';

Page({
    data: {
        user: null
    },
    
    onLoad() {
        // 订阅状态变化
        this.unsubscribe = store.subscribe((state) => {
            this.setData({
                user: state.user
            });
        });
        
        // 获取初始状态
        const state = store.getState();
        this.setData({
            user: state.user
        });
    },
    
    onUnload() {
        // 取消订阅
        if (this.unsubscribe) {
            this.unsubscribe();
        }
    },
    
    login() {
        // 更新状态
        store.setState({
            user: { name: '张三', id: 123 },
            token: 'abc123'
        });
    }
});
```

### 2. 数据缓存
```javascript
// utils/cache.js
class Cache {
    // 设置缓存
    static set(key, data, expire = null) {
        const cacheData = {
            data,
            timestamp: Date.now(),
            expire: expire ? Date.now() + expire : null
        };
        
        try {
            wx.setStorageSync(key, cacheData);
        } catch (error) {
            console.error('缓存设置失败:', error);
        }
    }
    
    // 获取缓存
    static get(key) {
        try {
            const cacheData = wx.getStorageSync(key);
            if (!cacheData) return null;
            
            // 检查是否过期
            if (cacheData.expire && Date.now() > cacheData.expire) {
                this.remove(key);
                return null;
            }
            
            return cacheData.data;
        } catch (error) {
            console.error('缓存获取失败:', error);
            return null;
        }
    }
    
    // 删除缓存
    static remove(key) {
        try {
            wx.removeStorageSync(key);
        } catch (error) {
            console.error('缓存删除失败:', error);
        }
    }
    
    // 清空缓存
    static clear() {
        try {
            wx.clearStorageSync();
        } catch (error) {
            console.error('缓存清空失败:', error);
        }
    }
    
    // 获取缓存信息
    static getInfo() {
        try {
            return wx.getStorageInfoSync();
        } catch (error) {
            console.error('获取缓存信息失败:', error);
            return null;
        }
    }
}

export default Cache;

// 使用示例
// 设置缓存，5分钟后过期
Cache.set('userInfo', { name: '张三' }, 5 * 60 * 1000);

// 获取缓存
const userInfo = Cache.get('userInfo');
```

## 网络请求

### 1. 请求封装
```javascript
// utils/request.js
class Request {
    constructor() {
        this.baseURL = 'https://api.example.com';
        this.timeout = 10000;
        this.header = {
            'Content-Type': 'application/json'
        };
    }
    
    // 请求拦截器
    beforeRequest(config) {
        // 显示加载提示
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        
        // 添加token
        const token = wx.getStorageSync('token');
        if (token) {
            config.header.Authorization = `Bearer ${token}`;
        }
        
        return config;
    }
    
    // 响应拦截器
    afterRequest(response) {
        wx.hideLoading();
        
        const { statusCode, data } = response;
        
        if (statusCode === 200) {
            if (data.code === 200) {
                return data.data;
            } else if (data.code === 401) {
                // 未授权，跳转登录
                wx.navigateTo({
                    url: '/pages/login/login'
                });
                return Promise.reject(new Error('未授权'));
            } else {
                wx.showToast({
                    title: data.message || '请求失败',
                    icon: 'none'
                });
                return Promise.reject(new Error(data.message));
            }
        } else {
            wx.showToast({
                title: '网络错误',
                icon: 'none'
            });
            return Promise.reject(new Error('网络错误'));
        }
    }
    
    // 发送请求
    request(options) {
        const config = {
            url: this.baseURL + options.url,
            method: options.method || 'GET',
            data: options.data,
            header: { ...this.header, ...options.header },
            timeout: options.timeout || this.timeout
        };
        
        // 执行请求拦截器
        const processedConfig = this.beforeRequest(config);
        
        return new Promise((resolve, reject) => {
            wx.request({
                ...processedConfig,
                success: (response) => {
                    try {
                        const result = this.afterRequest(response);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                },
                fail: (error) => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '网络连接失败',
                        icon: 'none'
                    });
                    reject(error);
                }
            });
        });
    }
    
    // GET请求
    get(url, data, options = {}) {
        return this.request({
            url,
            method: 'GET',
            data,
            ...options
        });
    }
    
    // POST请求
    post(url, data, options = {}) {
        return this.request({
            url,
            method: 'POST',
            data,
            ...options
        });
    }
    
    // PUT请求
    put(url, data, options = {}) {
        return this.request({
            url,
            method: 'PUT',
            data,
            ...options
        });
    }
    
    // DELETE请求
    delete(url, options = {}) {
        return this.request({
            url,
            method: 'DELETE',
            ...options
        });
    }
    
    // 文件上传
    uploadFile(url, filePath, formData = {}) {
        return new Promise((resolve, reject) => {
            wx.showLoading({
                title: '上传中...'
            });
            
            const uploadTask = wx.uploadFile({
                url: this.baseURL + url,
                filePath,
                name: 'file',
                formData,
                header: {
                    Authorization: `Bearer ${wx.getStorageSync('token')}`
                },
                success: (res) => {
                    wx.hideLoading();
                    
                    if (res.statusCode === 200) {
                        const data = JSON.parse(res.data);
                        if (data.code === 200) {
                            resolve(data.data);
                        } else {
                            wx.showToast({
                                title: data.message || '上传失败',
                                icon: 'none'
                            });
                            reject(new Error(data.message));
                        }
                    } else {
                        wx.showToast({
                            title: '上传失败',
                            icon: 'none'
                        });
                        reject(new Error('上传失败'));
                    }
                },
                fail: (error) => {
                    wx.hideLoading();
                    wx.showToast({
                        title: '上传失败',
                        icon: 'none'
                    });
                    reject(error);
                }
            });
            
            // 监听上传进度
            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度:', res.progress);
            });
        });
    }
}

const request = new Request();
export default request;
```

## 性能优化

### 1. 渲染优化
```javascript
// 避免频繁setData
Page({
    data: {
        list: [],
        count: 0
    },
    
    // 错误示例 - 频繁setData
    badExample() {
        for (let i = 0; i < 100; i++) {
            this.setData({
                count: i
            });
        }
    },
    
    // 正确示例 - 批量更新
    goodExample() {
        const updates = {};
        for (let i = 0; i < 100; i++) {
            updates[`list[${i}]`] = { id: i, name: `Item ${i}` };
        }
        updates.count = 100;
        
        this.setData(updates);
    },
    
    // 使用节流优化
    throttledUpdate: throttle(function(data) {
        this.setData(data);
    }, 100),
    
    // 分页加载
    loadMore() {
        if (this.data.loading || this.data.noMore) return;
        
        this.setData({ loading: true });
        
        request.get('/api/list', {
            page: this.data.page + 1,
            limit: 20
        }).then(res => {
            const newList = this.data.list.concat(res.list);
            this.setData({
                list: newList,
                page: this.data.page + 1,
                loading: false,
                noMore: res.list.length < 20
            });
        });
    }
});

// 工具函数 - 节流
function throttle(func, delay) {
    let timer = null;
    return function(...args) {
        if (!timer) {
            timer = setTimeout(() => {
                func.apply(this, args);
                timer = null;
            }, delay);
        }
    };
}
```

### 2. 图片优化
```xml
<!-- 懒加载 -->
<image 
    src="{{item.image}}" 
    lazy-load="{{true}}"
    mode="aspectFill"
    bindload="onImageLoad"
    binderror="onImageError"
/>

<!-- 渐进式加载 -->
<view class="image-container">
    <image 
        src="{{item.thumbnail}}" 
        class="thumbnail"
        mode="aspectFill"
    />
    <image 
        src="{{item.image}}" 
        class="full-image {{imageLoaded ? 'loaded' : ''}}"
        mode="aspectFill"
        bindload="onFullImageLoad"
    />
</view>
```

```javascript
// 图片优化处理
Page({
    data: {
        imageLoaded: false
    },
    
    onImageLoad(e) {
        console.log('图片加载成功');
    },
    
    onImageError(e) {
        console.log('图片加载失败', e);
        // 使用默认图片
        const index = e.currentTarget.dataset.index;
        this.setData({
            [`list[${index}].image`]: '/images/default.png'
        });
    },
    
    onFullImageLoad() {
        this.setData({
            imageLoaded: true
        });
    },
    
    // 图片压缩
    compressImage(src) {
        return new Promise((resolve) => {
            wx.compressImage({
                src,
                quality: 80,
                success: (res) => {
                    resolve(res.tempFilePath);
                },
                fail: () => {
                    resolve(src);
                }
            });
        });
    }
});
```

## 小程序云开发

### 1. 云函数
```javascript
// 云函数 - login
const cloud = require('wx-server-sdk');

cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
});

const db = cloud.database();

exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext();
    
    try {
        // 获取用户信息
        const { userInfo } = event;
        
        // 查询用户是否存在
        const userRecord = await db.collection('users')
            .where({
                openid: wxContext.OPENID
            })
            .get();
        
        if (userRecord.data.length === 0) {
            // 新用户，创建记录
            await db.collection('users').add({
                data: {
                    openid: wxContext.OPENID,
                    unionid: wxContext.UNIONID,
                    userInfo,
                    createTime: new Date(),
                    lastLoginTime: new Date()
                }
            });
        } else {
            // 更新最后登录时间
            await db.collection('users')
                .where({
                    openid: wxContext.OPENID
                })
                .update({
                    data: {
                        lastLoginTime: new Date(),
                        userInfo
                    }
                });
        }
        
        return {
            success: true,
            openid: wxContext.OPENID,
            unionid: wxContext.UNIONID
        };
    } catch (error) {
        console.error('登录失败:', error);
        return {
            success: false,
            error: error.message
        };
    }
};
```

### 2. 云数据库
```javascript
// 小程序端数据库操作
Page({
    data: {
        articles: []
    },
    
    onLoad() {
        this.loadArticles();
    },
    
    // 查询文章列表
    async loadArticles() {
        try {
            wx.showLoading({ title: '加载中...' });
            
            const db = wx.cloud.database();
            const result = await db.collection('articles')
                .where({
                    status: 'published'
                })
                .orderBy('createTime', 'desc')
                .limit(20)
                .get();
            
            this.setData({
                articles: result.data
            });
        } catch (error) {
            console.error('加载文章失败:', error);
            wx.showToast({
                title: '加载失败',
                icon: 'none'
            });
        } finally {
            wx.hideLoading();
        }
    },
    
    // 添加文章
    async addArticle(articleData) {
        try {
            const db = wx.cloud.database();
            const result = await db.collection('articles').add({
                data: {
                    ...articleData,
                    createTime: new Date(),
                    updateTime: new Date(),
                    status: 'published'
                }
            });
            
            wx.showToast({
                title: '发布成功',
                icon: 'success'
            });
            
            // 刷新列表
            this.loadArticles();
        } catch (error) {
            console.error('发布文章失败:', error);
            wx.showToast({
                title: '发布失败',
                icon: 'none'
            });
        }
    },
    
    // 更新文章
    async updateArticle(id, updateData) {
        try {
            const db = wx.cloud.database();
            await db.collection('articles')
                .doc(id)
                .update({
                    data: {
                        ...updateData,
                        updateTime: new Date()
                    }
                });
            
            wx.showToast({
                title: '更新成功',
                icon: 'success'
            });
        } catch (error) {
            console.error('更新文章失败:', error);
            wx.showToast({
                title: '更新失败',
                icon: 'none'
            });
        }
    },
    
    // 删除文章
    async deleteArticle(id) {
        try {
            const result = await wx.showModal({
                title: '确认删除',
                content: '确定要删除这篇文章吗？'
            });
            
            if (result.confirm) {
                const db = wx.cloud.database();
                await db.collection('articles').doc(id).remove();
                
                wx.showToast({
                    title: '删除成功',
                    icon: 'success'
                });
                
                // 刷新列表
                this.loadArticles();
            }
        } catch (error) {
            console.error('删除文章失败:', error);
            wx.showToast({
                title: '删除失败',
                icon: 'none'
            });
        }
    }
});
```

### 3. 云存储
```javascript
// 文件上传到云存储
Page({
    // 选择并上传图片
    async chooseAndUploadImage() {
        try {
            // 选择图片
            const chooseResult = await wx.chooseImage({
                count: 1,
                sizeType: ['compressed'],
                sourceType: ['album', 'camera']
            });
            
            const filePath = chooseResult.tempFilePaths[0];
            
            // 上传到云存储
            const uploadResult = await this.uploadToCloud(filePath);
            
            wx.showToast({
                title: '上传成功',
                icon: 'success'
            });
            
            return uploadResult.fileID;
        } catch (error) {
            console.error('上传失败:', error);
            wx.showToast({
                title: '上传失败',
                icon: 'none'
            });
        }
    },
    
    // 上传文件到云存储
    uploadToCloud(filePath) {
        return new Promise((resolve, reject) => {
            const fileName = `images/${Date.now()}_${Math.random().toString(36).substr(2, 9)}.jpg`;
            
            wx.cloud.uploadFile({
                cloudPath: fileName,
                filePath: filePath,
                success: resolve,
                fail: reject
            });
        });
    },
    
    // 下载云存储文件
    async downloadFromCloud(fileID) {
        try {
            const result = await wx.cloud.downloadFile({
                fileID: fileID
            });
            
            return result.tempFilePath;
        } catch (error) {
            console.error('下载失败:', error);
            throw error;
        }
    },
    
    // 删除云存储文件
    async deleteFromCloud(fileIDs) {
        try {
            const result = await wx.cloud.deleteFile({
                fileList: fileIDs
            });
            
            console.log('删除结果:', result);
            return result;
        } catch (error) {
            console.error('删除失败:', error);
            throw error;
        }
    },
    
    // 获取临时链接
    async getTempFileURL(fileIDs) {
        try {
            const result = await wx.cloud.getTempFileURL({
                fileList: fileIDs
            });
            
            return result.fileList;
        } catch (error) {
            console.error('获取临时链接失败:', error);
            throw error;
        }
    }
});
```

微信小程序作为重要的移动应用平台，掌握其高级开发技巧和性能优化方法对开发者至关重要。