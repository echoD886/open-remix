# Prompt Optimization Feature Fix

## Problem

The prompt optimization feature was showing "Prompt optimization failed. Try again or turn it off." error when users enabled it, because the DeepSeek API key was not configured.

### Root Cause

1. The prompt optimization toggle was always visible in the UI, regardless of whether DeepSeek was configured
2. When users enabled it and tried to generate content, the backend would throw "Prompt optimization is not configured" error
3. The UI showed this as a generic failure message without guiding users to the admin settings

## Solution

### Changes Made

1. **Added `prompt_optimization_enabled` to public config API** (`src/routes/api/config/public.ts`)
   - Exposes whether DeepSeek is configured (checks for `deepseek_api_key`)
   - Similar pattern to other feature flags like `product_video_enabled`, `google_auth_enabled`, etc.

2. **Conditionally render the prompt optimization toggle** (in both composer locations)
   - `src/blocks/ai-generator-workbench.tsx` - Main generator workbench
   - `src/blocks/seedance-home.tsx` - Homepage creation composer
   - Toggle only shows when `publicConfig.data?.prompt_optimization_enabled === "true"`

### How It Works

```typescript
// Backend checks if DeepSeek API key is configured
result.prompt_optimization_enabled = !!configs.deepseek_api_key ? 'true' : 'false';

// Frontend conditionally renders the toggle
const promptOptimizationAvailable =
  publicConfig.data?.prompt_optimization_enabled === "true";

{promptOptimizationAvailable && (
  <PromptOptimizationToggle ... />
)}
```

## Configuration

To enable prompt optimization, administrators need to:

1. Go to Admin → Settings → AI tab
2. Find the "DeepSeek" section
3. Enter a valid DeepSeek API key
4. Optionally configure the prompt optimization model (defaults to `deepseek-v4-flash`)

Once configured, the prompt optimization toggle will automatically appear for all users in the composer.

## Architecture Design

This fix follows the project's existing pattern for feature gating:

- **Server-side validation**: The API key check happens in `resolveDeepSeekPromptConfig()`
- **Public config exposure**: Feature availability is exposed through `/api/config/public`
- **Client-side rendering**: Components conditionally render based on public config
- **Security**: API keys remain server-only; only the enabled/disabled status is public

This ensures:
- No broken UI elements (toggle doesn't appear unless functional)
- Clear admin control (configure once, applies to all users)
- Consistent with other optional features in the system

## Testing

1. **Without DeepSeek configured**: Toggle should not appear in composers
2. **With DeepSeek configured**: Toggle appears and works correctly
3. **Build verification**: `pnpm build` passes successfully

## Files Modified

- `src/routes/api/config/public.ts` - Added prompt_optimization_enabled flag
- `src/blocks/ai-generator-workbench.tsx` - Conditional toggle rendering
- `src/blocks/seedance-home.tsx` - Added usePublicConfig hook + conditional rendering

## Related Code

- DeepSeek optimizer: `src/core/ai/deepseek-prompt-optimizer.ts`
- Config service: `src/modules/config/service.ts`
- Settings definitions: `src/modules/config/settings.ts`
- API route: `src/routes/api/ai/prompt/optimize.ts`
