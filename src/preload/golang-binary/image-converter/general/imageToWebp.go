package main

import (
	"bytes"
	"fmt"
	"image"
	_ "image/gif"
	_ "image/jpeg"
	_ "image/png"
	"os"

	"github.com/chai2010/webp"
)

func ImgToWebpBuffer(file []byte) (bytes.Buffer, error) {
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
