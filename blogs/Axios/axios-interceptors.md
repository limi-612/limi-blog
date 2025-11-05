---
title: Axios网络请求面试题
date: 2024/12/20
tags:
 - Axios
 - HTTP请求
 - 拦截器
categories:
 - Axios
---

## Axios基础使用

### 1. Axios核心特性与基本配置

**Axios的主要优势：**
1. **Promise支持：** 基于Promise，支持async/await语法
2. **请求和响应拦截：** 可以在请求或响应被处理前拦截它们
3. **请求和响应数据转换：** 自动转JSON，支持自定义转换
4. **请求取消：** 支持取消请求
5. **广泛的浏览器支持：** 支持所有现代浏览器
6. **CSRF防护：** 内置跨站请求伪造防护

**创建实例的优势：**
- **统一配置：** 可以设置公共的baseURL、超时时间、请求头等
- **实例隔离：** 不同的API服务可以使用不同的实例
- **拦截器独立：** 每个实例可以有自己的拦截器

**HTTP方法详解：**
- **GET：** 获取资源，参数通过params传递
- **POST：** 创建资源，数据通过请求体传递
- **PUT：** 更新整个资源
- **PATCH：** 部分更新资源
- **DELETE：** 删除资源

```javascript
import axios from 'axios';

// 创建实例 - 推荐做法
const api = axios.create({
    baseURL: 'https://api.example.com', // 基础URL
    timeout: 10000, // 10秒超时
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

// GET请求 - 获取数据
const getUsers = async (page = 1, limit = 10) => {
    try {
        const response = await api.get('/users', {
            params: { // URL参数
                page,
                limit,
                sort: 'created_at'
            }
        });
        return response.data;
    } catch (error) {
        console.error('获取用户列表失败:', error.message);
        throw error;
    }
};

// POST请求 - 创建数据
const createUser = async (userData) => {
    try {
        const response = await api.post('/users', {
            name: userData.name,
            email: userData.email,
            role: userData.role || 'user'
        });
        return response.data;
    } catch (error) {
        console.error('创建用户失败:', error.response?.data || error.message);
        throw error;
    }
};

// PUT请求 - 全量更新
const updateUser = async (id, userData) => {
    try {
        const response = await api.put(`/users/${id}`, userData);
        return response.data;
    } catch (error) {
        console.error(`更新用户${id}失败:`, error.message);
        throw error;
    }
};

// PATCH请求 - 部分更新
const patchUser = async (id, partialData) => {
    try {
        const response = await api.patch(`/users/${id}`, partialData);
        return response.data;
    } catch (error) {
        console.error(`部分更新用户${id}失败:`, error.message);
        throw error;
    }
};

// DELETE请求 - 删除数据
const deleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`);
        return { success: true, message: '用户删除成功' };
    } catch (error) {
        console.error(`删除用户${id}失败:`, error.message);
        throw error;
    }
};
```

**面试要点：**
- Axios是基于Promise的HTTP客户端，支持浏览器和Node.js
- 创建实例可以统一配置，提高代码复用性
- 不同HTTP方法有不同的语义和使用场景
- 错误处理应该区分网络错误和业务错误

### 2. Axios请求配置全面解析

**请求配置的重要性：**
请求配置决定了HTTP请求的各个方面，包括请求方式、数据格式、超时处理等。合理的配置可以提高请求的成功率和用户体验。

**核心配置项详解：**

#### 基本配置
- **url：** 请求的服务器URL
- **method：** 请求方法（GET、POST、PUT等）
- **baseURL：** 基础URL，会与url拼接
- **timeout：** 超时时间，防止请求卡死

#### 数据传递
- **params：** URL参数，会被添加到URL后面
- **data：** 请求体数据，用于POST、PUT等方法
- **headers：** 请求头，包含认证信息、内容类型等

#### 响应处理
- **responseType：** 期望的响应数据类型
- **validateStatus：** 自定义响应状态码验证
- **transformResponse：** 响应数据转换函数

#### 进度监听
- **onUploadProgress：** 上传进度回调
- **onDownloadProgress：** 下载进度回调

```javascript
// 完整的请求配置示例
const config = {
    // 基本配置
    url: '/users',
    method: 'post',
    baseURL: 'https://api.example.com',
    timeout: 5000, // 5秒超时
    
    // 请求头配置
    headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIs...',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
    },
    
    // URL参数（会被序列化为?page=1&limit=10）
    params: {
        page: 1,
        limit: 10,
        sort: 'created_at',
        order: 'desc'
    },
    
    // 请求体数据（会被序列化为JSON）
    data: {
        name: 'John Doe',
        email: 'john@example.com',
        age: 30,
        preferences: {
            theme: 'dark',
            language: 'zh-CN'
        }
    },
    
    // 响应类型配置
    responseType: 'json', // 'json' | 'text' | 'blob' | 'arraybuffer' | 'document' | 'stream'
    
    // 上传进度监听（文件上传时有用）
    onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`上传进度: ${percentCompleted}%`);
        // 可以更新UI进度条
        updateProgressBar(percentCompleted);
    },
    
    // 下载进度监听（大文件下载时有用）
    onDownloadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
        );
        console.log(`下载进度: ${percentCompleted}%`);
    },
    
    // 自定义状态码验证
    validateStatus: (status) => {
        // 默认只有200-299范围内的状态码才被认为成功
        return status >= 200 && status < 300;
    },
    
    // 最大重定向次数
    maxRedirects: 5,
    
    // 请求数据转换（在发送前对data进行处理）
    transformRequest: [(data, headers) => {
        // 可以在这里对数据进行加密或其他处理
        return JSON.stringify(data);
    }],
    
    // 响应数据转换（在传递给then/catch前对响应数据进行处理）
    transformResponse: [(data) => {
        // 可以在这里对响应数据进行解密或其他处理
        return typeof data === 'string' ? JSON.parse(data) : data;
    }],
    
    // 代理配置（Node.js环境）
    proxy: {
        protocol: 'http',
        host: '127.0.0.1',
        port: 8080,
        auth: {
            username: 'proxy_user',
            password: 'proxy_pass'
        }
    },
    
    // 取消令牌（用于取消请求）
    cancelToken: axios.CancelToken.source().token,
    
    // 跨域请求是否携带凭证
    withCredentials: true
};

