---
title: "Vue面试题整理 - 从基础到原理"
date: 2025/12/16
tags:
  - Vue2
  - Vue3
  - 面试
categories:
  - 复习记录
---

<ReadAloud />

## Vue 基础面试题

### 1. Vue 是什么？有什么特点？

- **渐进式框架**：用于构建用户界面的渐进式 JavaScript 框架，可以逐步采用，不需要重写整个应用
- **响应式数据绑定**：数据变化自动更新视图
- **组件化开发**：使用组件化开发方式，提高代码复用性和维护性
- **虚拟 DOM**：提升渲染性能
- **轻量级**：体积小，学习成本低

### 2. Vue2 和 Vue3 的主要区别？

- **性能提升**：Vue3 比 Vue2 快 1.3-2 倍
- **Composition API**：更好的逻辑复用和类型推导
- **Tree-shaking 支持**：对没有使用的引入，会自动被 tree-shaking 移除，从而产生更小的打包体积
- **多根节点**：template 支持多个根节点
- **Teleport**：可以将组件渲染到 DOM 的任意位置
- **Suspense**：异步组件的加载状态处理
- **TypeScript**：底层使用 TypeScript 重写，类型推断更准确，更易于理解

### 3. v-if 和 v-show 的区别？

- **v-if**：条件渲染，false 时不会渲染 DOM 元素
- **v-show**：条件显示，false 时设置 display:none
- **性能**：v-if 切换开销大，v-show 初始渲染开销大
- **使用场景**：频繁切换用 v-show，条件很少改变用 v-if

### 4. computed 和 watch 的区别？

- **computed**：
  - 计算属性，有缓存
  - 依赖的数据变化时才重新计算
  - 必须有返回值
  - 适合一对多的场景
- **watch**：
  - 监听器，无缓存
  - 监听数据变化执行回调
  - 无返回值要求
  - 适合一对一的场景，执行异步操作

### 5. Vue 组件通信方式有哪些？

- **父子组件**：props/$emit
- **兄弟组件**：EventBus、Vuex
- **跨级组件**：provide/inject、Vuex
- **任意组件**：Vuex、EventBus

## Vue 进阶面试题

### 6. Vue 的生命周期有哪些？

**Vue2 生命周期**：

- beforeCreate：实例初始化之后，数据观测之前
- created：数据观测完成，可以使用数据，不能访问 DOM
- beforeMount：挂载开始之前
- mounted：挂载完成，可以访问 DOM
- beforeUpdate：数据更新时调用
- updated：数据更新完成
- beforeDestroy：实例销毁之前
- destroyed：实例销毁完成

**Vue3 生命周期**：

- setup()：组合式 API 的入口
- onBeforeMount()、onMounted()
- onBeforeUpdate()、onUpdated()
- onBeforeUnmount()、onUnmounted()

### 7. Vue 的双向数据绑定原理？

- **Vue2**：Object.defineProperty 劫持对象属性
- **Vue3**：Proxy 代理整个对象
- **发布订阅模式**：Dep 收集依赖，Watcher 订阅更新
- **数据变化**：触发 setter → 通知 Watcher → 更新视图

### 8. 什么是虚拟 DOM？有什么优势？

- **定义**：用 JavaScript 对象描述真实 DOM 结构
- **优势**：
  - 减少直接操作 DOM，提升性能
  - 跨平台能力
  - 便于实现 diff 算法
  - 批量更新，减少重排重绘

### 9. Vue 的 diff 算法原理？

- **同级比较**：只比较同一层级的节点，不跨级比较，复杂度大大降低。
- **判断节点**：首先看新旧节点是否是“同一个”节点（依据标签名和`key`）。不是，则直接替换。
- **同一节点**：如果是同一个节点，则：
    *   **更新属性**：只更新该节点变化的属性和内容。
    *   **对比子节点**：**这是核心**，采用“双端对比”策略高效对比新旧节点的所有子节点。
        *   同时从**头部、尾部**开始快速匹配。
        *   利用唯一的 `key` 来精准识别哪些节点可以**复用和移动**，而不是销毁重建。
- **结果**：最终，只创建新节点、删除废弃节点、移动需要调整位置的节点。

### 10. Vue 组件的渲染过程？

- **模板编译**：template → render 函数
- **响应式处理**：数据劫持，依赖收集
- **虚拟 DOM 生成**：执行 render 函数
- **patch 过程**：虚拟 DOM → 真实 DOM
- **依赖更新**：数据变化触发重新渲染

## Vue 原理深入面试题

### 11. Vue 的响应式原理详解？

**Vue2 响应式**：

```javascript
// 简化版响应式实现
function defineReactive(obj, key, val) {
  const dep = new Dep();
  Object.defineProperty(obj, key, {
    get() {
      if (Dep.target) {
        dep.depend();
      }
      return val;
    },
    set(newVal) {
      if (newVal !== val) {
        val = newVal;
        dep.notify();
      }
    },
  });
}
```

**Vue3 响应式**：

```javascript
// 简化版Proxy实现
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key);
      return target[key];
    },
    set(target, key, value) {
      target[key] = value;
      trigger(target, key);
      return true;
    },
  });
}
```

### 12. Vue 的编译过程？

1. **解析（Parse）**：模板 → AST 抽象语法树
2. **优化（Optimize）**：标记静态节点
3. **生成（Generate）**：AST → render 函数代码

### 13. Vue 的依赖收集原理？

- **Dep 类**：依赖收集器，管理 Watcher
- **Watcher 类**：观察者，响应数据变化
- **收集时机**：getter 触发时收集依赖
- **触发更新**：setter 触发时通知所有 Watcher

### 14. Vue 的异步更新机制？

- **nextTick**：在下次 DOM 更新循环结束后执行回调
- **更新队列**：将同一事件循环中的所有数据变更缓存
- **批量更新**：避免重复渲染，提升性能
- **实现原理**：Promise.then → MutationObserver → setImmediate → setTimeout

### 15. Vue Router 的实现原理？

**Hash 模式**：

- 利用 URL 的 hash 部分（#后面）
- 监听 hashchange 事件
- 不会向服务器发送请求

**History 模式**：

- 利用 HTML5 History API
- 监听 popstate 事件
- 需要服务器配置支持

### 16. Vuex 的实现原理？

- **单一状态树**：全局唯一的 store
- **响应式状态**：state 变化自动更新组件
- **严格的状态修改**：只能通过 mutation 修改 state
- **异步操作**：通过 action 处理异步逻辑

### 17. Vue 的性能优化策略？

- **代码层面**：
  - 合理使用 v-if 和 v-show
  - 列表渲染使用 key
  - 避免在模板中使用复杂表达式
  - 使用 computed 缓存计算结果
- **打包层面**：
  - 路由懒加载
  - 组件懒加载
  - 第三方库按需引入
- **用户体验**：
  - 骨架屏
  - 虚拟滚动
  - 图片懒加载

### 18. Vue3 的 Composition API 优势？

