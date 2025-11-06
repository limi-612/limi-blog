---
title: TypeScript高频面试题
date: 2024/03/08
tags:
 - TypeScript
categories:
 - TypeScript
---

<ReadAloud />

## 基础概念

### 1. TypeScript的优势
- **静态类型检查**: 编译时发现错误，减少运行时bug
- **更好的IDE支持**: 智能提示、重构、导航
- **渐进式采用**: 可以逐步从JavaScript迁移
- **丰富的类型系统**: 泛型、联合类型、交叉类型等

### 2. 基本类型系统
```typescript
// 基础类型
let name: string = "张三";
let age: number = 25;
let isActive: boolean = true;

// 数组类型
let numbers: number[] = [1, 2, 3];
let names: Array<string> = ["a", "b"];

// 元组类型
let tuple: [string, number] = ["hello", 42];

// 枚举类型
enum Color {
    Red = 1,
    Green,
    Blue
}
```

## 高级类型

### 1. 联合类型与交叉类型
```typescript
// 联合类型
type StringOrNumber = string | number;

// 交叉类型
type User = { name: string } & { age: number };

// 类型守卫
function isString(value: StringOrNumber): value is string {
    return typeof value === "string";
}
```

### 2. 泛型应用
```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 泛型约束
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);
    return arg;
}
```

### 3. 映射类型
```typescript
// 内置映射类型
type Partial<T> = {
    [P in keyof T]?: T[P];
};

type Required<T> = {
    [P in keyof T]-?: T[P];
};

// 自定义映射类型
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};
```

## 实用工具类型

### 1. 条件类型
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type ReturnType<T extends (...args: any) => any> = 
    T extends (...args: any) => infer R ? R : any;
```

### 2. 模板字面量类型
```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;
type ClickEvent = EventName<"click">; // "onClick"

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";
type APIEndpoint<T extends HTTPMethod> = `${T} /api/users`;
```

## 面试重点

### 1. any vs unknown vs never
- **any**: 关闭类型检查，不推荐使用
- **unknown**: 类型安全的any，使用前需要类型检查
- **never**: 表示永远不会发生的类型

### 2. interface vs type
```typescript
// interface可以声明合并
interface User {
    name: string;
}
interface User {
    age: number;
}

// type不能重复声明，但支持联合类型
type Status = "loading" | "success" | "error";
```

### 3. 装饰器应用
```typescript
function Log(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;
    descriptor.value = function (...args: any[]) {
        console.log(`调用方法: ${propertyName}`);
        return method.apply(this, args);
    };
}

class Calculator {
    @Log
    add(a: number, b: number) {
        return a + b;
    }
}
```

掌握TypeScript不仅能提升代码质量，更是现代前端开发的必备技能。