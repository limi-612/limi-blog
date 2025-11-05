---
title: Vue3 Composition API面试题
date: 2024/12/20
tags:
 - Vue3
 - Composition API
 - Proxy
categories:
 - Vue3
---

## Composition API核心

### 1. setup函数详解

**setup函数是Vue3的核心：** 它是Composition API的入口点，在组件创建之前执行。

**执行时机：**
- 在beforeCreate之前执行
- 此时组件实例还未创建，无法访问this
- 所有的响应式数据、计算属性、方法都在setup中定义

**参数说明：**
1. **props：** 父组件传递的属性，响应式对象
2. **context：** 上下文对象，包含：
   - emit：触发事件
   - slots：插槽
   - attrs：非响应式的属性
   - expose：暴露给父组件的方法

**返回值：**
- 返回一个对象，对象的属性会暴露给模板
- 也可以返回一个渲染函数

**与Options API的区别：**
- Options API：按选项类型组织代码（data、methods、computed）
- Composition API：按逻辑功能组织代码，更好的逻辑复用

**优势：**
1. **更好的逻辑复用：** 可以将相关逻辑抽取为组合式函数
2. **更好的TypeScript支持：** 类型推导更准确
3. **更灵活的组织方式：** 相关逻辑可以放在一起

```javascript
import { ref, reactive, computed, watch, onMounted } from 'vue';

export default {
    setup(props, { emit, slots, attrs }) {
        // 1. 响应式数据定义
        const count = ref(0); // 基本类型响应式
        const state = reactive({ // 对象响应式
            name: 'Vue3',
            age: 18
        });
        
        // 2. 计算属性
        const doubleCount = computed(() => count.value * 2);
        
        // 3. 方法定义
        const increment = () => {
            count.value++; // ref需要.value访问
        };
        
        // 4. 监听器
        watch(count, (newVal, oldVal) => {
            console.log(`count变化: ${oldVal} -> ${newVal}`);
        });
        
        // 5. 生命周期钩子
        onMounted(() => {
            console.log('组件已挂载');
        });
        
        // 6. 返回模板需要的数据和方法
        return {
            count,
            state,
            doubleCount,
            increment
        };
    }
};
```

**面试要点：**
- setup是Composition API的入口，在beforeCreate之前执行
- setup中无法访问this，因为组件实例还未创建
- 通过返回对象将数据和方法暴露给模板
- 支持更好的逻辑复用和TypeScript类型推导

### 2. 响应式API对比分析

**Vue3响应式系统的核心API：**

#### ref - 基本类型响应式
**用途：** 为基本类型数据（string、number、boolean）创建响应式引用
**特点：**
- 返回一个包装对象，真实值在.value属性中
- 在模板中会自动解包，不需要.value
- 在JavaScript中访问和修改都需要.value

#### reactive - 对象响应式
**用途：** 为对象类型数据创建响应式代理
**特点：**
- 直接返回响应式代理对象，无需.value
- 深层响应式，嵌套对象也会变为响应式
- 只能用于对象类型（对象、数组）

#### readonly - 只读响应式
**用途：** 创建一个只读的响应式对象
**特点：**
- 不能修改，但会响应原对象的变化
- 适合传递给子组件，防止意外修改

#### toRefs - 解构保持响应式
**用途：** 将reactive对象的所有属性转换为ref
**场景：** 当需要解构reactive对象时保持响应式

#### toRef - 单个属性转ref
**用途：** 将reactive对象的单个属性转换为ref
**特点：** 与原对象保持引用关系，修改会相互影响

**使用选择指南：**
- **基本类型：** 使用ref
- **对象类型：** 使用reactive
- **需要解构：** 使用toRefs
- **只读数据：** 使用readonly

