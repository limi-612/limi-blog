---
title: Webpack高级配置面试题
date: 2024/12/20
tags:
 - Webpack
 - 模块化
 - 构建优化
categories:
 - Webpack
---

## Webpack核心概念

### 1. 基础配置结构
```javascript
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    // 模式
    mode: 'development', // development | production | none
    
    // 入口
    entry: {
        main: './src/index.js',
        vendor: './src/vendor.js'
    },
    
    // 输出
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
        chunkFilename: '[name].[contenthash].chunk.js',
        publicPath: '/',
        clean: true // 清理输出目录
    },
    
    // 模块解析
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
            '@components': path.resolve(__dirname, 'src/components')
        },
        modules: ['node_modules', path.resolve(__dirname, 'src')]
    },
    
    // 模块规则
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        plugins: ['@babel/plugin-transform-runtime']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    process.env.NODE_ENV === 'production' 
                        ? MiniCssExtractPlugin.loader 
                        : 'style-loader',
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024 // 8KB
                    }
                },
                generator: {
                    filename: 'images/[name].[hash][ext]'
                }
            }
        ]
    },
    
    // 插件
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        })
    ],
    
    // 优化
    optimization: {
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    
    // 开发服务器
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000,
        hot: true,
        open: true
    }
};
```

### 2. 多环境配置
```javascript
// webpack.common.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};

// webpack.dev.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    
    devServer: {
        contentBase: './dist',
        hot: true
    },
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
});

// webpack.prod.js
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            }
        ]
    },
    
    optimization: {
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true
                    }
                }
            })
        ]
    }
});
```

## Loader深入理解

### 1. 常用Loader配置
```javascript
module.exports = {
    module: {
        rules: [
            // JavaScript/TypeScript
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: '> 1%',
                                    useBuiltIns: 'usage',
                                    corejs: 3
                                }],
                                '@babel/preset-react',
                                '@babel/preset-typescript'
                            ],
                            plugins: [
                                '@babel/plugin-transform-runtime',
                                ['import', {
                                    libraryName: 'antd',
                                    style: true
                                }]
                            ]
                        }
                    }
                ]
            },
            
            // CSS预处理器
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]--[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'autoprefixer',
                                    'cssnano'
                                ]
                            }
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            additionalData: `@import "@/styles/variables.scss";`
                        }
                    }
                ]
            },
            
            // 文件资源
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 8 * 1024
                    }
                },
                generator: {
                    filename: 'images/[name].[hash:8][ext]'
                }
            },
            
            // 字体文件
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[hash:8][ext]'
                }
            }
        ]
    }
};
```

### 2. 自定义Loader
```javascript
// my-loader.js
module.exports = function(source) {
    // this是loader上下文
    const options = this.getOptions();
    
    // 异步loader
    const callback = this.async();
    
    // 处理源码
    const result = source.replace(/console\.log/g, 'console.info');
    
    // 返回结果
    callback(null, result);
};

// 使用自定义loader
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: path.resolve(__dirname, 'loaders/my-loader.js'),
                        options: {
                            name: 'my-loader'
                        }
                    }
                ]
            }
        ]
    }
};

// 复杂的自定义loader
const loaderUtils = require('loader-utils');
const validateOptions = require('schema-utils');

const schema = {
    type: 'object',
    properties: {
        test: {
            type: 'string'
        }
    }
};

module.exports = function(source) {
    const options = loaderUtils.getOptions(this);
    
    // 验证选项
    validateOptions(schema, options, 'My Loader');
    
    // 添加依赖
    this.addDependency('./config.json');
    
    // 缓存
    this.cacheable && this.cacheable();
    
    // 处理源码
    return `
        ${source}
        console.log('Processed by my-loader');
    `;
};
```

## Plugin深入理解

### 1. 常用Plugin配置
```javascript
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        // 清理输出目录
        new CleanWebpackPlugin(),
        
        // HTML模板
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html',
            chunks: ['main'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true
            }
        }),
        
        // CSS提取
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].chunk.css'
        }),
        
        // 复制静态文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: 'public',
                    to: 'public',
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        
        // 环境变量
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            '__VERSION__': JSON.stringify('1.0.0')
        }),
        
        // 热更新
        new webpack.HotModuleReplacementPlugin(),
        
        // 包分析
        new BundleAnalyzerPlugin({
            analyzerMode: 'static',
            openAnalyzer: false
        })
    ]
};
```

