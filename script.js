document.addEventListener('DOMContentLoaded', function() {
    // 所有與按鈕、元素相關的邏輯都放在這裡，確保 DOM 加載完成後執行
    document.getElementById('myButton').addEventListener('click', function() {
        // 你的按鍵邏輯
        console.log('按鍵被點擊了');
    });
});
const video = document.getElementById('background');
const playPauseBtn = document.getElementById('playPauseBtn');
const downloadBtn = document.getElementById('downloadBtn');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeOptions = ["./images/紙娃娃_大頭.png", "./images/紙娃娃_半身.png", "./images/紙娃娃_全身.png"];
const hairOptions = ["./images/紙娃娃_長髮.png", "./images/紙娃娃_短髮.png"];
const expressionOptions = ["./images/紙娃娃_表情-撲克臉.png", "./images/紙娃娃_表情-微笑.png", "./images/紙娃娃_表情-自訂.png"];
const simpleOptions = ["./images/紙娃娃_配件-簡易配件-愛心.png", "./images/紙娃娃_配件-簡易配件-星星.png", "./images/紙娃娃_配件-簡易配件-無.png"];

// 替換尺寸的函數
function changeSize(index) {
    const size = document.getElementById("size");
    const hair = document.getElementById("hair");
    const expression = document.getElementById("expression");
    const simple = document.getElementById("simple");

    size.src = sizeOptions[index];

    // 根據選擇的尺寸來調整其他元素的縮放和位置
    if (index === 0) { // 大頭
        size.style.transform = "scale(1.5) translateY(30px) translatex(-3px)";
        hair.style.transform = "scale(1.5) translateY(30px) translatex(-3px)";
        expression.style.transform = "scale(1.5) translateY(30px) translatex(-3px)";
        simple.style.transform =  "scale(1.5) translateY(20px) translatex(-4px)";
    } else if (index === 1) { // 半身
        size.style.transform = "scale(1.3) translateY(15px)";
        hair.style.transform = "scale(1.3) translateY(15px)";
        expression.style.transform = "scale(1.3) translateY(15px)";
        simple.style.transform = "scale(1.3) translateY(15px)";
    } else { // 全身
        size.style.transform = "scale(1) translateY(0px)";
        hair.style.transform = "scale(1) translateY(0px)";
        expression.style.transform = "scale(1) translateY(0px)";
        simple.style.transform = "scale(1) translateY(0px)";
    }
}
// 替換頭髮的函數
function changeHair(index) {
    document.getElementById("hair").src = hairOptions[index];
}

// 替換表情的函數
function changeExpression(index) {
    document.getElementById("expression").src = expressionOptions[index];
}

// 替換簡易配件的函數
function changeSimple(index) {
    document.getElementById("simple").src = simpleOptions[index];
}


// 顯示不同元件選項的函數
function showOptions(type) {
    document.getElementById('size-options').style.display = type === 'size' ? 'block' : 'none';
    document.getElementById('hair-options').style.display = type === 'hair' ? 'block' : 'none';
    document.getElementById('expression-options').style.display = type === 'expression' ? 'block' : 'none';
    document.getElementById('simple-options').style.display = type === 'simple' ? 'block' : 'none';
}


// 拍照邏輯
cameraBtn.addEventListener('click', function() {
    // 設定 Canvas 大小與影片一致
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // 抓取影片當前幀並繪製
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // 繪製衣服、髮型和眼睛
    const size = document.getElementById('size');
    const hair = document.getElementById('hair');
    const expression = document.getElementById('expression');
    const simple = document.getElementById('simple');
    ctx.drawImage(size, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(hair, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(expression, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(simple, 0, 0, canvas.width, canvas.height);


    // 將 Canvas 轉換為圖片並顯示在預覽區域
    const image = canvas.toDataURL('image/png');
    previewImage.src = image;

    // 顯示彈出式視窗
    previewModal.style.display = 'block';
});

// 下載邏輯
downloadBtn.addEventListener('click', function() {
    const image = previewImage.src;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'doll_with_preview.png';
    link.click();
    previewModal.style.display = 'none'; // 關閉彈出式視窗
});

// 放棄照片邏輯
discardBtn.addEventListener('click', function() {
    previewModal.style.display = 'none'; // 直接關閉彈出式視窗
});

// 點擊關閉按鈕關閉彈出視窗
closeModal.addEventListener('click', function() {
    previewModal.style.display = 'none';
});

// 點擊彈出視窗外部區域也可關閉視窗
closeModal.addEventListener('click', function() {
    previewModal.style.display = 'none';
});
window.addEventListener('click', function(event) {
    if (event.target == previewModal) {
        previewModal.style.display = 'none';
    }
});