- **更好的逻辑复用**：通过组合函数实现
- **更好的类型推导**：TypeScript 支持更好
- **更灵活的组织代码**：相关逻辑可以组织在一起
- **更小的打包体积**：支持 tree-shaking

### 19. Vue 的 keep-alive 原理？

- **缓存机制**：缓存组件实例，避免重复创建
- **LRU 算法**：最近最少使用算法管理缓存
- **生命周期**：activated 和 deactivated 钩子
- **include/exclude**：控制哪些组件被缓存

### 20. Vue 的插槽（slot）原理？

- **编译时处理**：将插槽内容编译为函数
- **作用域插槽**：子组件向父组件传递数据
- **具名插槽**：多个插槽的命名和分发
- **默认内容**：插槽的默认显示内容

## Vue3 Composition API 深入面试题

### 21. createApp 底层原理？

创建 vue 实例的 API，创建独立的应用上下文，初始化组件实例配置，设置应用范围内的共享数据和方法，返回包含 mount、use、component 等方法应用实例。

### 22. mount 底层原理？

接收一个 DOM 元素，查找目标元素，编译根组件模板或使用渲染函数，创建虚拟 DOM，将虚拟 DOM 渲染成真实 DOM，挂载到目标元素中。

### 23. Vue2 和 Vue3 创建根实例的区别？

- **Vue2**：Vue2 使用 new Vue()方式创建根实例
- **Vue3**：Vue3 使用 createApp()创建根实例，提供更好的封装性和多应用实例的支持
- **隔离性**：每个 createApp 创建的应用实例相互隔离，不会相互影响

### 24. Options API 和 Composition API 的区别？

- **代码组织方式**：Options API 按照功能类别组织代码，将 data、methods、mounted、computed、watch 等选项分离在不同区域中；Composition API 按照逻辑功能组织代码，相关联的响应式数据、方法、计算属性等可以放在一起
- **逻辑复用**：Options API 主要通过 mixins 实现逻辑复用，但容易出现命名冲突和数据来源不清晰的问题；Composition API 通过 composable 函数实现逻辑复用，更加灵活易于维护
- **TypeScript 支持**：Options API 对 TypeScript 支持有限，类型推导不完善；Composition API 原生支持 TypeScript，提供更好的类型推导和开发体验
- **学习曲线**：Options API 概念相对简单，适合初学者快速上手；Composition API 需要理解响应式系统和组合逻辑的概念
- **适用场景**：Options API 适用于简单的组件和快速原型开发；Composition API 更适合大型项目和复杂开发，便于逻辑组织和维护
- **响应式数据声明**：Options API 通过在 data()函数中返回对象形式声明响应式数据；Composition API 通过使用 ref 和 reactive API 显式声明响应式数据

## Vue3 响应式系统深入面试题

### 25. ref 底层原理？

Vue 使用 getter 和 setter 来拦截对.value 的访问和修改，从而触发依赖收集和更新通知。

### 26. ref 怎么触发依赖收集和更新通知？

- **依赖收集**：当代码读取 ref.value 时，触发 getter，在 getter 中调用 track 函数进行依赖收集，将当前正在执行的副作用函数（如组件渲染、watch 等）作为依赖存储起来
- **更新通知**：当修改 ref.value 时，触发 setter，更新\_value 属性，调用 trigger 触发依赖更新通知，通知所有收集到的依赖（副作用函数）重新执行

### 27. ref 和 reactive 的区别？

- **数据类型支持**：ref 支持所有数据类型，对基本类型进行包装，对引用类型会自动调用 reactive 进行处理；reactive 只支持对象和数组等引用类型
- **访问方式**：ref 需要通过.value 访问，在模板中使用时会自动解包；reactive 直接访问属性，无需.value
- **底层原理**：ref 基于 JavaScript 的 getter/setter 实现，对基本类型值进行包装，创建一个包含.value 属性的对象；reactive 基于 Proxy 实现，创建目标对象的代理，拦截各种操作行为

### 28. ref 为什么返回一个对象？

- **保持响应式特性**：将基本类型值包装在一个对象中，可以通过对该对象的.value 属性访问和修改来实现响应式追踪
- **统一访问接口**：返回对象并通过.value 访问，提供了统一的 API 接口，无论是基本类型还是对象类型都可以一致处理
- **兼容性和便利性**：对于对象类型，ref 内部会自动调用 reactive 进行处理，不需要区分基本类型和引用类型，都可以使用相同的 ref API

### 29. ref 在模板渲染过程中自动解包的底层原理？

- 当在模板表达式中访问 ref 变量时，Vue 会通过 isRef()检查该变量是否为 ref 对象，如果是 ref 对象，则自动返回其.value 值
- **提升开发体验**：避免在模板中频繁书写.value，保持一致性，在模板中可以直接像使用普通变量一样使用 ref，减少开发者忘记添加.value 的错误

### 30. reactive 底层原理？

- **基于 Proxy 实现**：reactive 利用 JavaScript 的 Proxy API 创建目标对象的代理，从而拦截对象的各种操作
- **依赖收集和派发更新**：在 getter 中进行依赖收集（track），当访问代理对象的属性时，会将当前的副作用（如组件渲染、watch 等）作为依赖收集起来。在 setter 中进行更新派发（trigger），当修改代理对象的属性时，会触发之前收集到的依赖，执行相应的副作用函数

### 31. Reflect 做了什么？

- **Reflect API**：Reflect 是一个内置对象，提供了一些方法，用于操作对象。这些方法与 Object 的方法类似，但更安全，不会抛出错误。Reflect 方法可以确保正确的 this 绑定和行为
- **Reflect.get()**：Reflect.get()方法用于读取对象的属性值
- **Reflect.set()**：Reflect.set()方法用于设置对象的属性值

### 32. 为什么 Vue3 不用 Object.defineProperty 了？

- **无法监听新增/删除属性**：Object.defineProperty 在创建时一次性递归遍历对象的所有属性，这个过程只在初始化阶段发生一次，导致新增/删除属性无法监听。对于新增或删除属性，需要通过 Vue.set()或 Vue.delete()来实现；Proxy 可以拦截对象的所有操作，包括属性的新增和删除
- **无法监听数组索引变化**：Object.defineProperty 无法有效监听通过索引设置数组项的操作，需要通过重写数组方法（push、pop 等）来实现响应式；Proxy 可以完美监听数组的所有变化
- **性能更好**：Object.defineProperty 需要在创建响应式对象时遍历所有属性并逐一定义 getter、setter；Proxy 在初始化时不需要递归遍历所有属性，只在访问属性时才进行拦截处理
- **功能更强大**：Proxy 可以实现更丰富的功能，如拦截属性的读取、设置、删除、枚举、属性验证等，而 Object.defineProperty 只能实现属性的读取和设置
- **代码更简洁**：使用 Proxy 的实现更加直观和简洁，不需要像 Vue2 那样维护复杂的边界情况处理逻辑

### 33. readonly 底层原理？

