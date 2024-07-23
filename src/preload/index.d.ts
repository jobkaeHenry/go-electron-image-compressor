import { ElectronAPI } from '@electron-toolkit/preload';

declare global {
  interface Window {
    electron: ElectronAPI;
    api: {
      convertImage: (filePath: string) => Promise<Buffer>;
      convertVideo: (filePath: string) => Promise<Buffer>;
    };
  }
}
