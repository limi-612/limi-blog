---
title: Vue2核心面试题
date: 2024/12/20
tags:
 - Vue2
 - 响应式
 - 生命周期
categories:
 - Vue2
---

## 响应式原理

### 1. Vue2响应式原理详解

**核心思想：** Vue2使用Object.defineProperty劫持对象属性的getter和setter，实现数据变化的监听。

**实现步骤：**
1. **数据劫持：** 遍历data对象的所有属性，使用Object.defineProperty重新定义每个属性
2. **依赖收集：** 在getter中收集依赖（哪些地方用到了这个数据）
3. **派发更新：** 在setter中通知所有依赖进行更新

**关键概念：**
- **Observer：** 负责将普通对象转换为响应式对象
- **Dep：** 依赖收集器，每个响应式属性都有一个对应的Dep实例
- **Watcher：** 观察者，代表一个依赖，当数据变化时会执行相应的更新函数

**工作流程：**
1. 初始化时，Observer遍历data对象，为每个属性创建Dep实例
2. 组件渲染时，访问响应式数据触发getter，Dep收集当前的Watcher
3. 数据修改时，触发setter，Dep通知所有Watcher执行更新

```javascript
// Vue2响应式核心实现
function defineReactive(obj, key, val) {
    const dep = new Dep(); // 每个属性都有一个依赖收集器
    
    Object.defineProperty(obj, key, {
        get() {
            // 依赖收集：如果当前有活跃的watcher，就收集依赖
            if (Dep.target) {
                dep.depend();
            }
            return val;
        },
        set(newVal) {
            if (newVal === val) return;
            val = newVal;
            // 派发更新：通知所有依赖进行更新
            dep.notify();
        }
    });
}
```

**面试要点：**
- Vue2响应式的核心是Object.defineProperty
- 每个响应式属性都有一个Dep实例用于收集依赖
- 通过getter收集依赖，通过setter派发更新
- 这种方式无法检测数组索引变化和对象新增属性

### 2. 数组响应式处理的特殊性

**问题背景：** Object.defineProperty无法监听数组的索引变化，如arr[0] = newValue不会触发更新。

**解决方案：** Vue2通过重写数组的7个变异方法来实现数组的响应式。

**重写的方法：** push、pop、shift、unshift、splice、sort、reverse

**实现原理：**
1. **方法拦截：** 创建一个新的数组原型，重写变异方法
2. **执行原方法：** 先执行数组原本的方法逻辑
3. **响应式处理：** 对新增的元素进行响应式处理
4. **通知更新：** 手动触发依赖更新

**为什么只重写这7个方法：**
- 这些方法会改变原数组（变异方法）
- 其他方法如concat、slice等不会改变原数组，返回新数组

**数组响应式的限制：**
- 无法检测通过索引直接设置数组项：`vm.items[indexOfItem] = newValue`
- 无法检测修改数组长度：`vm.items.length = newLength`
- 需要使用Vue.set()或splice()方法来触发更新

```javascript
// 数组方法重写示例
const arrayMethods = Object.create(Array.prototype);

['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'].forEach(method => {
    arrayMethods[method] = function(...args) {
        // 1. 执行原方法
        const result = Array.prototype[method].apply(this, args);
        
        // 2. 获取Observer实例
        const ob = this.__ob__;
        
        // 3. 处理新增元素
        let inserted;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args; // 新增的元素
                break;
            case 'splice':
                inserted = args.slice(2); // splice的新增元素从第3个参数开始
                break;
        }
        
        // 4. 对新增元素进行响应式处理
        if (inserted) ob.observeArray(inserted);
        
        // 5. 手动通知更新
        ob.dep.notify();
        
        return result;
    };
});
```

**面试要点：**
- Vue2无法直接监听数组索引变化
- 通过重写数组变异方法实现响应式
- 只有7个变异方法会触发更新
- 数组的length属性变化也无法监听

## 生命周期详解

### 1. Vue2生命周期完整流程

**生命周期概念：** Vue实例从创建到销毁的完整过程，每个阶段都会调用对应的钩子函数。

**四个阶段：** 创建 → 挂载 → 更新 → 销毁

#### 创建阶段
**beforeCreate：**
- **执行时机：** 实例初始化之后，数据观测和事件配置之前
- **可访问：** 无法访问data、computed、methods
- **适用场景：** 加载loading、初始化插件

**created：**
- **执行时机：** 实例创建完成，数据观测、属性和方法的运算已完成
- **可访问：** 可以访问data、computed、methods，但无法访问DOM
- **适用场景：** 数据初始化、API调用、事件监听

