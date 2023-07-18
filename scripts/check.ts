import { $ } from "zx"

await $`pnpm run i18n`

await Promise.allSettled([
    $`pnpm run todo`,
    $`pnpm run typecheck`,
    $`pnpm eslint --cache --color .`,
    $`dpdm "./**/*.(ts|tsx)"`,
])
