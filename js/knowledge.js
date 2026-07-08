// ============================================
//   综合知识题库 (auto-generated, valid JS)
// ============================================

const KNOWLEDGE_CATEGORIES = {
  hand_signals:  { id: "hand_signals",  name: "👮 交警手势", icon: "👮" },
  road_markings: { id: "road_markings", name: "📏 交通标线", icon: "📏" },
  traffic_lights:{ id: "traffic_lights",name: "🚦 信号灯",   icon: "🚦" },
  right_of_way:  { id: "right_of_way",  name: "⚖️ 让行规则", icon: "⚖️" },
  speed_limits:  { id: "speed_limits",  name: "🏍️ 限速规定", icon: "🏍️" },
  demerit_points:{ id: "demerit_points",name: "📋 记分规则", icon: "📋" },
  expressway:    { id: "expressway",    name: "🛣️ 高速公路", icon: "🛣️" },
  penalties:     { id: "penalties",     name: "⚡ 违法处罚", icon: "⚡" },
  safety:        { id: "safety",        name: "🛟 安全常识", icon: "🛟" },
};

// 手势图片：真实照片
const HAND_SIGNAL_SVGS = {
  stop:            '<img src="img/knowledge/hand_signals/stop.png" style="max-width:100px;max-height:120px;" alt="停止信号">',
  straight:        '<img src="img/knowledge/hand_signals/straight.png" style="max-width:100px;max-height:120px;" alt="直行信号">',
  left_turn:       '<img src="img/knowledge/hand_signals/left_turn.png" style="max-width:100px;max-height:120px;" alt="左转弯信号">',
  right_turn:      '<img src="img/knowledge/hand_signals/right_turn.png" style="max-width:100px;max-height:120px;" alt="右转弯信号">',
  change_lane:     '<img src="img/knowledge/hand_signals/change_lane.png" style="max-width:100px;max-height:120px;" alt="变道信号">',
  slow_down:       '<img src="img/knowledge/hand_signals/slow_down.png" style="max-width:100px;max-height:120px;" alt="减速慢行信号">',
  pull_over:       '<img src="img/knowledge/hand_signals/pull_over.png" style="max-width:100px;max-height:120px;" alt="靠边停车信号">',
  left_turn_wait:  '<img src="img/knowledge/hand_signals/left_turn_wait.png" style="max-width:100px;max-height:120px;" alt="左转弯待转信号">',
};

