
获取音视频时长
export function getVideoDuration(file, callback) {
  const fileUrl = URL.createObjectURL(file);
  const audioElement = new Audio(fileUrl);
  audioElement.addEventListener("loadedmetadata", () => callback(audioElement.duration));
}


export function setPersistenceData(key, value, type = 'session') {
  if (typeof value != 'string') value = JSON.stringify(value);
  if (type === 'session') {
    sessionStorage.setItem(key, value);
  } else if (type === 'local') {
    localStorage.setItem(key, value);
  }
}

export function getPersistenceData(key, type = 'session') {
  if (type === 'session') {
    return sessionStorage.getItem(key);
  } else if (type === 'local') {
    return localStorage.getItem(key);
  }
}
