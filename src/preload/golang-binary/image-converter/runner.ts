import { spawn } from 'child_process';
import mp4ToWebpBinary from '../../../../resources/mp4ToWebp?asset&asarUnpack';
import imageToWebpBinary from '../../../../resources/image-converter?asset&asarUnpack';

const convertImage = async (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const child = spawn(imageToWebpBinary);
    const dataBuffer: Uint8Array[] = [];

    // stdout 데이터 수신 처리
    child.stdout.on('data', (data) => {
      dataBuffer.push(data);
    });
    child.stdin.write(filePath);
    child.stdin.end();

    // error 처리
    child.stderr.on('data', (data) => {
      reject(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
        return;
      }
      if (dataBuffer.length === 0) {
        reject(new Error('No data received from child process'));
        return;
      }
      const outputBuffer = Buffer.concat(dataBuffer);
      resolve(outputBuffer);
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
};

export const convertVideo = async (filePath: string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const child = spawn(mp4ToWebpBinary);
    const dataBuffer: Uint8Array[] = [];

    // stdout 데이터 수신 처리
    child.stdout.on('data', (data) => {
      dataBuffer.push(data);
    });
    child.stdin.write(filePath);
    child.stdin.end();

    // error 처리
    child.stderr.on('data', (data) => {
      reject(`stderr: ${data}`);
    });

    child.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`Child process exited with code ${code}`));
        return;
      }
      if (dataBuffer.length === 0) {
        reject(new Error('No data received from child process'));
        return;
      }
      const outputBuffer = Buffer.concat(dataBuffer);
      resolve(outputBuffer);
    });

    child.on('error', (err) => {
      reject(err);
    });
  });
};
export default convertImage;