// 96 questions across 9 categories
const KNOWLEDGE_QUESTIONS = [
  {
    id: "hs01", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.stop,
    question: "图中交警手势表示什么信号？",
    options: [
      "停止信号",
      "直行信号",
      "减速慢行信号",
      "变道信号",
    ],
    answer: 0,
    explanation: "交警左臂向前上方直伸，掌心向前，表示停止信号——前方车辆应停车。"
  },
  {
    id: "hs02", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.straight,
    question: "图中交警手势表示什么信号？",
    options: [
      "左转弯信号",
      "直行信号",
      "停止信号",
      "靠边停车信号",
    ],
    answer: 1,
    explanation: "交警双臂平伸，右臂向前摆动，表示直行信号——准许左右两方直行车辆通行。"
  },
  {
    id: "hs03", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.left_turn,
    question: "图中交警手势表示什么信号？",
    options: [
      "右转弯信号",
      "直行信号",
      "左转弯信号",
      "变道信号",
    ],
    answer: 2,
    explanation: "交警右臂向前平伸，左臂向前下方摆动，表示左转弯信号。"
  },
  {
    id: "hs04", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.right_turn,
    question: "图中交警手势表示什么信号？",
    options: [
      "左转弯信号",
      "右转弯信号",
      "直行信号",
      "减速慢行信号",
    ],
    answer: 1,
    explanation: "交警左臂向前平伸，右臂向前下方摆动，表示右转弯信号。"
  },
  {
    id: "hs05", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.change_lane,
    question: "图中交警手势表示什么信号？",
    options: [
      "靠边停车信号",
      "变道信号",
      "左转弯待转信号",
      "减速慢行信号",
    ],
    answer: 1,
    explanation: "交警右臂向前平伸，向左水平摆动，表示变道信号——车辆应变更车道行驶。"
  },
  {
    id: "hs06", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.slow_down,
    question: "图中交警手势表示什么信号？",
    options: [
      "停止信号",
      "变道信号",
      "减速慢行信号",
      "靠边停车信号",
    ],
    answer: 2,
    explanation: "交警右臂向右前方平伸，向下摆动，表示减速慢行信号。"
  },
  {
    id: "hs07", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.pull_over,
    question: "图中交警手势表示什么信号？",
    options: [
      "靠边停车信号",
      "停止信号",
      "右转弯信号",
      "变道信号",
    ],
    answer: 0,
    explanation: "交警左臂向前上方直伸，右臂向前下方摆动，表示靠边停车信号。"
  },
  {
    id: "hs08", category: "hand_signals", type: "image",
    image: HAND_SIGNAL_SVGS.left_turn_wait,
    question: "图中交警手势表示什么信号？",
    options: [
      "左转弯信号",
      "直行信号",
      "左转弯待转信号",
      "停止信号",
    ],
    answer: 2,
    explanation: "交警左臂向左下方平伸，右臂向左水平摆动，表示左转弯待转信号。"
  },
  {
    id: "hs09", category: "hand_signals", type: "text",
    question: "当交警的指挥手势与交通信号灯不一致时，应该听从谁的指挥？",
    options: [
      "交通信号灯",
      "交警的指挥",
      "交通标志",
      "以上都可以",
    ],
    answer: 1,
    explanation: "根据《道路交通安全法》，遇有交通信号灯、交通标志、交通标线与交警指挥不一致时，应服从交警的指挥。"
  },
  {
    id: "hs10", category: "hand_signals", type: "text",
    question: "交警左手高举过头顶，掌心向前，这表示什么信号？",
    options: [
      "靠边停车",
      "停止信号",
      "减速慢行",
      "注意前方",
    ],
    answer: 1,
    explanation: "交警左臂向前上方直伸（高举过头），掌心向前，这是停止信号。注意与靠边停车区分：靠边停车还有右臂配合摆动。"
  },
  {
    id: "rm01", category: "road_markings", type: "text",
    question: "道路上白色虚线和白色实线有什么区别？",
    options: [
      "虚线可以跨越，实线禁止跨越",
      "实线可以跨越，虚线禁止跨越",
      "两者都可以随意跨越",
      "两者都禁止跨越",
    ],
    answer: 0,
    explanation: "白色虚线分隔同向车道，允许跨越变道；白色实线禁止跨越变道。虚可跨，实不可跨。"
  },
  {
    id: "rm02", category: "road_markings", type: "text",
    question: "路边的黄色实线表示什么？",
    options: [
      "允许临时停车",
      "禁止停车（含临时停车）",
      "允许长时间停车",
      "仅供公交车停靠",
    ],
    answer: 1,
    explanation: "黄色实线表示禁止停车，包括临时停车和长时间停放。黄虚线允许临时停车。"
  },
  {
    id: "rm03", category: "road_markings", type: "text",
    question: "路边的黄色虚线表示什么？",
    options: [
      "禁止停车",
      "允许临时停车",
      "仅供出租车停靠",
      "禁止一切车辆靠近",
    ],
    answer: 1,
    explanation: "黄色虚线允许临时停车（上下客、装卸货物），但驾驶员不得离开车辆。"
  },
  {
    id: "rm04", category: "road_markings", type: "text",
    question: "当路口停止线是黄色双实线时，表示什么？",
    options: [
      "停车让行（必须完全停止）",
      "减速让行",
      "可以不停车通过",
      "仅限公交车停靠",
    ],
    answer: 0,
    explanation: "黄色双实线停止线配合停车让行标志使用，车辆必须在停止线前完全停车。"
  },
  {
    id: "rm05", category: "road_markings", type: "text",
    question: "导流线（V形斜线区域）的作用是什么？",
    options: [
      "可以临时停车",
      "引导车辆按规定路线行驶，不得压线或越线",
      "仅供行人等候过街",
      "可以在此区域掉头",
    ],
    answer: 1,
    explanation: "导流线引导车辆按规定路线行驶，车辆不得压线、越线或在导流线区域内停车。"
  },
  {
    id: "rm06", category: "road_markings", type: "text",
    question: "网状线（黄色网格线）区域内可以停车吗？",
    options: [
      "可以临时停车",
      "任何情况下都不得停车",
      "夜间可以停车",
      "非高峰时段可以停车",
    ],
    answer: 1,
    explanation: "网状线（黄色网格区域）严禁任何车辆以任何理由在此区域内停车。"
  },
  {
    id: "rm07", category: "road_markings", type: "text",
    question: "道路上白色菱形标线表示什么？",
    options: [
      "减速让行线",
      "前方有人行横道（斑马线）",
      "允许掉头区域",
      "车道即将变窄",
    ],
    answer: 1,
    explanation: "白色菱形标线是人行横道预告标识，提醒驾驶员前方不远处有人行横道。"
  },
  {
    id: "rm08", category: "road_markings", type: "text",
    question: "高速公路上的车距确认标线是什么样子的？",
    options: [
      "白色折线，配合0m/50m/100m标志",
      "黄色虚线",
      "红色三角标记",
      "蓝色箭头线",
    ],
    answer: 0,
    explanation: "高速公路车距确认标线为白色折线，配合距离指示标志。"
  },
  {
    id: "rm09", category: "road_markings", type: "text",
    question: "双黄实线的含义是什么？",
    options: [
      "允许借道超车",
      "严禁跨越，分隔对向车流",
      "允许掉头",
      "仅供大型车辆通行",
    ],
    answer: 1,
    explanation: "双黄实线分隔对向车流，严禁跨越、压线、借道超车或掉头。"
  },
  {
    id: "rm10", category: "road_markings", type: "text",
    question: "路口左转弯导向线是什么颜色和形状？",
    options: [
      "黄色虚线弧形",
      "白色虚线弧形（或实线）",
      "红色实线箭头",
      "蓝色虚线弧形",
    ],
    answer: 1,
    explanation: "左转弯导向线为白色虚线（或实线）弧形，引导左转车辆正确通过路口。"
  },
  {
    id: "rm11", category: "road_markings", type: "text",
    question: "道路上的公交专用道地面文字是什么颜色？",
    options: [
      "白色",
      "黄色",
      "红色",
      "蓝色",
    ],
    answer: 1,
    explanation: "公交专用道地面文字通常为黄色，配合黄色标线使用。"
  },
  {
    id: "rm12", category: "road_markings", type: "text",
    question: "路面上的减速让行线是什么样子的？",
    options: [
      "两条平行的白色虚线（倒三角排列）",
      "一条白色实线",
      "黄色锯齿线",
      "红色波浪线",
    ],
    answer: 0,
    explanation: "减速让行线由两条平行的白色虚线组成，配合倒三角让字标志。"
  },
  {
    id: "tl01", category: "traffic_lights", type: "text",
    question: "红灯亮时，右转车辆能否通行？",
    options: [
      "一律禁止右转",
      "在不妨碍被放行车辆和行人的情况下，可以右转（除非有禁止右转标志）",
      "任何时候都可以右转",
      "只有公交车可以右转",
    ],
    answer: 1,
    explanation: "红灯亮时，右转车辆在不妨碍被放行车辆和行人通行的情况下可以右转。"
  },
  {
    id: "tl02", category: "traffic_lights", type: "text",
    question: "黄灯持续闪烁的路口，车辆应如何通行？",
    options: [
      "加速通过",
      "减速慢行，确认安全后通过",
      "必须停车等待",
      "视为绿灯通行",
    ],
    answer: 1,
    explanation: "持续闪烁的黄灯是警示信号，表示路口无信号灯控制或信号灯故障。"
  },
  {
    id: "tl03", category: "traffic_lights", type: "text",
    question: "箭头信号灯和圆形信号灯同时亮起，应该按哪个走？",
    options: [
      "按圆形信号灯",
      "按箭头信号灯（车道专用信号）",
      "两者取较严格的",
      "按路面标线",
    ],
    answer: 1,
    explanation: "箭头信号灯是车道专用信号，优先级高于圆形信号灯。"
  },
  {
    id: "tl04", category: "traffic_lights", type: "text",
    question: "黄灯亮时，已越过停止线的车辆应该怎么做？",
    options: [
      "立即倒车退回",
      "停在线内",
      "继续通行",
      "鸣喇叭警示",
    ],
    answer: 2,
    explanation: "黄灯亮时，已越过停止线的车辆可以继续通行；未越过的应当停车。"
  },
  {
    id: "tl05", category: "traffic_lights", type: "text",
    question: "机动车在路口遇红灯，能否看手机？",
    options: [
      "可以，等红灯时允许",
      "不可以，等红灯时同样禁止使用手机",
      "可以用蓝牙耳机通话",
      "只有出租车司机可以",
    ],
    answer: 1,
    explanation: "等红灯时车辆仍处于行驶状态，使用手机属于妨碍安全驾驶的行为。"
  },
  {
    id: "tl06", category: "traffic_lights", type: "text",
    question: "在无交通信号灯的T型交叉路口，直行车辆和转弯车辆谁优先？",
    options: [
      "直行优先",
      "转弯优先",
      "右侧来车优先",
      "大型车辆优先",
    ],
    answer: 2,
    explanation: "在无信号灯的路口，两车同时到达时，右侧来车优先通行权。"
  },
  {
    id: "tl07", category: "traffic_lights", type: "text",
    question: "以下哪种情况下，红灯时可以直行通过？",
    options: [
      "深夜没有其他车辆时",
      "任何情况下红灯都禁止直行",
      "紧急车辆可以",
      "有交警指挥直行时",
    ],
    answer: 3,
    explanation: "红灯时禁止直行。唯一例外：交警指挥与信号灯不一致时，服从交警指挥。"
  },
  {
    id: "tl08", category: "traffic_lights", type: "text",
    question: "绿色箭头灯亮起时，对应车道的车辆应当怎么做？",
    options: [
      "减速缓慢通过",
      "按规定方向通过路口",
      "停车确认后再通过",
      "加速抢行通过",
    ],
    answer: 1,
    explanation: "绿色箭头灯亮时，准许对应车道车辆按箭头指示方向通过路口。"
  },
  {
    id: "tl09", category: "traffic_lights", type: "text",
    question: "右转车辆在转弯时需要避让哪些交通参与者？",
    options: [
      "只需要避让直行机动车",
      "需要避让直行机动车、非机动车和行人",
      "不需要避让任何人",
      "只需要避让行人",
    ],
    answer: 1,
    explanation: "右转车辆应避让直行机动车、直行非机动车以及正在通过人行横道的行人。"
  },
  {
    id: "tl10", category: "traffic_lights", type: "text",
    question: "机动车通过环岛时，出环岛需要打什么灯？",
    options: [
      "左转向灯",
      "右转向灯",
      "双闪灯",
      "不需要打灯",
    ],
    answer: 1,
    explanation: "驶出环岛前应开启右转向灯。进入环岛的车辆应让行环岛内正在行驶的车辆。"
  },
  {
    id: "rw01", category: "right_of_way", type: "text",
    question: "在没有交通信号灯的十字路口，两车同时到达，谁优先通行？",
    options: [
      "左侧来车优先",
      "右侧来车优先",
      "直行车辆优先",
      "大型车辆优先",
    ],
    answer: 1,
    explanation: "无信号灯路口，两车同时到达时，右侧来车优先通行。这是让右原则。"
  },
  {
    id: "rw02", category: "right_of_way", type: "text",
    question: "转弯车辆和直行车辆同时放行时，谁优先？",
    options: [
      "转弯优先",
      "直行优先",
      "左侧车辆优先",
      "谁先到谁优先",
    ],
    answer: 1,
    explanation: "转弯让直行是基本原则。无论左转还是右转，都必须让行直行车辆。"
  },
  {
    id: "rw03", category: "right_of_way", type: "text",
    question: "两辆左转车在路口相遇，谁应该让行？",
    options: [
      "相对方向左转，各自靠右行驶，互不影响",
      "右方车辆让左方车辆",
      "大型车让小型车",
      "后车让前车",
    ],
    answer: 0,
    explanation: "相对方向的两辆左转车在路口各自靠右行驶，互不干扰。"
  },
  {
    id: "rw04", category: "right_of_way", type: "text",
    question: "从支路（小路）驶入干路（大路）时，应该怎么做？",
    options: [
      "加速驶入",
      "减速或停车让干路车辆先行",
      "鸣喇叭示意后驶入",
      "开启双闪灯驶入",
    ],
    answer: 1,
    explanation: "支路让干路是基本规则，应减速或停车观察后驶入。"
  },
  {
    id: "rw05", category: "right_of_way", type: "text",
    question: "环岛内行驶的车辆与进入环岛的车辆，谁有优先通行权？",
    options: [
      "进入环岛的车辆优先",
      "环岛内行驶的车辆优先",
      "谁先到谁优先",
      "大型车辆优先",
    ],
    answer: 1,
    explanation: "环岛内行驶的车辆拥有优先通行权。进入环岛前应减速让行。"
  },
  {
    id: "rw06", category: "right_of_way", type: "text",
    question: "在没有信号灯的铁路道口，应该怎么做？",
    options: [
      "加速通过",
      "一停二看三通过",
      "鸣喇叭后通过",
      "按正常速度通过",
    ],
    answer: 1,
    explanation: "通过无人看守铁路道口必须一停、二看、三通过。"
  },
  {
    id: "rw07", category: "right_of_way", type: "text",
    question: "跟车通过人行横道时，前车突然减速，你应该怎么做？",
    options: [
      "鸣喇叭催促",
      "立即变道超越",
      "跟随减速并做好停车准备",
      "加速从右侧超车",
    ],
    answer: 2,
    explanation: "前车在人行横道前减速很可能是避让行人，应跟随减速，不要超车。"
  },
  {
    id: "rw08", category: "right_of_way", type: "text",
    question: "夜间在没有交通信号灯的路口会车时，应该怎么做？",
    options: [
      "使用远光灯确保视野",
      "150米外改用近光灯",
      "关闭所有灯光",
      "加速通过",
    ],
    answer: 1,
    explanation: "夜间会车时应在距对向来车150米外改用近光灯。"
  },
  {
    id: "rw09", category: "right_of_way", type: "text",
    question: "上坡车辆和下坡车辆在狭窄坡道上会车，谁应该让行？",
    options: [
      "上坡让下坡",
      "下坡让上坡",
      "同时通过",
      "谁先到谁先过",
    ],
    answer: 1,
    explanation: "坡道会车时，下坡车应让上坡车先行。"
  },
  {
    id: "rw10", category: "right_of_way", type: "text",
    question: "遇到救护车、消防车、警车鸣笛时，你应该怎么做？",
    options: [
      "加速行驶让出路来",
      "立即靠边停车让行",
      "在确保安全的前提下靠边减速让行",
      "不理它继续开",
    ],
    answer: 2,
    explanation: "遇到特种车辆执行紧急任务，应在确保安全的前提下靠边减速或停车让行。"
  },
  {
    id: "sl01", category: "speed_limits", type: "text",
    question: "在没有限速标志的城市道路上，最高行驶速度是多少？",
    options: [
      "30km/h",
      "40km/h",
      "50km/h",
      "60km/h",
    ],
    answer: 2,
    explanation: "在没有限速标志标线的城市道路上，最高行驶速度为50km/h。"
  },
  {
    id: "sl02", category: "speed_limits", type: "text",
    question: "在没有限速标志的公路（非城市道路）上，最高行驶速度是多少？",
    options: [
      "50km/h",
      "60km/h",
      "70km/h",
      "80km/h",
    ],
    answer: 2,
    explanation: "在没有限速标志标线的公路上，最高行驶速度为70km/h。"
  },
  {
    id: "sl03", category: "speed_limits", type: "text",
    question: "中国高速公路的最高限速是多少？",
    options: [
      "100km/h",
      "110km/h",
      "120km/h",
      "130km/h",
    ],
    answer: 2,
    explanation: "中国高速公路最高限速为120km/h。小型载客汽车最高120km/h，其他机动车不超过100km/h。"
  },
  {
    id: "sl04", category: "speed_limits", type: "text",
    question: "高速公路的最低限速是多少？",
    options: [
      "40km/h",
      "50km/h",
      "60km/h",
      "80km/h",
    ],
    answer: 2,
    explanation: "高速公路最低限速为60km/h。低于最低限速行驶同样属于违法行为。"
  },
  {
    id: "sl05", category: "speed_limits", type: "text",
    question: "能见度低于200米时，高速公路最高车速不得超过多少？",
    options: [
      "40km/h",
      "50km/h",
      "60km/h",
      "80km/h",
    ],
    answer: 2,
    explanation: "能见度低于200米时，最高车速不得超过60km/h，开启雾灯、近光灯、示廓灯。"
  },
  {
    id: "sl06", category: "speed_limits", type: "text",
    question: "能见度低于50米时，高速公路最高车速不得超过多少？",
    options: [
      "20km/h",
      "30km/h",
      "40km/h",
      "50km/h",
    ],
    answer: 0,
    explanation: "能见度低于50米时，最高车速不得超过20km/h，尽快驶离高速或到服务区等候。"
  },
  {
    id: "sl07", category: "speed_limits", type: "text",
    question: "通过铁路道口、急弯路、窄路、窄桥时，最高车速不得超过多少？",
    options: [
      "20km/h",
      "30km/h",
      "40km/h",
      "50km/h",
    ],
    answer: 1,
    explanation: "机动车通过铁路道口、急弯路、窄桥、隧道、掉头、转弯、下陡坡时，最高速度不超过30km/h。"
  },
  {
    id: "sl08", category: "speed_limits", type: "text",
    question: "雨雪天气在普通公路上行驶，车速应比正常天气降低多少？",
    options: [
      "降低10%-20%",
      "降低20%-30%",
      "降低30%-50%",
      "不需要降低",
    ],
    answer: 1,
    explanation: "雨雪天气路面附着力下降，建议车速降低20%-30%，保持更大跟车距离。"
  },
  {
    id: "sl09", category: "speed_limits", type: "text",
    question: "进出非机动车道、通过铁路道口时，车速应在什么范围？",
    options: [
      "最高30km/h",
      "最高50km/h",
      "最高60km/h",
      "没有限制",
    ],
    answer: 0,
    explanation: "进出非机动车道、通过铁路道口、急弯路等复杂路段，最高速度均不超过30km/h。"
  },
  {
    id: "sl10", category: "speed_limits", type: "text",
    question: "以下哪个车速-能见度-跟车距离的对应关系是正确的？",
    options: [
      "能见度小于200m，车速不超过60km/h，跟车至少100m",
      "能见度小于100m，车速不超过50km/h，跟车至少80m",
      "能见度小于50m，车速不超过40km/h，跟车至少60m",
      "能见度小于200m，车速不超过80km/h，跟车至少80m",
    ],
    answer: 0,
    explanation: "正确：小于200m时不超过60km/h，跟车至少100m；小于100m时不超过40km/h，跟车至少50m。"
  },
  {
    id: "dp01", category: "demerit_points", type: "text",
    question: "根据2022年新版记分规则，一次记12分的行为不包括以下哪项？",
    options: [
      "饮酒后驾驶机动车",
      "造成致人轻伤或死亡后逃逸",
      "使用伪造变造的号牌",
      "驾驶机动车违反禁令标志",
    ],
    answer: 3,
    explanation: "违反禁令标志一次记1分。酒驾、逃逸、伪造号牌均一次记12分。"
  },
  {
    id: "dp02", category: "demerit_points", type: "text",
    question: "驾驶机动车在城市快速路上违法停车的，一次记多少分？",
    options: [
      "3分",
      "6分",
      "9分",
      "12分",
    ],
    answer: 2,
    explanation: "2022年新规：在高速公路或城市快速路上违法停车，一次记9分（此前为12分）。"
  },
  {
    id: "dp03", category: "demerit_points", type: "text",
    question: "驾驶机动车闯红灯的，一次记多少分？",
    options: [
      "3分",
      "6分",
      "9分",
      "12分",
    ],
    answer: 1,
    explanation: "闯红灯一次记6分，罚款200元。黄灯时已越过停止线的可以继续通行。"
  },
  {
    id: "dp04", category: "demerit_points", type: "text",
    question: "高速公路上倒车、逆行、穿越中央分隔带掉头的，一次记多少分？",
    options: [
      "6分",
      "9分",
      "12分",
      "吊销驾照",
    ],
    answer: 2,
    explanation: "高速公路上倒车、逆行、掉头，一次记12分！错过出口只能继续前行。"
  },
  {
    id: "dp05", category: "demerit_points", type: "text",
    question: "驾驶机动车时拨打接听手持电话，一次记多少分？",
    options: [
      "1分",
      "2分",
      "3分",
      "6分",
    ],
    answer: 2,
    explanation: "2022年新规：驾驶时拨打接听手持电话，一次记3分（此前为2分）。"
  },
  {
    id: "dp06", category: "demerit_points", type: "text",
    question: "机动车驾驶人未系安全带的，一次记多少分？",
    options: [
      "1分",
      "3分",
      "6分",
      "不记分，只罚款",
    ],
    answer: 0,
    explanation: "驾驶机动车未系安全带一次记1分，并处罚款。无论前排后排都应系好。"
  },
  {
    id: "dp07", category: "demerit_points", type: "text",
    question: "一个记分周期是多久？",
    options: [
      "6个月",
      "12个月",
      "18个月",
      "24个月",
    ],
    answer: 1,
    explanation: "道路交通安全违法行为累积记分周期为12个月，满分为12分。"
  },
  {
    id: "dp08", category: "demerit_points", type: "text",
    question: "驾驶与准驾车型不符的机动车，一次记多少分？",
    options: [
      "3分",
      "6分",
      "9分",
      "12分",
    ],
    answer: 2,
    explanation: "2022年新规：驾驶与准驾车型不符的机动车，一次记9分（此前为12分）。"
  },
  {
    id: "dp09", category: "demerit_points", type: "text",
    question: "一个记分周期内累积记分达到12分的，会有什么后果？",
    options: [
      "只需缴纳罚款即可",
      "扣留驾驶证，参加满分学习和考试",
      "直接吊销驾照",
      "只需要重新体检",
    ],
    answer: 1,
    explanation: "记分达到12分，扣留驾驶证，需参加7天学习并通过科目一考试后方可恢复。"
  },
  {
    id: "dp10", category: "demerit_points", type: "text",
    question: "代替他人接受交通违法处罚和记分牟利的，一次记多少分？",
    options: [
      "6分",
      "9分",
      "12分",
      "吊销驾照并追究刑事责任",
    ],
    answer: 2,
    explanation: "2022新规：买分卖分一次记12分。"
  },
  {
    id: "dp11", category: "demerit_points", type: "text",
    question: "在普通道路上不按规定倒车、掉头的，一次记多少分？",
    options: [
      "1分",
      "3分",
      "6分",
      "12分",
    ],
    answer: 0,
    explanation: "2022新规：普通道路不按规定倒车掉头，一次记1分（此前为3分）。高速公路上仍记12分。"
  },
  {
    id: "dp12", category: "demerit_points", type: "text",
    question: "驾驶校车、公路客运汽车超员20%以上，一次记多少分？",
    options: [
      "6分",
      "9分",
      "12分",
      "直接吊销驾照",
    ],
    answer: 2,
    explanation: "校车、客运车辆超员20%以上一次记12分。"
  },
  {
    id: "ew01", category: "expressway", type: "text",
    question: "在高速公路上，车速超过100km/h时，与前车应保持多少米以上距离？",
    options: [
      "50米",
      "80米",
      "100米",
      "150米",
    ],
    answer: 2,
    explanation: "车速超过100km/h时，安全跟车距离应在100米以上。低于100km/h时不少于50米。"
  },
  {
    id: "ew02", category: "expressway", type: "text",
    question: "机动车在高速公路上发生故障时，警告标志应放在车后多少米处？",
    options: [
      "50米",
      "100米",
      "150米",
      "200米",
    ],
    answer: 2,
    explanation: "高速公路上应在车后150米外放置三角警示牌（普通道路为50-100米）。"
  },
  {
    id: "ew03", category: "expressway", type: "text",
    question: "高速公路上，以下哪种行为是合法的？",
    options: [
      "在最左侧车道以60km/h行驶",
      "从右侧应急车道超车",
      "在出口匝道前提前变到最右侧车道",
      "倒车回到错过的出口",
    ],
    answer: 2,
    explanation: "高速公路出口前1-2公里应提前变至最右侧车道。应急车道严禁超车，错过出口严禁倒车。"
  },
  {
    id: "ew04", category: "expressway", type: "text",
    question: "车辆在高速公路上出现故障，能否在行车道上停车检查？",
    options: [
      "可以，只要开启双闪",
      "绝对不可以，必须移至应急车道或服务区",
      "可以短暂停车",
      "白天可以，晚上不行",
    ],
    answer: 1,
    explanation: "高速公路上绝对禁止在行车道上停车。应移至应急车道或驶入最近的服务区。"
  },
  {
    id: "ew05", category: "expressway", type: "text",
    question: "从高速公路匝道进入主路时，应该怎么做？",
    options: [
      "直接切入主路",
      "在加速车道提速至60km/h以上，观察左后方，打左转灯汇入",
      "停车等待主路无车后再进入",
      "开启双闪灯进入",
    ],
    answer: 1,
    explanation: "进入高速主路前应在加速车道提速至与主路车流接近，确认安全后打左转向灯汇入。"
  },
  {
    id: "ew06", category: "expressway", type: "text",
    question: "连续驾驶多长时间后应到服务区休息？",
    options: [
      "连续驾驶3小时，休息10分钟",
      "连续驾驶2小时（或感到疲劳时），休息15-20分钟",
      "连续驾驶4小时，休息5分钟",
      "连续驾驶5小时，休息30分钟",
    ],
    answer: 1,
    explanation: "建议连续驾驶不超过2小时就应休息。疲劳征兆：打哈欠、视线模糊、记忆模糊。"
  },
  {
    id: "ew07", category: "expressway", type: "text",
    question: "高速公路上夜间行驶，前面没有车，应该用什么灯光？",
    options: [
      "使用远光灯",
      "必须始终使用近光灯",
      "关闭所有灯光",
      "交替使用远光和近光",
    ],
    answer: 0,
    explanation: "高速公路上夜间前方和对向均无车辆时可使用远光灯。跟车或会车时应改用近光灯。"
  },
  {
    id: "ew08", category: "expressway", type: "text",
    question: "在高速公路上遇到横风时，应该怎么做？",
    options: [
      "加速通过",
      "紧握方向盘，适当降低车速",
      "急刹车停车",
      "打开车窗减小阻力",
    ],
    answer: 1,
    explanation: "横风会使车辆突然偏离方向。应双手紧握方向盘，适当减速，不要急打方向或急刹车。"
  },
  {
    id: "ew09", category: "expressway", type: "text",
    question: "高速公路收费站前，车辆应如何通行？",
    options: [
      "随意变道选最短队伍",
      "按车道指示标志有序排队",
      "从ETC车道逆行退出",
      "加速抢行通过",
    ],
    answer: 1,
    explanation: "收费站前应按车道标志有序排队。ETC车辆走ETC专用车道。"
  },
  {
    id: "ew10", category: "expressway", type: "text",
    question: "双向四车道的高速公路，同方向有几条车道？",
    options: [
      "1条",
      "2条",
      "3条",
      "4条",
    ],
    answer: 1,
    explanation: "双向四车道指两个方向各有两条车道。左侧为快车道/超车道，右侧为行车道。"
  },
  {
    id: "pn01", category: "penalties", type: "text",
    question: "饮酒后驾驶机动车（酒驾）的处罚标准是什么？",
    options: [
      "暂扣6个月驾驶证+罚款1000-2000元",
      "直接吊销驾驶证",
      "只需罚款500元",
      "没有处罚",
    ],
    answer: 0,
    explanation: "酒驾（血液酒精含量20-80mg/100ml）：暂扣6个月驾驶证，并处1000-2000元罚款。"
  },
  {
    id: "pn02", category: "penalties", type: "text",
    question: "醉酒驾驶机动车（醉驾）会面临什么处罚？",
    options: [
      "仅罚款",
      "吊销驾驶证+追究刑事责任+5年内不得重考",
      "暂扣驾驶证3个月",
      "记12分即可",
    ],
    answer: 1,
    explanation: "醉驾入刑：吊销驾驶证，依法追究刑事责任（拘役1-6个月并处罚金），5年内不得重考。"
  },
  {
    id: "pn03", category: "penalties", type: "text",
    question: "造成交通事故后逃逸，尚不构成犯罪的，处罚是什么？",
    options: [
      "记12分+罚款+可并处15日以下拘留",
      "仅记6分",
      "仅罚款",
      "吊销驾驶证",
    ],
    answer: 0,
    explanation: "事故后逃逸：记12分，罚款200-2000元，可并处15日以下拘留。构成犯罪的终生禁驾。"
  },
  {
    id: "pn04", category: "penalties", type: "text",
    question: "伪造、变造机动车号牌的，会面临什么处罚？",
    options: [
      "仅罚款500元",
      "扣留车辆+15日以下拘留+罚款2000-5000元+记12分",
      "仅记6分",
      "警告处分",
    ],
    answer: 1,
    explanation: "伪造变造号牌：扣留车辆，处15日以下拘留，罚款2000-5000元，记12分。"
  },
  {
    id: "pn05", category: "penalties", type: "text",
    question: "无证驾驶的处罚是什么？",
    options: [
      "罚款200-2000元+可并处15日以下拘留",
      "仅警告",
      "仅罚款50元",
      "记12分即可",
    ],
    answer: 0,
    explanation: "无证驾驶：处200-2000元罚款，可并处15日以下拘留。"
  },
  {
    id: "pn06", category: "penalties", type: "text",
    question: "把机动车交给无证人员驾驶的，车主会面临什么处罚？",
    options: [
      "没有处罚",
      "罚款200-2000元+可并处吊销驾驶证",
      "仅口头警告",
      "仅记6分",
    ],
    answer: 1,
    explanation: "将车交给无证人员驾驶：处200-2000元罚款，可并处吊销驾驶证。"
  },
  {
    id: "pn07", category: "penalties", type: "text",
    question: "超速50%以上的处罚是什么？",
    options: [
      "仅罚款",
      "记12分+罚款+可并处吊销驾驶证",
      "仅记6分",
      "口头警告",
    ],
    answer: 1,
    explanation: "超过规定时速50%以上：一次记12分，并处罚款，可并处吊销驾驶证。"
  },
  {
    id: "pn08", category: "penalties", type: "text",
    question: "驾驶拼装车或报废车上路，会面临什么处罚？",
    options: [
      "罚款500元",
      "强制报废+吊销驾驶证+罚款200-2000元",
      "记12分",
      "警告",
    ],
    answer: 1,
    explanation: "驾驶拼装车或报废车：收缴、强制报废，罚款200-2000元，吊销驾驶证。"
  },
  {
    id: "pn09", category: "penalties", type: "text",
    question: "吸食、注射毒品后驾驶机动车的，处罚是什么？",
    options: [
      "仅罚款",
      "注销驾驶证",
      "记12分",
      "吊销驾驶证+移交公安机关处理",
    ],
    answer: 3,
    explanation: "毒驾：注销驾驶证，移交公安机关处理。吸毒人员3年内不得申领驾驶证。"
  },
  {
    id: "pn10", category: "penalties", type: "text",
    question: "故意遮挡、污损机动车号牌的，一次记多少分？",
    options: [
      "3分",
      "6分",
      "9分",
      "12分",
    ],
    answer: 2,
    explanation: "2022年新规：故意遮挡或污损号牌，一次记9分（此前为12分），罚款200元。"
  },
  {
    id: "sf01", category: "safety", type: "text",
    question: "车辆在高速行驶中突然爆胎，正确的做法是什么？",
    options: [
      "急踩刹车",
      "紧握方向盘，松油门，利用发动机制动减速，稳定后将车移至安全地带",
      "猛打方向靠边",
      "立即拉手刹",
    ],
    answer: 1,
    explanation: "爆胎时切忌急刹车和猛打方向。紧握方向盘，缓松油门自然减速。"
  },
  {
    id: "sf02", category: "safety", type: "text",
    question: "涉水行驶时发动机突然熄火，应该怎么做？",
    options: [
      "立即重新启动发动机",
      "不要重新启动，下车将车推出积水区或等待救援",
      "加速冲过去",
      "打开引擎盖检查",
    ],
    answer: 1,
    explanation: "涉水熄火后千万不要重新启动！否则会导致发动机严重损坏（顶缸）。"
  },
  {
    id: "sf03", category: "safety", type: "text",
    question: "行车中刹车突然失灵，正确的处理方法是什么？",
    options: [
      "拉手刹急停",
      "抢挂低档利用发动机制动+间歇拉手刹+利用障碍物摩擦停车",
      "关闭发动机",
      "跳车逃生",
    ],
    answer: 1,
    explanation: "刹车失灵：松油门，抢挂低速挡；间歇拉手刹（不要一次拉死）；必要时利用护栏摩擦减速。"
  },
  {
    id: "sf04", category: "safety", type: "text",
    question: "关于儿童乘车安全，以下哪项是正确的？",
    options: [
      "幼儿可以由成人抱着坐副驾驶",
      "12岁以下儿童应使用安全座椅，不应坐副驾驶",
      "儿童系成人安全带即可",
      "儿童可以直接坐后排",
    ],
    answer: 1,
    explanation: "12岁以下儿童应使用安全座椅，且不应坐副驾驶位置。成人安全带不适合儿童体型。"
  },
  {
    id: "sf05", category: "safety", type: "text",
    question: "行车中遇到前方有动物突然冲出，应该怎么做？",
    options: [
      "急打方向避让",
      "紧握方向盘，踩刹车减速（不要急打方向）",
      "加速通过",
      "鸣喇叭驱赶",
    ],
    answer: 1,
    explanation: "遇到动物突然冲出不要急打方向！可能导致车辆失控。应刹车减速。"
  },
  {
    id: "sf06", category: "safety", type: "text",
    question: "ABS（防抱死制动系统）的作用是什么？",
    options: [
      "缩短刹车距离",
      "在紧急制动时防止车轮抱死，保持转向能力",
      "增加发动机马力",
      "自动避让障碍物",
    ],
    answer: 1,
    explanation: "ABS防止车轮抱死，让驾驶员在全力刹车的同时仍能转向避让。"
  },
  {
    id: "sf07", category: "safety", type: "text",
    question: "夜间行车时，以下哪种做法是正确的？",
    options: [
      "始终使用远光灯",
      "无照明路段用远光，会车时150米外改用近光",
      "只开示廓灯省电",
      "紧跟前车利用其灯光",
    ],
    answer: 1,
    explanation: "夜间：无照明可用远光，会车150米外改近光，跟车用近光。"
  },
  {
    id: "sf08", category: "safety", type: "text",
    question: "安全带最重要的作用是什么？",
    options: [
      "避免被罚款",
      "发生碰撞时减少50%以上伤亡",
      "让坐姿更舒适",
      "安全带是多余的",
    ],
    answer: 1,
    explanation: "安全带是车辆被动安全系统中最重要的保护装置，可减少50%以上死亡风险。"
  },
  {
    id: "sf09", category: "safety", type: "text",
    question: "在高速公路上遇前方堵车停在队伍最后方时，应怎么做？",
    options: [
      "关闭发动机玩手机",
      "开启双闪灯，时刻观察后视镜警惕后方来车追尾",
      "下车散步",
      "倒车退出",
    ],
    answer: 1,
    explanation: "高速公路排队尾部最危险。应开启双闪警示后车，时刻观察后视镜。"
  },
  {
    id: "sf10", category: "safety", type: "text",
    question: "大风天气行车，以下哪项是正确的做法？",
    options: [
      "加速通过",
      "降低车速，紧握方向盘，注意横风，远离大型车辆",
      "打开所有车窗减少风阻",
      "紧跟前车利用其挡风",
    ],
    answer: 1,
    explanation: "大风天气应降低车速，双手紧握方向盘，远离大型车辆。"
  },
  {
    id: "sf11", category: "safety", type: "text",
    question: "发动机舱冒烟或有焦味时，正确的做法是什么？",
    options: [
      "立即打开引擎盖检查",
      "立即靠边停车熄火，远离车辆，在安全距离外观察并报警",
      "加速行驶到维修厂",
      "浇水降温",
    ],
    answer: 1,
    explanation: "发动机舱冒烟应停车熄火，不要打开引擎盖（新鲜空气可能引发明火），远离并报警。"
  },
  {
    id: "sf12", category: "safety", type: "text",
    question: "车辆落水后，正确的自救顺序是什么？",
    options: [
      "立即打开车门逃生",
      "解开安全带→尝试打开车窗/天窗逃生→如无法打开，用安全锤砸侧窗玻璃四角→爬出",
      "等待救援",
      "关闭所有车窗等待车内充满水",
    ],
    answer: 1,
    explanation: "车辆落水后不要尝试开车门（水压太大）。解开安全带，开车窗/天窗逃生，或用安全锤砸侧窗四角。"
  },
];