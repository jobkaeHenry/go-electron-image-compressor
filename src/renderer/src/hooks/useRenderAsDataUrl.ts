import { useEffect, useState } from 'react';

/**
 * file 을 입력받아 dataUrl을 리턴하는 훅
 * @param file
 * @returns fileDataUrl
 */
const useRenderAsDataUrl = (
  file: File | undefined
): string | ArrayBuffer | null => {
  const [fileUrl, setFileUrl] = useState<string | ArrayBuffer | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = (): void => {
      setFileUrl(reader.result);
    };
  }, [file]);

  return fileUrl;
};

export default useRenderAsDataUrl;