- **基于 Proxy 实现**：readonly 与 reactive 类似，都是基于 JavaScript 的 Proxy API 实现，创建一个目标对象的代理，但会对所有修改操作进行拦截并阻止
- **拦截修改操作**：当尝试修改只读对象时，Vue 会在 Proxy 的 set、deleteProperty 等陷阱（trap）中阻止这些操作
- **保持响应式特性**：虽然对象是只读，但仍然保持响应式特性，意味着当原始对象发生变化时，依赖于只读代理的副作用（如组件渲染）仍会被正确触发
- **嵌套对象处理**：readonly 会递归地将整个对象树转换为只读，包括所有嵌套的对象属性
- **开发环境警告**：在开发环境中，Vue 会在修改只读对象时发出警告，提示开发者不要修改只读对象

### 34. shallowReactive() 和 reactive() 的区别？

- **响应式层级不同**：reactive()会对整个对象进行深层次的响应式转换，包括所有嵌套的对象属性；shallowReactive()只会对对象的第一层属性进行响应式处理，而嵌套对象则不会被转换为响应式
- **性能差异**：reactive()由于需要递归处理所有嵌套属性，开销大；shallowReactive()只处理第一层，性能更好，适用于不需要深层响应式的场景

### 35. shallowReactive() 的底层原理？

- **基于 Proxy 实现**：与 reactive()类似，shallowReactive()同样基于 JavaScript 的 Proxy API 实现，创建目标对象的代理
- **浅层处理机制**：与 reactive()的主要区别在于 shallowReactive()在处理属性访问时，不会对嵌套对象自动调用 reactive()进行深层转换
- **拦截操作范围受限**：只对顶层属性的访问（get）和修改（set）进行拦截和响应式处理，对于嵌套对象的属性操作不会触发响应式行为
- **性能优化策略**：通过限制响应式转换的深度，避免不必要的递归处理，提高初始化性能和减少内存占用

## Vue3 监听器深入面试题

### 36. watch() 底层原理？

- **依赖收集**：在首次执行时，访问 source 中的响应式数据，通过 ReactiveEffect 收集所有被访问的响应式属性作为依赖
- **变化检测**：当依赖的响应式数据变化时，触发 scheduler 调度执行回调，根据配置选项（如 flush）决定执行时机
- **回调执行**：比较新旧值确定是否需要执行回调，支持 immediate 选项控制是否立即执行

### 37. watchEffect() 和 watch() 的区别？

- **监听方式**：watchEffect 自动追踪回调函数内的响应式依赖；watch 显式指定要监听的响应式数据源
- **初始执行**：watchEffect 立即执行一次，然后追踪依赖；watch 默认不立即执行，除非设置 immediate:true
- **回调函数参数**：watchEffect 回调函数不接收参数；watch 回调函数接收（newVal，oldVal）参数

## Vue 指令深入面试题

### 38. v-for 循环的 key 是什么作用？

- **帮助识别元素变化**：Vue 使用 key 来建立虚拟 DOM 节点与真实 DOM 元素之间的映射关系。当数据更新时，Vue 可以通过比较新旧 key 快速判断出应该执行怎样的 DOM 操作
- **优化渲染性能**：Vue 可以最小化 DOM 操作次数，只更新真正发生变化的部分，避免不必要重新渲染整个列表
- **维持组件状态和触发过渡效果**：使用 key 可以保证组件的状态（如输入框内容、复选框状态等）在列表更新时不丢失
- **避免就地更新策略带来的问题**：如果没有提供 key，Vue 会采用"就地更新"策略，可能导致一些意外的行为，比如表单元素的状态错乱

### 39. v-for 循环的 key 的底层原理？

- **无 key 的更新机制**：当未指定 key 时，Vue 采用就地复用策略，依据索引顺序进行新旧虚拟节点比对。数据变动会导致大量不必要的 DOM 原地更新和潜在的组件状态错乱
- **有 key 的更新机制**：当指定了 key 时，Vue 会启动 keyed Diff 算法，基于 key 进行新旧虚拟节点比对，并使用 key 进行映射，从而避免了就地更新策略带来的问题
  - **头部/尾部同步**：快速跳过相同前缀和后缀
  - **映射查找**：构建旧节点 key 到索引的映射表，遍历新节点用 key 精准查找匹配
  - **精准操作**：找到匹配，复用现有 DOM 节点，仅必要时移动位置。未找到，新建节点。旧节点未使用，卸载节点

### 40. v-model 的原理？

- v-model 是一个语法糖，本质是 v-bind 和 v-on 的组合
- **数据绑定**：通过 v-bind 将组件数据绑定到表单元素的 value 属性
- **事件监听**：通过 v-on 监听表单元素的输入事件
- **数据更新**：当用户输入时，触发事件处理器更新组件数据
- **视图更新**：数据更新后，Vue 的响应式系统会自动更新视图

### 41. v-memo 的底层原理？

- **缓存存储**：为带有 v-memo 的节点维护一个特殊的缓存槽。缓存内容：上一次渲染生成的完整虚拟 DOM 子树，以及对应的依赖值快照
- **依赖比较**：每次组件重渲染时，将 v-memo="[deps]"中的依赖值与缓存快照进行浅层严格相等比较（使用 Object.is 或类似机制）。比较算法：按顺序逐个对比数组中的每个依赖项
- **决策分支**：所有依赖值完全相同：直接返回缓存的虚拟 DOM 子树。任一依赖值变化：正常执行完整渲染流程，用新结果更新缓存

## Vue 场景应用面试题

### 42. 复杂表单处理场景

**题目**：在一个大型电商后台管理系统中，需要处理一个包含 50+字段的商品编辑表单，表单字段之间存在复杂的联动关系（如选择商品类型后显示不同的属性字段）。请描述你会如何设计这个表单组件？需要考虑哪些性能优化点？

**答案要点**：

1. **组件拆分**：将大表单拆分为多个子组件，按功能模块划分
2. **状态管理**：
   - 使用 Vuex/Pinia 管理共享表单状态
   - 对于独立的子表单，使用`v-model`+`props`/`emit`
3. **性能优化**：
   - 使用`v-memo`缓存静态表单部分
   - 复杂的计算使用`computed`缓存
   - 防抖处理实时验证逻辑
4. **代码组织**：
   - 使用 Composition API 抽取可复用的表单逻辑
   - 提取验证规则到独立文件
5. **用户体验**：
   - 实现分步保存，避免单次提交数据量过大
   - 添加加载状态和错误提示

### 43. 大数据量表格渲染优化

**题目**：需要在前端渲染一个包含 10 万行数据的表格，且支持排序、筛选、分页等功能。直接渲染会导致页面卡死，你会如何解决？

**答案要点**：

1. **虚拟滚动**：
   ```vue
   <!-- 使用vue-virtual-scroller等库 -->
   <RecycleScroller :items="bigData" :item-size="50" key-field="id">
     <template #default="{ item }">
       <tr>{{ item.name }}</tr>
     </template>
   </RecycleScroller>
   ```
