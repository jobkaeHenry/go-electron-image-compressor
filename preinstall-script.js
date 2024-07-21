const { existsSync, mkdirSync, writeFileSync } = require('fs');
const path = require('path');

const directories = [
  path.join(__dirname, './resources/mp4ToWebp/lib'),
  path.join(__dirname, './src/preload/golang-binary/mp4-converter/lib'),
];

directories.forEach((dir) => {
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
});

directories.forEach((dir) => {
  writeFileSync(
    path.join(dir, 'ffmpeg.txt'),
    'https://ffmpeg.org/download.html 에서 설치하세요'
  );
  writeFileSync(
    path.join(dir, 'img2webp.txt'),
    'https://developers.google.com/speed/webp/docs/precompiled?hl=k요 에서 설치하세요'
  );
});
