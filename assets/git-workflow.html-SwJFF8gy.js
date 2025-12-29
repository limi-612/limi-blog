import{_ as a,c as e,b as l,a as i,r as p,o as t}from"./app-DNlIjGKH.js";const c={};function o(r,s){const n=p("ReadAloud");return t(),e("div",null,[l(n),s[0]||(s[0]=i(`<h2 id="git基础概念" tabindex="-1"><a class="header-anchor" href="#git基础概念"><span>Git基础概念</span></a></h2><h3 id="_1-git工作原理深度解析" tabindex="-1"><a class="header-anchor" href="#_1-git工作原理深度解析"><span>1. Git工作原理深度解析</span></a></h3><p><strong>Git的核心优势：</strong></p><ol><li><strong>分布式版本控制：</strong> 每个开发者都有完整的代码历史</li><li><strong>快照存储：</strong> 不储存差异，而是存储整个文件的快照</li><li><strong>分支管理：</strong> 轻量级分支创建和切换</li><li><strong>数据完整性：</strong> 使用SHA-1哈希值保证数据完整性</li></ol><p><strong>Git的三个工作区域：</strong></p><h4 id="工作区-working-directory" tabindex="-1"><a class="header-anchor" href="#工作区-working-directory"><span>工作区（Working Directory）</span></a></h4><ul><li><strong>定义：</strong> 当前正在编辑的文件状态</li><li><strong>特点：</strong> 包含已修改但未添加到暂存区的文件</li><li><strong>操作：</strong> 编辑、创建、删除文件</li></ul><h4 id="暂存区-staging-area-index" tabindex="-1"><a class="header-anchor" href="#暂存区-staging-area-index"><span>暂存区（Staging Area/Index）</span></a></h4><ul><li><strong>定义：</strong> 准备提交的文件快照</li><li><strong>作用：</strong> 允许精确控制哪些变更被包含在下次提交中</li><li><strong>优势：</strong> 可以部分添加文件的变更</li></ul><h4 id="版本库-repository" tabindex="-1"><a class="header-anchor" href="#版本库-repository"><span>版本库（Repository）</span></a></h4><ul><li><strong>定义：</strong> 存储所有提交历史的地方</li><li><strong>分类：</strong> 本地仓库和远程仓库</li><li><strong>内容：</strong> 包含所有分支、标签和提交历史</li></ul><p><strong>Git文件状态转换：</strong></p><ol><li><strong>Untracked：</strong> 新文件，未被Git跟踪</li><li><strong>Modified：</strong> 已修改但未添加到暂存区</li><li><strong>Staged：</strong> 已添加到暂存区，等待提交</li><li><strong>Committed：</strong> 已提交到版本库</li></ol><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># Git工作流程基本命令</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 1. 查看当前状态</span></span>
<span class="line"><span class="token function">git</span> status                <span class="token comment"># 查看文件状态</span></span>
<span class="line"><span class="token function">git</span> status <span class="token parameter variable">-s</span>            <span class="token comment"># 简洁格式显示</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span>                 <span class="token comment"># 查看工作区与暂存区的差异</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> <span class="token parameter variable">--staged</span>        <span class="token comment"># 查看暂存区与版本库的差异</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 添加文件到暂存区</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> file.txt         <span class="token comment"># 添加单个文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span>                <span class="token comment"># 添加当前目录所有文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> *.js             <span class="token comment"># 添加所有JavaScript文件</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-A</span>               <span class="token comment"># 添加所有变更（包括删除）</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token parameter variable">-p</span>               <span class="token comment"># 交互式添加，可选择部分变更</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 提交变更</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;提交信息&quot;</span>     <span class="token comment"># 提交暂存区的变更</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-am</span> <span class="token string">&quot;信息&quot;</span>          <span class="token comment"># 跳过暂存区直接提交已跟踪文件</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span>           <span class="token comment"># 修改最后一次提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 查看提交历史</span></span>
<span class="line"><span class="token function">git</span> log                      <span class="token comment"># 完整的提交历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--oneline</span>           <span class="token comment"># 简洁模式，一行显示一次提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--graph</span>             <span class="token comment"># 图形化显示分支合并历史</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--author</span><span class="token operator">=</span><span class="token string">&quot;张三&quot;</span>      <span class="token comment"># 按作者筛选提交</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--since</span><span class="token operator">=</span><span class="token string">&quot;2024-01-01&quot;</span> <span class="token parameter variable">--until</span><span class="token operator">=</span><span class="token string">&quot;2024-12-31&quot;</span>  <span class="token comment"># 按时间范围筛选</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--grep</span><span class="token operator">=</span><span class="token string">&quot;修复&quot;</span>        <span class="token comment"># 按提交信息搜索</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">-p</span>                  <span class="token comment"># 显示每次提交的具体变更</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--stat</span>              <span class="token comment"># 显示每次提交的文件统计信息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 查看特定提交</span></span>
<span class="line"><span class="token function">git</span> show <span class="token operator">&lt;</span>commit-hash<span class="token operator">&gt;</span>       <span class="token comment"># 显示特定提交的详细信息</span></span>
<span class="line"><span class="token function">git</span> show HEAD               <span class="token comment"># 显示最新提交</span></span>
<span class="line"><span class="token function">git</span> show HEAD~1             <span class="token comment"># 显示倒数第二次提交</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Git工作流程最佳实践：</strong></p><ol><li><strong>频繁提交：</strong> 小步快跑，频繁提交小变更</li><li><strong>清晰的提交信息：</strong> 使用约定的格式和规范</li><li><strong>合理使用暂存区：</strong> 精确控制每次提交的内容</li><li><strong>定期查看状态：</strong> 使用git status了解当前状态</li></ol><p><strong>面试要点：</strong></p><ul><li>Git是分布式版本控制系统，与SVN等集中式系统不同</li><li>三个工作区域的概念是Git的核心，理解它们的作用和转换</li><li>暂存区的存在使得Git可以精确控制提交内容</li><li>Git使用SHA-1哈希值来标识每个提交，保证数据完整性</li></ul><h3 id="_2-git分支管理策略" tabindex="-1"><a class="header-anchor" href="#_2-git分支管理策略"><span>2. Git分支管理策略</span></a></h3><p><strong>Git分支的优势：</strong></p><ol><li><strong>轻量级：</strong> 创建分支只是创建一个指向提交对象的指针</li><li><strong>快速切换：</strong> 分支切换速度极快，几乎是瞬时完成</li><li><strong>独立开发：</strong> 每个分支都是独立的开发线</li><li><strong>并行工作：</strong> 支持多人同时在不同分支上工作</li></ol><p><strong>分支类型和命名规范：</strong></p><ul><li><strong>主分支：</strong> main/master（稳定的生产代码）</li><li><strong>开发分支：</strong> develop（最新的开发代码）</li><li><strong>功能分支：</strong> feature/功能名（新功能开发）</li><li><strong>修复分支：</strong> bugfix/问题描述（bug修复）</li><li><strong>热修复分支：</strong> hotfix/问题描述（紧急修复）</li><li><strong>发布分支：</strong> release/版本号（发布准备）</li></ul><p><strong>分支操作详解：</strong></p><h4 id="查看和创建分支" tabindex="-1"><a class="header-anchor" href="#查看和创建分支"><span>查看和创建分支</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看分支信息</span></span>
<span class="line"><span class="token function">git</span> branch                    <span class="token comment"># 查看本地分支，*标记当前分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-r</span>                 <span class="token comment"># 查看远程分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-a</span>                 <span class="token comment"># 查看所有分支（本地+远程）</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-v</span>                 <span class="token comment"># 显示分支及最后一次提交</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">--merged</span>           <span class="token comment"># 显示已合并的分支</span></span>
<span class="line"><span class="token function">git</span> branch --no-merged        <span class="token comment"># 显示未合并的分支</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建分支</span></span>
<span class="line"><span class="token function">git</span> branch feature-login      <span class="token comment"># 只创建分支，不切换</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-login <span class="token comment"># 创建并切换到新分支</span></span>
<span class="line"><span class="token function">git</span> switch <span class="token parameter variable">-c</span> feature-login   <span class="token comment"># 新语法：创建并切换</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature-login origin/develop  <span class="token comment"># 基于远程分支创建</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="切换和管理分支" tabindex="-1"><a class="header-anchor" href="#切换和管理分支"><span>切换和管理分支</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 切换分支</span></span>
<span class="line"><span class="token function">git</span> checkout main             <span class="token comment"># 切换到main分支</span></span>
<span class="line"><span class="token function">git</span> switch main               <span class="token comment"># 新语法切换</span></span>
<span class="line"><span class="token function">git</span> checkout -                <span class="token comment"># 切换到上一个分支</span></span>
<span class="line"><span class="token function">git</span> switch -                  <span class="token comment"># 新语法切换到上一个分支</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重命名分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-m</span> old-name new-name           <span class="token comment"># 重命名其他分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-m</span> new-name                    <span class="token comment"># 重命名当前分支</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature-login               <span class="token comment"># 删除已合并的分支</span></span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-D</span> feature-login               <span class="token comment"># 强制删除分支（即使未合并）</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> feature-login   <span class="token comment"># 删除远程分支</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="分支合并策略" tabindex="-1"><a class="header-anchor" href="#分支合并策略"><span>分支合并策略</span></a></h4><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># Fast-Forward合并（默认）</span></span>
<span class="line"><span class="token function">git</span> merge feature-login       <span class="token comment"># 如果可能，使用快进合并</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 禁用Fast-Forward合并</span></span>
<span class="line"><span class="token function">git</span> merge --no-ff feature-login  <span class="token comment"># 强制创建合并提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># Squash合并</span></span>
<span class="line"><span class="token function">git</span> merge <span class="token parameter variable">--squash</span> feature-login <span class="token comment"># 将分支的所有提交压缩为一个</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看合并情况</span></span>
<span class="line"><span class="token function">git</span> log <span class="token parameter variable">--graph</span> <span class="token parameter variable">--oneline</span> <span class="token parameter variable">--all</span>  <span class="token comment"># 图形化显示分支合并历史</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>分支合并策略对比：</strong></p><ol><li><p><strong>Fast-Forward合并：</strong></p><ul><li><strong>优点：</strong> 历史线性清晰，无额外提交</li><li><strong>缺点：</strong> 丢失分支信息，难以追踪功能开发</li></ul></li><li><p><strong>No-FF合并：</strong></p><ul><li><strong>优点：</strong> 保留分支信息，清晰的功能边界</li><li><strong>缺点：</strong> 历史更复杂，额外的合并提交</li></ul></li><li><p><strong>Squash合并：</strong></p><ul><li><strong>优点：</strong> 清洁的历史，一个功能一个提交</li><li><strong>缺点：</strong> 丢失详细的开发历史</li></ul></li></ol><p><strong>分支管理最佳实践：</strong></p><ol><li><strong>使用有意义的分支名：</strong> feature/user-auth、bugfix/login-error</li><li><strong>定期清理分支：</strong> 删除已合并的分支</li><li><strong>保持分支简洁：</strong> 避免长期存在的功能分支</li><li><strong>合并前更新：</strong> 先拉取最新的主分支代码</li></ol><p><strong>面试要点：</strong></p><ul><li>Git分支是指向提交对象的可变指针，非常轻量</li><li>HEAD是指向当前分支的指针</li><li>不同的合并策略适用于不同的团队和项目</li><li>分支命名应该遵循团队约定的规范</li></ul><h2 id="高级git操作" tabindex="-1"><a class="header-anchor" href="#高级git操作"><span>高级Git操作</span></a></h2><h3 id="_1-变基操作" tabindex="-1"><a class="header-anchor" href="#_1-变基操作"><span>1. 变基操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 基本变基</span></span>
<span class="line"><span class="token function">git</span> rebase main          <span class="token comment"># 将当前分支变基到main</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 交互式变基</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">-i</span> HEAD~3     <span class="token comment"># 修改最近3个提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 变基选项说明:</span></span>
<span class="line"><span class="token comment"># pick: 使用该提交</span></span>
<span class="line"><span class="token comment"># reword: 使用该提交，但修改提交信息</span></span>
<span class="line"><span class="token comment"># edit: 使用该提交，但停下来修改</span></span>
<span class="line"><span class="token comment"># squash: 将该提交合并到前一个提交</span></span>
<span class="line"><span class="token comment"># fixup: 类似squash，但丢弃提交信息</span></span>
<span class="line"><span class="token comment"># drop: 删除该提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 示例：合并多个提交</span></span>
<span class="line"><span class="token comment"># 原始提交历史:</span></span>
<span class="line"><span class="token comment"># commit3: 修复bug</span></span>
<span class="line"><span class="token comment"># commit2: 添加功能</span></span>
<span class="line"><span class="token comment"># commit1: 初始提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 变基脚本:</span></span>
<span class="line"><span class="token comment"># pick commit1 初始提交</span></span>
<span class="line"><span class="token comment"># pick commit2 添加功能  </span></span>
<span class="line"><span class="token comment"># squash commit3 修复bug</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解决变基冲突</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--continue</span>    <span class="token comment"># 解决冲突后继续</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--abort</span>       <span class="token comment"># 放弃变基</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--skip</span>        <span class="token comment"># 跳过当前提交</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-储藏功能" tabindex="-1"><a class="header-anchor" href="#_2-储藏功能"><span>2. 储藏功能</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 储藏当前工作</span></span>
<span class="line"><span class="token function">git</span> stash                <span class="token comment"># 储藏工作区和暂存区</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token parameter variable">-u</span>             <span class="token comment"># 包括未跟踪文件</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token parameter variable">-k</span>             <span class="token comment"># 保留暂存区内容</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看储藏列表</span></span>
<span class="line"><span class="token function">git</span> stash list</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 应用储藏</span></span>
<span class="line"><span class="token function">git</span> stash apply          <span class="token comment"># 应用最新储藏</span></span>
<span class="line"><span class="token function">git</span> stash apply stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span>  <span class="token comment"># 应用指定储藏</span></span>
<span class="line"><span class="token function">git</span> stash pop            <span class="token comment"># 应用并删除最新储藏</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除储藏</span></span>
<span class="line"><span class="token function">git</span> stash drop stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span> <span class="token comment"># 删除指定储藏</span></span>
<span class="line"><span class="token function">git</span> stash <span class="token function">clear</span>          <span class="token comment"># 清空所有储藏</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 创建带消息的储藏</span></span>
<span class="line"><span class="token function">git</span> stash save <span class="token string">&quot;修复登录bug的临时代码&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 从储藏创建分支</span></span>
<span class="line"><span class="token function">git</span> stash branch feature-fix stash@<span class="token punctuation">{</span><span class="token number">1</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-撤销操作" tabindex="-1"><a class="header-anchor" href="#_3-撤销操作"><span>3. 撤销操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 撤销工作区修改</span></span>
<span class="line"><span class="token function">git</span> checkout -- file.txt    <span class="token comment"># 撤销单个文件</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token builtin class-name">.</span>              <span class="token comment"># 撤销所有文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销暂存区</span></span>
<span class="line"><span class="token function">git</span> reset HEAD file.txt     <span class="token comment"># 取消暂存单个文件</span></span>
<span class="line"><span class="token function">git</span> reset HEAD              <span class="token comment"># 取消所有暂存</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 撤销提交</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--soft</span> HEAD~1     <span class="token comment"># 软重置，保留工作区和暂存区</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--mixed</span> HEAD~1    <span class="token comment"># 混合重置，保留工作区</span></span>
<span class="line"><span class="token function">git</span> reset <span class="token parameter variable">--hard</span> HEAD~1     <span class="token comment"># 硬重置，丢弃所有修改</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 反向提交</span></span>
<span class="line"><span class="token function">git</span> revert HEAD             <span class="token comment"># 创建新提交来撤销最新提交</span></span>
<span class="line"><span class="token function">git</span> revert HEAD~2<span class="token punctuation">..</span>HEAD     <span class="token comment"># 撤销多个提交</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改最后一次提交</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span>          <span class="token comment"># 修改提交信息或添加文件</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">--amend</span> --no-edit  <span class="token comment"># 只添加文件，不修改信息</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远程仓库操作" tabindex="-1"><a class="header-anchor" href="#远程仓库操作"><span>远程仓库操作</span></a></h2><h3 id="_1-远程仓库管理" tabindex="-1"><a class="header-anchor" href="#_1-远程仓库管理"><span>1. 远程仓库管理</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 查看远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token parameter variable">-v</span>               <span class="token comment"># 查看远程仓库详情</span></span>
<span class="line"><span class="token function">git</span> remote show origin      <span class="token comment"># 查看远程仓库信息</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> origin https://github.com/user/repo.git</span>
<span class="line"><span class="token function">git</span> remote <span class="token function">add</span> upstream https://github.com/original/repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 修改远程仓库URL</span></span>
<span class="line"><span class="token function">git</span> remote set-url origin https://github.com/user/new-repo.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote remove upstream</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 重命名远程仓库</span></span>
<span class="line"><span class="token function">git</span> remote <span class="token function">rename</span> origin old-origin</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-推拉操作" tabindex="-1"><a class="header-anchor" href="#_2-推拉操作"><span>2. 推拉操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 推送代码</span></span>
<span class="line"><span class="token function">git</span> push origin main        <span class="token comment"># 推送到远程main分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">-u</span> origin main     <span class="token comment"># 推送并设置上游分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--all</span> origin       <span class="token comment"># 推送所有分支</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--tags</span> origin      <span class="token comment"># 推送所有标签</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 强制推送 (危险操作)</span></span>
<span class="line"><span class="token function">git</span> push <span class="token parameter variable">--force</span> origin main</span>
<span class="line"><span class="token function">git</span> push --force-with-lease origin main  <span class="token comment"># 更安全的强制推送</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取代码</span></span>
<span class="line"><span class="token function">git</span> pull origin main        <span class="token comment"># 拉取并合并</span></span>
<span class="line"><span class="token function">git</span> pull <span class="token parameter variable">--rebase</span> origin main  <span class="token comment"># 拉取并变基</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 获取远程更新</span></span>
<span class="line"><span class="token function">git</span> fetch origin           <span class="token comment"># 获取所有远程更新</span></span>
<span class="line"><span class="token function">git</span> fetch origin main      <span class="token comment"># 获取指定分支更新</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跟踪远程分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> local-branch origin/remote-branch</span>
<span class="line"><span class="token function">git</span> branch --set-upstream-to<span class="token operator">=</span>origin/main main</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="git工作流" tabindex="-1"><a class="header-anchor" href="#git工作流"><span>Git工作流</span></a></h2><h3 id="_1-git-flow工作流" tabindex="-1"><a class="header-anchor" href="#_1-git-flow工作流"><span>1. Git Flow工作流</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 初始化Git Flow</span></span>
<span class="line"><span class="token function">git</span> flow init</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 功能分支</span></span>
<span class="line"><span class="token function">git</span> flow feature start login-system    <span class="token comment"># 开始新功能</span></span>
<span class="line"><span class="token function">git</span> flow feature finish login-system   <span class="token comment"># 完成功能</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 发布分支</span></span>
<span class="line"><span class="token function">git</span> flow release start <span class="token number">1.0</span>.0          <span class="token comment"># 开始发布</span></span>
<span class="line"><span class="token function">git</span> flow release finish <span class="token number">1.0</span>.0         <span class="token comment"># 完成发布</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 热修复分支</span></span>
<span class="line"><span class="token function">git</span> flow hotfix start critical-bug    <span class="token comment"># 开始热修复</span></span>
<span class="line"><span class="token function">git</span> flow hotfix finish critical-bug   <span class="token comment"># 完成热修复</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 支持分支</span></span>
<span class="line"><span class="token function">git</span> flow support start support-branch <span class="token comment"># 开始支持分支</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-github-flow工作流" tabindex="-1"><a class="header-anchor" href="#_2-github-flow工作流"><span>2. GitHub Flow工作流</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 1. 从main分支创建功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/user-authentication</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 2. 在功能分支上开发</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> <span class="token builtin class-name">.</span></span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;添加用户认证功能&quot;</span></span>
<span class="line"><span class="token function">git</span> push origin feature/user-authentication</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 3. 创建Pull Request</span></span>
<span class="line"><span class="token comment"># 在GitHub上创建PR，进行代码审查</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 4. 合并到main分支</span></span>
<span class="line"><span class="token comment"># 通过GitHub界面合并PR</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 5. 删除功能分支</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token function">git</span> branch <span class="token parameter variable">-d</span> feature/user-authentication</span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> feature/user-authentication</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-gitlab-flow工作流" tabindex="-1"><a class="header-anchor" href="#_3-gitlab-flow工作流"><span>3. GitLab Flow工作流</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 环境分支策略</span></span>
<span class="line"><span class="token comment"># main -&gt; pre-production -&gt; production</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 开发流程</span></span>
<span class="line"><span class="token function">git</span> checkout main</span>
<span class="line"><span class="token function">git</span> pull origin main</span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> feature/new-feature</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 开发完成后</span></span>
<span class="line"><span class="token function">git</span> push origin feature/new-feature</span>
<span class="line"><span class="token comment"># 创建Merge Request到main</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 部署到预生产环境</span></span>
<span class="line"><span class="token function">git</span> checkout pre-production</span>
<span class="line"><span class="token function">git</span> merge main</span>
<span class="line"><span class="token function">git</span> push origin pre-production</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 部署到生产环境</span></span>
<span class="line"><span class="token function">git</span> checkout production</span>
<span class="line"><span class="token function">git</span> merge pre-production</span>
<span class="line"><span class="token function">git</span> push origin production</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="冲突解决" tabindex="-1"><a class="header-anchor" href="#冲突解决"><span>冲突解决</span></a></h2><h3 id="_1-合并冲突" tabindex="-1"><a class="header-anchor" href="#_1-合并冲突"><span>1. 合并冲突</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 当合并出现冲突时</span></span>
<span class="line"><span class="token function">git</span> merge feature-branch</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 冲突文件内容示例:</span></span>
<span class="line">console.log<span class="token punctuation">(</span><span class="token string">&#39;feature分支的代码&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 手动解决冲突后</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> conflicted-file.js</span>
<span class="line"><span class="token function">git</span> commit <span class="token parameter variable">-m</span> <span class="token string">&quot;解决合并冲突&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 使用工具解决冲突</span></span>
<span class="line"><span class="token function">git</span> mergetool               <span class="token comment"># 使用配置的合并工具</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> merge.tool vimdiff  <span class="token comment"># 配置合并工具</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-变基冲突" tabindex="-1"><a class="header-anchor" href="#_2-变基冲突"><span>2. 变基冲突</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 变基时出现冲突</span></span>
<span class="line"><span class="token function">git</span> rebase main</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 解决冲突后</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> conflicted-file.js</span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--continue</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 如果冲突太多，可以放弃变基</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--abort</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 跳过有问题的提交</span></span>
<span class="line"><span class="token function">git</span> rebase <span class="token parameter variable">--skip</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="高级技巧" tabindex="-1"><a class="header-anchor" href="#高级技巧"><span>高级技巧</span></a></h2><h3 id="_1-子模块管理" tabindex="-1"><a class="header-anchor" href="#_1-子模块管理"><span>1. 子模块管理</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 添加子模块</span></span>
<span class="line"><span class="token function">git</span> submodule <span class="token function">add</span> https://github.com/user/library.git lib/library</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 克隆包含子模块的项目</span></span>
<span class="line"><span class="token function">git</span> clone <span class="token parameter variable">--recursive</span> https://github.com/user/project.git</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 初始化子模块</span></span>
<span class="line"><span class="token function">git</span> submodule init</span>
<span class="line"><span class="token function">git</span> submodule update</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 更新子模块</span></span>
<span class="line"><span class="token function">git</span> submodule update <span class="token parameter variable">--remote</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除子模块</span></span>
<span class="line"><span class="token function">git</span> submodule deinit lib/library</span>
<span class="line"><span class="token function">git</span> <span class="token function">rm</span> lib/library</span>
<span class="line"><span class="token function">rm</span> <span class="token parameter variable">-rf</span> .git/modules/lib/library</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-钩子脚本" tabindex="-1"><a class="header-anchor" href="#_2-钩子脚本"><span>2. 钩子脚本</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 客户端钩子</span></span>
<span class="line"><span class="token comment"># .git/hooks/pre-commit</span></span>
<span class="line"><span class="token comment">#!/bin/sh</span></span>
<span class="line"><span class="token comment"># 提交前运行代码检查</span></span>
<span class="line"><span class="token function">npm</span> run lint</span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token variable">$?</span> <span class="token parameter variable">-ne</span> <span class="token number">0</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;代码检查失败，请修复后再提交&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># .git/hooks/commit-msg</span></span>
<span class="line"><span class="token comment">#!/bin/sh</span></span>
<span class="line"><span class="token comment"># 检查提交信息格式</span></span>
<span class="line"><span class="token assign-left variable">commit_regex</span><span class="token operator">=</span><span class="token string">&#39;^(feat|fix|docs|style|refactor|test|chore)(\\(.+\\))?: .{1,50}&#39;</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token operator">!</span> <span class="token function">grep</span> <span class="token parameter variable">-qE</span> <span class="token string">&quot;<span class="token variable">$commit_regex</span>&quot;</span> <span class="token string">&quot;<span class="token variable">$1</span>&quot;</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;提交信息格式不正确&quot;</span></span>
<span class="line">    <span class="token builtin class-name">echo</span> <span class="token string">&quot;格式: type(scope): description&quot;</span></span>
<span class="line">    <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line"><span class="token keyword">fi</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 服务端钩子</span></span>
<span class="line"><span class="token comment"># hooks/pre-receive</span></span>
<span class="line"><span class="token comment">#!/bin/sh</span></span>
<span class="line"><span class="token comment"># 推送前检查</span></span>
<span class="line"><span class="token keyword">while</span> <span class="token builtin class-name">read</span> oldrev newrev refname<span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">    <span class="token comment"># 检查分支保护</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">&quot;<span class="token variable">$refname</span>&quot;</span> <span class="token operator">=</span> <span class="token string">&quot;refs/heads/main&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;main分支受保护，请通过PR提交&quot;</span></span>
<span class="line">        <span class="token builtin class-name">exit</span> <span class="token number">1</span></span>
<span class="line">    <span class="token keyword">fi</span></span>
<span class="line"><span class="token keyword">done</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_3-别名配置" tabindex="-1"><a class="header-anchor" href="#_3-别名配置"><span>3. 别名配置</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 常用别名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.co checkout</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.br branch</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.ci commit</span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.st status</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 高级别名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.unstage <span class="token string">&#39;reset HEAD --&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.last <span class="token string">&#39;log -1 HEAD&#39;</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.visual <span class="token string">&#39;!gitk&#39;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 复杂别名</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> alias.lg <span class="token string">&quot;log --color --graph --pretty=format:&#39;%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)&lt;%an&gt;%Creset&#39; --abbrev-commit&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看配置</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--list</span></span>
<span class="line"><span class="token function">git</span> config <span class="token parameter variable">--global</span> <span class="token parameter variable">--list</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="性能优化" tabindex="-1"><a class="header-anchor" href="#性能优化"><span>性能优化</span></a></h2><h3 id="_1-大文件处理" tabindex="-1"><a class="header-anchor" href="#_1-大文件处理"><span>1. 大文件处理</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># Git LFS (Large File Storage)</span></span>
<span class="line"><span class="token function">git</span> lfs <span class="token function">install</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.psd&quot;</span></span>
<span class="line"><span class="token function">git</span> lfs track <span class="token string">&quot;*.zip&quot;</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">add</span> .gitattributes</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看LFS文件</span></span>
<span class="line"><span class="token function">git</span> lfs ls-files</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拉取LFS文件</span></span>
<span class="line"><span class="token function">git</span> lfs pull</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理LFS缓存</span></span>
<span class="line"><span class="token function">git</span> lfs prune</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-仓库优化" tabindex="-1"><a class="header-anchor" href="#_2-仓库优化"><span>2. 仓库优化</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 垃圾回收</span></span>
<span class="line"><span class="token function">git</span> gc                  <span class="token comment"># 基本垃圾回收</span></span>
<span class="line"><span class="token function">git</span> gc <span class="token parameter variable">--aggressive</span>     <span class="token comment"># 激进垃圾回收</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 清理未跟踪文件</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-f</span>            <span class="token comment"># 删除未跟踪文件</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-fd</span>           <span class="token comment"># 删除未跟踪文件和目录</span></span>
<span class="line"><span class="token function">git</span> clean <span class="token parameter variable">-n</span>            <span class="token comment"># 预览要删除的文件</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 压缩仓库</span></span>
<span class="line"><span class="token function">git</span> repack <span class="token parameter variable">-ad</span>          <span class="token comment"># 重新打包对象</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 检查仓库完整性</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">fsck</span>                <span class="token comment"># 检查对象完整性</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">fsck</span> <span class="token parameter variable">--full</span>         <span class="token comment"># 完整检查</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="团队协作" tabindex="-1"><a class="header-anchor" href="#团队协作"><span>团队协作</span></a></h2><h3 id="_1-代码审查" tabindex="-1"><a class="header-anchor" href="#_1-代码审查"><span>1. 代码审查</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建审查分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> review/feature-login</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看差异</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> main<span class="token punctuation">..</span>feature-login        <span class="token comment"># 比较分支差异</span></span>
<span class="line"><span class="token function">git</span> <span class="token function">diff</span> --name-only main<span class="token punctuation">..</span>feature-login  <span class="token comment"># 只显示文件名</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 添加审查注释</span></span>
<span class="line"><span class="token function">git</span> notes <span class="token function">add</span> <span class="token parameter variable">-m</span> <span class="token string">&quot;需要添加错误处理&quot;</span> commit-hash</span>
<span class="line"></span>
<span class="line"><span class="token comment"># 查看注释</span></span>
<span class="line"><span class="token function">git</span> notes show commit-hash</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-发布管理" tabindex="-1"><a class="header-anchor" href="#_2-发布管理"><span>2. 发布管理</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh" data-title="sh"><pre><code><span class="line"><span class="token comment"># 创建标签</span></span>
<span class="line"><span class="token function">git</span> tag v1.0.0                     <span class="token comment"># 轻量标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-a</span> v1.0.0 <span class="token parameter variable">-m</span> <span class="token string">&quot;发布版本1.0.0&quot;</span>  <span class="token comment"># 注释标签</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 推送标签</span></span>
<span class="line"><span class="token function">git</span> push origin v1.0.0             <span class="token comment"># 推送单个标签</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--tags</span>             <span class="token comment"># 推送所有标签</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 删除标签</span></span>
<span class="line"><span class="token function">git</span> tag <span class="token parameter variable">-d</span> v1.0.0                  <span class="token comment"># 删除本地标签</span></span>
<span class="line"><span class="token function">git</span> push origin <span class="token parameter variable">--delete</span> v1.0.0    <span class="token comment"># 删除远程标签</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 基于标签创建分支</span></span>
<span class="line"><span class="token function">git</span> checkout <span class="token parameter variable">-b</span> hotfix-1.0.1 v1.0.0</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Git作为分布式版本控制系统，是现代软件开发不可或缺的工具，掌握其高级用法对团队协作至关重要。</p>`,78))])}const m=a(c,[["render",o]]),u=JSON.parse('{"path":"/blogs/Git/git-workflow.html","title":"Git版本控制面试题","lang":"en-US","frontmatter":{"title":"Git版本控制面试题","date":"2024/12/20","tags":["Git","版本控制","工作流"],"categories":["Git"]},"headers":[{"level":2,"title":"Git基础概念","slug":"git基础概念","link":"#git基础概念","children":[{"level":3,"title":"1. Git工作原理深度解析","slug":"_1-git工作原理深度解析","link":"#_1-git工作原理深度解析","children":[]},{"level":3,"title":"2. Git分支管理策略","slug":"_2-git分支管理策略","link":"#_2-git分支管理策略","children":[]}]},{"level":2,"title":"高级Git操作","slug":"高级git操作","link":"#高级git操作","children":[{"level":3,"title":"1. 变基操作","slug":"_1-变基操作","link":"#_1-变基操作","children":[]},{"level":3,"title":"2. 储藏功能","slug":"_2-储藏功能","link":"#_2-储藏功能","children":[]},{"level":3,"title":"3. 撤销操作","slug":"_3-撤销操作","link":"#_3-撤销操作","children":[]}]},{"level":2,"title":"远程仓库操作","slug":"远程仓库操作","link":"#远程仓库操作","children":[{"level":3,"title":"1. 远程仓库管理","slug":"_1-远程仓库管理","link":"#_1-远程仓库管理","children":[]},{"level":3,"title":"2. 推拉操作","slug":"_2-推拉操作","link":"#_2-推拉操作","children":[]}]},{"level":2,"title":"Git工作流","slug":"git工作流","link":"#git工作流","children":[{"level":3,"title":"1. Git Flow工作流","slug":"_1-git-flow工作流","link":"#_1-git-flow工作流","children":[]},{"level":3,"title":"2. GitHub Flow工作流","slug":"_2-github-flow工作流","link":"#_2-github-flow工作流","children":[]},{"level":3,"title":"3. GitLab Flow工作流","slug":"_3-gitlab-flow工作流","link":"#_3-gitlab-flow工作流","children":[]}]},{"level":2,"title":"冲突解决","slug":"冲突解决","link":"#冲突解决","children":[{"level":3,"title":"1. 合并冲突","slug":"_1-合并冲突","link":"#_1-合并冲突","children":[]},{"level":3,"title":"2. 变基冲突","slug":"_2-变基冲突","link":"#_2-变基冲突","children":[]}]},{"level":2,"title":"高级技巧","slug":"高级技巧","link":"#高级技巧","children":[{"level":3,"title":"1. 子模块管理","slug":"_1-子模块管理","link":"#_1-子模块管理","children":[]},{"level":3,"title":"2. 钩子脚本","slug":"_2-钩子脚本","link":"#_2-钩子脚本","children":[]},{"level":3,"title":"3. 别名配置","slug":"_3-别名配置","link":"#_3-别名配置","children":[]}]},{"level":2,"title":"性能优化","slug":"性能优化","link":"#性能优化","children":[{"level":3,"title":"1. 大文件处理","slug":"_1-大文件处理","link":"#_1-大文件处理","children":[]},{"level":3,"title":"2. 仓库优化","slug":"_2-仓库优化","link":"#_2-仓库优化","children":[]}]},{"level":2,"title":"团队协作","slug":"团队协作","link":"#团队协作","children":[{"level":3,"title":"1. 代码审查","slug":"_1-代码审查","link":"#_1-代码审查","children":[]},{"level":3,"title":"2. 发布管理","slug":"_2-发布管理","link":"#_2-发布管理","children":[]}]}],"git":{"createdTime":1762333543000,"updatedTime":1762401564000,"contributors":[{"name":"Lianming Lu","email":"lianming.lu@ericsson.com","commits":3}]},"filePathRelative":"blogs/Git/git-workflow.md"}');export{m as comp,u as data};