2. **分页加载**：结合后端 API 实现分页
3. **懒渲染**：只渲染可视区域内的行
4. **Web Worker**：将排序、筛选等计算密集型任务放在 Worker 中
5. **优化策略**：
   - 使用`Object.freeze()`冻结不需要响应式的数据
   - 避免在表格中使用复杂的组件嵌套
   - 使用`v-once`渲染静态内容

### 44. 权限控制场景设计

**题目**：设计一个 Vue 后台系统的权限控制方案，要求支持：

1. 页面路由权限控制
2. 按钮级操作权限控制
3. 数据权限控制（不同用户看到不同数据）
4. 权限变更后的实时更新

**答案要点**：

````javascript
// 方案设计
1. **路由权限**：
   - 使用路由守卫进行权限验证
   - 动态路由添加（addRoute）
   - 路由元信息存储权限标识

2. **组件权限指令**：
   ```vue
   <template>
     <button v-permission="'user:delete'">删除</button>
   </template>

   // 指令实现
   const permission = {
     mounted(el, binding) {
       if (!checkPermission(binding.value)) {
         el.parentNode?.removeChild(el);
       }
     }
   };
````

3. **数据权限**：

   - API 层拦截，根据用户权限返回不同数据
   - 前端数据过滤（适合少量数据）

4. **状态管理**：
   - 使用 Vuex/Pinia 存储权限信息
   - 权限变更时清空路由并重新加载

```

### 45. 跨组件通信的复杂场景
**题目**：在一个任务看板应用中，有以下组件层级：
```

App
├── Board（看板）
│ ├── Column（列）
│ │ ├── TaskCard（任务卡片）
│ │ │ ├── TaskEditor（任务编辑器）
│ │ │ └── AssigneeSelect（负责人选择）
│ │ └── ColumnHeader（列标题）
│ └── BoardHeader（看板标题）

````
任务卡片可以在不同列之间拖拽移动，拖拽时需要更新多个组件状态。请设计组件通信方案。

**答案要点**：
1. **方案选择**：
   - **全局状态管理**（Vuex/Pinia）：适合共享状态
   - **事件总线**：适合一次性通知
   - **provide/inject**：适合跨层级传递

2. **具体实现**：
   ```javascript
   // 使用Pinia
   const useBoardStore = defineStore('board', {
     state: () => ({
       tasks: [],
       columns: []
     }),
     actions: {
       moveTask(taskId, fromColId, toColId) {
         // 更新任务位置
         // 触发相关组件更新
       }
     }
   });

   // 在任务卡片中使用
   const handleDrop = () => {
     boardStore.moveTask(task.id, currentCol, targetCol);
   };
````

3. **性能考虑**：
   - 使用防抖减少频繁更新
   - 使用浅层响应式避免深监听
   - 批量更新任务位置

### 46. SSR 应用优化场景

**题目**：一个新闻网站使用 Vue SSR，发现以下问题：

1. 首屏加载时间过长
2. 页面切换时有明显的重新渲染
3. SEO 效果不佳
   请提出优化方案。

**答案要点**：

1. **首屏优化**：

   ```javascript
   // 1. 组件懒加载
   const ArticleDetail = defineAsyncComponent(() =>
     import("./ArticleDetail.vue")
   );

   // 2. 数据预取优化
   export async function asyncData({ store, route }) {
     // 只预取首屏必要数据
     await store.dispatch("fetchEssentialData");
   }

   // 3. 静态资源优化
   // - 使用CDN
   // - 开启Gzip/Brotli压缩
   ```

2. **页面切换优化**：

   ```javascript
   // 使用keep-alive缓存组件
   <router-view v-slot="{ Component }">
     <keep-alive>
       <component :is="Component" />
     </keep-alive>
   </router-view>

   // 数据缓存策略
   const useCacheStore = defineStore('cache', {
     state: () => ({
       pageCache: new Map()
     })
   });
   ```

3. **SEO 优化**：
   - 使用`vue-meta`管理 meta 标签
   - 服务端渲染正确的 HTML 结构
   - 使用语义化 HTML 标签
   - 添加 JSON-LD 结构化数据

### 47. 微前端场景下的 Vue 应用

**题目**：现有三个独立开发的 Vue 应用（用户管理、订单管理、商品管理），需要集成到一个平台中。要求：

1. 保持应用独立性
2. 共享用户登录状态
3. 应用间可以跳转
4. 样式隔离

**答案要点**：

1. **集成方案**：

   ```javascript
   // 使用qiankun微前端框架
   // 主应用
   import { registerMicroApps, start } from "qiankun";

   registerMicroApps([
     {
       name: "user-app",
       entry: "//localhost:7101",
       container: "#user-container",
       activeRule: "/user",
     },
   ]);

   start();
   ```

2. **状态共享**：

   ```javascript
   // 使用CustomEvent或发布订阅模式
   // 主应用
   window.dispatchEvent(
     new CustomEvent("user-change", {
       detail: { user: currentUser },
     })
   );

   // 子应用
   window.addEventListener("user-change", (event) => {
     updateUser(event.detail.user);
   });
   ```

3. **样式隔离**：

   ```css
   /* 使用CSS Modules或CSS-in-JS */
   /* 或使用Shadow DOM */
   .user-app {
     all: initial; /* 样式重置 */
   }
   ```

4. **路由跳转**：
   ```javascript
   // 使用history.pushState或主应用路由控制
   window.history.pushState(null, "", "/order/list");
   ```

### 48. 移动端 H5 性能优化场景

**题目**：开发一个 Vue 移动端 H5 应用，用户反馈页面滑动卡顿，特别是长列表滚动时。请提供优化方案。

**答案要点**：

1. **渲染优化**：

   ```vue
   <!-- 1. 使用虚拟列表 -->
   <virtual-list :size="50" :remain="8">
     <div v-for="item in list" :key="item.id">
       {{ item.name }}
     </div>
   </virtual-list>

   <!-- 2. 图片懒加载 -->
   <img v-lazy="item.image" />

   <!-- 3. 使用CSS3硬件加速 -->
   .card { transform: translateZ(0); }
   ```

2. **JavaScript 优化**：

   ```javascript
   // 1. 防抖节流
   const handleScroll = useDebounce(() => {
     // 滚动处理
   }, 100);

   // 2. 使用Web Worker处理复杂计算
   // 3. 避免频繁的DOM操作
   ```

3. **打包优化**：
   ```javascript
   // vite.config.js
   export default {
     build: {
       // 代码分割
       rollupOptions: {
         output: {
           manualChunks: {
             vendor: ["vue", "vue-router"],
             utils: ["lodash", "dayjs"],
           },
         },
       },
       // 压缩优化
       terserOptions: {
         compress: {
           drop_console: true,
         },
       },
     },
   };
   ```

### 49. 图表可视化场景

**题目**：在一个数据监控面板中，需要展示 10 个实时更新的 ECharts 图表，每个图表每秒更新一次数据。如何保证性能？

**答案要点**：