#### 挂载阶段
**beforeMount：**
- **执行时机：** 模板编译完成，但还未挂载到DOM
- **特点：** 虚拟DOM已创建，但真实DOM还未生成
- **适用场景：** 较少使用，一般在此阶段做最后的数据修改

**mounted：**
- **执行时机：** 实例挂载到DOM完成
- **可访问：** 可以访问DOM元素
- **适用场景：** DOM操作、第三方库初始化、获取元素尺寸

#### 更新阶段
**beforeUpdate：**
- **执行时机：** 数据更新时，虚拟DOM重新渲染之前
- **特点：** 可以在此阶段修改数据，不会触发重新渲染
- **适用场景：** 获取更新前的DOM状态

**updated：**
- **执行时机：** 虚拟DOM重新渲染完成，DOM更新完成
- **注意：** 避免在此钩子中修改数据，可能导致无限循环
- **适用场景：** 需要访问更新后的DOM

#### 销毁阶段
**beforeDestroy：**
- **执行时机：** 实例销毁之前
- **可访问：** 实例仍然完全可用
- **适用场景：** 清理定时器、解绑事件监听、取消网络请求

**destroyed：**
- **执行时机：** 实例销毁完成
- **特点：** 所有指令解绑，事件监听器移除，子实例销毁
- **适用场景：** 清理工作的最后确认

**生命周期执行顺序：**
1. new Vue() → 初始化事件和生命周期
2. beforeCreate → 初始化注入和响应式
3. created → 编译模板
4. beforeMount → 创建vm.$el并替换el
5. mounted → 数据变化时
6. beforeUpdate → 虚拟DOM重新渲染和打补丁
7. updated → 调用vm.$destroy()
8. beforeDestroy → 解除绑定，销毁子组件和事件监听器
9. destroyed

```javascript
export default {
    beforeCreate() {
        console.log('1. beforeCreate - 实例初始化');
        // 此时无法访问data和methods
    },
    
    created() {
        console.log('2. created - 实例创建完成');
        // 可以访问data和methods，适合API调用
        this.fetchData();
    },
    
    beforeMount() {
        console.log('3. beforeMount - 挂载前');
        // 模板编译完成，但DOM未生成
    },
    
    mounted() {
        console.log('4. mounted - 挂载完成');
        // DOM已生成，可以进行DOM操作
        this.$refs.myElement.focus();
    },
    
    beforeUpdate() {
        console.log('5. beforeUpdate - 更新前');
        // 数据变化，DOM更新前
    },
    
    updated() {
        console.log('6. updated - 更新完成');
        // DOM更新完成，避免在此修改数据
    },
    
    beforeDestroy() {
        console.log('7. beforeDestroy - 销毁前');
        // 清理定时器、事件监听等
        clearInterval(this.timer);
    },
    
    destroyed() {
        console.log('8. destroyed - 销毁完成');
        // 实例完全销毁
    }
};
```

**面试要点：**
- 生命周期分为4个阶段：创建、挂载、更新、销毁
- created适合数据初始化，mounted适合DOM操作
- beforeDestroy适合清理工作
- updated中避免修改数据，防止无限循环
- 父子组件生命周期执行顺序：父beforeCreate → 父created → 父beforeMount → 子beforeCreate → 子created → 子beforeMount → 子mounted → 父mounted

## 组件通信

### 1. 父子组件通信
```javascript
// 父组件
<template>
    <child-component 
        :message="parentMessage"
        @child-event="handleChildEvent"
    />
</template>

// 子组件
export default {
    props: {
        message: {
            type: String,
            required: true,
            validator(value) {
                return value.length > 0;
            }
        }
    },
    methods: {
        sendToParent() {
            this.$emit('child-event', 'data from child');
        }
    }
};
```

### 2. 跨级组件通信
```javascript
// provide/inject
// 祖先组件
export default {
    provide() {
        return {
            theme: this.theme,
            updateTheme: this.updateTheme
        };
    },
    data() {
        return {
            theme: 'light'
        };
    }
};

// 后代组件
export default {
    inject: ['theme', 'updateTheme'],
    methods: {
        changeTheme() {
            this.updateTheme('dark');
        }
    }
};
```

### 3. EventBus事件总线
```javascript
// 创建事件总线
const EventBus = new Vue();

// 发送事件
EventBus.$emit('custom-event', data);

// 监听事件
EventBus.$on('custom-event', (data) => {
    console.log(data);
});

// 销毁事件
EventBus.$off('custom-event');
```

## Vuex状态管理