// 使用配置发送请求
const response = await axios(config);

// 或者使用快捷方法
const response2 = await axios.post('/users', config.data, {
    headers: config.headers,
    timeout: config.timeout,
    onUploadProgress: config.onUploadProgress
});
```

**常用配置最佳实践：**
1. **设置合理的超时时间：** 防止请求卡死
2. **使用请求拦截器：** 统一处理认证和错误
3. **配置响应类型：** 根据需要选择合适的数据类型
4. **监听进度：** 提高用户体验，特别是文件上传下载

**面试要点：**
- 请求配置可以在实例创建、请求方法和单次请求中设置
- 配置的优先级：单次请求 > 实例配置 > 全局默认配置
- transformRequest和transformResponse可以用于数据加密解密
- validateStatus可以自定义成功状态码的判断逻辑

## 拦截器详解

### 1. 请求拦截器
```javascript
// 请求拦截器
api.interceptors.request.use(
    (config) => {
        // 在发送请求之前做些什么
        
        // 添加认证token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        // 添加请求ID用于追踪
        config.headers['X-Request-ID'] = generateRequestId();
        
        // 添加时间戳防止缓存
        if (config.method === 'get') {
            config.params = {
                ...config.params,
                _t: Date.now()
            };
        }
        
        // 显示loading
        showLoading();
        
        console.log('发送请求:', config);
        return config;
    },
    (error) => {
        // 对请求错误做些什么
        console.error('请求错误:', error);
        hideLoading();
        return Promise.reject(error);
    }
);

// 多个请求拦截器
const requestInterceptor1 = api.interceptors.request.use(config => {
    console.log('拦截器1');
    return config;
});

const requestInterceptor2 = api.interceptors.request.use(config => {
    console.log('拦截器2');
    return config;
});

// 移除拦截器
api.interceptors.request.eject(requestInterceptor1);
```

### 2. 响应拦截器
```javascript
// 响应拦截器
api.interceptors.response.use(
    (response) => {
        // 对响应数据做点什么
        
        // 隐藏loading
        hideLoading();
        
        // 统一处理响应格式
        const { data, code, message } = response.data;
        
        if (code === 200) {
            return data;
        } else {
            // 业务错误处理
            handleBusinessError(code, message);
            return Promise.reject(new Error(message));
        }
    },
    (error) => {
        // 对响应错误做点什么
        hideLoading();
        
        if (error.response) {
            // 服务器响应了错误状态码
            const { status, data } = error.response;
            
            switch (status) {
                case 401:
                    // 未授权，跳转登录
                    handleUnauthorized();
                    break;
                case 403:
                    // 禁止访问
                    showMessage('没有权限访问该资源');
                    break;
                case 404:
                    // 资源不存在
                    showMessage('请求的资源不存在');
                    break;
                case 500:
                    // 服务器错误
                    showMessage('服务器内部错误');
                    break;
                default:
                    showMessage(data.message || '请求失败');
            }
        } else if (error.request) {
            // 请求已发出但没有收到响应
            showMessage('网络连接失败，请检查网络');
        } else {
            // 其他错误
            showMessage('请求配置错误');
        }
        
        return Promise.reject(error);
    }
);
```

## 高级功能

### 1. 请求取消
```javascript
// 使用AbortController (推荐)
class ApiService {
    constructor() {
        this.controllers = new Map();
    }
    
