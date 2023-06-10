import { $ } from "zx"

await $`pnpm run i18n --no-watch`

await Promise.allSettled([
    $`pnpm rome format .`,
    $`pnpm rome check .`,
    $`pnpm tsc --noEmit`,
    $`pnpm eslint --color src`,
    $`dpdm "./**/*.(ts|tsx)"`,
])
