# Investment Agent Quality Lab

[![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-1f6feb)](https://ljj24681379-png.github.io/investment-agent-quality-lab/)
[![Deploy GitHub Pages](https://github.com/ljj24681379-png/investment-agent-quality-lab/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/ljj24681379-png/investment-agent-quality-lab/actions/workflows/deploy-pages.yml)

投资 Agent 上线前质量评测与治理工作台。项目以 `07_Codex开发Prompt_V2.md` 为唯一产品需求基线，以 `gold_set_v2.json` 为测试集数据源，以 `evaluator_config_v2.json` 为评测器、Case 映射与最终裁决配置。

## 在线访问

- Web Demo：<https://ljj24681379-png.github.io/investment-agent-quality-lab/>
- 技术栈：React 19 + TypeScript + Vite
- 数据形态：本地 Mock Data；不连接真实用户、行情或生产 KYC 系统

## 目标用户

投资 Agent 的产品、评测、风控、合规和工程团队。核心任务是把“模型看起来能回答”转化为可解释、可追溯、可裁决的上线依据。

## Demo 主链路

1. 打开 Agent v1.3 报告，Release Gate 为 `BLOCKED`。
2. 查看 G02：未来信息泄漏，命中 P0 一票否决。
3. 查看 G16：反事实 Pair 在关键 KYC 改变后建议几乎不变。
4. 查看 G22：费率查询读取无关 KYC，违反最小必要数据原则。
5. 完成 G08 的轻量人工复核。
6. 查看 Feedback Candidates，并确认其不直接影响 Release Gate。
7. 对比 v1.4：P0 归零，通过率从 72% 提升到 96%。
8. 查看仍存在的 G20 Regression。

## 本地运行

要求 Node.js 20+（CI 使用 Node.js 22）。

```bash
npm ci
npm run dev
```

生产构建与本地预览：

```bash
npm run build
npm run preview
```

## 测试与验证

```bash
npm test       # 校验 Gold Set 和 evaluator config 的关键合同
npm run build  # TypeScript 编译 + Vite 生产构建
npm run validate
```

完整测试策略与人工演示用例见 [`docs/test-plan.md`](docs/test-plan.md)，最近一次验证记录见 [`docs/validation-record.md`](docs/validation-record.md)。

## 仓库结构

```text
src/
  App.tsx                         # 现有页面与交互主实现
  main.tsx                        # React 入口
  styles.css                     # 现有视觉样式
  data/
    gold_set_v2.json             # 测试集原始数据
    evaluator_config_v2.json     # 评测器与裁决配置
    experiments.ts               # Demo 实验与 Case 展示数据
    feedbackCandidates.ts        # 用户反馈候选数据
docs/
  architecture.md
  evaluation-methodology.md
  test-plan.md
  validation-record.md
  ai-usage-log.md
  known-limitations.md
tests/
  data-contract.test.mjs
dist/                             # 当前可部署构建产物
```

## 核心设计

产品闭环：创建实验 → 自动评测 → 必要时人工复核 → 上线裁决 → Bad Case 诊断 → 修复重跑 → 版本对比 → 回归。

辅助闭环：用户反馈 → 候选 Bad Case → 人工复核 → 加入回归集。

## 评测角色分工

- 自动评测：执行稳定回归和明确规则判断，可参与最终裁决。
- 数据核验：核验行情、财务、基金、公告和新闻等客观事实。
- 人工复核：只处理评测器冲突、低置信度 P0/P1 和新型 Bad Case。
- 用户反馈：只负责发现潜在问题，不能直接决定 Release Gate。
- 失败诊断 Agent：解释失败并给出修复建议，不负责最终 PASS/FAIL 裁决。

## 事实与个性化边界

事实层不因人改变，建议层应在相关 KYC 约束下变化。股价、财务数据、基金费率、公告内容和发布时间属于不可个性化事实；是否适合购买、配置比例、风险提示和追问策略可以个性化。

## 隐私与合规

遵循最小必要数据原则。G22 明确展示：查询 ETF 管理费只需要官方产品资料，不应读取收入、家庭资产、风险偏好或投资目标。

## 部署

`main` 分支每次提交都会运行 `.github/workflows/deploy-pages.yml`：安装锁定依赖、运行测试、生成 `dist/`，再发布到 GitHub Pages。仓库同时保留 `dist/` 作为可审阅的当前构建快照。

## 文档索引

- [系统架构](docs/architecture.md)
- [评测方法论](docs/evaluation-methodology.md)
- [测试计划](docs/test-plan.md)
- [验证记录](docs/validation-record.md)
- [AI 使用记录](docs/ai-usage-log.md)
- [已知边界](docs/known-limitations.md)

## 未做事项

当前没有实现真实模型调用、真实行情/KYC 数据接入、复杂标注系统、权限系统或持久化后端。这些边界是有意保留的 Demo 范围，不应被理解为生产能力。
