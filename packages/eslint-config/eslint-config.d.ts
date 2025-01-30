declare module '@kalink/eslint-config/base' {
  export const base: import('eslint').Linter.Config;
}

declare module '@kalink/eslint-config/react' {
  export const reactConfig: import('eslint').Linter.Config;
}

declare module '@kalink/eslint-config/next-js' {
  export const nextJsConfig: import('eslint').Linter.Config;
}
