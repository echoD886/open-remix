# Regenerate统一性问题修复方案

## 问题描述

**用户场景**：
- 生成一套6张图（比如服装电商套图）
- 5张满意，1张不满意
- 重新生成那1张时，风格不一致（前5张是"北欧简约"，重新生成的变成"工业风"）

**根本原因**：
- 首次生成整套时，AI基于`creativeVariationKey`选择了创意风格
- AI还生成了`visualIdentity`（产品身份描述、不可变细节、禁止替换）
- 但regenerate时，这些**整套上下文没有传递给AI**
- AI像生成新图一样，不知道要和其他5张保持一致

## 解决方案

### **核心思路**：把整套的"创意上下文"存储在batch层，regenerate时读取并传递

### **实施步骤**

#### **1. 存储创意上下文（初始生成时）**

```typescript
// src/modules/image-generations/service.ts

import {
  type BatchCreativeContext,
  embedCreativeContext,
} from './creative-context';

async function createBatch(params: CreateImageBatchParams) {
  // ... 现有代码
  
  // 如果是产品工作流，调用planProductSetWithEvolink
  if (params.workflowKind === 'product') {
    const plan = await planProductSetWithEvolink({
      prompt: params.generalPrompt,
      creativeVariationKey: params.creativeVariationKey,
      // ...
    });
    
    // 🔑 新增：提取并保存创意上下文
    const creativeContext: BatchCreativeContext = {
      creativeVariationKey: params.creativeVariationKey || '',
      visualIdentity: plan.visualIdentity, // AI生成的产品身份
      selectedCreativeWorld: plan.selectedCreativeWorld, // AI选择的风格
      profileId: params.platform || 'universal',
      marketplaceRequirements: params.marketplaceRequirements,
    };
    
    // 嵌入到initialRuleProfileSnapshot
    const enhancedProfile = embedCreativeContext(
      params.initialRuleProfileSnapshot || {},
      creativeContext,
    );
    
    // 存储
    await tx.insert(imageGenerationBatch).values({
      // ...
      initialRuleProfileSnapshot: JSON.stringify(enhancedProfile),
      // ...
    });
  }
}
```

#### **2. Regenerate时读取并传递上下文**

```typescript
// src/modules/image-generations/service.ts

import {
  extractCreativeContext,
  buildRegenerateInstruction,
  validateRegenerateConsistency,
} from './creative-context';

async function createCardAction(params: CreateCardActionParams) {
  // ... 现有代码
  
  const { card: sourceCard, batch } = await findOwnedCard(...);
  const sourceRevision = /* ... 找到父revision ... */;
  
  // 🔑 新增：读取整套的创意上下文
  const creativeContext = extractCreativeContext(batch);
  
  // 🔑 新增：构建保持统一性的指令
  let effectiveInstruction = sourceRevision.userInstruction || '';
  
  if (params.action === 'regenerate' && creativeContext) {
    effectiveInstruction = buildRegenerateInstruction({
      originalInstruction: sourceRevision.userInstruction || '',
      userInstruction: params.userInstruction,
      creativeContext,
      cardRole: sourceCard.slotRole || 'main',
    });
  } else if (params.userInstruction) {
    // 用户有新指令但没有上下文，直接用
    effectiveInstruction = params.userInstruction;
  }
  
  // 存储revision时使用增强后的指令
  await tx.insert(imageGenerationRevision).values({
    // ...
    userInstruction: effectiveInstruction, // 🔑 包含了统一性约束
    // ...
  });
}
```

#### **3. 执行时验证（可选但推荐）**

```typescript
// 在AI返回结果后，验证是否保持了统一性
async function validateRevisionOutput(
  revision: ImageGenerationRevision,
  batch: ImageGenerationBatch,
) {
  const creativeContext = extractCreativeContext(batch);
  
  if (creativeContext && revision.action !== 'initial') {
    const validation = validateRegenerateConsistency({
      regeneratedInstruction: revision.userInstruction || '',
      creativeContext,
    });
    
    if (!validation.valid) {
      console.warn(
        `Regenerate consistency warnings for revision ${revision.id}:`,
        validation.warnings,
      );
      
      // 可选：记录到数据库用于分析
      // await logConsistencyWarnings(revision.id, validation.warnings);
    }
  }
}
```

## 数据流示意

### **首次生成**

```
用户输入
  ├─ prompt: "蓝色牛仔夹克，金色纽扣"
  ├─ creativeVariationKey: "batch-abc123"
  └─ references: [前视图.jpg, 细节图.jpg]

↓ planProductSetWithEvolink

AI返回
  ├─ visualIdentity: {
  │    description: "蓝色水洗牛仔夹克，经典五粒金色金属纽扣...",
  │    immutableDetails: ["金色纽扣", "水洗蓝色", "牛仔材质"],
  │    forbiddenSubstitutions: ["黑色夹克", "银色纽扣", "拉链款式"]
  │  }
  ├─ selectedCreativeWorld: "clean-scandinavian"
  └─ cards: [main, supporting, lifestyle, ...]

↓ 存储到batch.initialRuleProfileSnapshot

{
  ...原有规则,
  creativeContext: {
    creativeVariationKey: "batch-abc123",
    visualIdentity: { ... },
    selectedCreativeWorld: "clean-scandinavian",
    profileId: "amazon-us"
  }
}
```

