module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: ['airbnb', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true, // 큰따옴표 사용하지 않음
        semi: true, // 문장의 끝에 세미콜론 표시
        useTabs: false, // tab 공백 대신 space 사용
        tabWidth: 2, // 1 tab = 2 space
        trailingComma: 'all', // 배열의 마지막 원소에 쉼표 붙임
        printWidth: 80, // 한 줄에 코드 길이 80자 이내
        arrowParens: 'avoid', // remove parentheses around a sole arrow function parameter
      },
    ], // .prettier
    'no-alert': 'error', // alert 사용을 허용하지 않음
    'no-console': 'error', // console 사용을 허용하지 않음
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_', // 사용하지 않는 인수명 언더스코어 허용
      },
    ],
    'no-param-reassign': [
      'error',
      {
        ignorePropertyModificationsFor: ['draft'],
      },
    ], // param 재정의 불가
    'consistent-return': 'warn',
    'react/jsx-one-expression-per-line': 'off', // 한 줄에 다중 표현식 허용
    'react/react-in-jsx-scope': 'off', // require bebel>=7.9.0 (React17)
  },
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src/'],
      },
    },
  },
};