1. **渲染策略**：

   ```vue
   <template>
     <!-- 1. 按需渲染，不可见时不更新 -->
     <div v-if="isVisible">
       <Chart :data="chartData" />
     </div>

     <!-- 2. 使用requestAnimationFrame控制更新频率 -->
   </template>

   <script setup>
   let updateFrame;
   const updateChart = () => {
     if (updateFrame) return;
     updateFrame = requestAnimationFrame(() => {
       // 更新图表数据
       updateFrame = null;
     });
   };
   </script>
   ```

2. **数据优化**：

   ```javascript
   // 1. 数据采样，减少数据点
   const sampledData = originalData.filter((_, index) => index % 5 === 0);

   // 2. 使用WebSocket增量更新
   ws.onmessage = (event) => {
     const delta = JSON.parse(event.data);
     updateChartData(delta); // 只更新变化部分
   };
   ```

3. **内存管理**：

   ```javascript
   // 1. 及时销毁不需要的图表实例
   onUnmounted(() => {
     chartInstance.dispose();
   });

   // 2. 使用对象池复用图表实例
   ```

### 50. 构建工具优化场景

**题目**：一个大型 Vue 项目构建时间从 2 分钟增加到 10 分钟，请分析可能的原因并提供优化方案。

**答案要点**：

1. **分析工具**：

   ```bash
   # 使用分析工具
   npm run build -- --report

   # 使用speed-measure-webpack-plugin
   # 使用webpack-bundle-analyzer
   ```

2. **优化方案**：

   ```javascript
   // vite.config.js / webpack.config.js
   // 1. 缓存优化
   export default {
     build: {
       cache: true, // 启用持久化缓存
     },
   };

   // 2. 多线程构建
   const { default: pMap } = require("p-map");
   await pMap(files, processFile, { concurrency: os.cpus().length });

   // 3. 缩小构建范围
   module.exports = {
     module: {
       rules: [
         {
           test: /\.js$/,
           include: [
             path.resolve(__dirname, "src"),
             // 只编译必要的node_modules
             path.resolve(__dirname, "node_modules/vue"),
           ],
         },
       ],
     },
   };
   ```

3. **代码层面优化**：
   - 使用动态导入减少入口文件大小
   - 移除未使用的代码和依赖
   - 使用更轻量的替代库

### 61. 多人协作编辑的实时冲突解决

**题目**：开发一个类似 Google Docs 的多人协作编辑功能，多个用户可以同时编辑同一篇文档。当两个用户同时编辑同一段落时，如何解决冲突？请设计完整的解决方案。

**答案要点**：

1. **冲突解决策略**：

   ```javascript
   // 1. 操作转换（Operational Transformation）
   function transform(op1, op2) {
     // 转换操作，使操作可以应用于不同状态
     if (op1.type === "insert" && op2.type === "insert") {
       if (op1.position < op2.position) {
         return { ...op2, position: op2.position + op1.text.length };
       }
     }
     // 更多转换逻辑...
   }

   // 2. CRDT（无冲突复制数据类型）
   class CRDTCharacter {
     constructor(id, char, siteId) {
       this.id = id; // 唯一标识符，如 [counter, siteId]
       this.char = char;
       this.siteId = siteId;
     }

     compare(other) {
       // 定义偏序关系
       if (this.id.counter !== other.id.counter) {
         return this.id.counter - other.id.counter;
       }
       return this.id.siteId - other.id.siteId;
     }
   }
   ```

2. **实时通信架构**：

   ```javascript
   // WebSocket连接管理
   class CollaborationService {
     constructor() {
       this.ws = new WebSocket("wss://collab.example.com");
       this.operations = [];
       this.version = 0;
     }

     applyOperation(op) {
       // 应用操作并广播
       const transformed = this.transformOperation(op);
       this.operations.push(transformed);
       this.broadcast(transformed);
     }
   }
   ```

3. **Vue 集成方案**：

   ```vue
   <template>
     <div>
       <textarea :value="content" @input="handleInput" ref="editor" />
       <div v-for="user in collaborators" :key="user.id">
         {{ user.name }}正在编辑
         <span :style="{ background: user.color }">█</span>
       </div>
     </div>
   </template>

   <script setup>
   import { useCollaboration } from "./useCollaboration";

   const { content, handleInput, collaborators } = useCollaboration();
   </script>
   ```

### 62. 大型单页应用的模块联邦架构

**题目**：一个电商平台需要拆分为独立的微前端应用（商品、订单、用户、营销），每个团队独立开发部署。请设计基于 Module Federation 的 Vue 微前端架构。

**答案要点**：

1. **Module Federation 配置**：

   ```javascript
   // webpack.config.js (主应用)
   module.exports = {
     plugins: [
       new ModuleFederationPlugin({
         name: "host",
         remotes: {
           product: "product@https://product.app/remoteEntry.js",
           order: "order@https://order.app/remoteEntry.js",
         },
         shared: {
           vue: { singleton: true, eager: true },
           "vue-router": { singleton: true },
           pinia: { singleton: true },
         },
       }),
     ],
   };
   ```

2. **动态组件加载**：

   ```vue
   <template>
     <div>
       <Suspense>
         <template #default>
           <component :is="dynamicComponent" />
         </template>
         <template #fallback> 加载中... </template>
       </Suspense>
     </div>
   </template>

   <script setup>
   import { defineAsyncComponent, shallowRef } from "vue";

   const dynamicComponent = shallowRef(null);

   const loadProductModule = async () => {
     const module = await import("product/ProductList");
     dynamicComponent.value = module.default;
   };
   </script>
   ```

3. **状态共享方案**：
   ```javascript
   // 跨应用状态管理
   class CrossAppStore {
     constructor() {
       this.state = new Proxy(
         {},
         {
           set: (target, key, value) => {
             target[key] = value;
             this.notify(key, value);
             return true;
           },
         }
       );
       this.listeners = new Map();
     }

     notify(key, value) {
       window.dispatchEvent(
         new CustomEvent("cross-app-store", {
           detail: { key, value },
         })
       );
     }
   }
   ```

### 63. 渐进式 Web 应用（PWA）实现

**题目**：将一个现有 Vue 应用改造为 PWA，要求实现离线访问、推送通知、添加到主屏幕等功能。请描述完整实现方案。

**答案要点**：

1. **Service Worker 注册**：

   ```javascript
   // main.js
   if ("serviceWorker" in navigator) {
     window.addEventListener("load", () => {
       navigator.serviceWorker.register("/sw.js").then((registration) => {
         console.log("SW registered: ", registration);
       });
     });
   }
   ```

2. **Service Worker 实现**：

   ```javascript
   // sw.js
   const CACHE_NAME = "v1";
   const urlsToCache = ["/", "/index.html", "/app.js", "/style.css"];

   self.addEventListener("install", (event) => {
     event.waitUntil(
       caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
     );
   });

   self.addEventListener("fetch", (event) => {
     event.respondWith(
       caches
         .match(event.request)
         .then((response) => response || fetch(event.request))
     );
   });
   ```