    async request(config, cancelKey) {
        // 取消之前的同类请求
        if (cancelKey && this.controllers.has(cancelKey)) {
            this.controllers.get(cancelKey).abort();
        }
        
        // 创建新的控制器
        const controller = new AbortController();
        if (cancelKey) {
            this.controllers.set(cancelKey, controller);
        }
        
        try {
            const response = await api({
                ...config,
                signal: controller.signal
            });
            
            // 请求完成后清理
            if (cancelKey) {
                this.controllers.delete(cancelKey);
            }
            
            return response;
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('请求被取消:', error.message);
            } else {
                throw error;
            }
        }
    }
    
    // 取消特定请求
    cancel(cancelKey) {
        if (this.controllers.has(cancelKey)) {
            this.controllers.get(cancelKey).abort();
            this.controllers.delete(cancelKey);
        }
    }
    
    // 取消所有请求
    cancelAll() {
        this.controllers.forEach(controller => controller.abort());
        this.controllers.clear();
    }
}

// 使用示例
const apiService = new ApiService();

// 发送可取消的请求
apiService.request({
    url: '/users',
    method: 'get'
}, 'getUserList');

// 取消请求
apiService.cancel('getUserList');

// 使用CancelToken (旧方式)
const CancelToken = axios.CancelToken;
let cancel;

axios.get('/users', {
    cancelToken: new CancelToken((c) => {
        cancel = c;
    })
});

// 取消请求
cancel('操作被用户取消');
```

### 2. 请求重试
```javascript
// 请求重试装饰器
function withRetry(axiosInstance, retryConfig = {}) {
    const {
        retries = 3,
        retryDelay = 1000,
        retryCondition = (error) => {
            return !error.response || error.response.status >= 500;
        }
    } = retryConfig;
    
    axiosInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const config = error.config;
            
            // 如果没有配置或已达到最大重试次数
            if (!config || config.__retryCount >= retries) {
                return Promise.reject(error);
            }
            
            // 检查是否应该重试
            if (!retryCondition(error)) {
                return Promise.reject(error);
            }
            
            // 增加重试计数
            config.__retryCount = config.__retryCount || 0;
            config.__retryCount++;
            
            // 延迟重试
            await new Promise(resolve => {
                setTimeout(resolve, retryDelay * config.__retryCount);
            });
            
            console.log(`第${config.__retryCount}次重试:`, config.url);
            
            // 重新发送请求
            return axiosInstance(config);
        }
    );
}

// 使用重试功能
const apiWithRetry = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 5000
});

withRetry(apiWithRetry, {
    retries: 3,
    retryDelay: 1000,
    retryCondition: (error) => {
        // 只对网络错误和5xx错误重试
        return !error.response || error.response.status >= 500;
    }
});
```

### 3. 请求缓存
```javascript
// 请求缓存实现
class RequestCache {
    constructor(maxSize = 100, ttl = 5 * 60 * 1000) {
        this.cache = new Map();
        this.maxSize = maxSize;
        this.ttl = ttl;
    }
    
    generateKey(config) {
        const { method, url, params, data } = config;
        return JSON.stringify({ method, url, params, data });
    }
    
    get(key) {
        const item = this.cache.get(key);
        if (!item) return null;
        
        // 检查是否过期
        if (Date.now() - item.timestamp > this.ttl) {
            this.cache.delete(key);
            return null;
        }
        
        return item.data;
    }
    
    set(key, data) {
        // 如果缓存已满，删除最旧的项
        if (this.cache.size >= this.maxSize) {
            const firstKey = this.cache.keys().next().value;
            this.cache.delete(firstKey);
        }
        
        this.cache.set(key, {
            data,
            timestamp: Date.now()
        });
    }
    
    clear() {
        this.cache.clear();
    }
}

