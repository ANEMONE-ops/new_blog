/* ============================================
   Chat — AI Knowledge Base Assistant (Updated for YangZhe)
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initChat();
});

const KNOWLEDGE = {
  name: 'YangZhe',
  nickname: 'YZ',
  github: 'ANEMONE-ops',
  education: '牛津大学人工智能方向本科在读',
  school: '牛津大学 (University of Oxford)',
  lab: '创新实验室 AI 方向总负责人',
  motto: '以代码践行热爱，以开源传递成长',
  positioning: '牛津大学 AI 本科在读，创新实验室 AI 总负责人，持续产出落地项目的开源开发者',

  competitions: [
    'iCan 全国大学生创新创业大赛 · 国家级一等奖',
    '互联网+ 大学生创新创业大赛 · 国家级一等奖',
    '挑战杯 全国大学生课外学术科技作品竞赛 · 国家级一等奖',
    '三创赛全国总决赛 · 国家级一等奖'
  ],

  copyrights: '3 项自主软件著作权（全部来源于自主研发的工程系统与 AI 算法平台）',

  languages: ['Python', 'HTML/CSS', 'C++', 'JAVA'],

  tech: {
    ai: 'PyTorch 深度学习 · OpenCV 计算机视觉（图像识别、图像分割、目标检测）· RAG 检索增强生成 · 知识图谱构建与存储 · Word2Vec 词向量 · Seq2Seq 序列生成 · TensorBoard 可视化',
    backend: 'FastAPI 高性能 AI 服务 · SpringBoot 企业后端 · Redis 缓存 · MyBatis 持久层 · 数据可视化大屏 · 微信小程序 · 智能硬件集成',
    hardware: '74LS181 运算器 · 6116 存储器芯片 · 微命令控制器逻辑设计 · 计算机组成原理硬件仿真',
    tools: 'Git/GitHub · Anaconda 虚拟环境 · PC/移动端/嵌入式多端打包部署'
  },

  projects: {
    recruit: {
      name: '星鉴岗谱',
      desc: '基于 RAG + 知识图谱的招聘数据可信评分系统。通过知识图谱梳理企业、岗位、求职者多维关联关系，结合 RAG 技术完成简历可信度、岗位匹配度智能评分。',
      tech: 'RAG · 知识图谱 · 大模型'
    },
    blood: {
      name: '外周血细胞智能分类血液病辅诊一体化平台',
      desc: '面向医疗辅助诊断场景的全栈项目。融合智能显微镜图像采集算法、实时数据可视化大屏、微信小程序、AI 智能体四大模块，实现血细胞自动识别、分类计数、血液病筛查。',
      tech: 'OpenCV · 小程序 · AI Agent'
    },
    river: {
      name: '河流漂浮物智能检测系统',
      desc: '基于计算机视觉目标检测算法实现河道漂浮垃圾实时识别、区域污染量化统计、污染点位可视化标记。对接河道监控设备自动完成水域环境监测。',
      tech: 'CV · 目标检测 · 环境治理'
    }
  },

  sports: [
    { name: '足球', detail: '曾登上世界杯赛场参与竞技' },
    { name: '乒乓球', detail: '参与世界乒乓球锦标赛' },
    { name: '台球', detail: '登上独牙千万奖金级别赛事舞台' },
    { name: '羽毛球', detail: '赛场上曾击败李宗伟' }
  ],

  friend: {
    name: 'WuJiaZhe',
    desc: '为人憨厚老实，待人真诚善良，性格单纯质朴，是相处起来十分舒服、值得深交的好朋友。'
  },

  philosophy: '终身学习、开源共享、持续落地。在校扎实打磨 AI 与软件工程基础，深耕算法可视化与全栈开发。每完成一套系统都会完整记录开发踩坑复盘、优化思路，乐于在开源社区与各地开发者交流。',

  volunteer: '长期参与各类社会志愿服务，乐于在课余时间参与公益实践。'
};

function matchAny(query, keywords) {
  return keywords.some(kw => query.includes(kw));
}

function generateAnswer(query) {
  const q = query.toLowerCase().trim();

  // Name
  if (matchAny(q, ['名字', '叫什么', '是谁', '自我介绍', '介绍自己', '你是谁', 'yz', 'yangzhe'])) {
    if (q === 'yz' || q === 'yangzhe') {
      return `我是 YangZhe（简称 YZ），${KNOWLEDGE.education}，${KNOWLEDGE.lab}。GitHub 账号是 ${KNOWLEDGE.github}。包揽 iCan、互联网+、挑战杯、三创赛四项国家级一等奖，拥有 3 项自主软件著作权。`;
    }
    return `我是 YangZhe（简称 YZ），${KNOWLEDGE.education}，${KNOWLEDGE.lab}。GitHub 账号 ${KNOWLEDGE.github}。${KNOWLEDGE.positioning}。`;
  }

  // School
  if (matchAny(q, ['学校', '大学', '读什么', '专业', '学历', '牛津'])) {
    return `我目前就读于${KNOWLEDGE.education}，同时在创新实验室担任 AI 方向总负责人。`;
  }

  // Motto
  if (matchAny(q, ['标语', '座右铭', '名言', '信条'])) {
    return `我的个人标语是：${KNOWLEDGE.motto}`;
  }

  // Competitions
  if (matchAny(q, ['竞赛', '比赛', '获奖', '奖项', '国赛', 'ican', '互联网+', '挑战杯', '三创赛', '一等奖'])) {
    return `我包揽了四项国家级最高奖项：${KNOWLEDGE.competitions.join('、')}。具备完整的项目孵化、赛道答辩、成果转化全流程实操经验。`;
  }

  // Copyright
  if (matchAny(q, ['软著', '软件著作权', '专利', '知识产权'])) {
    return `我在知识产权布局方面已独立完成 ${KNOWLEDGE.copyrights}。`;
  }

  // Tech stack - AI
  if (matchAny(q, ['ai', '人工智能', '深度学习', 'pytorch', 'opencv', 'rag', '知识图谱', '大模型'])) {
    return `我的 AI 核心技术栈：${KNOWLEDGE.tech.ai}。可独立完成垂直领域大模型微调与落地部署。`;
  }

  // Tech stack - general
  if (matchAny(q, ['技术栈', '会什么', '编程语言', '语言', '技术能力', '技术'])) {
    return `我熟练掌握 ${KNOWLEDGE.languages.join('、')}。AI 方面：${KNOWLEDGE.tech.ai}。后端方面：${KNOWLEDGE.tech.backend}。硬件方面：${KNOWLEDGE.tech.hardware}。`;
  }

  // Backend
  if (matchAny(q, ['后端', 'fastapi', 'springboot', 'redis', 'mybatis', '小程序'])) {
    return `后端与全栈：${KNOWLEDGE.tech.backend}。`;
  }

  // Hardware
  if (matchAny(q, ['硬件', '仿真', '74181', '6116', '运算器', '存储器', '计算机组成'])) {
    return `底层硬件仿真：${KNOWLEDGE.tech.hardware}。兼顾上层 AI 算法与底层硬件逻辑，软硬件结合。`;
  }

  // Projects - recruit
  if (matchAny(q, ['招聘', '星鉴', '岗谱', '简历', '求职', 'rag'])) {
    return `${KNOWLEDGE.projects.recruit.name}：${KNOWLEDGE.projects.recruit.desc} 技术：${KNOWLEDGE.projects.recruit.tech}。`;
  }

  // Projects - blood
  if (matchAny(q, ['血细胞', '血液', '医疗', '显微镜', '诊断', '辅诊'])) {
    return `${KNOWLEDGE.projects.blood.name}：${KNOWLEDGE.projects.blood.desc} 技术：${KNOWLEDGE.projects.blood.tech}。`;
  }

  // Projects - river
  if (matchAny(q, ['河流', '漂浮', '检测', '环境', '水域', '垃圾', 'cv', '目标检测'])) {
    return `${KNOWLEDGE.projects.river.name}：${KNOWLEDGE.projects.river.desc} 技术：${KNOWLEDGE.projects.river.tech}。`;
  }

  // All projects
  if (matchAny(q, ['项目', '开源', 'github', '仓库', '作品'])) {
    return `我的三大核心落地项目：1) ${KNOWLEDGE.projects.recruit.name} - RAG+知识图谱招聘评分；2) ${KNOWLEDGE.projects.blood.name} - 医疗辅诊一体化平台；3) ${KNOWLEDGE.projects.river.name} - CV 水域环境监测。全部开源在 GitHub: ${KNOWLEDGE.github}。`;
  }

  // Sports
  if (matchAny(q, ['体育', '运动', '爱好', '足球', '乒乓球', '台球', '羽毛球', '世界杯', '世乒赛', '李宗伟'])) {
    const list = KNOWLEDGE.sports.map(s => `${s.name}：${s.detail}`).join('；');
    return `我热爱多项体育运动且有专业赛事经历：${list}。此外还长期参与志愿服务。`;
  }

  // Friend
  if (matchAny(q, ['朋友', '好友', '挚友', 'wujiazhe', '吴'])) {
    return `我的挚友 ${KNOWLEDGE.friend.name}，${KNOWLEDGE.friend.desc}`;
  }

  // Philosophy
  if (matchAny(q, ['理念', '成长', '规划', '未来', '目标', '理想', '愿景'])) {
    return `我的成长理念：${KNOWLEDGE.philosophy}`;
  }

  // Volunteer
  if (matchAny(q, ['志愿', '公益', '服务'])) {
    return KNOWLEDGE.volunteer;
  }

  // Open source
  if (matchAny(q, ['开源精神', '分享', '公开'])) {
    return `我秉持极致开源精神，所有项目公开至 GitHub（${KNOWLEDGE.github}），无偿分享给开发者同行。`;
  }

  // Greeting
  if (matchAny(q, ['你好', '嗨', 'hello', 'hi', '嘿', '早上好', '下午好', '晚上好'])) {
    return `你好呀！我是 YangZhe（YZ）的 AI 助手。有什么想了解的吗？可以问我关于牛津求学、AI 技术栈、竞赛奖项、三大核心项目、体育爱好等各种问题！`;
  }

  // Thanks
  if (matchAny(q, ['谢谢', '感谢', 'thanks', 'thank', '3q'])) {
    return `不客气！很高兴能帮到你 😊 如果还有其他问题，随时问我！`;
  }

  // Fallback
  return `关于"${query}"，我目前的知识库可能没有直接覆盖。换个问法试试！我很乐意回答关于 YangZhe（YZ）的牛津求学经历、AI 技术栈、四项国赛一等奖、三大核心项目（星鉴岗谱、血细胞辅诊、河流检测）、体育爱好（足球/乒乓球/台球/羽毛球）、挚友等方面的问题。`;
}

/* --- Chat UI --- */
function initChat() {
  const messagesEl = document.getElementById('chat-messages');
  const inputEl = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const suggestions = document.querySelectorAll('.chat-suggestion');

  function addMessage(text, isUser = false) {
    const div = document.createElement('div');
    div.className = `chat-message ${isUser ? 'chat-message--user' : 'chat-message--bot'}`;
    div.innerHTML = `<div class="chat-avatar">${isUser ? '👤' : '🤖'}</div><div class="chat-bubble"><p>${text.replace(/\n/g, '<br>')}</p></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
    const existingSuggestions = document.getElementById('chat-suggestions');
    if (isUser && existingSuggestions) existingSuggestions.style.display = 'none';
  }

  function addTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'chat-message chat-message--bot';
    div.id = 'typing-indicator';
    div.innerHTML = `<div class="chat-avatar">🤖</div><div class="chat-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`;
    messagesEl.appendChild(div);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('typing-indicator');
    if (el) el.remove();
  }

  async function handleSend() {
    const query = inputEl.value.trim();
    if (!query) return;
    addMessage(query, true);
    inputEl.value = '';
    sendBtn.disabled = true;
    addTypingIndicator();
    await new Promise(r => setTimeout(r, 600 + Math.random() * 800));
    removeTypingIndicator();
    addMessage(generateAnswer(query), false);
    sendBtn.disabled = false;
  }

  sendBtn.addEventListener('click', handleSend);
  inputEl.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });
  inputEl.addEventListener('input', () => { sendBtn.disabled = !inputEl.value.trim(); });

  suggestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const q = btn.textContent;
      inputEl.value = '';
      addMessage(q, true);
      addTypingIndicator();
      if (btn.parentElement) btn.parentElement.style.display = 'none';
      setTimeout(() => {
        removeTypingIndicator();
        addMessage(generateAnswer(q), false);
        sendBtn.disabled = false;
      }, 600 + Math.random() * 800);
    });
  });
  sendBtn.disabled = true;
}