```javascript
// 1. ref - 基本类型响应式
const count = ref(0);
console.log(count.value); // JavaScript中需要.value
count.value++; // 修改也需要.value

// 2. reactive - 对象响应式
const state = reactive({
    count: 0,
    name: 'Vue3',
    nested: { value: 1 }
});
console.log(state.count); // 直接访问
state.count++; // 直接修改
state.nested.value = 2; // 深层响应式

// 3. readonly - 只读响应式
const readonlyState = readonly(state);
// readonlyState.count = 10; // 警告：无法修改

// 4. toRefs - 解构保持响应式
const { count, name } = toRefs(state);
// 现在count和name都是ref对象
console.log(count.value); // 需要.value

// 5. toRef - 单个属性转ref
const countRef = toRef(state, 'count');
countRef.value = 10; // 会同时修改state.count
```

**面试要点：**
- ref用于基本类型，reactive用于对象类型
- ref在JavaScript中需要.value，在模板中会自动解包
- toRefs用于解构reactive对象时保持响应式
- readonly创建只读的响应式对象，防止意外修改

## Proxy响应式原理

### 1. Proxy实现
```javascript
// Vue3响应式核心
function reactive(target) {
    return new Proxy(target, {
        get(target, key, receiver) {
            const result = Reflect.get(target, key, receiver);
            
            // 依赖收集
            track(target, key);
            
            // 深度响应式
            if (isObject(result)) {
                return reactive(result);
            }
            
            return result;
        },
        
        set(target, key, value, receiver) {
            const oldValue = target[key];
            const result = Reflect.set(target, key, value, receiver);
            
            // 触发更新
            if (oldValue !== value) {
                trigger(target, key);
            }
            
            return result;
        },
        
        deleteProperty(target, key) {
            const hadKey = hasOwn(target, key);
            const result = Reflect.deleteProperty(target, key);
            
            if (result && hadKey) {
                trigger(target, key);
            }
            
            return result;
        }
    });
}
```

### 2. 依赖收集系统
```javascript
let activeEffect = null;
const targetMap = new WeakMap();

function track(target, key) {
    if (!activeEffect) return;
    
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    
    dep.add(activeEffect);
}

function trigger(target, key) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    
    const dep = depsMap.get(key);
    if (dep) {
        dep.forEach(effect => effect());
    }
}
```

## 组合式函数(Composables)

### 1. 自定义Hook
```javascript
// useCounter.js
import { ref, computed } from 'vue';

export function useCounter(initialValue = 0) {
    const count = ref(initialValue);
    
    const increment = () => count.value++;
    const decrement = () => count.value--;
    const reset = () => count.value = initialValue;
    
    const isEven = computed(() => count.value % 2 === 0);
    
    return {
        count: readonly(count),
        increment,
        decrement,
        reset,
        isEven
    };
}

// 使用
export default {
    setup() {
        const { count, increment, isEven } = useCounter(10);
        
        return {
            count,
            increment,
            isEven
        };
    }
};
```

### 2. 异步数据获取
```javascript
// useFetch.js
import { ref, watchEffect } from 'vue';

export function useFetch(url) {
    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);
    
    const fetchData = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            const response = await fetch(url.value);
            data.value = await response.json();
        } catch (err) {
            error.value = err;
        } finally {
            loading.value = false;
        }
    };
    
    watchEffect(() => {
        if (url.value) {
            fetchData();
        }
    });
    
    return {
        data: readonly(data),
        error: readonly(error),
        loading: readonly(loading),
        refetch: fetchData
    };
}
```

## 新特性详解

### 1. Teleport传送门
```vue
<template>
    <div>
        <h1>主要内容</h1>
        
        <!-- 传送到body -->
        <Teleport to="body">
            <div class="modal">
                <p>模态框内容</p>
            </div>
        </Teleport>
        
        <!-- 条件传送 -->
        <Teleport to="#modal-container" :disabled="!showModal">
            <Modal />
        </Teleport>
    </div>
</template>
```

