九宫格打地鼠网页小游戏 - 详细需求文档
1. HTML 结构
1.1 文档基础
<!DOCTYPE html>: HTML5 文档类型
<html lang="zh-CN">: 中文语言设置
<meta charset="UTF-8">: UTF-8 字符编码
<meta name="viewport">: 移动设备适配
<title>: 显示 "九宫格打地鼠小游戏"
1.2 页面结构
欢迎页（welcome-page）
背景图容器（welcome-content）
开始按钮（start-button）
按钮文字："开始游戏"
游戏页（game-page）
顶部信息栏（game-header）
得分显示
倒计时显示
游戏容器（game-container）
九宫格布局（每个格子为一个地鼠洞）
地鼠图片显示
结算弹窗（result-modal）
无需新起一个页面，直接在游戏页弹出，并停止游戏
模态框容器
结果标题
最终分数
重玩按钮
2. CSS 样式规范
2.1 全局样式
字体：微软雅黑（Microsoft YaHei）
背景色：#f8f8f8
溢出处理：hidden
盒模型：border-box
2.2 欢迎页样式
背景：绿色（#3CB371）
开始按钮：
渐变背景：#FFD700 到 #FFA500
文字颜色：#D4380D
字体大小：24px
内边距：20px 40px
圆角：30px
阴影效果
悬停动画
2.3 游戏页样式
背景图：game_background.jpeg
顶部信息栏：
半透明背景
圆角设计
字体颜色：#D4380D
游戏容器：
九宫格布局，每个格子有边框
居中显示
地鼠图片：
大小：80% 填充格子
居中显示
2.4 结算弹窗样式
模态框：
半透明黑色背景
居中显示
弹出动画
内容区：
渐变背景
圆角：30px
内边距：50px
分数显示：
字体大小：120px（数字）
渐变金色文字效果
重玩按钮：
样式同开始按钮
悬停效果
3. JavaScript 功能实现
3.1 游戏配置
javascript
const GAME_CONFIG = {
    GAME_DURATION: 30,        // 游戏时长（秒）
    MOUSE_APPEAR_INTERVAL: 1000, // 地鼠出现间隔（毫秒）
    MOUSE_DISAPPEAR_TIME: 1500,  // 地鼠消失时间（毫秒）
    SCORE_PER_HIT: 10,       // 每次击中地鼠的分数
}
3.2 核心功能模块
初始化系统
使用 loadImage () 函数预加载所有图片资源到 imageCache 对象中
使用 Audio () 构造函数预加载所有音效到 audioCache 对象中
获取九宫格容器元素
初始化得分和倒计时变量
玩家控制系统
监听鼠标点击事件:
当点击到有地鼠的格子时，增加分数，播放击中音效，地鼠消失
确保点击事件只在游戏进行中有效
地鼠生成系统
随机选择九宫格中的一个格子显示地鼠图片
使用 setInterval 按 MOUSE_APPEAR_INTERVAL 间隔生成地鼠
地鼠显示 MOUSE_DISAPPEAR_TIME 后自动消失
计分系统
维护 currentScore 变量记录当前分数
使用 CSS animation 实现分数增加动画效果
实时更新页面上的分数显示元素
音效系统
创建 AudioManager 类管理所有音效:
背景音乐：循环播放，可暂停 / 继续
击中音效：点击地鼠时播放
按钮音效：点击开始按钮时播放
提供音量控制和静音功能
3.3 游戏流程控制
开始游戏
调用 resetGame () 重置所有游戏状态和变量
启动 30 秒倒计时器 (setInterval)
调用 startMouseGeneration () 开始地鼠生成
调用 audioManager.playBGM () 播放背景音乐
用户点击开始游戏，进入游戏进行页
游戏进行中
使用 requestAnimationFrame 实现游戏循环:
更新倒计时显示
地鼠按设定时间自动消失
游戏结束
清除所有定时器 (clearInterval)
调用 audioManager.stopBGM () 停止背景音乐
显示带有渐变动画的结算模态框
显示最终分数和最高分记录
提供重新开始按钮
4. 资源清单
4.1 图片资源
plaintext
image/
├── welcome_background.jpeg  // 欢迎页背景
├── game_background.jpeg    // 游戏页背景
├── mouse.png               // 地鼠图片
4.1 图片资源规格
图片格式要求
所有图片必须为 PNG 格式，支持透明背景
图片分辨率：72dpi
压缩级别：中等，确保文件大小适中
尺寸规格
地鼠图片（mouse.png）：100x100px
背景图：1920x1080px，支持自适应缩放
图片加载优先级
关键资源（地鼠图片）：优先加载
装饰性资源（背景图）：次优先级
性能优化建议
图片总大小控制在 1MB 以内
使用适当的压缩算法
考虑使用 CSS Sprite 合并小图标
图片缓存策略：localStorage 或 IndexedDB
4.2 音效资源
plaintext
music/
├── background_music.mp3  // 背景音乐
├── button.mp3           // 按钮音效
├── hit.mp3              // 击中音效
5. 图片加载与显示要求
5.1 图片加载流程
游戏启动前的准备工作
在游戏正式开始前，必须确保所有图片资源完全加载完成
显示加载进度提示，让用户知道当前状态
如果图片加载失败，需要显示友好的错误提示并提供重试选项
加载优先级管理
第一优先级：地鼠图片（mouse.png）
最后加载：背景图片
图片加载状态监控
实时跟踪每个图片的加载状态
记录已加载图片数量和总图片数量
在控制台输出详细的加载日志，方便调试
5.2 九宫格渲染注意事项
九宫格初始化
游戏开始时必须正确设置九宫格的尺寸
九宫格尺寸应该适配当前窗口大小
以下是实现上述需求的简单 HTML、CSS 和 JavaScript 代码示例：
这个示例代码实现了一个简单的九宫格打地鼠小游戏，你可以根据需求进一步完善和优化。
try1.md
