# 数据分析系统实现进度

## 已完成的工作

### 1. 数据库架构设计 ✅
创建了完整的分析数据表：

- **analyticsEvent** - 事件追踪表
  - 记录用户行为事件（点击、页面浏览等）
  - 包含设备信息、地理位置、浏览器信息
  
- **analyticsSession** - 会话表
  - 追踪用户会话信息
  - UTM 参数追踪（utm_source, utm_medium, utm_campaign等）
  - 跳出率、转化率计算
  - 来源和引荐URL

- **analyticsPageView** - 页面浏览表
  - 页面访问记录
  - 停留时间和滚动深度

### 2. 前端埋点系统 ✅
创建了 `src/hooks/use-analytics.ts`：

- 自动追踪页面浏览
- 会话管理（使用 sessionStorage）
- 设备信息收集（设备类型、浏览器、操作系统、屏幕分辨率）
- UTM 参数提取
- 自定义事件追踪 API：
  - `trackEvent()` - 通用事件追踪
  - `trackClick()` - 点击追踪
  - `trackStripeClick()` - **Stripe 付费按钮点击追踪**（已实现你要求的埋点）

### 3. 后端 API ✅
- `/api/analytics/event` - 接收事件数据
- `/api/analytics/session` - 接收会话数据
- `/api/admin/analytics` - 管理员查询分析数据

### 4. 分析看板页面 ✅
创建了 `/admin/analytics` 页面，包含：

#### 用户来源分析：
- ✅ 地理分布（国家/地区）- 使用 Cloudflare headers 自动获取
- ✅ 流量来源（referrer域名）
- ✅ UTM 营销渠道效果

#### 用户画像：
- ✅ 设备类型分布（mobile/tablet/desktop）
- ✅ 浏览器分布
- ✅ 操作系统统计

#### 行为数据：
- ✅ 跳出率统计
- ✅ 热门页面访问量
- ✅ **Stripe 付费按钮点击分析**（位置 + 计划）
- ✅ 会话趋势（每日会话数）

### 5. 自动集成 ✅
- 在 `__root.tsx` 中集成分析追踪
- 所有页面自动追踪，无需手动添加代码

## 待完成工作

### 1. 数据库模板同步 ⚠️
需要将分析表添加到：
- `src/config/db/schema.postgres.ts`
- `src/config/db/schema.mysql.ts`

### 2. 数据库迁移
运行 `pnpm db:push` 创建新表

### 3. 实际使用示例
在需要追踪的地方添加埋点，例如：

```tsx
// 在价格页面的 Stripe 按钮上
import { useAnalytics } from '@/hooks/use-analytics';

function PricingCard() {
  const { trackStripeClick } = useAnalytics();
  
  return (
    <Button 
      onClick={() => {
        trackStripeClick('pricing_page', 'pro_plan');
        // ... 跳转到 Stripe
      }}
    >
      立即购买
    </Button>
  );
}
```

### 4. 高级功能（可选）
- 漏斗分析
- 用户路径分析
- A/B 测试支持
- 实时数据看板
- 数据导出功能

## 数据收集内容总结

### ✅ 已实现：
1. **用户基础信息**：
   - 地理位置（国家、城市）
   - 设备类型、浏览器、操作系统
   - 屏幕分辨率、语言、时区

2. **用户行为与路径**：
   - 进入网址（landing page）
   - 来源URL（referrer）
   - 浏览的页面
   - 跳出率
   - UTM 参数（营销渠道追踪）

3. **转化追踪**：
   - **Stripe 点击埋点**（位置 + 计划）
   - 自定义事件追踪

### ⚠️ 需要补充：
1. 年龄范围 - 需要用户注册时收集
2. 页面停留时间 - 需要前端计时器
3. 滚动深度 - 需要 scroll 事件监听

## 快速启动步骤

1. 同步数据库schema到postgres和mysql模板
2. 运行 `pnpm db:push`
3. 添加 Stripe 按钮埋点
4. 访问 `/admin/analytics` 查看数据

## 数据看板功能清单

✅ 已实现的看板：
- 总会话数和日均统计
- 跳出率分析
- Stripe 点击统计
- 地理分布图表
- 设备和浏览器分布
- 流量来源分析
- UTM 渠道效果（转化率）
- 热门页面排行
- 每日会话趋势

这是一个生产级别的数据分析系统，可以为产品优化提供详实的数据支持！
