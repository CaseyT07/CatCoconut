// ============================================
//   交规知识点 — 学习页展示用（规则摘要格式）
//   依据《道路交通安全法实施条例》整理
// ============================================

const KNOWLEDGE_POINTS = [
  // ── 让行规则（12条）──
  { category: `right_of_way`, title: `让行标志优先`, detail: `有「停」字标志（八角形红底）须停车观察；有「让」字标志或地面倒三角标线须减速让干道车先行。有标志标线时直行车也要让。` },
  { category: `right_of_way`, title: `转弯让直行`, detail: `无论左转还是右转，都必须让直行车辆先行。直行车辆速度较快、流量较大，优先保障通行效率。《实施条例》第52条(三)。` },
  { category: `right_of_way`, title: `让右原则`, detail: `无信号灯、无标志标线、两车交叉方向都直行时→左侧车让右侧车。理由：右侧车驾驶员更靠近碰撞点，且左侧A柱盲区更大。第52条(二)。` },
  { category: `right_of_way`, title: `右转让左转`, detail: `相对方向行驶时，右转车让左转车先行。左转行驶轨迹长，若不让行会长时间滞留路口影响通行。第52条(四)。` },
  { category: `right_of_way`, title: `环岛让行`, detail: `准备进入环岛的车辆，必须让已在环岛内行驶的车辆先行。先出后进，进环岛前减速观察左侧。《实施条例》第51条(二)。` },
  { category: `right_of_way`, title: `支路让干路`, detail: `T型路口，支路（垂直方向）车辆让干路（横向）车辆先行。进入干路前应减速或停车观察。` },
  { category: `right_of_way`, title: `灯头让灯尾`, detail: `上一轮绿灯已进入路口的车辆，优先于新一轮绿灯的车辆通过。不要抢绿灯。` },
  { category: `right_of_way`, title: `辅路让主路`, detail: `辅路车辆（即使是直行）须让主路车辆先行。主路通行效率更高，辅路汇入须主动避让。` },
  { category: `right_of_way`, title: `避让特种车辆`, detail: `警车、消防车、救护车、工程救险车鸣笛执行紧急任务时，在确保安全的前提下靠边减速或停车让行。` },
  { category: `right_of_way`, title: `坡道会车`, detail: `狭窄坡道上，下坡车应让上坡车先行。上坡车行驶阻力大，停车后起步困难。` },
  { category: `right_of_way`, title: `人行横道前车减速`, detail: `前车在人行横道前突然减速时，跟随减速并做好停车准备，不要鸣喇叭催促或变道超越——前车很可能在避让行人。` },
  { category: `right_of_way`, title: `两辆左转车相遇`, detail: `相对方向的两辆左转车在路口各自靠右行驶，互不干扰，不需要谁让谁。` },

  // ── 交通标线（13条）──
  { category: `road_markings`, title: `白色虚线`, detail: `分隔同向车道，允许跨越变道。虚可跨。` },
  { category: `road_markings`, title: `白色实线`, detail: `分隔同向车道，禁止跨越变道。实不可跨。` },
  { category: `road_markings`, title: `路边黄色虚线`, detail: `允许临时停车（上下客、装卸货物），驾驶员不得离开车辆。` },
  { category: `road_markings`, title: `路边黄色实线`, detail: `禁止停车，包括临时停车和长时间停放。` },
  { category: `road_markings`, title: `双黄实线`, detail: `分隔对向车流，严禁跨越、压线、借道超车或掉头。` },
  { category: `road_markings`, title: `停止线（黄色双实线）`, detail: `配合停车让行标志使用，车辆必须在停止线前完全停车。` },
  { category: `road_markings`, title: `导流线（V形斜线区域）`, detail: `引导车辆按规定路线行驶，不得压线、越线或在导流线区域内停车。` },
  { category: `road_markings`, title: `网状线（黄色网格线）`, detail: `严禁任何车辆以任何理由在此区域内停车。常用于路口、单位出入口。` },
  { category: `road_markings`, title: `菱形预告标线`, detail: `白色菱形标线，表示前方不远处有人行横道（斑马线），提醒驾驶员提前减速。` },
  { category: `road_markings`, title: `车距确认标线`, detail: `高速公路上的白色折线，配合0m/50m/100m距离指示标志，帮助驾驶员确认安全跟车距离。` },
  { category: `road_markings`, title: `左转导向线`, detail: `白色虚线（或实线）弧形，引导左转车辆正确通过路口，避免与对向车辆冲突。` },
  { category: `road_markings`, title: `减速让行线`, detail: `由两条平行的白色虚线组成，配合倒三角「让」字标志。须减速让干道车辆先行。` },
  { category: `road_markings`, title: `公交专用道文字`, detail: `公交专用道地面文字通常为黄色，配合黄色标线使用，其他车辆不得在规定时段内占用。` },

  // ── 信号灯（10条）──
  { category: `traffic_lights`, title: `红灯右转`, detail: `红灯亮时，右转车辆在不妨碍被放行车辆和行人通行的情况下可以右转。有「禁止右转」标志的除外。` },
  { category: `traffic_lights`, title: `黄灯闪烁`, detail: `持续闪烁的黄灯是警示信号，表示路口无信号灯控制或信号灯故障。减速慢行，确认安全后通过。` },
  { category: `traffic_lights`, title: `黄灯已越线`, detail: `黄灯亮时，已越过停止线的车辆可以继续通行；未越过的应当停车，不得抢黄灯。` },
  { category: `traffic_lights`, title: `箭头信号灯优先`, detail: `箭头信号灯是车道专用信号，优先级高于圆形信号灯。按箭头指示方向行驶。` },
  { category: `traffic_lights`, title: `绿色箭头灯`, detail: `绿色箭头灯亮时，准许对应车道车辆按箭头指示方向通过路口。` },
  { category: `traffic_lights`, title: `红灯禁止直行`, detail: `红灯时严禁直行。唯一例外：交警指挥与信号灯不一致时，服从交警指挥。` },
  { category: `traffic_lights`, title: `交警手势优先级最高`, detail: `遇交通信号灯、交通标志、交通标线与交警指挥不一致时，服从交警的指挥。交警指挥具有最高优先级。` },
  { category: `traffic_lights`, title: `右转须避让`, detail: `右转车辆须避让直行机动车、直行非机动车以及正在通过人行横道的行人。` },
  { category: `traffic_lights`, title: `环岛出灯`, detail: `驶出环岛前应开启右转向灯。进入环岛的车辆应让行环岛内正在行驶的车辆。` },
  { category: `traffic_lights`, title: `等红灯禁止看手机`, detail: `等红灯时车辆仍处于行驶状态，使用手机（包括浏览、打电话）属于妨碍安全驾驶的违法行为。` },

  // ── 限速规定（13条）──
  { category: `speed_limits`, title: `城市道路默认限速`, detail: `在没有限速标志标线的城市道路上，最高行驶速度为50km/h。` },
  { category: `speed_limits`, title: `公路默认限速`, detail: `在没有限速标志标线的公路上（非城市道路），最高行驶速度为70km/h。` },
  { category: `speed_limits`, title: `高速公路最高限速`, detail: `小型载客汽车最高120km/h，其他机动车最高100km/h。` },
  { category: `speed_limits`, title: `高速公路最低限速`, detail: `最低60km/h。低于最低限速行驶同样属于违法行为，影响通行效率且有安全隐患。` },
  { category: `speed_limits`, title: `高速公路车道限速`, detail: `同向2车道：左100~120 / 右60~100；同向3车道：左110~120 / 中90~110 / 右60~90。` },
  { category: `speed_limits`, title: `特殊路段限速30km/h`, detail: `通过铁路道口、急弯路、窄路、窄桥、隧道、掉头、转弯、下陡坡、进出非机动车道时，最高不超过30km/h。` },
  { category: `speed_limits`, title: `能见度 < 200米`, detail: `高速公路最高60km/h，跟车距离 ≥ 100米，开启雾灯、近光灯、示廓灯、前后位灯。` },
  { category: `speed_limits`, title: `能见度 < 100米`, detail: `高速公路最高40km/h，跟车距离 ≥ 50米，除上述灯光外还须开启危险报警闪光灯（双闪）。` },
  { category: `speed_limits`, title: `能见度 < 50米`, detail: `高速公路最高20km/h，开启全部灯光，尽快从最近出口驶离高速或到服务区等候。` },
  { category: `speed_limits`, title: `雨雪天气降速`, detail: `雨雪天气路面附着力下降，建议车速降低20%~30%，保持更大的跟车距离。` },
  { category: `speed_limits`, title: `冰雪路面`, detail: `冰雪路面最高行驶速度不超过30km/h，制动距离大幅增加，须提前减速、避免急刹车。` },
  { category: `speed_limits`, title: `超速50%以上`, detail: `超过规定时速50%以上的，一次记12分，并处罚款，可并处吊销驾驶证。` },
  { category: `speed_limits`, title: `双向四车道含义`, detail: `双向四车道指两个方向各有两条车道。左侧为快车道/超车道，右侧为行车道。` },

  // ── 记分规则 2022版（14条）──
  { category: `demerit_points`, title: `记12分：饮酒驾车`, detail: `饮酒后驾驶机动车，一次记12分，暂扣驾照6个月，罚款1000~2000元。` },
  { category: `demerit_points`, title: `记12分：事故逃逸`, detail: `造成致人轻伤以上或死亡后逃逸，尚不构成犯罪的，一次记12分。` },
  { category: `demerit_points`, title: `记12分：伪造变造号牌`, detail: `使用伪造、变造的机动车号牌、行驶证、驾驶证，一次记12分。` },
  { category: `demerit_points`, title: `记12分：高速倒车逆行`, detail: `在高速公路上倒车、逆行、穿越中央分隔带掉头的，一次记12分。错过出口只能继续前行！` },
  { category: `demerit_points`, title: `记12分：校车客车超员`, detail: `驾驶校车、公路客运汽车、旅游客运汽车超员20%以上，一次记12分。` },
  { category: `demerit_points`, title: `记12分：买分卖分`, detail: `代替他人接受交通违法处罚和记分牟取利益的，一次记12分。2022年新规新增。` },
  { category: `demerit_points`, title: `记9分：高速快速路违停`, detail: `在高速公路或城市快速路上违法停车的，一次记9分。2022年从12分降至9分。` },
  { category: `demerit_points`, title: `记9分：准驾车型不符`, detail: `驾驶与驾驶证准驾车型不符的机动车，一次记9分。2022年从12分降至9分。` },
  { category: `demerit_points`, title: `记9分：遮挡污损号牌`, detail: `故意遮挡、污损机动车号牌的，一次记9分。2022年从12分降至9分，罚款200元。` },
  { category: `demerit_points`, title: `记6分：闯红灯`, detail: `驾驶机动车违反道路交通信号灯通行的，一次记6分，罚款200元。` },
  { category: `demerit_points`, title: `记3分：开车接打手机`, detail: `驾驶时拨打接听手持电话的，一次记3分。2022年从2分提升至3分。` },
  { category: `demerit_points`, title: `记1分：未系安全带`, detail: `驾驶机动车未按规定使用安全带的，一次记1分，并处罚款。无论前排后排都应系好。` },
  { category: `demerit_points`, title: `记1分：违规倒车掉头`, detail: `在普通道路上不按规定倒车、掉头的，一次记1分。2022年从3分降至1分。高速公路上仍记12分。` },
  { category: `demerit_points`, title: `记分周期与满分后果`, detail: `记分周期为12个月，满分12分。累积达到12分→扣留驾驶证→参加7天满分学习→通过科目一考试后方可恢复。` },

  // ── 高速公路（10条）──
  { category: `expressway`, title: `安全跟车距离`, detail: `车速超过100km/h时，跟车距离 ≥ 100米；车速低于100km/h时，跟车距离不少于50米。` },
  { category: `expressway`, title: `故障警示牌距离`, detail: `高速公路上发生故障，三角警示牌应放在车后150米外。普通道路为50~100米。人员须撤离到护栏外。` },
  { category: `expressway`, title: `匝道汇入主路`, detail: `在加速车道提速至与主路车流接近的速度（60km/h以上），打左转向灯，观察左后方，确认安全后平稳汇入。不要在匝道口停车等待。` },
  { category: `expressway`, title: `严禁倒车和逆行`, detail: `高速公路上严禁倒车、逆行、穿越中央隔离带掉头、在行车道上停车。错过出口继续前行从下一出口驶出。` },
  { category: `expressway`, title: `疲劳驾驶规定`, detail: `连续驾驶机动车超过4小时必须停车休息，休息时间不少于20分钟。《实施条例》第62条，法定义务，违反将受处罚。` },
  { category: `expressway`, title: `横风应对`, detail: `紧握方向盘，适当降低车速，不要急打方向或猛踩刹车。横风路段通常有标志提前提示。` },
  { category: `expressway`, title: `夜间灯光使用`, detail: `前方和对向均无车辆时可使用远光灯。跟车或会车时应改用近光灯，距对向来车150米外切换。` },
  { category: `expressway`, title: `错过出口怎么办`, detail: `继续前行至下一出口驶出，严禁倒车、逆行或紧急停车。提前1~2公里变到最右侧车道。` },
  { category: `expressway`, title: `堵车排尾防追尾`, detail: `在高速公路上遇前方堵车停在队伍最后方时，应开启双闪灯警示后车，时刻观察后视镜，警惕后方来车追尾。` },
  { category: `expressway`, title: `收费站通行`, detail: `按车道指示标志有序排队。ETC车辆走ETC专用车道，不要误入后倒车退出。` },

  // ── 违法处罚（8条）──
  { category: `penalties`, title: `酒驾处罚`, detail: `血液酒精含量20~80mg/100ml：暂扣驾驶证6个月，并处1000~2000元罚款，记12分。` },
  { category: `penalties`, title: `醉驾处罚`, detail: `血液酒精含量 ≥ 80mg/100ml：吊销驾驶证，依法追究刑事责任（拘役1~6个月+罚金），5年内不得重新申领。醉驾已入刑！` },
  { category: `penalties`, title: `事故逃逸处罚`, detail: `造成交通事故后逃逸尚不构成犯罪的：记12分，罚款200~2000元，可并处15日以下拘留。构成犯罪的终生禁驾。` },
  { category: `penalties`, title: `伪造变造号牌处罚`, detail: `扣留机动车，处15日以下拘留，罚款2000~5000元，记12分。情节严重追究刑事责任。` },
  { category: `penalties`, title: `无证驾驶处罚`, detail: `未取得驾照或驾照被吊销/暂扣期间驾车：罚款200~2000元，可并处15日以下拘留。` },
  { category: `penalties`, title: `借车给无证人员`, detail: `将机动车交给无证人员驾驶：车主罚款200~2000元，可并处吊销驾驶证。` },
  { category: `penalties`, title: `驾驶拼装报废车`, detail: `收缴车辆强制报废，罚款200~2000元，吊销驾驶证。` },
  { category: `penalties`, title: `毒驾处罚`, detail: `吸食、注射毒品后驾驶机动车：注销驾驶证，移交公安机关处理。吸毒人员3年内不得申领驾驶证。` },

  // ── 安全常识（11条）──
  { category: `safety`, title: `爆胎应对`, detail: `紧握方向盘，缓慢松油门让车自然减速，不要急踩刹车或猛打方向！稳定后将车移至安全地带更换备胎或等待救援。` },
  { category: `safety`, title: `涉水熄火`, detail: `千万不要重新启动发动机！否则会导致发动机严重损坏（顶缸）。应下车将车推出积水区或拨打救援电话。` },
  { category: `safety`, title: `刹车失灵`, detail: `松开油门，抢挂低速挡利用发动机制动减速；间歇拉手刹（不要一次拉死）；必要时利用护栏、山体等障碍物摩擦停车。` },
  { category: `safety`, title: `ABS的作用`, detail: `防抱死制动系统在紧急制动时防止车轮抱死，保持转向能力——让驾驶员在全力刹车的同时仍能打方向避让障碍物。` },
  { category: `safety`, title: `安全带的重要性`, detail: `安全带是车辆被动安全系统中最重要的保护装置，可将碰撞死亡风险降低50%以上。无论前后排都应系好。` },
  { category: `safety`, title: `儿童乘车安全`, detail: `12岁以下儿童应使用儿童安全座椅，不应坐副驾驶位置——安全气囊弹出会严重伤害小孩。成人安全带不适合儿童体型。` },
  { category: `safety`, title: `动物突然冲出`, detail: `紧握方向盘，踩刹车减速，不要急打方向避让！急打方向可能导致车辆失控翻覆或撞向其他车辆/护栏。` },
  { category: `safety`, title: `发动机舱冒烟`, detail: `立即靠边停车熄火，不要打开引擎盖（新鲜空气可能引发明火），远离车辆，在安全距离外观察并拨打119报警。` },
  { category: `safety`, title: `车辆落水自救`, detail: `解安全带→尝试开车窗/天窗逃生→打不开时用安全锤砸侧窗玻璃四角→爬出。不要尝试开车门，水压太大打不开。` },
  { category: `safety`, title: `大风天气行车`, detail: `降低车速，双手紧握方向盘，注意横风路段标志，远离大型车辆（大车受风面积大、易侧翻），避免在高架桥等风口路段停留。` },
  { category: `safety`, title: `夜间会车灯光`, detail: `距对向来车150米外改用近光灯；跟车行驶时也应使用近光灯；无照明的路段可开启远光灯但会车时必须切换。` },
];
