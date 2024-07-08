package main

import (
	"fmt"

	giftowebp "github.com/sizeofint/gif-to-webp"
)

func GifToMain(gifBin []byte) ([]byte, error) {
	converter := giftowebp.NewConverter()

	converter.LoopCompatibility = false
	converter.WebPConfig.SetLossless(1)

	converter.WebPAnimEncoderOptions.SetKmin(9)
	converter.WebPAnimEncoderOptions.SetKmax(17)

	webpBin, err := converter.Convert(gifBin)

	if err != nil {
		fmt.Println("Convert error:", err)
		return nil, err
	}

	return webpBin, nil
}
