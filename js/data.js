// ============================================
//   交通标志数据
//   GB 5768 中国道路交通标志
// ============================================

const CATEGORIES = {
  warning:    { id: "warning",    name: "警告标志", icon: "⚠️", color: "#FFD200" },
  prohibition:{ id: "prohibition", name: "禁令标志", icon: "🚫", color: "#E60012" },
  mandatory:  { id: "mandatory",   name: "指示标志", icon: "🔵", color: "#0066CC" },
  guide:      { id: "guide",       name: "指路标志", icon: "🧭", color: "#0066CC" },
  auxiliary:  { id: "auxiliary",   name: "辅助标志", icon: "ℹ️", color: "#FFFFFF" },
  hand_signals:{ id: "hand_signals",name: "👮 交警手势", icon: "👮", color: "#1a237e" },
};

const TRAFFIC_SIGNS = [

  // ========== 警告标志 Warning Signs ==========
  {
    id: "w01", category: "warning", name: "急弯",
    img: "img/signs/w01.png",
    description: "警告前方道路有急弯（向左或向右），车速较快时容易失控，应提前减速慢行，靠右行驶。",
    tip: "入弯前充分减速至30km/h以下，弯道中避免急刹车，防止侧滑或甩尾。",
    tags: ["急弯", "弯道", "减速"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M35,60 L35,42 Q35,20 65,30" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <polygon points="62,24 72,30 70,36" fill="#111"/>
    </svg>`
  },
  {
    id: "w02", category: "warning", name: "反向急弯",
    img: "img/signs/w02.png",
    description: "警告前方有两个方向相反的急弯路段，需连续减速转弯，控制车速。",
    tip: "提前降速，第一个弯过后不要急于加速，紧接着就是反向弯道。",
    tags: ["反向急弯", "连续弯道"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M30,50 L30,35 Q30,18 42,25" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <polygon points="37,19 44,28 41,32" fill="#111"/>
      <path d="M55,40 L55,25 Q70,15 72,30" fill="none" stroke="#111" stroke-width="4" stroke-linecap="round"/>
      <polygon points="74,24 68,27 76,35" fill="#111"/>
    </svg>`
  },
  {
    id: "w03", category: "warning", name: "连续急弯",
    img: "img/signs/w03.png",
    description: "警告前方有连续三个以上的急弯路段，路况复杂，需全程保持低速行驶。",
    tip: "连续弯道中保持匀速低速（20-30km/h），不要频繁加减速，注意观察对向来车。",
    tags: ["连续急弯", "多弯"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M25,52 L25,38 Q25,22 38,30" fill="none" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="33,26 40,33 37,37" fill="#111"/>
      <path d="M50,48 L50,33 Q50,20 63,27" fill="none" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="58,23 65,30 62,34" fill="#111"/>
      <path d="M67,44 L67,30 Q80,18 78,33" fill="none" stroke="#111" stroke-width="3.5" stroke-linecap="round"/>
      <polygon points="80,27 74,30 82,38" fill="#111"/>
    </svg>`
  },
  {
    id: "w04", category: "warning", name: "陡坡",
    img: "img/signs/w04.png",
    description: "警告前方有陡峭的上坡或下坡路段，上坡需保持动力，下坡需控制车速防止刹车过热。",
    tip: "下陡坡时使用发动机制动（低挡位），避免长时间踩刹车导致刹车失灵。",
    tags: ["陡坡", "上坡", "下坡"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="30" y="30" width="40" height="18" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <rect x="36" y="24" width="28" height="8" rx="1" fill="none" stroke="#111" stroke-width="2.5"/>
      <circle cx="38" cy="52" r="4" fill="#111"/>
      <circle cx="62" cy="52" r="4" fill="#111"/>
      <path d="M25,45 L75,28" stroke="#111" stroke-width="2.5"/>
      <polygon points="72,22 78,28 74,33" fill="#111"/>
    </svg>`
  },
  {
    id: "w05", category: "warning", name: "连续下坡",
    img: "img/signs/w05.png",
    description: "警告前方为连续下坡路段，长距离下坡容易导致刹车过热失效，应使用低挡位控制车速。",
    tip: "长下坡前检查刹车系统，行驶中使用发动机制动，每隔一段时间停车让刹车冷却。",
    tags: ["连续下坡", "长下坡", "刹车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="30" y="22" width="40" height="18" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <circle cx="38" cy="43" r="3.5" fill="#111"/>
      <circle cx="62" cy="43" r="3.5" fill="#111"/>
      <path d="M22,48 L42,38 L62,48 L78,38" stroke="#111" stroke-width="2.5" fill="none"/>
      <polygon points="75,33 81,39 77,43" fill="#111"/>
    </svg>`
  },
  {
    id: "w06", category: "warning", name: "注意行人",
    img: "img/signs/w06.png",
    description: "警告前方路段常有行人横穿马路，多设置在人行横道、学校、居民区附近，应减速并注意避让。",
    tip: "人行横道前必须减速，行人正在通过时必须停车让行，不可抢行。",
    tags: ["行人", "人行横道", "避让"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="50" cy="28" r="6" fill="#111"/>
      <line x1="50" y1="34" x2="50" y2="52" stroke="#111" stroke-width="3"/>
      <line x1="42" y1="42" x2="58" y2="42" stroke="#111" stroke-width="2.5"/>
      <line x1="50" y1="52" x2="40" y2="66" stroke="#111" stroke-width="2.5"/>
      <line x1="50" y1="52" x2="60" y2="66" stroke="#111" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "w07", category: "warning", name: "注意儿童",
    img: "img/signs/w07.png",
    description: "警告前方区域常有儿童出现（如学校、幼儿园附近），驾驶员应高度警惕，减速慢行，随时准备停车。",
    tip: "儿童行为不可预测，可能突然冲出马路，在学校区域车速不要超过30km/h。",
    tags: ["儿童", "学校", "幼儿园"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="44" cy="30" r="6" fill="#111"/>
      <circle cx="56" cy="30" r="5.5" fill="#111"/>
      <line x1="44" y1="36" x2="40" y2="52" stroke="#111" stroke-width="2.5"/>
      <line x1="44" y1="36" x2="48" y2="52" stroke="#111" stroke-width="2.5"/>
      <line x1="56" y1="36" x2="52" y2="50" stroke="#111" stroke-width="2.5"/>
      <line x1="56" y1="36" x2="60" y2="50" stroke="#111" stroke-width="2.5"/>
      <line x1="40" y1="52" x2="36" y2="64" stroke="#111" stroke-width="2.5"/>
      <line x1="48" y1="52" x2="44" y2="64" stroke="#111" stroke-width="2.5"/>
      <line x1="52" y1="50" x2="48" y2="62" stroke="#111" stroke-width="2.5"/>
      <line x1="60" y1="50" x2="56" y2="62" stroke="#111" stroke-width="2.5"/>
      <line x1="42" y1="42" x2="60" y2="42" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w08", category: "warning", name: "注意落石",
    img: "img/signs/w08.png",
    description: "警告前方路段有落石危险，常见于山区公路、采石场附近，应观察山体情况后快速通过。",
    tip: "通过落石路段时注意观察上方山体，不要逗留，快速通过。如遇落石，注意避让。",
    tags: ["落石", "山体滑坡", "山区"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M15,60 L30,30 L50,15 L70,30 L85,60 Z" fill="none" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="42" cy="40" r="4" fill="#111"/>
      <circle cx="58" cy="48" r="5" fill="#111"/>
      <circle cx="35" cy="55" r="3.5" fill="#111"/>
      <circle cx="65" cy="38" r="3" fill="#111"/>
    </svg>`
  },
  {
    id: "w09", category: "warning", name: "注意横风",
    img: "img/signs/w09.png",
    description: "警告前方路段有强烈侧向风（横风），常见于桥梁、高架路、山口等开阔地带，应握紧方向盘。",
    tip: "横风会使车辆突然偏移方向，通过时双手紧握方向盘，适当降低车速。",
    tags: ["横风", "侧风", "桥梁"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="33" y="42" width="34" height="10" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <path d="M38,38 L42,22 L46,38" fill="#111"/>
      <path d="M46,38 L50,18 L54,38" fill="#111"/>
      <path d="M54,38 L58,20 L62,38" fill="#111"/>
      <line x1="25" y1="47" x2="30" y2="47" stroke="#111" stroke-width="2"/>
      <line x1="70" y1="47" x2="75" y2="47" stroke="#111" stroke-width="2"/>
      <line x1="40" y1="55" x2="45" y2="55" stroke="#111" stroke-width="2"/>
      <line x1="55" y1="55" x2="60" y2="55" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w10", category: "warning", name: "易滑",
    img: "img/signs/w10.png",
    description: "警告前方路面容易打滑，可能是积水、结冰、油污或砂石路面，应减速并避免急刹车和急打方向。",
    tip: "湿滑路面刹车距离是干燥路面的2-3倍，保持更大的跟车距离，避免急操作。",
    tags: ["易滑", "湿滑", "打滑"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="30" y="24" width="40" height="16" rx="3" fill="none" stroke="#111" stroke-width="2.5"/>
      <circle cx="38" cy="44" r="4" fill="#111"/>
      <circle cx="62" cy="44" r="4" fill="#111"/>
      <path d="M28,52 Q40,46 50,52 Q60,58 72,52" fill="none" stroke="#111" stroke-width="2.5" stroke-dasharray="3,2"/>
    </svg>`
  },
  {
    id: "w11", category: "warning", name: "傍山险路",
    img: "img/signs/w11.png",
    description: "警告前方路段倚靠山体修建，一侧是山壁一侧是悬崖，道路狭窄险峻，应靠山壁一侧减速慢行。",
    tip: "靠山体一侧行驶，留意对向来车，必要时在较宽处停车让行。",
    tags: ["傍山", "险路", "悬崖"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M10,70 L30,20 L60,15 L75,35" fill="none" stroke="#111" stroke-width="2.5"/>
      <path d="M10,70 L15,68 L30,22 L60,18 L68,35" fill="none" stroke="#111" stroke-width="1.5"/>
      <line x1="5" y1="68" x2="80" y2="68" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w12", category: "warning", name: "隧道",
    img: "img/signs/w12.png",
    description: "警告前方有隧道入口，进入隧道前应开启近光灯，减速慢行，隧道内禁止变道和超车。",
    tip: "进入隧道前摘下墨镜，开启近光灯（不是远光灯），隧道内严禁变道超车。",
    tags: ["隧道", "山路隧道", "开灯"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M20,22 Q20,10 50,10 Q80,10 80,22 L80,60 Q80,72 50,72 Q20,72 20,60 Z" fill="none" stroke="#111" stroke-width="2.5"/>
      <path d="M28,28 L72,28" stroke="#111" stroke-width="2"/>
      <rect x="32" y="34" width="36" height="22" rx="2" fill="none" stroke="#111" stroke-width="2"/>
      <line x1="42" y1="34" x2="42" y2="56" stroke="#111" stroke-width="2"/>
      <line x1="58" y1="34" x2="58" y2="56" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w13", category: "warning", name: "驼峰桥",
    img: "img/signs/w13.png",
    description: "警告前方有拱形桥（驼峰桥），桥面拱起较高会遮挡对向视线，应减速鸣笛，靠右行驶。",
    tip: "上桥前鸣笛警示对向来车，桥顶视线受阻不要超车。",
    tags: ["驼峰桥", "拱桥", "视线受阻"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M10,58 Q50,18 90,58" fill="none" stroke="#111" stroke-width="2.5"/>
      <rect x="30" y="22" width="20" height="12" rx="1" fill="#111"/>
      <rect x="60" y="22" width="15" height="12" rx="1" fill="#111"/>
    </svg>`
  },
  {
    id: "w14", category: "warning", name: "路面不平",
    img: "img/signs/w14.png",
    description: "警告前方路面凹凸不平，有坑槽或隆起，车辆通过时会产生颠簸，应减速通过避免损坏悬挂。",
    tip: "减速至20km/h以下通过颠簸路段，紧握方向盘防止方向跑偏。",
    tags: ["路面不平", "颠簸", "坑洼"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M18,44 L30,32 L42,44 L54,32 L66,44 L78,32" fill="none" stroke="#111" stroke-width="3" stroke-linecap="round"/>
      <rect x="36" y="24" width="28" height="8" rx="1" fill="none" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w15", category: "warning", name: "注意非机动车",
    img: "img/signs/w15.png",
    description: "警告前方路段常有非机动车（自行车、电动车等）通行，应注意观察并保持安全距离。",
    tip: "非机动车可能突然变向，超越非机动车时保持至少1.5米横向距离。",
    tags: ["非机动车", "自行车", "电动车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <circle cx="56" cy="50" r="12" fill="none" stroke="#111" stroke-width="2.5"/>
      <circle cx="56" cy="50" r="2" fill="#111"/>
      <line x1="56" y1="50" x2="56" y2="28" stroke="#111" stroke-width="2.5"/>
      <line x1="56" y1="28" x2="44" y2="38" stroke="#111" stroke-width="2.5"/>
      <line x1="56" y1="38" x2="68" y2="44" stroke="#111" stroke-width="2.5"/>
      <line x1="56" y1="50" x2="72" y2="62" stroke="#111" stroke-width="2.5"/>
      <line x1="56" y1="50" x2="40" y2="62" stroke="#111" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "w16", category: "warning", name: "事故易发路段",
    img: "img/signs/w16.png",
    description: "警告前方路段为交通事故多发点（黑点路段），通常是弯道、坡道、路口等复杂交通环境，应格外小心。",
    tip: "事故多发路段通常限速较低，严格遵循限速标志，保持警惕。",
    tags: ["事故", "黑点", "危险路段"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="33" y="26" width="34" height="16" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <rect x="42" y="20" width="16" height="8" rx="1" fill="none" stroke="#111" stroke-width="2"/>
      <path d="M25,48 L75,48" stroke="#111" stroke-width="2" stroke-dasharray="2,2"/>
      <path d="M30,60 L40,48 L50,60 L60,48 L70,60" fill="none" stroke="#111" stroke-width="2.5"/>
      <line x1="36" y1="50" x2="44" y2="58" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w17", category: "warning", name: "慢行",
    img: "img/signs/w17.png",
    description: "警告前方路况复杂，需要降低车速缓慢通过，常见于施工区域、繁华路段、交叉路口等。",
    tip: "看到慢行标志后，车速应降至20km/h以下，做好随时停车的准备。",
    tags: ["慢行", "减速", "缓行"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="50" y="58" text-anchor="middle" font-size="32" font-weight="bold" fill="#111" font-family="sans-serif">慢</text>
    </svg>`
  },
  {
    id: "w18", category: "warning", name: "注意危险",
    img: "img/signs/w18.png",
    description: "警告前方存在多种危险情况（除已有专门标志外的其他危险），应全面观察，减速谨慎通过。",
    tip: "这是一个综合警告标志，见到后应全方位观察路况，降低车速小心通过。",
    tags: ["危险", "综合警告"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <text x="50" y="60" text-anchor="middle" font-size="28" font-weight="900" fill="#111" font-family="sans-serif">!</text>
    </svg>`
  },
  {
    id: "w19", category: "warning", name: "施工",
    img: "img/signs/w19.png",
    description: "警告前方道路正在施工，可能有路障、施工车辆和人员，应减速慢行，服从指挥。",
    tip: "施工区域限速通常很低（20-30km/h），注意避让施工人员和车辆。",
    tags: ["施工", "修路", "道路作业"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="38" y="26" width="24" height="24" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <circle cx="50" cy="38" r="7" fill="none" stroke="#111" stroke-width="2.5"/>
      <path d="M44,60 L40,48 L60,48 L56,60" fill="#111"/>
      <rect x="22" y="46" width="8" height="14" rx="1" fill="none" stroke="#111" stroke-width="2"/>
      <rect x="70" y="46" width="8" height="14" rx="1" fill="none" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w20", category: "warning", name: "注意信号灯",
    img: "img/signs/w20.png",
    description: "警告前方路口设有交通信号灯（红绿灯），应注意观察信号灯变化，提前做好停车或通行准备。",
    tip: "信号灯路口提前减速，黄灯时已越过停止线的可以继续通行，未越过的应停车。",
    tags: ["信号灯", "红绿灯", "路口"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="38" y="14" width="24" height="50" rx="4" fill="#111"/>
      <circle cx="50" cy="28" r="7" fill="#E60012"/>
      <circle cx="50" cy="39" r="7" fill="none" stroke="#fff" stroke-width="1"/>
      <circle cx="50" cy="50" r="7" fill="none" stroke="#fff" stroke-width="1"/>
    </svg>`
  },
  {
    id: "w21", category: "warning", name: "注意会车",
    img: "img/signs/w21.png",
    description: "警告前方道路变窄，需要注意对向来车，提前做好会车准备，必要时停车让行。",
    tip: "会车时靠右减速，夜间会车应在150米外改用近光灯。",
    tags: ["会车", "交会", "错车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M20,38 L46,38 L40,30 L46,38 L40,46 Z" fill="#111"/>
      <path d="M80,38 L54,38 L60,30 L54,38 L60,46 Z" fill="#111"/>
    </svg>`
  },
  {
    id: "w22", category: "warning", name: "双向交通",
    img: "img/signs/w22.png",
    description: "警告前方路段由单向交通变为双向交通，应注意对向来车，靠右行驶。",
    tip: "从单向路段驶入双向路段时，特别注意对向来车，不要占用对向车道。",
    tags: ["双向交通", "对向"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <path d="M78,38 L46,38 L52,30 L46,38 L52,46 Z" fill="#111"/>
      <path d="M22,52 L54,52 L48,44 L54,52 L48,60 Z" fill="#111"/>
    </svg>`
  },
  {
    id: "w23", category: "warning", name: "铁道路口",
    img: "img/signs/w23.png",
    description: "警告前方有铁路与公路平面交叉道口，应减速并观察左右是否有火车驶来，确认安全后通过。",
    tip: "铁道路口一停二看三通过，不要在铁道路口换挡，防止熄火在铁轨上。",
    tags: ["铁道路口", "火车", "平交道"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="30" y="30" width="40" height="18" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <polygon points="42,30 38,24 62,24 58,30" fill="#111"/>
      <line x1="50" y1="24" x2="50" y2="16" stroke="#111" stroke-width="2"/>
      <circle cx="50" cy="14" r="2.5" fill="#111"/>
    </svg>`
  },
  {
    id: "w24", category: "warning", name: "窄桥",
    img: "img/signs/w24.png",
    description: "警告前方桥梁宽度比路面窄，上桥前应注意限宽，与对向来车做好交会准备。",
    tip: "窄桥一般只能单向通行，上桥前观察对向有无来车，必要时在桥头等候让行。",
    tags: ["窄桥", "桥梁", "限宽"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="28" y="32" width="44" height="12" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <rect x="24" y="30" width="4" height="16" fill="#111"/>
      <rect x="72" y="30" width="4" height="16" fill="#111"/>
      <line x1="28" y1="44" x2="28" y2="60" stroke="#111" stroke-width="2"/>
      <line x1="72" y1="44" x2="72" y2="60" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "w25", category: "warning", name: "堤坝路",
    img: "img/signs/w25.png",
    description: "警告前方道路修建在堤坝或水库边沿，两侧临水，应靠中间行驶，注意安全。",
    tip: "堤坝路段两侧临水没有护栏，靠道路中间行驶，降低车速，尤其注意横风。",
    tags: ["堤坝", "水库", "临水"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5" stroke-linejoin="round"/>
      <rect x="26" y="28" width="48" height="10" rx="2" fill="none" stroke="#111" stroke-width="2.5"/>
      <path d="M28,38 Q50,46 72,38" fill="none" stroke="#111" stroke-width="2"/>
      <line x1="30" y1="42" x2="30" y2="58" stroke="#111" stroke-width="1.5"/>
      <line x1="70" y1="42" x2="70" y2="58" stroke="#111" stroke-width="1.5"/>
    </svg>`
  },

  // ==== 警告标志 扩展 (w26-w40) ====
  {
    id: "w26", category: "warning", name: "交叉路口",
    img: "img/signs/w26.png",
    description: "警告前方为平面交叉路口，多条道路在此交汇，交通流向复杂，应减速观察各方来车。",
    tip: "交叉路口事故多发，应减速至30km/h以下，观察左右来车，确认安全后通过。",
    tags: ["交叉路口", "十字路口", "路口"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><line x1="50" y1="28" x2="50" y2="60" stroke="#111" stroke-width="3"/><line x1="28" y1="44" x2="72" y2="44" stroke="#111" stroke-width="3"/></svg>`
  },
  {
    id: "w27", category: "warning", name: "注意残疾人",
    img: "img/signs/w27.png",
    description: "警告前方路段常有残疾人通行，应减速慢行，注意避让。",
    tip: "残疾人行动不便、反应较慢，遇到残疾人过马路应耐心等待，不得鸣笛催促。",
    tags: ["残疾人", "无障碍"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><circle cx="50" cy="30" r="8" fill="#111"/><line x1="38" y1="42" x2="62" y2="42" stroke="#111" stroke-width="2.5"/><line x1="50" y1="30" x2="50" y2="62" stroke="#111" stroke-width="2.5"/><line x1="50" y1="62" x2="38" y2="72" stroke="#111" stroke-width="2.5"/><line x1="50" y1="62" x2="62" y2="72" stroke="#111" stroke-width="2.5"/></svg>`
  },
  {
    id: "w28", category: "warning", name: "注意牲畜",
    img: "img/signs/w28.png",
    description: "警告前方路段常有牲畜出没或横穿道路，常见于牧区或乡村道路，应减速并注意避让。",
    tip: "牲畜行动不可预测，不要在牲畜旁鸣喇叭惊吓它们，减速缓慢通过。",
    tags: ["牲畜", "动物", "牧区"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><rect x="32" y="38" width="36" height="20" rx="4" fill="none" stroke="#111" stroke-width="2.5"/><circle cx="38" cy="55" r="4" fill="#111"/><circle cx="62" cy="55" r="4" fill="#111"/><circle cx="42" cy="32" r="5" fill="#111"/></svg>`
  },
  {
    id: "w29", category: "warning", name: "村庄",
    img: "img/signs/w29.png",
    description: "警告前方为村庄或集镇路段，人员和非机动车较多，交通环境复杂，应减速慢行。",
    tip: "穿越村庄时注意行人横穿、非机动车突然变向，车速控制在40km/h以下。",
    tags: ["村庄", "集镇", "乡镇"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><rect x="30" y="40" width="16" height="24" rx="1" fill="none" stroke="#111" stroke-width="2.5"/><polygon points="30,40 38,28 46,40" fill="none" stroke="#111" stroke-width="2"/><rect x="50" y="44" width="20" height="20" rx="1" fill="none" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "w30", category: "warning", name: "渡口",
    img: "img/signs/w30.png",
    description: "警告前方为汽车渡口（轮渡码头），车辆需排队等候上船，应注意排队秩序和上下船安全。",
    tip: "渡口上下船时听从工作人员指挥，船上拉好手刹，挂P档或1档防止溜车。",
    tags: ["渡口", "轮渡", "码头"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><path d="M20,40 L50,25 L80,40" fill="none" stroke="#111" stroke-width="2.5"/><line x1="30" y1="52" x2="30" y2="68" stroke="#111" stroke-width="2.5"/><line x1="70" y1="52" x2="70" y2="68" stroke="#111" stroke-width="2.5"/></svg>`
  },
  {
    id: "w31", category: "warning", name: "路面高突",
    img: "img/signs/w31.png",
    description: "警告前方路面有凸起（如减速丘、路面拱起），车辆通过时会产生颠簸，应减速慢行。",
    tip: "高速通过路面凸起会损坏悬挂和轮胎，应减速至20km/h以下缓慢通过。",
    tags: ["路面高突", "凸起", "减速丘"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><path d="M20,52 Q50,32 80,52" fill="none" stroke="#111" stroke-width="3"/><rect x="40" y="24" width="20" height="8" rx="1" fill="none" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "w32", category: "warning", name: "路面低洼",
    img: "img/signs/w32.png",
    description: "警告前方路面有凹陷或低洼处，可能积水或产生剧烈颠簸，应减速通过。",
    tip: "路面低洼处雨天可能积水，经过时低速匀速通过，避免激起水花影响他车。",
    tags: ["路面低洼", "凹陷", "积水"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><path d="M20,42 Q50,62 80,42" fill="none" stroke="#111" stroke-width="3"/><rect x="40" y="30" width="20" height="8" rx="1" fill="none" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "w33", category: "warning", name: "过水路面",
    img: "img/signs/w33.png",
    description: "警告前方路面被水流漫过（漫水路面或漫水桥），涉水通过时应注意水深和流速。",
    tip: "涉水前观察水深，不超过排气管高度时可低速匀速通过。水深不明时不要冒险涉水。",
    tags: ["过水路面", "漫水桥", "涉水"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><path d="M18,44 L35,38 L52,46 L68,38 L82,44" fill="none" stroke="#111" stroke-width="2.5"/><line x1="30" y1="50" x2="30" y2="64" stroke="#111" stroke-width="2"/><line x1="70" y1="50" x2="70" y2="64" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "w34", category: "warning", name: "右侧变窄",
    img: "img/signs/w34.png",
    description: "警告前方道路右侧变窄，车道数可能减少或路面宽度减小，应注意左侧来车并适时变道。",
    tip: "道路变窄处容易发生刮擦，提前观察左右后视镜，在宽路段完成变道。",
    tags: ["右侧变窄", "道路变窄", "车道减少"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><line x1="22" y1="36" x2="78" y2="36" stroke="#111" stroke-width="3"/><line x1="22" y1="50" x2="60" y2="50" stroke="#111" stroke-width="3"/><line x1="22" y1="36" x2="22" y2="60" stroke="#111" stroke-width="2"/><line x1="78" y1="36" x2="60" y2="50" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "w35", category: "warning", name: "注意保持车距",
    img: "img/signs/w35.png",
    description: "警告前方为事故多发路段或视线不良路段，应与前车保持足够的安全距离，防止追尾。",
    tip: "高速公路上车速超过100km/h时跟车距离不少于100米，低于100km/h时不少于50米。",
    tags: ["保持车距", "跟车距离", "追尾"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><rect x="25" y="28" width="20" height="12" rx="2" fill="none" stroke="#111" stroke-width="2"/><rect x="55" y="28" width="20" height="12" rx="2" fill="none" stroke="#111" stroke-width="2"/><line x1="45" y1="34" x2="55" y2="34" stroke="#111" stroke-width="1.5" stroke-dasharray="2,1"/><circle cx="35" cy="48" r="4" fill="#111"/><circle cx="65" cy="48" r="4" fill="#111"/></svg>`
  },
  {
    id: "w36", category: "warning", name: "注意合流",
    img: "img/signs/w36.png",
    description: "警告前方有车辆从匝道或辅路汇入主路，应注意观察右侧来车，调整车速配合合流。",
    tip: "主路车辆看到合流标志应适当减速或变到左侧车道，方便匝道车辆安全汇入。",
    tags: ["合流", "汇入", "匝道"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><line x1="22" y1="36" x2="70" y2="36" stroke="#111" stroke-width="3"/><path d="M78,28 L78,60 Q78,52 58,50" fill="none" stroke="#111" stroke-width="3"/></svg>`
  },
  {
    id: "w37", category: "warning", name: "注意野生动物",
    img: "img/signs/w37.png",
    description: "警告前方路段常有野生动物穿越公路，常见于自然保护区、森林公园附近，应减速观察。",
    tip: "野生动物不可预测，夜间它们可能被车灯吸引而停滞，减速并远近光切换驱赶。",
    tags: ["野生动物", "动物", "保护区"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><ellipse cx="42" cy="40" rx="16" ry="12" fill="none" stroke="#111" stroke-width="2.5"/><ellipse cx="40" cy="36" rx="3" ry="3" fill="#111"/><circle cx="55" cy="50" r="6" fill="none" stroke="#111" stroke-width="2.5"/></svg>`
  },
  {
    id: "w38", category: "warning", name: "无人看守铁道路口",
    img: "img/signs/w38.png",
    description: "警告前方为无人看守的铁路道口（无栏杆和信号灯），通过前必须减速或停车确认无火车驶来。",
    tip: "无人看守铁道路口必须一停二看三通过，确认左右均无火车驶来方可通行。",
    tags: ["铁道路口", "无人看守", "火车"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><rect x="30" y="30" width="40" height="18" rx="2" fill="none" stroke="#111" stroke-width="2.5"/><polygon points="42,30 38,24 62,24 58,30" fill="#111"/><line x1="50" y1="24" x2="50" y2="14" stroke="#111" stroke-width="2"/><circle cx="50" cy="12" r="2.5" fill="#111"/></svg>`
  },
  {
    id: "w39", category: "warning", name: "避险车道",
    img: "img/signs/w39.png",
    description: "指示前方设有避险车道（紧急逃生坡道），供刹车失灵的车辆紧急驶入减速停车，常见于长下坡路段。",
    tip: "如果刹车失灵，保持冷静，驶入避险车道利用上坡和砂石阻力减速停车。不要尝试在高速行驶中跳车。",
    tags: ["避险车道", "逃生坡道", "刹车失灵"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><rect x="25" y="30" width="50" height="18" rx="2" fill="none" stroke="#111" stroke-width="2.5"/><path d="M30,48 L50,38 L70,48" fill="none" stroke="#111" stroke-width="2.5"/><rect x="38" y="28" width="6" height="10" rx="1" fill="none" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "w40", category: "warning", name: "注意潮汐车道",
    img: "img/signs/w40.png",
    description: "警告前方设有潮汐车道（可变车道），车道行驶方向根据交通流量在不同时段变化。",
    tip: "进入潮汐车道前必须确认当前时段的行驶方向，不可逆行。一般在早晚高峰时段改变方向。",
    tags: ["潮汐车道", "可变车道", "分时段"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 88" xmlns="http://www.w3.org/2000/svg"><polygon points="50,1 96,78 4,78" fill="#FFD200" stroke="#111" stroke-width="2.5"/><line x1="30" y1="36" x2="70" y2="36" stroke="#111" stroke-width="3"/><path d="M40,36 L40,56 L30,50 L40,56 L50,50" fill="none" stroke="#111" stroke-width="2.5"/><path d="M60,36 L60,56 L70,50 L60,56 L50,50" fill="none" stroke="#111" stroke-width="2.5"/></svg>`
  },

  // ========== 禁令标志 Prohibition Signs ==========
  {
    id: "p01", category: "prohibition", name: "禁止通行",
    img: "img/signs/p01.png",
    description: "禁止一切车辆和行人通行，通常设置在道路封闭、施工区域入口或其他禁止进入的路段前方。",
    tip: "此标志为最严格的禁令，见到后必须绕行，不可强行通过。",
    tags: ["禁止通行", "封闭"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" fill="#E60012" stroke="none"/>
      <rect x="30" y="42" width="40" height="16" rx="4" fill="white"/>
      <rect x="42" y="46" width="16" height="8" rx="4" fill="#E60012"/>
    </svg>`
  },
  {
    id: "p02", category: "prohibition", name: "禁止驶入",
    img: "img/signs/p02.png",
    description: "禁止一切车辆驶入（但允许驶出），通常设置在单行路的出口、停车场出口等位置。",
    tip: "此标志面对的方向禁止驶入，请注意确认标志朝向，避免逆行。",
    tags: ["禁止驶入", "禁止进入"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="44" fill="#E60012" stroke="none"/>
      <rect x="30" y="42" width="40" height="16" rx="4" fill="white"/>
    </svg>`
  },
  {
    id: "p03", category: "prohibition", name: "禁止机动车通行",
    img: "img/signs/p03.png",
    description: "禁止所有机动车（汽车、摩托车等）通行，非机动车和行人可以通行。",
    tip: "如果驾驶机动车看到此标志，必须绕行，不可强行穿过。",
    tags: ["禁止机动车", "机动车禁行"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <rect x="30" y="34" width="40" height="16" rx="2" fill="#111"/>
      <rect x="26" y="32" width="8" height="8" rx="1" fill="#111"/>
      <rect x="66" y="32" width="8" height="8" rx="1" fill="#111"/>
      <circle cx="32" cy="54" r="5" fill="#111"/>
      <circle cx="68" cy="54" r="5" fill="#111"/>
    </svg>`
  },
  {
    id: "p04", category: "prohibition", name: "禁止非机动车通行",
    img: "img/signs/p04.png",
    description: "禁止自行车、电动自行车、三轮车等非机动车通行，机动车可正常通行。",
    tip: "非机动车道被占用时需要绕行，注意观察是否有非机动车专用绕行路线。",
    tags: ["禁止非机动车", "自行车禁行"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <circle cx="55" cy="52" r="11" fill="none" stroke="#111" stroke-width="2.5"/>
      <circle cx="55" cy="52" r="2" fill="#111"/>
      <line x1="55" y1="52" x2="55" y2="32" stroke="#111" stroke-width="2"/>
      <line x1="55" y1="32" x2="46" y2="40" stroke="#111" stroke-width="2"/>
      <line x1="55" y1="40" x2="64" y2="46" stroke="#111" stroke-width="2"/>
      <line x1="55" y1="52" x2="68" y2="62" stroke="#111" stroke-width="2"/>
      <line x1="55" y1="52" x2="42" y2="62" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "p05", category: "prohibition", name: "禁止行人通行",
    img: "img/signs/p05.png",
    description: "禁止行人进入该路段，常见于高速公路、快速路入口以及施工路段。",
    tip: "行人禁止上高速公路，如果导航错误驶入高速附近应及时调头离开。",
    tags: ["禁止行人", "行人禁行"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <circle cx="50" cy="32" r="5" fill="#111"/>
      <line x1="50" y1="37" x2="50" y2="52" stroke="#111" stroke-width="2.5"/>
      <line x1="44" y1="44" x2="56" y2="44" stroke="#111" stroke-width="2"/>
      <line x1="50" y1="52" x2="44" y2="64" stroke="#111" stroke-width="2"/>
      <line x1="50" y1="52" x2="56" y2="64" stroke="#111" stroke-width="2"/>
    </svg>`
  },
  {
    id: "p06", category: "prohibition", name: "禁止向左转弯",
    img: "img/signs/p06.png",
    description: "禁止车辆在路口向左转弯，直行和右转可能允许，需结合其他标志判断。",
    tip: "需要左转时提前规划路线，在前方允许左转的路口提前变道。",
    tags: ["禁止左转", "不得左转"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <path d="M40,50 L60,50 L60,40 L72,52 L60,64 L60,54 L40,54 Z" fill="#111"/>
    </svg>`
  },
  {
    id: "p07", category: "prohibition", name: "禁止向右转弯",
    img: "img/signs/p07.png",
    description: "禁止车辆在路口向右转弯，直行和左转可能允许，需结合其他标志判断。",
    tip: "即使红灯允许右转的地方，有此标志也不可右转，必须遵守。",
    tags: ["禁止右转", "不得右转"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <path d="M60,50 L40,50 L40,40 L28,52 L40,64 L40,54 L60,54 Z" fill="#111"/>
    </svg>`
  },
  {
    id: "p08", category: "prohibition", name: "禁止直行",
    img: "img/signs/p08.png",
    description: "禁止车辆在路口直行，仅允许左转或右转，常见于丁字路口改造路段。",
    tip: "看到此标志只能转弯，不可直行穿越路口，提前规划绕行路线。",
    tags: ["禁止直行", "不得直行"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <path d="M44,70 L44,55 L38,55 L50,43 L62,55 L56,55 L56,70 Z" fill="#111"/>
    </svg>`
  },
  {
    id: "p09", category: "prohibition", name: "禁止掉头",
    img: "img/signs/p09.png",
    description: "禁止车辆在该位置掉头（U-turn），通常设置在视线不良、道路狭窄或交通繁忙的位置。",
    tip: "需要掉头时请到前方允许掉头的路口或调头专用车道，不要在禁止掉头处强行调头。",
    tags: ["禁止掉头", "禁止U转"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <path d="M60,36 L40,36 L40,30 L30,42 L40,54 L40,48 L60,48 L60,60 Q60,66 54,66 L46,66 L52,60 L42,60" fill="#111"/>
    </svg>`
  },
  {
    id: "p10", category: "prohibition", name: "禁止超车",
    img: "img/signs/p10.png",
    description: "禁止后方车辆超越前方车辆，直到解除禁止超车标志或下一路口，常见于弯道、坡道等视线不良路段。",
    tip: "即使前车速度较慢也不要超车，等待通过禁止超车路段或出现解除标志后再超车。",
    tags: ["禁止超车", "不得超车"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <rect x="20" y="38" width="30" height="14" rx="2" fill="#111"/>
      <rect x="58" y="28" width="22" height="14" rx="2" fill="#E60012"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "p11", category: "prohibition", name: "解除禁止超车",
    img: "img/signs/p11.png",
    description: "表示禁止超车路段的结束，从该标志之后车辆可以恢复正常超车操作。",
    tip: "即使解除禁止，超车时仍需确认前方视线良好、对向无来车，在允许超车的路段超车。",
    tags: ["解除禁止超车", "允许超车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#111" stroke-width="4"/>
      <rect x="22" y="40" width="28" height="12" rx="2" fill="#111"/>
      <rect x="56" y="30" width="20" height="12" rx="2" fill="#999"/>
      <path d="M20,20 L80,80" stroke="#111" stroke-width="3" stroke-dasharray="5,3"/>
      <path d="M22,18 L26,22 M76,22 L80,18 M24,76 L28,80 M78,78 L82,74" stroke="#999" stroke-width="2"/>
    </svg>`
  },
  {
    id: "p12", category: "prohibition", name: "禁止停车",
    img: "img/signs/p12.png",
    description: "禁止一切车辆在此处长时间或临时停放，包括驾驶员在车内的情况。通常配合黄实线或黄色禁停标线。",
    tip: "黄色实线（黄实线）路边禁止停车，违停会被罚款扣分，找附近的停车场或允许停车区域。",
    tags: ["禁止停车", "禁停"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <text x="50" y="62" text-anchor="middle" font-size="24" font-weight="bold" fill="white" font-family="sans-serif">P</text>
    </svg>`
  },
  {
    id: "p13", category: "prohibition", name: "禁止长时间停车",
    img: "img/signs/p13.png",
    description: "允许临时停车上下客或装卸货物（驾驶员不得离开车辆），但禁止长时间停放。通常配合黄虚线。",
    tip: "黄虚线路边允许临时停车（驾驶员在车内、即停即走），但不可长时间占用。",
    tags: ["禁止长时间停车", "临时停车"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <text x="50" y="63" text-anchor="middle" font-size="24" font-weight="bold" fill="white" font-family="sans-serif">P</text>
      <line x1="35" y1="52" x2="65" y2="52" stroke="white" stroke-width="3"/>
    </svg>`
  },
  {
    id: "p14", category: "prohibition", name: "禁止鸣喇叭",
    img: "img/signs/p14.png",
    description: "禁止车辆在该路段鸣喇叭（按喇叭），常见于医院、学校、居民区等需要安静环境的区域。",
    tip: "市区大部分区域禁止鸣笛，遇到需要提醒的情况可以用灯光代替喇叭。",
    tags: ["禁止鸣笛", "禁鸣"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6" stroke-linecap="round"/>
      <path d="M28,45 L28,38 L38,30 L58,30 L58,38" fill="none" stroke="#111" stroke-width="3"/>
      <path d="M28,45 L28,52 L38,60 L58,60 L58,52" fill="none" stroke="#111" stroke-width="3"/>
      <line x1="58" y1="30" x2="58" y2="60" stroke="#111" stroke-width="3"/>
      <path d="M64,36 Q72,44 64,54" fill="none" stroke="#111" stroke-width="2.5"/>
      <path d="M70,34 Q80,44 70,56" fill="none" stroke="#111" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "p15", category: "prohibition", name: "限速30",
    description: "最高速度限制为每小时30公里，车辆行驶速度不得超过此限值。常见于学校、居民区、施工区。",
    tip: "严格遵守限速标志，超速50%以上将面临严重处罚（扣12分）。",
    tags: ["限速", "30", "最高速度"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <text x="50" y="63" text-anchor="middle" font-size="30" font-weight="bold" fill="#111" font-family="sans-serif">30</text>
    </svg>`
  },
  {
    id: "p16", category: "prohibition", name: "限速50",
    description: "最高速度限制为每小时50公里，常见于城市道路和部分国道路段。",
    tip: "市区道路一般限速40-60km/h，根据道路条件和交通流量动态调整。",
    tags: ["限速", "50"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <text x="50" y="63" text-anchor="middle" font-size="30" font-weight="bold" fill="#111" font-family="sans-serif">50</text>
    </svg>`
  },
  {
    id: "p17", category: "prohibition", name: "限速80",
    description: "最高速度限制为每小时80公里，常见于国道、省道以及部分快速路段。",
    tip: "在高速公路上最低限速为60km/h，低于最低限速也会被处罚。",
    tags: ["限速", "80"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <text x="50" y="63" text-anchor="middle" font-size="30" font-weight="bold" fill="#111" font-family="sans-serif">80</text>
    </svg>`
  },
  {
    id: "p18", category: "prohibition", name: "限速100",
    description: "最高速度限制为每小时100公里，常见于高速公路一般路段。",
    tip: "高速公路最高限速120km/h，但根据路段不同可能限速100或110，注意观察标志。",
    tags: ["限速", "100"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <text x="50" y="63" text-anchor="middle" font-size="28" font-weight="bold" fill="#111" font-family="sans-serif">100</text>
    </svg>`
  },
  {
    id: "p19", category: "prohibition", name: "限速120",
    description: "最高速度限制为每小时120公里，为中国高速公路最高限速。",
    tip: "120km/h是法定最高限速，任何道路都不能超过此速度。安全车速是保持在自己能控制的范围。",
    tags: ["限速", "120", "最高限速"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <text x="50" y="63" text-anchor="middle" font-size="26" font-weight="bold" fill="#111" font-family="sans-serif">120</text>
    </svg>`
  },
  {
    id: "p20", category: "prohibition", name: "限制宽度",
    img: "img/signs/p20.png",
    description: "禁止宽度超过标示数值的车辆通过，常见于窄巷、限宽墩、隧道入口等。",
    tip: "如果您的车辆宽度（含后视镜）超过限宽值，请绕行，切勿强行通过。",
    tags: ["限制宽度", "限宽"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="28" y1="36" x2="28" y2="64" stroke="#111" stroke-width="4"/>
      <line x1="72" y1="36" x2="72" y2="64" stroke="#111" stroke-width="4"/>
      <line x1="28" y1="36" x2="28" y2="28" stroke="#111" stroke-width="3"/>
      <line x1="72" y1="36" x2="72" y2="28" stroke="#111" stroke-width="3"/>
      <line x1="28" y1="28" x2="34" y2="32" stroke="#111" stroke-width="3"/>
      <line x1="72" y1="28" x2="66" y2="32" stroke="#111" stroke-width="3"/>
      <text x="50" y="62" text-anchor="middle" font-size="16" fill="#111" font-family="sans-serif">2.5m</text>
    </svg>`
  },
  {
    id: "p21", category: "prohibition", name: "限制高度",
    img: "img/signs/p21.png",
    description: "禁止高度超过标示数值的车辆通过，常见于桥洞、隧道、地下车库入口。",
    tip: "注意自己车辆的总高度（含行李架、天线等），超过限高必须绕行，强行通过会损坏车辆。",
    tags: ["限制高度", "限高"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="30" y1="32" x2="70" y2="32" stroke="#111" stroke-width="4"/>
      <line x1="30" y1="36" x2="30" y2="66" stroke="#111" stroke-width="3"/>
      <line x1="70" y1="36" x2="70" y2="66" stroke="#111" stroke-width="3"/>
      <line x1="36" y1="28" x2="30" y2="32" stroke="#111" stroke-width="3"/>
      <line x1="64" y1="28" x2="70" y2="32" stroke="#111" stroke-width="3"/>
      <text x="50" y="62" text-anchor="middle" font-size="14" fill="#111" font-family="sans-serif">3.5m</text>
    </svg>`
  },
  {
    id: "p22", category: "prohibition", name: "限制质量",
    img: "img/signs/p22.png",
    description: "禁止总质量（车重+载重）超过标示数值的车辆通过，常见于桥梁、老旧道路。",
    tip: "货车驾驶员需要了解自己车辆的总质量，超重通过桥梁有坍塌风险。",
    tags: ["限制质量", "限重"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/>
      <line x1="30" y1="36" x2="70" y2="36" stroke="#111" stroke-width="3"/>
      <text x="50" y="62" text-anchor="middle" font-size="14" fill="#111" font-family="sans-serif">10t</text>
    </svg>`
  },
  {
    id: "p23", category: "prohibition", name: "停车让行",
    img: "img/signs/p23.png",
    description: "车辆必须在停止线前停车观望，确认安全后方可通行。是最严格的让行标志，常见于视线不良的交叉路口。",
    tip: "必须完全停车（速度降为0），确认安全后再起步通过，不停车直接通过属于违规。",
    tags: ["停车让行", "停车"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,4 96,50 50,96 4,50" fill="#E60012" stroke="white" stroke-width="4"/>
      <text x="50" y="60" text-anchor="middle" font-size="24" font-weight="bold" fill="white" font-family="sans-serif">停</text>
    </svg>`
  },
  {
    id: "p24", category: "prohibition", name: "减速让行",
    img: "img/signs/p24.png",
    description: "车辆应减速慢行，让主路来车优先通行，在确保安全的情况下可以不停车通过。",
    tip: "减速让行不等于停车让行，但必须在确保安全的情况下通过，如果主路有车应停车等待。",
    tags: ["减速让行", "让行"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon points="50,10 96,50 50,90 4,50" fill="white" stroke="#E60012" stroke-width="5"/>
      <polygon points="50,22 80,50 50,78 20,50" fill="none" stroke="#E60012" stroke-width="3"/>
      <text x="50" y="56" text-anchor="middle" font-size="20" font-weight="bold" fill="#E60012" font-family="sans-serif">让</text>
    </svg>`
  },
  {
    id: "p25", category: "prohibition", name: "会车让行",
    img: "img/signs/p25.png",
    description: "双向狭窄路段，面对此标志的车辆应停车让对方车辆先行，对方车辆通过后再行驶。",
    tip: "狭窄路段会车时，让行方应靠边停车等待，确认对方通过后再起步。",
    tags: ["会车让行", "会车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC" stroke="#E60012" stroke-width="6"/>
      <path d="M25,46 L45,46 L40,40 L45,46 L40,52 Z" fill="#E60012"/>
      <path d="M75,54 L55,54 L60,48 L55,54 L60,60 Z" fill="white"/>
    </svg>`
  },

  // ==== 禁令标志 扩展 (p26-p35) ====
  {
    id: "p26", category: "prohibition", name: "禁止大型客车驶入",
    img: "img/signs/p26.png",
    description: "禁止大型载客汽车（含公交车、长途客车）驶入该路段，常见于道路狭窄或居民区内部道路。",
    tip: "大型客车驾驶员注意此类标志，强行通过可能卡住或损坏道路设施。",
    tags: ["大型客车", "客车禁行", "大巴"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><rect x="25" y="30" width="50" height="28" rx="3" fill="none" stroke="#111" stroke-width="2.5"/><rect x="28" y="28" width="16" height="8" rx="1" fill="none" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "p27", category: "prohibition", name: "禁止载货汽车驶入",
    img: "img/signs/p27.png",
    description: "禁止各类载货汽车（货车、卡车等）驶入该路段，常见于市中心或居民区。",
    tip: "货车禁行区域通常有指定的绕行路线，请提前规划好避开禁行区的路线。",
    tags: ["载货汽车", "货车禁行", "卡车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><rect x="28" y="34" width="32" height="18" rx="2" fill="none" stroke="#111" stroke-width="2.5"/><rect x="60" y="30" width="14" height="12" rx="1" fill="none" stroke="#111" stroke-width="2"/><circle cx="34" cy="56" r="4" fill="#111"/><circle cx="60" cy="56" r="4" fill="#111"/></svg>`
  },
  {
    id: "p28", category: "prohibition", name: "禁止摩托车驶入",
    img: "img/signs/p28.png",
    description: "禁止两轮、三轮摩托车驶入该路段，常见于高速公路、快速路以及城市禁摩区域。",
    tip: "全国多数城市对摩托车有专门的禁行区域和时间限制，摩友出行前应了解当地禁摩政策。",
    tags: ["摩托车", "禁摩", "摩托禁行"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><circle cx="50" cy="46" r="11" fill="none" stroke="#111" stroke-width="2.5"/><circle cx="50" cy="46" r="2" fill="#111"/><line x1="50" y1="46" x2="50" y2="28" stroke="#111" stroke-width="2"/><line x1="50" y1="28" x2="44" y2="34" stroke="#111" stroke-width="1.5"/><line x1="50" y1="36" x2="58" y2="40" stroke="#111" stroke-width="2"/><line x1="50" y1="46" x2="62" y2="58" stroke="#111" stroke-width="2"/><line x1="50" y1="46" x2="38" y2="58" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "p29", category: "prohibition", name: "禁止向左向右转弯",
    img: "img/signs/p29.png",
    description: "禁止车辆在此处向左或向右转弯，仅允许直行通过。",
    tip: "看到此标志只能直行，无论左转还是右转都不允许，请提前规划好绕行路线。",
    tags: ["禁止左转", "禁止右转", "只能直行"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><path d="M40,50 L60,50 L60,42 L72,52 L60,62 L60,54 L40,54 Z" fill="#111"/><path d="M60,50 L40,50 L40,42 L28,52 L40,62 L40,54 L60,54 Z" fill="#111"/></svg>`
  },
  {
    id: "p30", category: "prohibition", name: "禁止直行和向左转弯",
    img: "img/signs/p30.png",
    description: "禁止车辆直行通过路口和向左转弯，仅允许向右转弯。",
    tip: "需要直行或左转的车辆应提前变道绕行，只有右转需求的车辆可进入此车道。",
    tags: ["禁止直行", "禁止左转", "仅可右转"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><path d="M44,70 L44,56 L38,56 L50,44 L62,56 L56,56 L56,70 Z" fill="#111"/><path d="M48,44 L48,30 L58,40 L48,30 L38,40 Z" fill="#111"/></svg>`
  },
  {
    id: "p31", category: "prohibition", name: "禁止直行和向右转弯",
    img: "img/signs/p31.png",
    description: "禁止车辆直行通过路口和向右转弯，仅允许向左转弯。",
    tip: "需要直行或右转的车辆必须提前变道，只有左转车辆可继续前行。",
    tags: ["禁止直行", "禁止右转", "仅可左转"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><path d="M44,70 L44,56 L38,56 L50,44 L62,56 L56,56 L56,70 Z" fill="#111"/><path d="M52,44 L52,30 L42,40 L52,30 L62,40 Z" fill="#111"/></svg>`
  },
  {
    id: "p32", category: "prohibition", name: "禁止运输危险物品车辆驶入",
    img: "img/signs/p32.png",
    description: "禁止运输易燃易爆、有毒有害等危险物品的车辆驶入，常见于隧道、桥梁、人口密集区域。",
    tip: "危化品车辆有专门的行驶路线和时间规定，驾驶员必须严格遵守，不得驶入禁行区域。",
    tags: ["危险品", "危化品", "易燃易爆"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><rect x="30" y="30" width="28" height="22" rx="2" fill="none" stroke="#111" stroke-width="2.5"/><text x="44" y="48" text-anchor="middle" font-size="16" font-weight="bold" fill="#111">!</text></svg>`
  },
  {
    id: "p33", category: "prohibition", name: "解除限制速度",
    description: "表示前方限速路段结束，从该标志之后车辆可以恢复到该道路的默认限速行驶。",
    tip: "解除限速不等于可以无限加速，最高速度仍受道路等级法定限速约束（城市50km/h，高速120km/h）。",
    tags: ["解除限速", "限速结束"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#111" stroke-width="4"/><text x="50" y="56" text-anchor="middle" font-size="22" fill="#111" font-weight="bold">40</text><path d="M25,25 L75,75" stroke="#111" stroke-width="3" stroke-dasharray="6,4"/></svg>`
  },
  {
    id: "p34", category: "prohibition", name: "禁止人力车进入",
    img: "img/signs/p34.png",
    description: "禁止人力客运三轮车、人力货运三轮车、手推车等人力驱动的车辆进入该路段。",
    tip: "人力车速度慢、制动差，在机动车道上极为危险，此类禁行标志保护了人力车使用者的安全。",
    tags: ["人力车", "三轮车", "手推车"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><line x1="22" y1="22" x2="78" y2="78" stroke="#E60012" stroke-width="6"/><circle cx="55" cy="48" r="11" fill="none" stroke="#111" stroke-width="2.5"/><circle cx="55" cy="48" r="2" fill="#111"/><line x1="55" y1="48" x2="55" y2="30" stroke="#111" stroke-width="2"/><line x1="55" y1="48" x2="66" y2="60" stroke="#111" stroke-width="2"/><line x1="55" y1="48" x2="44" y2="60" stroke="#111" stroke-width="2"/></svg>`
  },
  {
    id: "p35", category: "prohibition", name: "停车检查",
    img: "img/signs/p35.png",
    description: "指示前方设有公安检查站或边境检查站，所有车辆必须停车接受检查后方可继续通行。",
    tip: "经过检查站时提前减速，准备好驾驶证和行驶证，配合公安人员的检查工作。",
    tags: ["停车检查", "检查站", "公安检查"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="white" stroke="#E60012" stroke-width="6"/><rect x="30" y="30" width="16" height="30" rx="2" fill="none" stroke="#111" stroke-width="2.5"/><line x1="38" y1="36" x2="38" y2="54" stroke="#111" stroke-width="2"/><text x="58" y="56" font-size="20" font-weight="bold" fill="#111">检</text></svg>`
  },

  // ========== 指示标志 Mandatory Signs ==========
  {
    id: "m01", category: "mandatory", name: "直行",
    img: "img/signs/m01.png",
    description: "指示车辆只能直行，不得转弯。常见于多车道交叉口指定某条车道为直行车道。",
    tip: "进入直行车道后只能直行通过路口，即使发现走错路也不可转弯或掉头。",
    tags: ["直行", "只能直行"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M44,72 L44,55 L38,55 L50,42 L62,55 L56,55 L56,72 Z" fill="white"/>
    </svg>`
  },
  {
    id: "m02", category: "mandatory", name: "向左转弯",
    img: "img/signs/m02.png",
    description: "指示车辆只能向左转弯，不得直行或右转。常见于路口指定车道方向。",
    tip: "进入左转专用车道后必须左转，即使绿灯直行也不可直行，按导向车道行驶。",
    tags: ["左转", "向左转弯"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M48,65 L48,50 L42,50 L54,40 L66,50 L60,50 L60,65 Z" fill="white"/>
    </svg>`
  },
  {
    id: "m03", category: "mandatory", name: "向右转弯",
    img: "img/signs/m03.png",
    description: "指示车辆只能向右转弯，不得直行或左转。",
    tip: "进入右转专用车道后必须右转，不可直行通过路口。",
    tags: ["右转", "向右转弯"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M52,65 L52,50 L58,50 L46,40 L34,50 L40,50 L40,65 Z" fill="white"/>
    </svg>`
  },
  {
    id: "m04", category: "mandatory", name: "直行和向左转弯",
    img: "img/signs/m04.png",
    description: "指示车辆可以直行或向左转弯，不可右转。",
    tip: "此车道为直行+左转共用车道，前方的车辆可能在路口停下等左转灯，跟车时注意保持距离。",
    tags: ["直行", "左转", "直左"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M46,64 L46,48 L40,48 L52,38 L64,48 L58,48 L58,64 L52,64 L52,58 L48,58 L48,64 Z" fill="white"/>
    </svg>`
  },
  {
    id: "m05", category: "mandatory", name: "直行和向右转弯",
    img: "img/signs/m05.png",
    description: "指示车辆可以直行或向右转弯，不可左转。",
    tip: "直行+右转共用车道，等待直行绿灯时可能堵住后方右转车辆，注意后面喇叭催促。",
    tags: ["直行", "右转", "直右"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M54,64 L54,48 L60,48 L48,38 L36,48 L42,48 L42,64 L48,64 L48,58 L52,58 L52,64 Z" fill="white"/>
    </svg>`
  },
  {
    id: "m06", category: "mandatory", name: "靠右侧道路行驶",
    img: "img/signs/m06.png",
    description: "指示车辆应靠道路右侧行驶，常见于道路中央有隔离设施或需要分道行驶的路段。",
    tip: "靠右行驶不等同于只能右转，是要求车辆在道路右侧车道行驶。",
    tags: ["靠右行驶", "靠右"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M72,64 L72,50 L76,50 L65,40 L54,50 L58,50 L58,64 Z" fill="white"/>
      <line x1="34" y1="64" x2="34" y2="44" stroke="white" stroke-width="6"/>
      <line x1="30" y1="44" x2="38" y2="44" stroke="white" stroke-width="6"/>
    </svg>`
  },
  {
    id: "m07", category: "mandatory", name: "靠左侧道路行驶",
    img: "img/signs/m07.png",
    description: "指示车辆应靠道路左侧行驶，常见于高架快速路的左侧车道指引。",
    tip: "靠左行驶一般是指示前往特定方向（如高速入口）的车道，普通城市道路上较少见。",
    tags: ["靠左行驶", "靠左"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M28,64 L28,50 L24,50 L35,40 L46,50 L42,50 L42,64 Z" fill="white"/>
      <line x1="66" y1="64" x2="66" y2="44" stroke="white" stroke-width="6"/>
      <line x1="62" y1="44" x2="70" y2="44" stroke="white" stroke-width="6"/>
    </svg>`
  },
  {
    id: "m08", category: "mandatory", name: "环岛行驶",
    img: "img/signs/m08.png",
    description: "指示前方为环岛（交通转盘），车辆进入环岛后应沿逆时针方向行驶，驶出时需从右侧出口驶离。",
    tip: "环岛内行驶的车辆拥有优先通行权，进入环岛前应减速让行环岛内的车辆。",
    tags: ["环岛", "转盘", "绕行"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <circle cx="50" cy="50" r="18" fill="#0066CC" stroke="white" stroke-width="4"/>
      <path d="M38,24 L50,16 L62,24" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
      <path d="M38,76 L50,84 L62,76" fill="none" stroke="white" stroke-width="5" stroke-linecap="round"/>
    </svg>`
  },
  {
    id: "m09", category: "mandatory", name: "单行路（直行）",
    img: "img/signs/m09.png",
    description: "指示该道路为单向通行道路，车辆只能按箭头方向行驶，不可逆行。",
    tip: "单行路不可调头和逆行，如果错过目的地需要绕行回到正确方向。",
    tags: ["单行路", "单行道"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/>
      <path d="M44,46 L44,32 L38,32 L50,18 L62,32 L56,32 L56,46 Z" fill="white"/>
    </svg>`
  },
  {
    id: "m10", category: "mandatory", name: "步行",
    img: "img/signs/m10.png",
    description: "指示该道路仅供行人通行，禁止所有车辆进入。常见于步行街、公园内道路。",
    tip: "步行标志面前车辆不可进入，即使临时停车也禁止，应为行人提供安全的步行空间。",
    tags: ["步行", "人行道"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <circle cx="50" cy="30" r="7" fill="white"/>
      <line x1="50" y1="37" x2="50" y2="56" stroke="white" stroke-width="4"/>
      <line x1="42" y1="46" x2="58" y2="46" stroke="white" stroke-width="3"/>
      <line x1="50" y1="56" x2="40" y2="72" stroke="white" stroke-width="3"/>
      <line x1="50" y1="56" x2="60" y2="72" stroke="white" stroke-width="3"/>
    </svg>`
  },
  {
    id: "m11", category: "mandatory", name: "鸣喇叭",
    img: "img/signs/m11.png",
    description: "指示车辆在此处必须鸣喇叭（按喇叭），常见于山区弯道、视线不良路段，提醒对向来车注意。",
    tip: "鸣笛后注意听对向是否有回应喇叭声，弯道处减速通过。",
    tags: ["鸣笛", "鸣喇叭", "按喇叭"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <path d="M30,46 L30,40 L42,32 L62,32 L62,40" fill="none" stroke="white" stroke-width="3"/>
      <path d="M30,46 L30,54 L42,62 L62,62 L62,54" fill="none" stroke="white" stroke-width="3"/>
      <line x1="62" y1="32" x2="62" y2="62" stroke="white" stroke-width="3"/>
      <path d="M68,42 Q74,50 68,58" fill="none" stroke="white" stroke-width="2.5"/>
      <path d="M74,40 Q82,50 74,60" fill="none" stroke="white" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "m12", category: "mandatory", name: "最低限速",
    img: "img/signs/m12.png",
    description: "指示车辆行驶速度不得低于标示数值，常见于高速公路及城市快速路，低于最低限速会影响交通流畅和安全。",
    tip: "高速公路最低限速60km/h，低于最低限速行驶同样违规。新手不要因为紧张开太慢。",
    tags: ["最低限速", "低速"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <text x="50" y="63" text-anchor="middle" font-size="28" font-weight="bold" fill="white" font-family="sans-serif">50</text>
    </svg>`
  },
  {
    id: "m13", category: "mandatory", name: "人行横道",
    img: "img/signs/m13.png",
    description: "指示前方有人行横道（斑马线），驾驶员应注意观察行人，减速让行或停车让行。",
    tip: "斑马线前30米开始减速，有行人通过必须停车让行，不得鸣笛催促行人。",
    tags: ["人行横道", "斑马线"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="96" height="96" rx="6" fill="#0066CC"/>
      <polygon points="50,16 20,50 50,84 80,50" fill="none" stroke="white" stroke-width="3"/>
      <line x1="30" y1="50" x2="70" y2="50" stroke="white" stroke-width="3"/>
      <line x1="38" y1="44" x2="38" y2="56" stroke="white" stroke-width="3"/>
      <line x1="62" y1="44" x2="62" y2="56" stroke="white" stroke-width="3"/>
      <line x1="46" y1="48" x2="46" y2="52" stroke="white" stroke-width="3"/>
      <line x1="54" y1="48" x2="54" y2="52" stroke="white" stroke-width="3"/>
    </svg>`
  },
  {
    id: "m14", category: "mandatory", name: "非机动车道",
    img: "img/signs/m14.png",
    description: "指示该车道专供非机动车（自行车、电动车等）行驶，机动车不得占用。",
    tip: "机动车不可占用非机动车道行驶或停车，违者将被处罚。借道超车后应迅速驶回机动车道。",
    tags: ["非机动车道", "自行车道"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <circle cx="55" cy="54" r="13" fill="none" stroke="white" stroke-width="3"/>
      <circle cx="55" cy="54" r="2.5" fill="white"/>
      <line x1="55" y1="54" x2="55" y2="32" stroke="white" stroke-width="2.5"/>
      <line x1="55" y1="32" x2="45" y2="42" stroke="white" stroke-width="2.5"/>
      <line x1="55" y1="42" x2="65" y2="48" stroke="white" stroke-width="2.5"/>
      <line x1="55" y1="54" x2="69" y2="65" stroke="white" stroke-width="2.5"/>
      <line x1="55" y1="54" x2="41" y2="65" stroke="white" stroke-width="2.5"/>
    </svg>`
  },
  {
    id: "m15", category: "mandatory", name: "机动车道",
    img: "img/signs/m15.png",
    description: "指示该车道专供机动车行驶，非机动车和行人不得进入此车道。",
    tip: "机动车在机动车道上行驶，遇到非机动车闯入应减速避让，鸣笛提醒。",
    tags: ["机动车道", "汽车道"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="46" fill="#0066CC"/>
      <rect x="28" y="32" width="44" height="18" rx="2" fill="none" stroke="white" stroke-width="3"/>
      <rect x="24" y="30" width="8" height="8" rx="1" fill="none" stroke="white" stroke-width="3"/>
      <rect x="68" y="30" width="8" height="8" rx="1" fill="none" stroke="white" stroke-width="3"/>
      <circle cx="32" cy="54" r="5" fill="none" stroke="white" stroke-width="3"/>
      <circle cx="68" cy="54" r="5" fill="none" stroke="white" stroke-width="3"/>
    </svg>`
  },

  // ==== 指示标志 扩展 (m16-m28) ====
  {
    id: "m16", category: "mandatory", name: "会车先行",
    img: "img/signs/m16.png",
    description: "指示在狭窄路段会车时，面对此标志的车辆享有优先通行权，对方车辆应停车让行。",
    tip: "会车先行不等于可以横冲直撞，仍应减速确认对方已让行后通过。对面是「会车让行」标志。",
    tags: ["会车先行", "优先通行", "会车"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="96" height="96" rx="6" fill="#0066CC"/><path d="M20,40 L60,40 L50,30 L60,40 L50,50 Z" fill="white"/><path d="M80,60 L40,60 L50,70 L40,60 L50,50 Z" fill="#E60012"/></svg>`
  },
  {
    id: "m17", category: "mandatory", name: "向左和向右转弯",
    img: "img/signs/m17.png",
    description: "指示车辆在该路口可以向左转弯或向右转弯，但不可直行。常见于丁字路口的横向道路。",
    tip: "此标志出现于丁字路口，直行方向无路可走，必须选择左转或右转。",
    tags: ["向左转弯", "向右转弯", "丁字路口"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#0066CC"/><path d="M42,58 L42,46 L36,46 L50,32 L64,46 L58,46 L58,58 Z" fill="white"/><path d="M58,46 L58,34 L64,34 L50,20 L36,34 L42,34 L42,46 Z" fill="white"/></svg>`
  },
  {
    id: "m18", category: "mandatory", name: "路口优先通行",
    img: "img/signs/m18.png",
    description: "指示该路口为主路优先通行方向，交叉方向的来车应减速或停车让行。",
    tip: "有优先通行权不代表可以无视交叉方向，通过路口时仍应减速观察。",
    tags: ["优先通行", "主路先行", "路口优先"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="96" height="96" rx="6" fill="#0066CC"/><line x1="50" y1="20" x2="50" y2="80" stroke="white" stroke-width="8"/><line x1="20" y1="50" x2="80" y2="50" stroke="white" stroke-width="8"/><rect x="36" y="36" width="28" height="28" rx="4" fill="#0066CC" stroke="white" stroke-width="4"/></svg>`
  },
  {
    id: "m19", category: "mandatory", name: "机动车行驶",
    img: "img/signs/m19.png",
    description: "指示该道路供机动车行驶，非机动车和行人不应在此道路上通行。",
    tip: "此标志与「机动车车道」不同，它表示整条道路为机动车道，而非仅某一条车道。",
    tags: ["机动车行驶", "汽车道", "机动车专用"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#0066CC"/><rect x="28" y="34" width="44" height="18" rx="3" fill="none" stroke="white" stroke-width="3"/><circle cx="34" cy="56" r="5" fill="none" stroke="white" stroke-width="3"/><circle cx="66" cy="56" r="5" fill="none" stroke="white" stroke-width="3"/></svg>`
  },
  {
    id: "m20", category: "mandatory", name: "非机动车行驶",
    img: "img/signs/m20.png",
    description: "指示该道路供非机动车（自行车、电动自行车、三轮车等）行驶，机动车不得驶入。",
    tip: "机动车不应驶入有非机动车行驶标志的道路，临时停车也禁止占用。",
    tags: ["非机动车行驶", "自行车道", "非机动车专用"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="46" fill="#0066CC"/><circle cx="55" cy="52" r="13" fill="none" stroke="white" stroke-width="3"/><circle cx="55" cy="52" r="2.5" fill="white"/><line x1="55" y1="52" x2="55" y2="30" stroke="white" stroke-width="2.5"/><line x1="55" y1="52" x2="68" y2="63" stroke="white" stroke-width="2.5"/><line x1="55" y1="52" x2="42" y2="63" stroke="white" stroke-width="2.5"/></svg>`
  },
  {
    id: "m21", category: "mandatory", name: "直行车道",
    img: "img/signs/m21.png",
    description: "指示前方车道只能直行通过路口，不得转弯。与该车道路面对应的导向箭头配合使用。",
    tip: "进入直行车道后只能直行，即使绿灯时也不可转弯或掉头，请提前选择正确车道。",
    tags: ["直行车道", "导向车道", "只能直行"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><path d="M44,46 L44,32 L38,32 L50,18 L62,32 L56,32 L56,46 Z" fill="white"/></svg>`
  },
  {
    id: "m22", category: "mandatory", name: "右转车道",
    img: "img/signs/m22.png",
    description: "指示该车道仅供右转车辆使用，直行和左转车辆不得进入此车道。",
    tip: "进入右转专用车道后必须右转，不可直行或左转，这是导向车道的基本规则。",
    tags: ["右转车道", "右转专用", "导向车道"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><path d="M52,46 L52,30 L58,30 L46,18 L34,30 L40,30 L40,46 Z" fill="white"/></svg>`
  },
  {
    id: "m23", category: "mandatory", name: "左转车道",
    img: "img/signs/m23.png",
    description: "指示该车道仅供左转车辆使用，直行和右转车辆应选择其他车道。",
    tip: "左转专用车道通常在路口最左侧，进入后必须左转，即使走错路也不能直行。",
    tags: ["左转车道", "左转专用", "导向车道"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><path d="M48,46 L48,30 L42,30 L54,18 L66,30 L60,30 L60,46 Z" fill="white"/></svg>`
  },
  {
    id: "m24", category: "mandatory", name: "直行和左转合用车道",
    img: "img/signs/m24.png",
    description: "指示该车道为直行和左转共用的导向车道，车辆可在此车道直行或左转。",
    tip: "前端如果是红灯，直行车辆会堵住后方左转车辆，注意后车催促。",
    tags: ["直行", "左转", "合用车道"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><path d="M42,46 L42,32 L36,32 L48,18 L62,32 L54,32 L54,46 Z" fill="white"/></svg>`
  },
  {
    id: "m25", category: "mandatory", name: "直行和右转合用车道",
    img: "img/signs/m25.png",
    description: "指示该车道为直行和右转共用的导向车道，车辆可在此车道直行或右转。",
    tip: "直行等红灯时会阻挡后方右转车辆，后方鸣喇叭不用慌，等绿灯后正常通行。",
    tags: ["直行", "右转", "合用车道"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><path d="M48,46 L48,30 L42,30 L54,18 L66,30 L60,30 L60,46 Z" fill="white"/></svg>`
  },
  {
    id: "m26", category: "mandatory", name: "掉头车道",
    img: "img/signs/m26.png",
    description: "指示该车道专供车辆掉头使用，直行、左转、右转车辆不得使用此车道。",
    tip: "进入掉头专用车道后必须掉头，如果不想掉头请提前选择其他车道。",
    tags: ["掉头车道", "调头", "U型转弯"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><path d="M60,40 L40,40 L40,36 L28,42 L40,48 L40,44 L60,44 L60,54 Q60,58 56,58 L48,58 L52,52 L44,52" fill="white"/></svg>`
  },
  {
    id: "m27", category: "mandatory", name: "公交线路专用车道",
    img: "img/signs/m27.png",
    description: "指示该车道专供公交车行驶，其他社会车辆（除特殊规定外）不得占用。",
    tip: "公交专用道通常在早晚高峰时段（7:00-9:00, 17:00-19:00）禁止社会车辆占用。",
    tags: ["公交专用道", "公交车道", "BRT"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="4" width="92" height="52" rx="8" fill="#0066CC"/><rect x="24" y="16" width="44" height="24" rx="3" fill="none" stroke="white" stroke-width="2.5"/><rect x="28" y="14" width="12" height="8" rx="1" fill="none" stroke="white" stroke-width="2"/><text x="60" y="44" font-size="11" fill="white" font-weight="bold">BUS</text></svg>`
  },
  {
    id: "m28", category: "mandatory", name: "允许掉头",
    img: "img/signs/m28.png",
    description: "指示该位置允许车辆掉头（U型转弯），设置在有掉头条件的路口或路段。",
    tip: "允许掉头不等于可以在任何情况下掉头，应观察对向来车和后方车辆，确保安全。",
    tags: ["允许掉头", "调头", "U转"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="2" y="2" width="96" height="96" rx="6" fill="#0066CC"/><path d="M60,42 L38,42 L38,36 L28,48 L38,60 L38,52 L60,52 L60,64 Q60,68 56,68 L48,68 L54,62 L44,62" fill="white"/></svg>`
  },

  // ========== 指路标志 Guide Signs ==========
  {
    id: "g02", category: "guide", name: "国道编号",
    img: "img/signs/g02.png",
    description: "标示国道编号（G字头），国道是国家级干线公路，连接各省市重要城市。",
    tip: "国道路况差异大，有的路段接近高速公路标准，有的路段可能较窄，注意限速变化。",
    tags: ["国道", "G", "公路编号"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="62" rx="6" fill="#E60012"/>
      <text x="50" y="54" text-anchor="middle" font-size="28" font-weight="bold" fill="white" font-family="sans-serif">G105</text>
    </svg>`
  },
  {
    id: "g03", category: "guide", name: "省道编号",
    img: "img/signs/g03.png",
    description: "标示省道编号（S字头），省道是省级干线公路，连接省内各市县。",
    tip: "省道通常限速60-80km/h，穿越村镇的路段注意行人和非机动车横穿。",
    tags: ["省道", "S"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="62" rx="6" fill="#F59E0B"/>
      <text x="50" y="54" text-anchor="middle" font-size="28" font-weight="bold" fill="white" font-family="sans-serif">S203</text>
    </svg>`
  },
  {
    id: "g04", category: "guide", name: "县道编号",
    img: "img/signs/g04.png",
    description: "标示县道编号（X字头），县道是县级道路，连接县内各乡镇。",
    tip: "县道路面较窄，部分路段可能没有分道线，会车时需要格外小心。",
    tags: ["县道", "X"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="62" rx="6" fill="white" stroke="#111" stroke-width="2"/>
      <text x="50" y="54" text-anchor="middle" font-size="28" font-weight="bold" fill="#111" font-family="sans-serif">X005</text>
    </svg>`
  },
  {
    id: "g05", category: "guide", name: "地点距离",
    img: "img/signs/g05.png",
    description: "标示前方各地点名称及其距离（公里），帮助驾驶员规划行程和判断剩余路程。",
    tip: "距离提示有助于判断是否需要加油、休息，长途驾驶建议每2小时休息一次。",
    tags: ["地点距离", "公里"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="62" rx="6" fill="#0066CC"/>
      <text x="50" y="28" text-anchor="middle" font-size="12" fill="white" font-family="sans-serif">北京 120 km</text>
      <text x="50" y="48" text-anchor="middle" font-size="12" fill="white" font-family="sans-serif">天津  30 km</text>
    </svg>`
  },
  {
    id: "g06", category: "guide", name: "此路不通",
    img: "img/signs/g06.png",
    description: "指示前方道路为死胡同或封闭路段，车辆无法从此方向驶出，应提前选择其他路线。",
    tip: "导航中有时会导到封闭路段，看到此标志立即调头，不要继续前行。",
    tags: ["此路不通", "死胡同"],
    weight: 1,
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="62" rx="6" fill="#0066CC"/>
      <line x1="30" y1="35" x2="70" y2="35" stroke="white" stroke-width="3"/>
      <rect x="70" y="30" width="3" height="10" fill="white"/>
      <rect x="70" y="30" width="10" height="3" fill="white"/>
      <text x="50" y="55" text-anchor="middle" font-size="14" fill="white" font-family="sans-serif">此路不通</text>
    </svg>`
  },
  {
    id: "g08", category: "guide", name: "服务区",
    img: "img/signs/g08.png",
    description: "指示前方有高速公路服务区，提供加油、餐饮、卫生间、休息等服务设施。",
    tip: "长途驾驶应提前规划服务区停靠点，不要等到疲劳或油量过低再找服务区。",
    tags: ["服务区", "休息站"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 70" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="4" width="92" height="62" rx="6" fill="#0066CC"/>
      <rect x="30" y="16" width="16" height="20" rx="2" fill="none" stroke="white" stroke-width="2"/>
      <rect x="50" y="16" width="16" height="20" rx="2" fill="none" stroke="white" stroke-width="2"/>
      <line x1="38" y1="40" x2="38" y2="52" stroke="white" stroke-width="2"/>
      <line x1="58" y1="40" x2="58" y2="52" stroke="white" stroke-width="2"/>
      <circle cx="18" cy="52" r="6" fill="none" stroke="white" stroke-width="2"/>
      <line x1="18" y1="34" x2="18" y2="44" stroke="white" stroke-width="2"/>
      <text x="18" y="48" text-anchor="middle" font-size="8" fill="white" font-family="sans-serif">P</text>
    </svg>`
  },

  // ========== 辅助标志 Auxiliary Signs ==========
  {
    id: "a01", category: "auxiliary", name: "时间范围",
    img: "img/signs/a01.png",
    description: "标示上方主标志的生效时间范围，例如某条规则仅在指定时间段内有效。",
    tip: "注意时间范围的起点和终点，超出时间范围限制可能不适用。",
    tags: ["时间", "时段"],
    weight: 1,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="15" fill="#111" font-family="sans-serif">7:00—19:00</text>
    </svg>`
  },
  {
    id: "a02", category: "auxiliary", name: "车辆种类",
    img: "img/signs/a02.png",
    description: "标示上方主标志适用于特定类型的车辆，如「货车」、「大型客车」等。",
    tip: "如果您的车辆不属于标示种类，则该主标志不适用于您。",
    tags: ["车辆种类", "货车"],
    weight: 1,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <rect x="20" y="10" width="40" height="16" rx="2" fill="none" stroke="#111" stroke-width="2"/>
      <text x="72" y="26" text-anchor="middle" font-size="14" fill="#111" font-family="sans-serif">货车</text>
      <circle cx="28" cy="30" r="3" fill="#111"/>
      <circle cx="52" cy="30" r="3" fill="#111"/>
    </svg>`
  },
  {
    id: "a03", category: "auxiliary", name: "距离前方",
    img: "img/signs/a03.png",
    description: "标示前方距离主标志所述地点或设施的剩余距离，如「前方200m」、「前方500m」。",
    tip: "看到此类提示后提前做好变道、减速或驶出准备，不要到最后一刻才反应。",
    tags: ["距离", "前方"],
    weight: 1,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="15" fill="#111" font-family="sans-serif">前方 200 m</text>
    </svg>`
  },
  {
    id: "a05", category: "auxiliary", name: "公交车除外",
    img: "img/signs/a05.png",
    description: "标示上方主标志的禁令不适用于公交车，即公交车可以豁免此限制。",
    tip: "公交车和特种车辆（救护车、消防车等）通常享有某些禁行路段的豁免权。",
    tags: ["除外", "公交车"],
    weight: 1,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="14" fill="#111" font-family="sans-serif">公交车除外</text>
    </svg>`
  },
  {
    id: "a06", category: "auxiliary", name: "学校",
    img: "img/signs/a06.png",
    description: "标示附近有学校，提醒驾驶员注意减速、避让学生，常见于学校周边道路的限速标志辅助说明。",
    tip: "学校区域通常限速30km/h，上下学时段有交警或志愿者维护交通，请听从指挥。",
    tags: ["学校", "学生"],
    weight: 2,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="16" fill="#111" font-family="sans-serif">学校</text>
    </svg>`
  },
  {
    id: "a07", category: "auxiliary", name: "事故",
    img: "img/signs/a07.png",
    description: "标示前方发生了交通事故，提醒驾驶员减速慢行、注意避让事故车辆和救援人员。",
    tip: "经过事故现场时减速慢行，不要围观拍照。如果事故与自己无关，尽快驶离，为救援留出通道。",
    tags: ["事故", "交通事故"],
    weight: 2,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="16" fill="#111" font-family="sans-serif">事故</text>
    </svg>`
  },
  {
    id: "a08", category: "auxiliary", name: "塌方",
    img: "img/signs/a08.png",
    description: "标示前方路段发生山体滑坡或路面塌方，道路可能中断或部分通行，需极度小心。",
    tip: "遇到塌方路段，不可强行通过。应注意观察山体是否有继续滑落的危险，在安全处等待或调头绕行。",
    tags: ["塌方", "滑坡"],
    weight: 2,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="16" fill="#111" font-family="sans-serif">塌方</text>
    </svg>`
  },
  {
    id: "a09", category: "auxiliary", name: "向前200m",
    img: "img/signs/a09.png",
    description: "标示主标志所述信息适用于前方200米处，提醒驾驶员提前做好准备。",
    tip: "200米在高速上转瞬即到，看到此提示后立即开始变道、减速等操作。",
    tags: ["向前", "200m"],
    weight: 1,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="15" fill="#111" font-family="sans-serif">← 200m</text>
    </svg>`
  },
  {
    id: "a10", category: "auxiliary", name: "长度",
    img: "img/signs/a10.png",
    description: "标示主标志所述路段的长度/距离，提醒驾驶员该限制将持续多长距离。",
    tip: "注意长度数值，判断需要通过多长距离的限制路段，做好心理预期。",
    tags: ["长度", "距离"],
    weight: 1,
    svg: `<svg viewBox="0 0 120 40" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="116" height="36" rx="4" fill="white" stroke="#111" stroke-width="2"/>
      <text x="60" y="27" text-anchor="middle" font-size="15" fill="#111" font-family="sans-serif">长度 500 m</text>
    </svg>`
  },

  // ========== 交警手势 Hand Signals ==========
  {
    id: "hs01", category: "hand_signals", name: "停止信号",
    img: "img/knowledge/hand_signals/stop.png",
    description: "交警左臂向前上方直伸，掌心向前，示意前方车辆停车。",
    tip: "看到停止信号必须停车，不得强行通过。",
    tags: ["停止", "停车", "交警手势"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">🛑</text></svg>`
  },
  {
    id: "hs02", category: "hand_signals", name: "直行信号",
    img: "img/knowledge/hand_signals/straight.png",
    description: "交警双臂平伸，右臂向前摆动，准许左右两方直行车辆通行。",
    tip: "直行信号下，左右方向的直行车辆可以通行，转弯车辆需等待。",
    tags: ["直行", "交警手势"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">⬆️</text></svg>`
  },
  {
    id: "hs03", category: "hand_signals", name: "左转弯信号",
    img: "img/knowledge/hand_signals/left_turn.png",
    description: "交警右臂向前平伸，左臂向前下方摆动，准许左方左转弯车辆通行。",
    tip: "左转弯信号只放行左方来车的左转弯，其他方向车辆需等待。",
    tags: ["左转弯", "交警手势"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">⬅️</text></svg>`
  },
  {
    id: "hs04", category: "hand_signals", name: "右转弯信号",
    img: "img/knowledge/hand_signals/right_turn.png",
    description: "交警左臂向前平伸，右臂向前下方摆动，准许右方右转弯车辆通行。",
    tip: "右转弯信号只放行右方来车的右转弯，注意和直行信号区分。",
    tags: ["右转弯", "交警手势"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">➡️</text></svg>`
  },
  {
    id: "hs05", category: "hand_signals", name: "变道信号",
    img: "img/knowledge/hand_signals/change_lane.png",
    description: "交警右臂向前平伸，向左水平摆动，示意车辆变更车道行驶。",
    tip: "变道信号要求车辆变更车道，驾驶员应注意后方来车，确保安全变道。",
    tags: ["变道", "交警手势"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">↔️</text></svg>`
  },
  {
    id: "hs06", category: "hand_signals", name: "减速慢行信号",
    img: "img/knowledge/hand_signals/slow_down.png",
    description: "交警右臂向右前方平伸，向下摆动，示意车辆减速慢行。",
    tip: "看到减速慢行信号应立即减速，观察前方路况，做好停车准备。",
    tags: ["减速", "慢行", "交警手势"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">🔻</text></svg>`
  },
  {
    id: "hs07", category: "hand_signals", name: "靠边停车信号",
    img: "img/knowledge/hand_signals/pull_over.png",
    description: "交警左臂向前上方直伸，右臂向前下方摆动，示意车辆靠边停车。",
    tip: "靠边停车信号综合停止和指引方向的手势，车辆应靠道路右侧停车。",
    tags: ["靠边停车", "交警手势"],
    weight: 3,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">🅿️</text></svg>`
  },
  {
    id: "hs08", category: "hand_signals", name: "左转弯待转信号",
    img: "img/knowledge/hand_signals/left_turn_wait.png",
    description: "交警左臂向左下方平伸，右臂向左水平摆动，准许左方左转弯车辆进入路口等待。",
    tip: "左转弯待转信号允许车辆进入路口等待，但不等于可以直接左转，需等待后续信号。",
    tags: ["左转弯待转", "交警手势"],
    weight: 2,
    svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" rx="12" fill="#1a237e"/><text x="50" y="62" text-anchor="middle" font-size="40" fill="white">↖️</text></svg>`
  }
];

// ============================================
//   行车知识 Driving Tips
// ============================================
const DRIVING_TIPS = [
  {
    category: "新手上路",
    title: "新手上路的基本心态",
    content: "作为重新开始驾驶的驾驶员，保持平和心态最重要。不要被后车喇叭催促而慌乱，按照法规和标识安全驾驶，慢一点没有关系。建议先在车流量少的时段和路段多练习，逐步适应交通环境。"
  },
  {
    category: "新手上路",
    title: "保持安全跟车距离",
    content: "一个简单易记的规则是「两秒法则」：前车通过一个固定参考点（如路标）时开始计时，你通过同一参考点时至少应经过2秒。雨天、夜间、高速公路上这个时间应增加到3-4秒。"
  },
  {
    category: "新手上路",
    title: "变道注意事项",
    content: "变道前务必做到三个动作：1）看后视镜，2）打转向灯至少3秒，3）回头确认盲区无车。夜间或雨天变道更要谨慎，不要连续变更多条车道。"
  },
  {
    category: "新手上路",
    title: "十字路口通行规则",
    content: "无信号灯的十字路口，右侧来车优先通行。转弯让直行，右转让左转，支路让干路。视线不好时（被建筑物遮挡）一定要减速到20km/h以下。"
  },
  {
    category: "高速驾驶",
    title: "进入高速公路",
    content: "从匝道进入高速主路前，先在加速车道将速度提升到与主路车流接近（至少60km/h以上），观察左后方车况，打左转向灯汇入。不要以低速直接切入主路，非常危险。"
  },
  {
    category: "高速驾驶",
    title: "驶出高速公路",
    content: "提前1-2公里变到最右侧车道，进入出口匝道后减速到匝道限速（一般40km/h）。如果错过出口，继续前行到下一出口，绝对不能在高速上倒车或逆行。"
  },
  {
    category: "高速驾驶",
    title: "高速安全车速",
    content: "高速公路上速度并非越快越好。法定最高限速120km/h，但雨雪雾天气要降低到80-100km/h。最左侧车道为超车道，不要长时间占用超车道低速行驶。"
  },
  {
    category: "高速驾驶",
    title: "疲劳驾驶预防",
    content: "连续驾驶2小时后应到服务区休息至少15分钟。疲劳的征兆包括：频繁打哈欠、视线模糊、记不清刚才的行驶路程。一旦出现应立即下高速或进服务区休息。"
  },
  {
    category: "夜间驾驶",
    title: "正确使用远光灯",
    content: "夜间在无照明的乡间道路可以使用远光灯，但会车时应在150米外切换为近光灯。跟车时距离前车较近也应使用近光灯，以免通过前车后视镜晃到对方驾驶员。"
  },
  {
    category: "夜间驾驶",
    title: "夜间会车礼仪",
    content: "对方车辆使用远光灯晃到您时，不要也用远光对视（这样更危险）。应减速，视线稍向右偏移避开强光，使用路边标线作为参照物行驶。可闪烁远光灯一次提醒对方。"
  },
  {
    category: "恶劣天气",
    title: "雨天行车须知",
    content: "雨天路面湿滑，刹车距离是干燥路面的2-3倍。应开启近光灯和前雾灯（不要开远光，会反光影响视线），降低车速20-30%，与前车保持更大的安全距离。通过积水路段要低速匀速通过。"
  },
  {
    category: "恶劣天气",
    title: "大雾天气驾驶",
    content: "能见度低于200米时开启前后雾灯、近光灯和双闪灯，车速降至60km/h以下。能见度低于50米时车速不超过30km/h，尽快驶离高速公路，或到最近的服务区等候雾散。"
  },
  {
    category: "恶劣天气",
    title: "冰雪路面",
    content: "冰雪路面摩擦力极低，任何急操作（急加速、急刹车、急转向）都可能导致车辆失控。起步用2档起步减小扭力，匀速行驶，提前轻踩刹车减速。保持平常3-4倍的跟车距离。"
  },
  {
    category: "日常常识",
    title: "加油时机",
    content: "油表指针接近红线前就应加油。高速公路上两个服务区之间可能相隔50-80公里，不要开到油表亮灯才找加油站。长途出行前检查油量、轮胎气压和胎面状况。"
  },
  {
    category: "日常常识",
    title: "停车规范",
    content: "路边停车注意看标线颜色：黄实线禁止停车，黄虚线可临时停车（驾驶员在车内、即停即走），白色虚线为一般停车位。在非机动车道停车会被罚款。"
  },
  {
    category: "日常常识",
    title: "特种车辆让行",
    content: "遇到救护车、消防车、警车、工程抢险车鸣笛时，在确保安全的前提下应靠边减速让行。在红绿灯路口，其他车辆应尽可能向两侧移动为特种车辆腾出通道。"
  },
  {
    category: "日常常识",
    title: "交通事故处理",
    content: "发生轻微事故（无人员伤亡、车辆能移动），拍照固定证据后迅速将车移至路边，不要堵塞交通。拨打122报警，联系保险公司。在车后50-150米处放置三角警示牌（高速为150米外）。"
  },
  {
    category: "日常常识",
    title: "环岛驾驶规则",
    content: "进入环岛前减速让行环岛内的车辆。环岛内行驶时，如需驶出应提前打右转向灯示意。不要在环岛内停车或倒车，如果错过出口继续绕行一圈再驶出。"
  },
  {
    category: "日常常识",
    title: "隧道安全",
    content: "进入隧道前开启近光灯（不是自动大灯），摘下墨镜。隧道内严禁变道和超车，保持匀速行驶。驶出隧道时阳光刺眼会有短暂盲区，注意减速。"
  },
  {
    category: "日常常识",
    title: "儿童乘车安全",
    content: "12岁以下儿童应使用儿童安全座椅，不能坐在副驾驶位置。儿童锁（后车门内侧的开关）应始终启用，防止儿童在行驶中打开车门。"
  }
];