// 添加缓存拦截器
function withCache(axiosInstance, cacheConfig = {}) {
    const cache = new RequestCache(
        cacheConfig.maxSize,
        cacheConfig.ttl
    );
    
    axiosInstance.interceptors.request.use((config) => {
        // 只缓存GET请求
        if (config.method === 'get' && !config.skipCache) {
            const key = cache.generateKey(config);
            const cachedData = cache.get(key);
            
            if (cachedData) {
                console.log('使用缓存数据:', config.url);
                // 返回缓存的Promise
                return Promise.resolve({
                    ...config,
                    adapter: () => Promise.resolve({
                        data: cachedData,
                        status: 200,
                        statusText: 'OK',
                        headers: {},
                        config
                    })
                });
            }
        }
        
        return config;
    });
    
    axiosInstance.interceptors.response.use((response) => {
        // 缓存GET请求的响应
        if (response.config.method === 'get' && !response.config.skipCache) {
            const key = cache.generateKey(response.config);
            cache.set(key, response.data);
        }
        
        return response;
    });
    
    // 暴露缓存控制方法
    axiosInstance.clearCache = () => cache.clear();
    
    return axiosInstance;
}

// 使用缓存
const cachedApi = withCache(axios.create({
    baseURL: 'https://api.example.com'
}), {
    maxSize: 50,
    ttl: 5 * 60 * 1000 // 5分钟
});
```

## 文件上传下载

### 1. 文件上传
```javascript
// 单文件上传
async function uploadFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('category', 'image');
    
    try {
        const response = await api.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                onProgress && onProgress(progress);
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('上传失败:', error);
        throw error;
    }
}

// 多文件上传
async function uploadMultipleFiles(files, onProgress) {
    const formData = new FormData();
    
    files.forEach((file, index) => {
        formData.append(`files[${index}]`, file);
    });
    
    try {
        const response = await api.post('/upload/multiple', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                onProgress && onProgress(progress);
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('批量上传失败:', error);
        throw error;
    }
}

// 分片上传
class ChunkUploader {
    constructor(file, chunkSize = 1024 * 1024) { // 1MB
        this.file = file;
        this.chunkSize = chunkSize;
        this.chunks = Math.ceil(file.size / chunkSize);
        this.uploadedChunks = new Set();
    }
    
    async upload(onProgress) {
        const uploadId = await this.initUpload();
        
        // 并发上传分片
        const uploadPromises = [];
        for (let i = 0; i < this.chunks; i++) {
            uploadPromises.push(this.uploadChunk(uploadId, i));
        }
        
        // 监听进度
        const progressInterval = setInterval(() => {
            const progress = (this.uploadedChunks.size / this.chunks) * 100;
            onProgress && onProgress(Math.round(progress));
        }, 100);
        
        try {
            await Promise.all(uploadPromises);
            clearInterval(progressInterval);
            
            // 合并分片
            return await this.mergeChunks(uploadId);
        } catch (error) {
            clearInterval(progressInterval);
            throw error;
        }
    }
    
    async initUpload() {
        const response = await api.post('/upload/init', {
            filename: this.file.name,
            filesize: this.file.size,
            chunks: this.chunks
        });
        return response.data.uploadId;
    }
    
    async uploadChunk(uploadId, chunkIndex) {
        const start = chunkIndex * this.chunkSize;
        const end = Math.min(start + this.chunkSize, this.file.size);
        const chunk = this.file.slice(start, end);
        
        const formData = new FormData();
        formData.append('chunk', chunk);
        formData.append('uploadId', uploadId);
        formData.append('chunkIndex', chunkIndex);
        
        try {
            await api.post('/upload/chunk', formData);
            this.uploadedChunks.add(chunkIndex);
        } catch (error) {
            console.error(`分片${chunkIndex}上传失败:`, error);
            throw error;
        }
    }
    
    async mergeChunks(uploadId) {
        const response = await api.post('/upload/merge', {
            uploadId
        });
        return response.data;
    }
}
```

### 2. 文件下载
```javascript
// 普通文件下载
async function downloadFile(url, filename) {
    try {
        const response = await api.get(url, {
            responseType: 'blob',
            onDownloadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                console.log(`下载进度: ${progress}%`);
            }
        });
        
        // 创建下载链接
        const blob = new Blob([response.data]);
        const downloadUrl = window.URL.createObjectURL(blob);
        
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        
        // 清理
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
        
    } catch (error) {
        console.error('下载失败:', error);
        throw error;
    }
}

// 大文件分段下载
class ChunkDownloader {
    constructor(url, filename, chunkSize = 1024 * 1024) {
        this.url = url;
        this.filename = filename;
        this.chunkSize = chunkSize;
    }
    