### **Regenerate单张**

```
用户操作
  ├─ sourceCardId: "card-3" (lifestyle卡片)
  ├─ action: "regenerate"
  └─ userInstruction: "换个更明亮的场景"

↓ createCardAction

读取batch.initialRuleProfileSnapshot
  ↓
提取creativeContext
  ↓
构建增强指令 = buildRegenerateInstruction({
  originalInstruction: "一张aspirational lifestyle照...",
  userInstruction: "换个更明亮的场景",
  creativeContext: { /* 整套约束 */ }
})

↓ 最终传给AI的指令

PRODUCT IDENTITY (MUST PRESERVE):
蓝色水洗牛仔夹克，经典五粒金色金属纽扣...
Immutable details: 金色纽扣; 水洗蓝色; 牛仔材质.
Forbidden substitutions: 黑色夹克; 银色纽扣; 拉链款式.

CREATIVE WORLD (MUST MATCH SIBLING CARDS):
This card is part of a set using "clean-scandinavian" aesthetic.
Maintain consistent visual language, color palette, lighting style...

ORIGINAL CARD INSTRUCTION:
一张aspirational lifestyle照...

USER MODIFICATION REQUEST:
换个更明亮的场景

CONSISTENCY REQUIREMENT:
This is a regeneration of one card within an existing set.
The regenerated result MUST be visually coherent with sibling cards...
```

## 优势

✅ **完全向后兼容**：
   - 旧batch没有`creativeContext`，`extractCreativeContext`返回null
   - 降级到现有行为，不会报错

✅ **自动传播**：
   - 首次生成时自动保存上下文
   - Regenerate时自动读取并应用
   - 用户无感知，但结果更一致

✅ **灵活修改**：
   - 用户仍然可以提供`userInstruction`修改细节
   - 但修改会被"框住"在整套风格内

✅ **可观测**：
   - `validateRegenerateConsistency`可以检测不一致
   - 记录警告用于分析和改进

## 实施优先级

### **P0（必须）**：
1. ✅ 创建`creative-context.ts`（已完成）
2. ⚠️ 修改`createBatch`保存上下文
3. ⚠️ 修改`createCardAction`读取并使用上下文

### **P1（推荐）**：
4. 修改`planProductSetWithEvolink`返回`selectedCreativeWorld`
5. 添加验证逻辑

### **P2（可选）**：
6. 在UI显示"整套风格"指示器
7. 允许用户主动"切换风格"（创建新batch）

## 测试验证

```typescript
// 测试用例
test('regenerate preserves creative context', async () => {
  // 1. 创建一套图
  const batch = await service.createBatch({
    workflowKind: 'product',
    prompt: '蓝色夹克',
    creativeVariationKey: 'test-key-001',
    // ...
  });
  
  // 2. 验证上下文已保存
  const context = extractCreativeContext(batch);
  assert.ok(context);
  assert.equal(context.creativeVariationKey, 'test-key-001');
  assert.ok(context.visualIdentity);
  
  // 3. Regenerate一张
  const cardId = batch.cards[2].id;
  const action = await service.createCardAction({
    sourceCardId: cardId,
    action: 'regenerate',
    userInstruction: '换个场景',
    // ...
  });
  
  // 4. 验证新revision的指令包含了统一性约束
  const revision = await getRevision(action.revisionId);
  assert.match(revision.userInstruction, /PRODUCT IDENTITY/);
  assert.match(revision.userInstruction, /CREATIVE WORLD/);
  assert.match(revision.userInstruction, /CONSISTENCY REQUIREMENT/);
});
```

## 注意事项

⚠️ **指令长度**：
- 增强后的指令会更长（+500-1000字符）
- 确保不超过模型的prompt限制
- 如果太长，可以压缩`buildRegenerateInstruction`的模板

⚠️ **兼容性**：
- `planProductSetWithEvolink`可能需要修改才能返回`selectedCreativeWorld`
- 如果改不了，可以在`createBatch`时重新计算：
  ```typescript
  selectedCreativeWorld: creativeVariationDirection({
    creativeVariationKey: params.creativeVariationKey,
    prompt: params.generalPrompt,
  })
  ```

⚠️ **性能**：
- `extractCreativeContext`每次regenerate都调用
- profile通常<10KB，JSON.parse开销可接受
- 如果有性能问题，可以加个LRU缓存
