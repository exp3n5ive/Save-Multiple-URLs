// 查询当前窗口所有标签页并显示
chrome.tabs.query({ currentWindow: true }, function (tabs) {
  const urlList = document.getElementById('urlList');
  const urls = tabs.map(tab => tab.url).join('\n'); // 拼接成多行字符串
  urlList.value = urls;
});

// 📋 复制到剪贴板
document.getElementById('copyBtn').addEventListener('click', async function () {
  const text = document.getElementById('urlList').value;
  try {
    await navigator.clipboard.writeText(text);
    document.getElementById('status').textContent = '✅ 已复制到剪贴板';
  } catch (err) {
    document.getElementById('status').textContent = '❌ 复制失败，请手动复制';
  }
});

// 💾 导出为 .txt 文件
document.getElementById('exportBtn').addEventListener('click', function () {
  const text = document.getElementById('urlList').value;
  const blob = new Blob([text], { type: 'text/plain' }); // 创建文本 Blob
  const url = URL.createObjectURL(blob); // 创建下载链接
  const a = document.createElement('a');
  a.href = url;
  a.download = 'tabs-urls.txt';
  a.click();
  URL.revokeObjectURL(url); // 清理内存
});
