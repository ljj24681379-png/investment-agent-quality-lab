# AI 使用记录

## 使用范围

Codex 用于：

- 将指定 Prompt 转化为 React/TypeScript 页面结构。
- 基于 `gold_set_v2.json` 提取 Demo 关键 Case。
- 基于 `evaluator_config_v2.json` 映射评测器和裁决逻辑。
- 实现 Mock Data、页面交互、样式和 GitHub Pages 部署。
- 执行编译、浏览器点击、截图和数据合同验证。

## 人工约束

- 产品逻辑以 `07_Codex开发Prompt_V2.md` 为唯一主需求基线。
- JSON 只承担各自声明的测试集与评测配置职责。
- 未使用 YAML 覆盖 JSON。
- 未添加主需求之外的业务流程。
- 用户反馈明确保持为非裁决信号。

## 关键人工判断

- 采用单页本地状态保证 90–120 秒演示流畅。
- 保留高信息密度、克制的 FinTech 内部工具视觉。
- 仅对 G08 使用轻量 Review Drawer，不扩展复杂标注平台。
- 通过 GitHub Pages 解决原 `chatgpt.site` 边缘访问限制。

## 产品级打磨

- AI 协助扫描页面中的英文残留、重复说明和过小辅助文字。
- 人工确认保留 Agent、KYC、Prompt、Trace、Gold Set、Case、Pair、标准状态码等必要术语。
- 只调整界面表达和信息层级，未改变 Gold Set、评测器映射、裁决规则或 Demo 主流程。
- 使用 Edge 实际渲染检查报告首屏，并通过自动测试与生产构建复核结果。