3. **推送通知**：

   ```javascript
   // 请求通知权限
   async function requestNotificationPermission() {
     const permission = await Notification.requestPermission();
     if (permission === "granted") {
       registerPushSubscription();
     }
   }

   // 注册推送订阅
   async function registerPushSubscription() {
     const registration = await navigator.serviceWorker.ready;
     const subscription = await registration.pushManager.subscribe({
       userVisibleOnly: true,
       applicationServerKey: "YOUR_PUBLIC_KEY",
     });

     // 发送subscription到服务器
     await fetch("/api/push-subscription", {
       method: "POST",
       body: JSON.stringify(subscription),
     });
   }
   ```

4. **manifest.json 配置**：
   ```json
   {
     "name": "我的Vue应用",
     "short_name": "VueApp",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#42b983",
     "icons": [
       {
         "src": "/icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       }
     ]
   }
   ```

### 64. 复杂动画序列管理

**题目**：实现一个类似 PPT 的动画编辑器，用户可以给元素添加复杂的动画序列（如先淡入，然后移动，最后旋转）。请设计动画状态管理和执行方案。

**答案要点**：

1. **动画数据模型**：

   ```javascript
   class AnimationSequence {
     constructor() {
       this.timeline = [];
       this.currentTime = 0;
       this.isPlaying = false;
     }

     addAnimation(elementId, animation) {
       this.timeline.push({
         elementId,
         animation,
         startTime: this.getNextStartTime(),
         duration: animation.duration || 1000,
       });
     }

     play() {
       this.isPlaying = true;
       this.timeline.forEach((item) => {
         setTimeout(() => {
           this.executeAnimation(item);
         }, item.startTime);
       });
     }
   }
   ```

2. **Vue 动画组件**：

   ```vue
   <template>
     <div>
       <div
         v-for="element in elements"
         :key="element.id"
         :ref="(el) => (elementsRef[element.id] = el)"
         class="animatable"
       >
         {{ element.content }}
       </div>

       <button @click="playSequence">播放动画</button>
     </div>
   </template>

   <script setup>
   import { gsap } from "gsap";
   import { ref } from "vue";

   const elementsRef = ref({});
   const sequence = ref([
     { elementId: "1", type: "fadeIn", duration: 500 },
     { elementId: "2", type: "slideIn", duration: 800 },
   ]);

   const playSequence = async () => {
     for (const anim of sequence.value) {
       const el = elementsRef.value[anim.elementId];
       if (!el) continue;

       await new Promise((resolve) => {
         gsap.to(el, {
           opacity: anim.type === "fadeIn" ? 1 : undefined,
           x: anim.type === "slideIn" ? 0 : undefined,
           duration: anim.duration / 1000,
           onComplete: resolve,
         });
       });
     }
   };
   </script>
   ```

3. **动画时间轴可视化**：
   ```vue
   <template>
     <div class="timeline">
       <div
         v-for="(track, index) in tracks"
         :key="index"
         class="track"
         @dragover.prevent
         @drop="onDrop($event, index)"
       >
         <div
           v-for="clip in track.clips"
           :key="clip.id"
           class="clip"
           :style="{
             left: `${clip.start * 10}px`,
             width: `${clip.duration * 10}px`,
           }"
           draggable
           @dragstart="onDragStart($event, clip)"
         >
           {{ clip.name }}
         </div>
       </div>
     </div>
   </template>
   ```

### 65. 语音交互功能集成

**题目**：为 Vue 应用添加语音交互功能，支持语音输入（语音转文字）和语音输出（文字转语音）。要求支持多种语言和方言。

**答案要点**：

1. **语音识别集成**：

   ```javascript
   class SpeechRecognitionService {
     constructor() {
       this.recognition = new (window.SpeechRecognition ||
         window.webkitSpeechRecognition)();
       this.recognition.lang = "zh-CN";
       this.recognition.continuous = false;
       this.recognition.interimResults = true;

       this.recognition.onresult = (event) => {
         const transcript = Array.from(event.results)
           .map((result) => result[0])
           .map((result) => result.transcript)
           .join("");

         this.onTranscript(transcript);
       };
     }

     start() {
       this.recognition.start();
     }

     stop() {
       this.recognition.stop();
     }
   }
   ```

2. **Vue 语音组件**：

   ```vue
   <template>
     <div>
       <button @click="toggleListening" :class="{ listening }">
         {{ listening ? "停止录音" : "开始录音" }}
       </button>

       <div v-if="transcript">
         <p>识别结果：{{ transcript }}</p>
         <button @click="speak(transcript)">朗读</button>
       </div>

       <select v-model="language">
         <option value="zh-CN">中文</option>
         <option value="en-US">English</option>
         <option value="ja-JP">日本語</option>
       </select>
     </div>
   </template>

   <script setup>
   import { ref, watch } from "vue";
   import { useSpeechRecognition, useSpeechSynthesis } from "@vueuse/core";

   const language = ref("zh-CN");
   const { isListening, result, start, stop } = useSpeechRecognition({
     lang: language,
   });

   const { speak, isSpeaking } = useSpeechSynthesis();

   const toggleListening = () => {
     if (isListening.value) {
       stop();
     } else {
       start();
     }
   };
   </script>
   ```

3. **语音命令系统**：
   ```javascript
   class VoiceCommandSystem {
     constructor() {
       this.commands = new Map();
       this.registerDefaultCommands();
     }

     registerCommand(pattern, handler) {
       this.commands.set(pattern, handler);
     }

     processTranscript(transcript) {
       for (const [pattern, handler] of this.commands) {
         if (transcript.match(pattern)) {
           handler(transcript);
           return true;
         }
       }
       return false;
     }

     registerDefaultCommands() {
       this.registerCommand(/^搜索\s+(.+)$/, (transcript) => {
         const query = transcript.match(/^搜索\s+(.+)$/)[1];
         search(query);
       });

       this.registerCommand(/^导航到(.+)$/, (transcript) => {
         const page = transcript.match(/^导航到(.+)$/)[1];
         router.push(`/${page}`);
       });
     }
   }
   ```

### 66. 实时数据可视化大屏

**题目**：开发一个实时数据监控大屏，需要展示多个实时更新的图表（折线图、柱状图、饼图、地图），数据通过 WebSocket 实时推送。要求保证性能，避免卡顿。

**答案要点**：

1. **数据流架构**：

   ```javascript
   class DataStreamManager {
     constructor() {
       this.connections = new Map();
       this.subscribers = new Map();
     }

     connect(streamName, url) {
       const ws = new WebSocket(url);
       this.connections.set(streamName, ws);

       ws.onmessage = (event) => {
         const data = JSON.parse(event.data);
         this.notifySubscribers(streamName, data);
       };
     }

     subscribe(streamName, callback) {
       if (!this.subscribers.has(streamName)) {
         this.subscribers.set(streamName, new Set());
       }
       this.subscribers.get(streamName).add(callback);
     }

     notifySubscribers(streamName, data) {
       const callbacks = this.subscribers.get(streamName);
       if (callbacks) {
         callbacks.forEach((callback) => callback(data));
       }
     }
   }
   ```