### 2. Suspense异步组件
```vue
<template>
    <Suspense>
        <!-- 异步组件 -->
        <template #default>
            <AsyncComponent />
        </template>
        
        <!-- 加载状态 -->
        <template #fallback>
            <div>Loading...</div>
        </template>
    </Suspense>
</template>

<script>
// AsyncComponent.vue
export default {
    async setup() {
        const data = await fetchData();
        return { data };
    }
};
</script>
```

### 3. Fragment多根节点
```vue
<template>
    <!-- Vue3支持多个根节点 -->
    <header>头部</header>
    <main>主要内容</main>
    <footer>底部</footer>
</template>
```

## 性能优化

### 1. 编译时优化
```vue
<template>
    <!-- 静态提升 -->
    <div>
        <h1>{{ title }}</h1>
        <p>静态文本</p> <!-- 会被提升 -->
        <span>{{ message }}</span>
    </div>
</template>

<script>
// 编译后的优化代码
const _hoisted_1 = /*#__PURE__*/_createElementVNode("p", null, "静态文本", -1);

function render() {
    return _createElementVNode("div", null, [
        _createElementVNode("h1", null, _toDisplayString(title), 1),
        _hoisted_1, // 静态节点被提升
        _createElementVNode("span", null, _toDisplayString(message), 1)
    ]);
}
</script>
```

### 2. 响应式优化
```javascript
// shallowRef - 浅层响应式
const state = shallowRef({
    count: 0,
    nested: { value: 1 }
});

// 只有根级别属性是响应式的
state.value = { count: 1 }; // 触发更新
state.value.count = 2; // 不触发更新

// shallowReactive - 浅层对象响应式
const state2 = shallowReactive({
    count: 0,
    nested: { value: 1 }
});

state2.count = 1; // 触发更新
state2.nested.value = 2; // 不触发更新
```

## 与Vue2对比

### 1. 生命周期映射
```javascript
// Vue2 -> Vue3
beforeCreate -> setup()
created -> setup()
beforeMount -> onBeforeMount
mounted -> onMounted
beforeUpdate -> onBeforeUpdate
updated -> onUpdated
beforeDestroy -> onBeforeUnmount
destroyed -> onUnmounted
errorCaptured -> onErrorCaptured

// 新增
onRenderTracked -> 调试用，跟踪响应式依赖
onRenderTriggered -> 调试用，响应式依赖触发时
```

### 2. 响应式对比
```javascript
// Vue2 - Object.defineProperty
// 问题：无法检测数组索引和对象新增属性
this.$set(this.obj, 'newProp', value);
this.$set(this.arr, index, value);

// Vue3 - Proxy
// 解决：可以检测所有变化
state.obj.newProp = value; // 直接赋值即可
state.arr[index] = value; // 直接赋值即可
```

## TypeScript支持

### 1. 类型定义
```typescript
import { defineComponent, ref, PropType } from 'vue';

interface User {
    id: number;
    name: string;
    email: string;
}

export default defineComponent({
    props: {
        user: {
            type: Object as PropType<User>,
            required: true
        },
        count: {
            type: Number,
            default: 0
        }
    },
    
    setup(props) {
        const loading = ref<boolean>(false);
        const users = ref<User[]>([]);
        
        const fetchUsers = async (): Promise<void> => {
            loading.value = true;
            try {
                const response = await api.getUsers();
                users.value = response.data;
            } finally {
                loading.value = false;
            }
        };
        
        return {
            loading,
            users,
            fetchUsers
        };
    }
});
```

### 2. 组合式函数类型
```typescript
// 类型化的组合式函数
export function useCounter(initialValue: number = 0) {
    const count = ref<number>(initialValue);
    
    const increment = (): void => {
        count.value++;
    };
    
    const decrement = (): void => {
        count.value--;
    };
    
    return {
        count: readonly(count),
        increment,
        decrement
    } as const;
}
```

Vue3通过Composition API提供了更好的逻辑复用和TypeScript支持，是现代Vue开发的核心。