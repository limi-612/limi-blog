---
title: Node.js后端开发实战
date: 2025/01/08
tags:
 - Node.js
 - 后端开发
categories:
 - Node.js
---

<ReadAloud />

## Express框架核心

### 基础路由
```javascript
const express = require('express');
const app = express();

app.use(express.json());

app.get('/api/users', (req, res) => {
    res.json({ users: [] });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({ id: 1, name, email });
});
```

### 中间件应用
```javascript
// 日志中间件
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
};

// 错误处理中间件
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
};

app.use(logger);
app.use('/api', apiRoutes);
app.use(errorHandler);
```

## 数据库操作

### MongoDB集成
```javascript
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// CRUD操作
const createUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
};

const getUsers = async (filter = {}) => {
    return await User.find(filter).sort({ createdAt: -1 });
};
```

### Redis缓存
```javascript
const redis = require('redis');
const client = redis.createClient();

const cache = {
    set: (key, value, ttl = 3600) => {
        return client.setex(key, ttl, JSON.stringify(value));
    },
    
    get: async (key) => {
        const data = await client.get(key);
        return data ? JSON.parse(data) : null;
    }
};
```

## 认证授权

### JWT实现
```javascript
const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
};

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ error: 'Token required' });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
};
```

## 性能优化

### 集群模式
```javascript
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    
    cluster.on('exit', (worker) => {
        console.log(`Worker ${worker.process.pid} died`);
        cluster.fork();
    });
} else {
    require('./app.js');
}
```

### 流处理
```javascript
const fs = require('fs');
const { Transform } = require('stream');

const processLargeFile = (inputPath, outputPath) => {
    const readStream = fs.createReadStream(inputPath);
    const writeStream = fs.createWriteStream(outputPath);
    
    const transform = new Transform({
        transform(chunk, encoding, callback) {
            const processed = chunk.toString().toUpperCase();
            callback(null, processed);
        }
    });
    
    readStream.pipe(transform).pipe(writeStream);
};
```

Node.js提供了强大的服务端JavaScript运行环境，适合构建高性能的网络应用。