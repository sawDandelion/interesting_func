
获取音视频时长
export function getVideoDuration(file, callback) {
  const fileUrl = URL.createObjectURL(file);
  const audioElement = new Audio(fileUrl);
  audioElement.addEventListener("loadedmetadata", () => callback(audioElement.duration));
}