    async download(onProgress) {
        // 获取文件信息
        const fileInfo = await this.getFileInfo();
        const chunks = Math.ceil(fileInfo.size / this.chunkSize);
        
        // 并发下载分片
        const downloadPromises = [];
        const chunkData = new Array(chunks);
        
        for (let i = 0; i < chunks; i++) {
            downloadPromises.push(
                this.downloadChunk(i, fileInfo.size).then(data => {
                    chunkData[i] = data;
                    const progress = ((i + 1) / chunks) * 100;
                    onProgress && onProgress(Math.round(progress));
                })
            );
        }
        
        await Promise.all(downloadPromises);
        
        // 合并分片
        const blob = new Blob(chunkData);
        this.saveFile(blob);
    }
    
    async getFileInfo() {
        const response = await api.head(this.url);
        return {
            size: parseInt(response.headers['content-length'])
        };
    }
    
    async downloadChunk(chunkIndex, fileSize) {
        const start = chunkIndex * this.chunkSize;
        const end = Math.min(start + this.chunkSize - 1, fileSize - 1);
        
        const response = await api.get(this.url, {
            headers: {
                Range: `bytes=${start}-${end}`
            },
            responseType: 'arraybuffer'
        });
        
        return response.data;
    }
    
    saveFile(blob) {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = this.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}
```

## 错误处理与调试

### 1. 统一错误处理
```javascript
// 错误类型定义
class ApiError extends Error {
    constructor(message, code, response) {
        super(message);
        this.name = 'ApiError';
        this.code = code;
        this.response = response;
    }
}

// 错误处理器
class ErrorHandler {
    static handle(error) {
        if (error.response) {
            // 服务器响应错误
            const { status, data } = error.response;
            
            switch (status) {
                case 400:
                    return new ApiError('请求参数错误', 'BAD_REQUEST', error.response);
                case 401:
                    return new ApiError('未授权访问', 'UNAUTHORIZED', error.response);
                case 403:
                    return new ApiError('禁止访问', 'FORBIDDEN', error.response);
                case 404:
                    return new ApiError('资源不存在', 'NOT_FOUND', error.response);
                case 500:
                    return new ApiError('服务器内部错误', 'INTERNAL_ERROR', error.response);
                default:
                    return new ApiError(
                        data.message || '请求失败',
                        'UNKNOWN_ERROR',
                        error.response
                    );
            }
        } else if (error.request) {
            // 网络错误
            return new ApiError('网络连接失败', 'NETWORK_ERROR', null);
        } else {
            // 其他错误
            return new ApiError('请求配置错误', 'CONFIG_ERROR', null);
        }
    }
}

// 应用错误处理
api.interceptors.response.use(
    response => response,
    error => {
        const apiError = ErrorHandler.handle(error);
        
        // 记录错误日志
        console.error('API错误:', {
            message: apiError.message,
            code: apiError.code,
            url: error.config?.url,
            method: error.config?.method
        });
        
        // 显示用户友好的错误信息
        showErrorMessage(apiError.message);
        
        return Promise.reject(apiError);
    }
);
```

### 2. 请求日志
```javascript
// 请求日志中间件
function createLogger(options = {}) {
    const {
        logRequest = true,
        logResponse = true,
        logError = true
    } = options;
    
    return {
        request: (config) => {
            if (logRequest) {
                console.group(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
                console.log('配置:', config);
                console.log('请求时间:', new Date().toISOString());
                console.groupEnd();
            }
            return config;
        },
        
        response: (response) => {
            if (logResponse) {
                console.group(`✅ ${response.config.method?.toUpperCase()} ${response.config.url}`);
                console.log('状态:', response.status);
                console.log('响应数据:', response.data);
                console.log('响应时间:', new Date().toISOString());
                console.groupEnd();
            }
            return response;
        },
        
        error: (error) => {
            if (logError) {
                console.group(`❌ ${error.config?.method?.toUpperCase()} ${error.config?.url}`);
                console.log('错误信息:', error.message);
                console.log('错误详情:', error);
                console.log('错误时间:', new Date().toISOString());
                console.groupEnd();
            }
            return Promise.reject(error);
        }
    };
}

// 使用日志中间件
const logger = createLogger();

api.interceptors.request.use(logger.request);
api.interceptors.response.use(logger.response, logger.error);
```

Axios作为最流行的HTTP客户端，提供了丰富的功能和灵活的配置，掌握其高级用法对前端开发至关重要。