export function downloadFile(fileUrl, fileName) {
  fetch(fileUrl)
    .then(res => res.blob().then(blob => {
      const a = document.createElement('a');
      const url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = fileName;
      a.click();
      window.URL.revokeObjectURL(url);
    }));
}