package main

import (
	"bufio"
	"bytes"
	"fmt"
	_ "image/png"
	"log"
	"math"
	"os"
	"strconv"

	"os/exec"
	"path/filepath"
)

func main() {
	// 스탠다드 인풋으로 이미지 파일의 경로를 입력받음
	reader := bufio.NewReader(os.Stdin)
	inputPath, err := reader.ReadString('\n')

	if inputPath == "" {
		fmt.Fprintf(os.Stderr, "파일경로가 입력되지 않았습니다 : %v", err)
		return
	}
	// 현재 실행 파일의 경로를 가져옴
	executablePath, err := os.Executable()
	if err != nil {
		log.Fatalf("Error getting executable path: %v", err)
	}
	executableDir := filepath.Dir(executablePath)

	ffmpegPath := filepath.Join(executableDir, "lib", "ffmpeg.exe")
	img2webpPath := filepath.Join(executableDir, "lib", "img2webp.exe")
	// framesDir := filepath.Join(executableDir, "_temp_frames")
	framesDir := "./_temp_frames"
	outputPath := filepath.Join(executableDir, "output2.webp")
	// outputPath := "./output2.webp"

	frameRate := 30.0

	// 작업용 임시폴더 생성
	if err := os.MkdirAll(framesDir, os.ModePerm); err != nil {
		log.Fatalf("Error creating frames directory: %v", err)
	}

	defer os.RemoveAll(framesDir)
	defer os.Remove(outputPath)

	// mp4파일에서 프레임 추출
	cmd := exec.Command(ffmpegPath, "-i", inputPath, "-vf", fmt.Sprintf("fps=%v", frameRate), filepath.Join(framesDir, "f_%04d.png"), "-y")

	if err := cmd.Run(); err != nil {
		log.Fatalf("Error extracting frames: %v", err)
	}

	files, err := os.ReadDir(framesDir)
	if err != nil {
		log.Fatalf("Error reading frames directory: %v", err)
	}

	image2webpArgs := []string{"-loop", "0"}

	// 프레임레이트에 따른 듀레이션 계산
	duration := strconv.Itoa(int(math.Floor(1000 / frameRate)))

	for _, file := range files {
		if file.IsDir() {
			continue
		}
		framePath := filepath.Join(framesDir, file.Name())
		// 파일 추가하기
		image2webpArgs = append(image2webpArgs, framePath)

		// === 프레임수준 옵션 ===
		// 프레임레이트 만큼 딜레이 걸기
		image2webpArgs = append(image2webpArgs, "-d", duration)
	}

	// === 파일수준 옵션 ===
	// 혼합 압축 모드 휴리스틱 방식으로 각 프레임의 손실 또는 무손실 압축을 선택하여 이미지 압축을 최적화합니다. 이 전역 옵션은 로컬 옵션 -lossy 및 -lossless를 사용 중지합니다.
	image2webpArgs = append(image2webpArgs, "-mixed")
	image2webpArgs = append(image2webpArgs, "-o", outputPath)

	cmd = exec.Command(img2webpPath, image2webpArgs...)
	output, err := cmd.CombinedOutput()

	if err != nil {
		log.Fatalf("Error creating animated webp: %v\n%s", err, output)
	}

	// log.Printf("Animated WebP successfully created at: %s\n", outputPath)

	fileContent, err := os.ReadFile(outputPath)
	if err != nil {
		log.Fatalf("Error reading file: %v", err)
	}

	// bytes.Buffer에 파일 내용을 씀
	var buffer bytes.Buffer
	buffer.Write(fileContent)

	// 버퍼 내용을 표준 출력으로 씀
	_, err = buffer.WriteTo(os.Stdout)
	if err != nil {
		log.Fatalf("Error writing to stdout: %v", err)
	}
}
