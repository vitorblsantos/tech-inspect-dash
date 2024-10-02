import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from '@typescript-eslint/eslint-plugin'
import eslintPluginNode from 'eslint-plugin-node'
import eslintPluginPromise from 'eslint-plugin-promise'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
  {
    ignores: ['dist', 'node_modules'],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'node': eslintPluginNode,
      'promise': eslintPluginPromise,
      'prettier': eslintPluginPrettier,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'comma-dangle': 'error',
      'consistent-return': 'warn',
      'consistent-this': 'warn',
      'indent': ['error', 2],
      'no-console': 'error',
      'no-extra-semi': 'warn',
      'no-use-before-define': 'warn',
      'no-useless-constructor': 0,
      'no-unused-vars': ['error', { args: 'after-used' }],
      'node/no-extraneous-import': [
        'error',
        {
          allowModules: ['@google-cloud/firebase'],
        },
      ],
      'node/no-unsupported-features/es-syntax': 0,
      'node/no-unpublished-import': 0,
      'node/no-unpublished-require': 0,
      'node/no-missing-import': 0,
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
    },
  },
]