2. **图表组件优化**：

   ```vue
   <template>
     <div class="chart-container">
       <!-- 使用requestAnimationFrame控制更新频率 -->
       <canvas ref="canvas" :width="width" :height="height" />
     </div>
   </template>

   <script setup>
   import { ref, onMounted, onUnmounted, watch } from "vue";

   const canvas = ref(null);
   const data = ref([]);
   const animationFrame = ref(null);

   const draw = () => {
     if (!canvas.value) return;

     const ctx = canvas.value.getContext("2d");
     ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

     // 绘制图表
     drawChart(ctx, data.value);

     animationFrame.value = requestAnimationFrame(draw);
   };

   onMounted(() => {
     draw();
   });

   onUnmounted(() => {
     if (animationFrame.value) {
       cancelAnimationFrame(animationFrame.value);
     }
   });

   // 使用防抖减少频繁更新
   watch(
     data,
     () => {
       // 数据变化时重新绘制
     },
     { deep: true }
   );
   </script>
   ```

3. **大屏布局管理**：

   ```vue
   <template>
     <div class="dashboard" :style="gridStyle">
       <div
         v-for="widget in widgets"
         :key="widget.id"
         class="widget"
         :style="widget.style"
         draggable
         @dragstart="onDragStart($event, widget)"
         @dragend="onDragEnd($event, widget)"
       >
         <component :is="widget.component" :data="widget.data" />
       </div>
     </div>
   </template>

   <script setup>
   import { computed } from "vue";

   const widgets = ref([]);

   const gridStyle = computed(() => ({
     display: "grid",
     gridTemplateColumns: `repeat(${columns}, 1fr)`,
     gridTemplateRows: `repeat(${rows}, 1fr)`,
     gap: "10px",
   }));

   // 保存布局到localStorage
   const saveLayout = () => {
     localStorage.setItem("dashboard-layout", JSON.stringify(widgets.value));
   };
   </script>
   ```

### 67. 代码编辑器集成

**题目**：在 Vue 应用中集成一个代码编辑器，支持语法高亮、代码补全、错误检查、格式化等功能，用于在线代码编辑和预览。

**答案要点**：

1. **Monaco Editor 集成**：

   ```vue
   <template>
     <div ref="editorContainer" class="editor-container"></div>
   </template>

   <script setup>
   import { ref, onMounted, onUnmounted, watch } from "vue";
   import * as monaco from "monaco-editor";
   import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
   import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker";
   import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker";
   import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker";
   import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker";

   self.MonacoEnvironment = {
     getWorker(_, label) {
       if (label === "css") return new cssWorker();
       if (label === "html") return new htmlWorker();
       if (label === "json") return new jsonWorker();
       if (label === "typescript" || label === "javascript")
         return new tsWorker();
       return new editorWorker();
     },
   };

   const editorContainer = ref(null);
   const editor = ref(null);
   const code = ref("// 开始编写代码...");

   onMounted(() => {
     editor.value = monaco.editor.create(editorContainer.value, {
       value: code.value,
       language: "javascript",
       theme: "vs-dark",
       minimap: { enabled: true },
       automaticLayout: true,
     });

     editor.value.onDidChangeModelContent(() => {
       code.value = editor.value.getValue();
     });
   });

   onUnmounted(() => {
     editor.value?.dispose();
   });
   </script>
   ```

2. **代码执行沙箱**：

   ```javascript
   class CodeSandbox {
     constructor() {
       this.iframe = document.createElement("iframe");
       this.iframe.style.display = "none";
       document.body.appendChild(this.iframe);
     }

     execute(code) {
       return new Promise((resolve, reject) => {
         const blob = new Blob(
           [
             `
           <!DOCTYPE html>
           <html>
             <body>
               <script>
                 window.addEventListener('message', (e) => {
                   try {
                     const result = eval(e.data);
                     window.parent.postMessage({ type: 'result', result }, '*');
                   } catch (error) {
                     window.parent.postMessage({ type: 'error', error: error.message }, '*');
                   }
                 });
               <\/script>
             </body>
           </html>
         `,
           ],
           { type: "text/html" }
         );

         this.iframe.src = URL.createObjectURL(blob);

         window.addEventListener("message", (e) => {
           if (e.data.type === "result") {
             resolve(e.data.result);
           } else if (e.data.type === "error") {
             reject(new Error(e.data.error));
           }
         });

         this.iframe.onload = () => {
           this.iframe.contentWindow.postMessage(code, "*");
         };
       });
     }
   }
   ```

3. **Vue SFC 支持**：

   ```javascript
   // Vue单文件组件编译
   import { compile } from "@vue/compiler-sfc";

   function compileVueSFC(source) {
     const { descriptor, errors } = compile(source);

     if (errors.length > 0) {
       throw new Error(errors.join("\n"));
     }

     // 提取script、template、styles
     const script = descriptor.script || descriptor.scriptSetup;
     const template = descriptor.template;
     const styles = descriptor.styles;

     // 编译为渲染函数
     return {
       render: compileTemplate(template.content),
       script: script?.content,
       styles: styles.map((style) => style.content),
     };
   }
   ```

### 68. 区块链数据展示

**题目**：开发一个区块链浏览器，展示区块链数据（区块、交易、地址等）。数据量巨大，需要高效的查询和展示方案。

**答案要点**：

1. **数据分页和虚拟滚动**：

   ```vue
   <template>
     <div class="blockchain-explorer">
       <VirtualList
         :items="blocks"
         :item-height="80"
         :buffer="10"
         @load-more="loadMoreBlocks"
       >
         <template #default="{ item }">
           <BlockItem :block="item" />
         </template>
       </VirtualList>
     </div>
   </template>

   <script setup>
   import { useInfiniteScroll } from "@vueuse/core";

   const blocks = ref([]);
   const page = ref(1);

   const loadMoreBlocks = async () => {
     const newBlocks = await fetchBlocks(page.value);
     blocks.value.push(...newBlocks);
     page.value++;
   };
   </script>
   ```

2. **WebSocket 实时更新**：

   ```javascript
   class BlockchainWebSocket {
     constructor() {
       this.ws = new WebSocket("wss://blockchain.example.com/ws");
       this.subscriptions = new Map();

       this.ws.onmessage = (event) => {
         const data = JSON.parse(event.data);

         if (data.type === "new_block") {
           this.handleNewBlock(data.block);
         } else if (data.type === "new_transaction") {
           this.handleNewTransaction(data.transaction);
         }
       };
     }

     subscribeBlocks(callback) {
       this.ws.send(
         JSON.stringify({
           action: "subscribe",
           channel: "blocks",
         })
       );
       this.subscriptions.set("blocks", callback);
     }

     handleNewBlock(block) {
       const callback = this.subscriptions.get("blocks");
       if (callback) {
         callback(block);
       }
     }
   }
   ```

