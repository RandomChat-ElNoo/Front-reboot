/** 이미지 주소인지 판별하는 함수
 * @param fileUrl 이미지 주소 string
 * @return true/false 값
 */

export default async function isImageFile(fileUrl: string, headerLength = 8) {
  try {
    const response = await fetch(fileUrl, {
      headers: {
        Range: `bytes=0-${headerLength - 1}`,
      },
    })

    if (!response.ok && response.status !== 206) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    const bytes = new Uint8Array(buffer)

    // 이미지 형식 판별
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      console.log('JPEG 이미지 파일입니다.')
    } else if (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    ) {
      console.log('PNG 이미지 파일입니다.')
    } else if (
      (bytes[0] === 0x47 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x38 &&
        bytes[4] === 0x37 &&
        bytes[5] === 0x61) ||
      (bytes[0] === 0x47 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x46 &&
        bytes[3] === 0x38 &&
        bytes[4] === 0x39 &&
        bytes[5] === 0x61)
    ) {
      console.log('GIF 이미지 파일입니다.')
    } else if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
      console.log('BMP 이미지 파일입니다.')
    } else if (
      (bytes[0] === 0x49 &&
        bytes[1] === 0x49 &&
        bytes[2] === 0x2a &&
        bytes[3] === 0x00) ||
      (bytes[0] === 0x4d &&
        bytes[1] === 0x4d &&
        bytes[2] === 0x00 &&
        bytes[3] === 0x2a)
    ) {
      console.log('TIFF 이미지 파일입니다.')
    } else {
      console.log('알 수 없는 파일 형식입니다.')
    }
  } catch (error: any) {
    console.error('요청 중 오류 발생:', error.message)
  }
}
