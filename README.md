# Electron Image Compressor

React와 TypeScript를 사용한 Electron 애플리케이션

## 추천 IDE 설정

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## 프로젝트 설정

### 패키지매니저

yarn berry 를 사용중이며 zero-install (pnp)은 사용하지 않음

```bash
$ yarn set version berry
```

### 설치

```bash
$ yarn
```

### Development

```bash
$ yarn dev
```

### Build

[ Window ]

```bash
$ yarn build:win
```

Windows에서 <b>개발자 모드를 활성화</b>해야 심볼릭 링크를 생성할 수 있는 권한이 부여됩니다.

1. 설정 > 업데이트 및 보안 > 개발자용으로 이동합니다.
2. 개발자 모드를 활성화합니다.

[ macOS ]

```bash
$ yarn build:mac
```

[ Linux ]

```bash
$ yarn build:linux
```