3. **交易关系图谱**：

   ```vue
   <template>
     <div ref="graphContainer" class="graph-container"></div>
   </template>

   <script setup>
   import { ref, onMounted } from "vue";
   import * as d3 from "d3";

   const graphContainer = ref(null);

   onMounted(() => {
     const width = 800;
     const height = 600;

     const svg = d3
       .select(graphContainer.value)
       .append("svg")
       .attr("width", width)
       .attr("height", height);

     // 绘制交易关系图
     const simulation = d3
       .forceSimulation(nodes)
       .force(
         "link",
         d3.forceLink(links).id((d) => d.id)
       )
       .force("charge", d3.forceManyBody())
       .force("center", d3.forceCenter(width / 2, height / 2));

     // 节点和边的绘制逻辑...
   });
   </script>
   ```

### 69. 机器学习模型集成

**题目**：在 Vue 应用中集成 TensorFlow.js，实现图像分类、文本分析等功能。要求支持模型加载、推理、可视化。

**答案要点**：

1. **TensorFlow.js 集成**：

   ```vue
   <template>
     <div>
       <input type="file" accept="image/*" @change="handleImageUpload" />
       <canvas ref="canvas" width="224" height="224"></canvas>
       <div v-if="predictions.length">
         <h3>预测结果：</h3>
         <ul>
           <li v-for="(pred, index) in predictions" :key="index">
             {{ pred.className }}: {{ (pred.probability * 100).toFixed(2) }}%
           </li>
         </ul>
       </div>
     </div>
   </template>

   <script setup>
   import * as tf from "@tensorflow/tfjs";
   import { loadGraphModel } from "@tensorflow/tfjs-converter";
   import { ref } from "vue";

   const canvas = ref(null);
   const predictions = ref([]);
   let model = null;

   // 加载模型
   const loadModel = async () => {
     model = await loadGraphModel("/models/mobilenet/model.json");
   };

   // 图像预处理
   const preprocessImage = (image) => {
     const tensor = tf.browser
       .fromPixels(image)
       .resizeNearestNeighbor([224, 224])
       .toFloat()
       .expandDims();

     return tensor.div(255.0);
   };

   // 执行预测
   const predict = async (image) => {
     if (!model) await loadModel();

     const tensor = preprocessImage(image);
     const predictionsTensor = model.predict(tensor);
     const predictionsArray = await predictionsTensor.data();

     // 转换为可读格式
     predictions.value = Array.from(predictionsArray)
       .map((prob, index) => ({
         className: CLASS_NAMES[index],
         probability: prob,
       }))
       .sort((a, b) => b.probability - a.probability)
       .slice(0, 5);

     tensor.dispose();
     predictionsTensor.dispose();
   };

   const handleImageUpload = async (event) => {
     const file = event.target.files[0];
     if (!file) return;

     const img = new Image();
     img.src = URL.createObjectURL(file);
     img.onload = () => {
       const ctx = canvas.value.getContext("2d");
       ctx.drawImage(img, 0, 0, 224, 224);
       predict(img);
     };
   };
   </script>
   ```

2. **实时摄像头识别**：
   ```javascript
   class CameraRecognition {
     constructor(videoElement) {
       this.video = videoElement;
       this.stream = null;
       this.recognitionInterval = null;
     }

     async start() {
       this.stream = await navigator.mediaDevices.getUserMedia({
         video: { width: 640, height: 480 },
       });

       this.video.srcObject = this.stream;
       this.video.play();

       // 每隔一段时间进行识别
       this.recognitionInterval = setInterval(() => {
         this.recognize();
       }, 1000);
     }

     async recognize() {
       const tensor = tf.browser
         .fromPixels(this.video)
         .resizeNearestNeighbor([224, 224])
         .toFloat()
         .expandDims();

       const prediction = model.predict(tensor);
       // 处理预测结果...

       tensor.dispose();
       prediction.dispose();
     }

     stop() {
       if (this.recognitionInterval) {
         clearInterval(this.recognitionInterval);
       }
       if (this.stream) {
         this.stream.getTracks().forEach((track) => track.stop());
       }
     }
   }
   ```

### 70. 跨平台桌面应用开发

**题目**：使用 Vue 开发一个跨平台的桌面应用（Windows、macOS、Linux），要求支持本地文件操作、系统托盘、原生菜单等功能。

**答案要点**：

1. **Electron 集成**：

   ```javascript
   // main.js (主进程)
   const { app, BrowserWindow, Menu, Tray } = require("electron");
   const path = require("path");

   function createWindow() {
     const mainWindow = new BrowserWindow({
       width: 1200,
       height: 800,
       webPreferences: {
         nodeIntegration: true,
         contextIsolation: false,
         enableRemoteModule: true,
       },
     });

     // 加载Vue应用
     if (process.env.NODE_ENV === "development") {
       mainWindow.loadURL("http://localhost:3000");
       mainWindow.webContents.openDevTools();
     } else {
       mainWindow.loadFile(path.join(__dirname, "dist/index.html"));
     }

     // 创建系统托盘
     const tray = new Tray(path.join(__dirname, "icon.png"));
     const contextMenu = Menu.buildFromTemplate([
       { label: "显示", click: () => mainWindow.show() },
       { label: "退出", click: () => app.quit() },
     ]);
     tray.setToolTip("我的Vue应用");
     tray.setContextMenu(contextMenu);
   }

   app.whenReady().then(createWindow);
   ```

2. **Vue 与 Electron 通信**：

   ```javascript
   // preload.js
   const { contextBridge, ipcRenderer } = require("electron");

   contextBridge.exposeInMainWorld("electronAPI", {
     // 渲染进程调用主进程
     showDialog: (options) => ipcRenderer.invoke("show-dialog", options),

     // 监听主进程消息
     onUpdateMessage: (callback) =>
       ipcRenderer.on("update-message", (event, message) => callback(message)),
   });

   // 在Vue组件中使用
   const showSaveDialog = async () => {
     const result = await window.electronAPI.showDialog({
       title: "保存文件",
       defaultPath: "untitled.txt",
       filters: [{ name: "文本文件", extensions: ["txt"] }],
     });

     if (!result.canceled) {
       const fs = require("fs");
       fs.writeFileSync(result.filePath, "文件内容");
     }
   };
   ```

3. **原生功能集成**：

   ```javascript
   // 系统通知
   const showNotification = (title, body) => {
     new Notification(title, { body });
   };

   // 剪切板操作
   const copyToClipboard = (text) => {
     navigator.clipboard.writeText(text);
   };

   // 本地存储增强
   class EnhancedStorage {
     constructor() {
       this.fs = require("fs");
       this.path = require("path");
       this.appData = app.getPath("userData");
     }

     saveFile(filename, content) {
       const filepath = this.path.join(this.appData, filename);
       this.fs.writeFileSync(filepath, content, "utf8");
     }

     readFile(filename) {
       const filepath = this.path.join(this.appData, filename);
       return this.fs.readFileSync(filepath, "utf8");
     }
   }
   ```
