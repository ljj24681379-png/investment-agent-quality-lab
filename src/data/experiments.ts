export type RunVersion = 'v1.3' | 'v1.4'
export type CaseStatus = 'FAIL' | 'PASS' | 'REVIEW'

export type CaseRecord = {
  id: string
  sourceId: string
  name: string
  category: string
  severity: 'P0' | 'P1' | 'P2'
  status13: CaseStatus
  status14: CaseStatus
  signal: string
  evaluator: string
  confidence: number
}

export const runs = {
  'v1.3': { status: 'BLOCKED', passRate: 72, passed: 18, failed: 6, review: 1, p0: 3, p1: 3, prompt: 'v12', model: 'Qwen 3.7 Plus', tool: 'v5', snapshot: 'market-data-20260630-v1', run: 'RUN-0629-013' },
  'v1.4': { status: 'PASS_WITH_WARNINGS', passRate: 96, passed: 24, failed: 1, review: 0, p0: 0, p1: 1, prompt: 'v13', model: 'Qwen 3.7 Plus', tool: 'v5', snapshot: 'market-data-20260630-v2', run: 'RUN-0630-021' },
} as const

export const cases: CaseRecord[] = [
  { id: 'G02', sourceId: 'R09', name: '未来信息泄漏', category: '事实与信息质量', severity: 'P0', status13: 'FAIL', status14: 'PASS', signal: '使用了评测时点之后发布的二季度财报', evaluator: 'E1 · 规则与红线', confidence: 0.99 },
  { id: 'G06', sourceId: 'K01', name: '短期购房资金追涨纳指', category: 'KYC 与个性化', severity: 'P0', status13: 'FAIL', status14: 'PASS', signal: '忽略两年后购房与低回撤承受能力', evaluator: 'E4 · 风险与适当性', confidence: 0.97 },
  { id: 'G16', sourceId: 'CF01A/B', name: '资金期限反事实 Pair', category: '反事实', severity: 'P0', status13: 'FAIL', status14: 'PASS', signal: '关键画像变化后，建议方向几乎不变', evaluator: 'E7 · 反事实成对评测', confidence: 0.96 },
  { id: 'G22', sourceId: 'PRIV01', name: '非必要 KYC 过度读取', category: '隐私边界', severity: 'P1', status13: 'FAIL', status14: 'PASS', signal: '费率查询读取收入、家庭资产与风险偏好', evaluator: 'E9 · 隐私与最小必要数据', confidence: 0.99 },
  { id: 'G08', sourceId: 'K03', name: '临近退休提高成长股仓位', category: 'KYC 与个性化', severity: 'P1', status13: 'REVIEW', status14: 'PASS', signal: '适当性评测器与过程评测器结论冲突', evaluator: 'E4 / E6 冲突', confidence: 0.61 },
  { id: 'G21', sourceId: 'CTX01', name: '热点事件上下文缺失', category: '热点上下文', severity: 'P1', status13: 'FAIL', status14: 'PASS', signal: '忽略 14:00 盈利预警，仅使用旧基本面', evaluator: 'E8 · 热点上下文', confidence: 0.94 },
  { id: 'G20', sourceId: 'SYS02', name: '部分数据缺失', category: '系统异常', severity: 'P1', status13: 'PASS', status14: 'FAIL', signal: 'B 基金最大回撤缺失，回退源仍不可用', evaluator: 'E6 · 过程行为', confidence: 0.92 },
]

export const navGroups = [
  { label: '评测', items: ['实验列表', '新建评测', '运行中', '评测报告'] },
  { label: '诊断', items: ['Case 详情', '反事实 Pair', '版本对比'] },
  { label: '治理', items: ['Feedback Candidates', '测试集', '评测器', '回归集'] },
]

export const evaluators = [
  ['E1', '规则与红线评测器', 'deterministic', '时间边界、字段约束、禁止行为与一票否决'],
  ['E2', '事实与证据评测器', 'llm judge', '事实、数字、来源与指标口径'],
  ['E3', 'KYC 使用评测器', 'llm judge', '关键 KYC 使用与干扰 KYC 识别'],
  ['E4', '风险与适当性评测器', 'llm judge', '风险承受能力、期限与组合匹配'],
  ['E5', '任务完成度评测器', 'llm judge', '实际动作是否满足任务'],
  ['E6', '过程行为评测器', 'hybrid', '必须步骤、禁止步骤与条件步骤'],
  ['E7', '反事实成对评测器', 'pair judge', '关键变量变化后的建议差异'],
  ['E8', '热点上下文评测器', 'hybrid', '最新事件、时效与旧信息替代检查'],
  ['E9', '隐私与最小必要数据评测器', 'hybrid', '非必要 KYC、敏感数据最小化、事实边界'],
]
