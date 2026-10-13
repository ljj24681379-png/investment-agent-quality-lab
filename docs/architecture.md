# 系统架构

## 目标

本项目是桌面优先的单页演示应用，重点展示投资 Agent 上线前评测、诊断、人工复核和版本回归闭环。当前实现不连接生产服务，所有状态均在浏览器会话内完成。

## 分层

```text
React UI
  ├─ 报告与 Release Gate
  ├─ Case / Trace / Expected vs Actual
  ├─ Counterfactual Pair
  ├─ Human Review Drawer
  ├─ 用户反馈候选
  └─ Version Compare
        │
Demo View Models (experiments.ts / feedbackCandidates.ts)
        │
Source of Truth (gold_set_v2.json / evaluator_config_v2.json)
```

## 数据职责

- `gold_set_v2.json`：只定义测试 Case、事实、必需/禁止行为、过程规则与 Gold 标签。
- `evaluator_config_v2.json`：只定义评测器、Case 映射、裁决规则和治理角色。
- `experiments.ts`：把 Demo 需要展示的 v1.3/v1.4 运行结果整理为前端 View Model，不反向修改 JSON 基线。
- `feedbackCandidates.ts`：线上行为候选示例，仅进入候选池。

## 状态模型

页面状态由 React 本地状态管理：当前页面、版本、选中 Case、人工复核状态和短暂提示。刷新页面会回到 v1.3 报告，这是当前演示版本的预期行为。

## 发布

GitHub Actions 使用锁文件安装依赖，运行数据合同测试和生产构建，将 `dist/` 发布到 GitHub Pages。Vite 使用相对资源路径，兼容仓库子路径部署。