### 1. 核心概念
```javascript
const store = new Vuex.Store({
    state: {
        count: 0,
        user: null
    },
    
    getters: {
        doubleCount: state => state.count * 2,
        isLoggedIn: state => !!state.user
    },
    
    mutations: {
        INCREMENT(state) {
            state.count++;
        },
        SET_USER(state, user) {
            state.user = user;
        }
    },
    
    actions: {
        async login({ commit }, credentials) {
            const user = await api.login(credentials);
            commit('SET_USER', user);
        },
        
        incrementAsync({ commit }) {
            setTimeout(() => {
                commit('INCREMENT');
            }, 1000);
        }
    },
    
    modules: {
        user: {
            namespaced: true,
            state: () => ({}),
            mutations: {},
            actions: {}
        }
    }
});
```

### 2. 辅助函数
```javascript
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

export default {
    computed: {
        ...mapState(['count', 'user']),
        ...mapGetters(['doubleCount', 'isLoggedIn']),
        
        // 命名空间模块
        ...mapState('user', {
            userProfile: 'profile'
        })
    },
    
    methods: {
        ...mapMutations(['INCREMENT', 'SET_USER']),
        ...mapActions(['login', 'incrementAsync'])
    }
};
```

## 虚拟DOM与Diff算法

### 1. 虚拟DOM结构
```javascript
// VNode结构
class VNode {
    constructor(tag, data, children, text, elm) {
        this.tag = tag;
        this.data = data;
        this.children = children;
        this.text = text;
        this.elm = elm;
        this.key = data && data.key;
    }
}

// 创建VNode
function createElement(tag, data, children) {
    return new VNode(tag, data, children);
}
```

### 2. Diff算法核心
```javascript
function updateChildren(oldCh, newCh) {
    let oldStartIdx = 0;
    let newStartIdx = 0;
    let oldEndIdx = oldCh.length - 1;
    let newEndIdx = newCh.length - 1;
    
    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
        if (sameVnode(oldStartVnode, newStartVnode)) {
            // 头头比较
            patchVnode(oldStartVnode, newStartVnode);
            oldStartVnode = oldCh[++oldStartIdx];
            newStartVnode = newCh[++newStartIdx];
        } else if (sameVnode(oldEndVnode, newEndVnode)) {
            // 尾尾比较
            patchVnode(oldEndVnode, newEndVnode);
            oldEndVnode = oldCh[--oldEndIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldStartVnode, newEndVnode)) {
            // 头尾比较
            patchVnode(oldStartVnode, newEndVnode);
            nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
            oldStartVnode = oldCh[++oldStartIdx];
            newEndVnode = newCh[--newEndIdx];
        } else if (sameVnode(oldEndVnode, newStartVnode)) {
            // 尾头比较
            patchVnode(oldEndVnode, newStartVnode);
            nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
            oldEndVnode = oldCh[--oldEndIdx];
            newStartVnode = newCh[++newStartIdx];
        }
    }
}
```

## 指令系统

### 1. 自定义指令
```javascript
// 全局指令
Vue.directive('focus', {
    inserted(el) {
        el.focus();
    }
});

// 局部指令
export default {
    directives: {
        highlight: {
            bind(el, binding) {
                el.style.backgroundColor = binding.value;
            },
            update(el, binding) {
                el.style.backgroundColor = binding.value;
            }
        }
    }
};

// 使用
<input v-focus>
<div v-highlight="'yellow'">高亮文本</div>
```

### 2. 指令钩子函数
```javascript
Vue.directive('demo', {
    bind(el, binding, vnode) {
        // 只调用一次，指令第一次绑定到元素时调用
    },
    inserted(el, binding, vnode) {
        // 被绑定元素插入父节点时调用
    },
    update(el, binding, vnode, oldVnode) {
        // 所在组件的VNode更新时调用
    },
    componentUpdated(el, binding, vnode, oldVnode) {
        // 指令所在组件的VNode及其子VNode全部更新后调用
    },
    unbind(el, binding, vnode) {
        // 只调用一次，指令与元素解绑时调用
    }
});
```

## 性能优化

### 1. 组件优化
```javascript
// 函数式组件
Vue.component('functional-component', {
    functional: true,
    render(h, { props, children }) {
        return h('div', props, children);
    }
});

// 异步组件
const AsyncComponent = () => ({
    component: import('./AsyncComponent.vue'),
    loading: LoadingComponent,
    error: ErrorComponent,
    delay: 200,
    timeout: 3000
});
```

### 2. 列表优化
```javascript
// 使用key优化列表渲染
<template>
    <div v-for="item in list" :key="item.id">
        {{ item.name }}
    </div>
</template>

// Object.freeze冻结数据
export default {
    data() {
        return {
            list: Object.freeze([
                { id: 1, name: 'Item 1' },
                { id: 2, name: 'Item 2' }
            ])
        };
    }
};
```

Vue2的核心在于理解响应式原理和组件系统，掌握这些概念对深入使用Vue至关重要。