### 2. 自定义Plugin
```javascript
// my-plugin.js
class MyPlugin {
    constructor(options) {
        this.options = options;
    }
    
    apply(compiler) {
        // 编译开始
        compiler.hooks.compile.tap('MyPlugin', () => {
            console.log('编译开始');
        });
        
        // 编译完成
        compiler.hooks.done.tap('MyPlugin', (stats) => {
            console.log('编译完成');
        });
        
        // 生成资源
        compiler.hooks.emit.tapAsync('MyPlugin', (compilation, callback) => {
            // 添加新文件
            compilation.assets['my-file.txt'] = {
                source: () => 'Hello from MyPlugin',
                size: () => 'Hello from MyPlugin'.length
            };
            
            callback();
        });
        
        // 处理模块
        compiler.hooks.compilation.tap('MyPlugin', (compilation) => {
            compilation.hooks.buildModule.tap('MyPlugin', (module) => {
                console.log('构建模块:', module.resource);
            });
        });
    }
}

module.exports = MyPlugin;

// 使用自定义plugin
const MyPlugin = require('./plugins/my-plugin');

module.exports = {
    plugins: [
        new MyPlugin({
            option: 'value'
        })
    ]
};
```

## 性能优化

### 1. 构建优化
```javascript
module.exports = {
    // 代码分割
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 244000,
            cacheGroups: {
                // 第三方库
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    priority: 10
                },
                
                // 公共模块
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'all',
                    priority: 5,
                    reuseExistingChunk: true
                },
                
                // React相关
                react: {
                    test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                    name: 'react',
                    chunks: 'all',
                    priority: 20
                }
            }
        },
        
        // 运行时代码分离
        runtimeChunk: {
            name: 'runtime'
        },
        
        // 压缩
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            })
        ]
    },
    
    // 外部依赖
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        lodash: '_'
    }
};
```

### 2. 开发优化
```javascript
module.exports = {
    // 缓存
    cache: {
        type: 'filesystem',
        buildDependencies: {
            config: [__filename]
        }
    },
    
    // 并行处理
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'thread-loader',
                        options: {
                            workers: 2
                        }
                    },
                    'babel-loader'
                ]
            }
        ]
    },
    
    // 解析优化
    resolve: {
        // 减少解析步骤
        modules: [path.resolve(__dirname, 'node_modules')],
        
        // 明确扩展名
        extensions: ['.js', '.jsx'],
        
        // 别名
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    
    // 忽略解析
    module: {
        noParse: /jquery|lodash/
    }
};
```

## 模块联邦

### 1. 基础配置
```javascript
// 主应用 (Shell)
const ModuleFederationPlugin = require('@module-federation/webpack');

module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: 'shell',
            remotes: {
                mf_header: 'header@http://localhost:3001/remoteEntry.js',
                mf_footer: 'footer@http://localhost:3002/remoteEntry.js'
            }
        })
    ]
};

// 微前端应用 (Remote)
module.exports = {
    plugins: [
        new ModuleFederationPlugin({
            name: 'header',
            filename: 'remoteEntry.js',
            exposes: {
                './Header': './src/Header.jsx'
            },
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true }
            }
        })
    ]
};

// 使用远程模块
import React, { Suspense } from 'react';

const Header = React.lazy(() => import('mf_header/Header'));

function App() {
    return (
        <div>
            <Suspense fallback={<div>Loading Header...</div>}>
                <Header />
            </Suspense>
        </div>
    );
}
```

### 2. 动态远程模块
```javascript
// 动态加载远程模块
function loadRemoteModule(url, scope, module) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = url;
        
        script.onload = () => {
            const container = window[scope];
            container.init(__webpack_share_scopes__.default);
            container.get(module).then(factory => {
                resolve(factory());
            });
        };
        
        script.onerror = reject;
        document.head.appendChild(script);
    });
}

// 使用
async function loadHeaderComponent() {
    const HeaderModule = await loadRemoteModule(
        'http://localhost:3001/remoteEntry.js',
        'header',
        './Header'
    );
    
    return HeaderModule.default;
}
```

## 调试与分析

### 1. 构建分析
```javascript
// webpack-bundle-analyzer
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888,
            openAnalyzer: true
        })
    ]
};

// speed-measure-webpack-plugin
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
    // webpack配置
});

// webpack-dashboard
const DashboardPlugin = require('webpack-dashboard/plugin');

module.exports = {
    plugins: [
        new DashboardPlugin()
    ]
};
```

### 2. 调试技巧
```javascript
// 详细输出
module.exports = {
    stats: {
        colors: true,
        modules: true,
        reasons: true,
        errorDetails: true
    }
};

// 性能提示
module.exports = {
    performance: {
        hints: 'warning',
        maxEntrypointSize: 250000,
        maxAssetSize: 250000
    }
};

// 自定义进度显示
const ProgressPlugin = require('webpack').ProgressPlugin;

module.exports = {
    plugins: [
        new ProgressPlugin((percentage, message, ...args) => {
            console.log(`${Math.round(percentage * 100)}%`, message, ...args);
        })
    ]
};
```

Webpack作为成熟的构建工具，提供了强大的模块化和优化能力，是现代前端工程化的重要基础。