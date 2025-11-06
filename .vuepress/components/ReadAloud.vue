<!-- 朗读功能组件模板 -->
<template>
  <!-- 朗读按钮容器 -->
  <div class="read-aloud">
    <!-- 朗读/停止按钮 -->
    <button 
      @click="toggleReading" 
      :class="['read-btn', { active: isReading }]" 
      :title="isReading ? '停止朗读' : '朗读文章'"
    >
      <!-- 根据朗读状态显示不同图标和文本 -->
      <span v-if="!isReading">🔊 朗读</span>
      <span v-else>⏸️ 停止</span>
    </button>
  </div>
</template>

<script>
/**
 * 朗读功能组件
 * 使用浏览器的Web Speech API实现文章朗读功能
 */
export default {
  name: 'ReadAloud',
  data() {
    return {
      isReading: false, // 朗读状态标识
      utterance: null   // 语音合成实例
    }
  },
  methods: {
    /**
     * 切换朗读状态
     * 根据当前状态决定开始或停止朗读
     */
    toggleReading() {
      if (this.isReading) {
        this.stopReading()
      } else {
        this.startReading()
      }
    },
    /**
     * 开始朗读文章
     * 1. 检查浏览器支持
     * 2. 获取文章内容
     * 3. 配置语音参数
     * 4. 开始朗读
     */
    startReading() {
      // 检查浏览器是否支持语音合成API
      if (!window.speechSynthesis) {
        alert('您的浏览器不支持语音合成功能')
        return
      }
      
      // 获取文章内容
      const content = this.getArticleContent()
      if (!content) return
      
      // 创建语音合成实例并配置参数
      this.utterance = new SpeechSynthesisUtterance(content)
      this.utterance.lang = 'zh-CN'  // 设置语言为中文
      this.utterance.rate = 0.8     // 设置语速（0.1-10）
      this.utterance.pitch = 1       // 设置音调（0-2）
      
      // 朗读结束时的回调
      this.utterance.onend = () => {
        this.isReading = false
      }
      
      // 开始朗读
      window.speechSynthesis.speak(this.utterance)
      this.isReading = true
    },
    /**
     * 停止朗读
     * 取消当前的语音合成并重置状态
     */
    stopReading() {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel() // 取消所有语音合成
      }
      this.isReading = false
    },
    /**
     * 获取文章内容用于朗读
     * 1. 查找文章容器元素
     * 2. 克隆元素避免影响原DOM
     * 3. 移除不需要朗读的元素（代码块、导航等）
     * 4. 返回纯文本内容
     */
    getArticleContent() {
      // 按优先级查找文章容器
      const article = document.querySelector('.theme-reco-md-content')
      
      if (!article) return ''
      
      // 克隆节点避免影响原DOM结构
      const clone = article.cloneNode(true)
      
      // 移除不需要朗读的元素
      const elementsToRemove = clone.querySelectorAll('pre, code, .read-aloud, nav, .navbar, .sidebar')
      elementsToRemove.forEach(el => el.remove())
      
      // 返回处理后的纯文本内容
      return clone.textContent.trim()
    }
  },
  /**
   * 组件卸载前的清理工作
   * 确保停止朗读，避免内存泄漏
   */
  beforeUnmount() {
    this.stopReading()
  }
}
</script>

<!-- 组件样式，scoped确保样式只作用于当前组件 -->
<style scoped>
/* 朗读按钮容器样式 */
.read-aloud {
  margin: 16px 0;     /* 上下边距 */
  text-align: right;  /* 右对齐 */
}

/* 朗读按钮基础样式 */
.read-btn {
  border: none;                  /* 无边框 */
  border-radius: 4px;            /* 圆角 */
  cursor: pointer;               /* 鼠标指针 */
  font-size: 14px;               /* 字体大小 */
  transition: all 0.3s ease;     /* 平滑过渡动画 */
}

/* 按钮悬停效果 */
.read-btn:hover {
  color: blue;
  transform: translateY(-1px);   /* 向上移动1px */
}

/* 朗读中的按钮样式 */
.read-btn.active {
  color: rgb(81, 81, 250);
}

/* 朗读中按钮的悬停效果 */
.read-btn.active:hover {
  color: blue;           /* 深红色背景 */
}
</style>