# 测试计划

## 自动检查

| 检查 | 命令 | 通过标准 |
|---|---|---|
| 数据合同 | `npm test` | 22 个评测单元、25 个运行 Case、9 个评测器及关键映射保持完整 |
| 类型与构建 | `npm run build` | TypeScript 无错误，Vite 生成 `dist/` |
| 全量校验 | `npm run validate` | 数据合同与生产构建全部通过 |

## 主链路人工检查

1. 首页显示 Agent v1.3、72% 通过率、3 条 P0、Release Gate `BLOCKED`。
2. 点击 G02，Expected vs Actual 和 Trace 明确展示 2026-07-20 未来信息。
3. 打开 G16 Pair，A/B KYC 不同但 Agent Answer 基本相同，结果为 P0 FAIL。
4. 打开 G22，显示必要数据与实际读取，并出现“违反最小必要数据原则”。
5. 打开 G08 Review Drawer，接受自动判定后待复核数量归零。
6. 打开 Feedback Candidates，页面明确说明“不影响 Release Gate”。
7. 打开版本对比，v1.4 显示 96%、P0 归零、Data Snapshot 变化。
8. 点击 G20 Regression，详情说明缺失字段与回退源失败。

## 回归检查

- 左侧导航所有入口可点击。
- 页面无水平内容截断（桌面宽度 ≥ 1180px）。
- 浏览器控制台没有 error/warn。
- GitHub Pages 首页、JS 和 CSS 均返回 HTTP 200。
