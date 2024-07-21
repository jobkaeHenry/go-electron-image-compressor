package main

import (
	"bufio"
	"bytes"
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"os"

	"github.com/chai2010/webp"
)

func main() {
	// 스탠다드 인풋으로 이미지 파일의 경로를 입력받음
	reader := bufio.NewReader(os.Stdin)
	filePath, err := reader.ReadString('\n')

	if filePath == "" {
		fmt.Fprintf(os.Stderr, "파일경로가 입력되지 않았습니다 : %v", err)
		return
	}

	file, err := os.ReadFile(filePath)
	if err != nil {
		fmt.Fprintf(os.Stderr, "파일을 읽지 못했습니다 : %v", err)
		return
	}

	// webp 로 변환된 buffer
	buf, err := imageToWebp(file) // Param : 이미지, 퀄리티 -> 퀄리티는 stdin으로 받는편이 나을 듯ㅁ
	if err != nil {
		fmt.Fprintf(os.Stderr, "파일 변환에 실패했습니다 :%v", err)
	}

	// OS stdout 으로 buffer를 출력
	if _, err := buf.WriteTo(os.Stdout); err != nil {
		fmt.Fprintf(os.Stderr, "버퍼 출력에 실패했습니다: %v", err)
	}
}

func imageToWebp(file []byte) (bytes.Buffer, error) {
	var buf bytes.Buffer
	img, _, err := image.Decode(bytes.NewReader(file))

	if err != nil {
		fmt.Fprintf(os.Stderr, "파일 디코딩에 실패했습니다 : %v", err)
		return buf, err
	}

	if err := webp.Encode(&buf, img, &webp.Options{Lossless: true}); err != nil {
		return buf, err
	}

	return buf, nil
}
