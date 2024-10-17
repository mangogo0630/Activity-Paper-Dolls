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
function changeBackground(index) {
    const currentBackground = document.getElementById("background");

    // 如果選擇的是影片
    if (index === 0) {
        // 替換為影片
        currentBackground.outerHTML = `<video id="background" class="layer" autoplay loop muted>
                                           <source src="${backgroundOptions[index]}" type="video/mp4">
                                        </video>`;
        video = document.getElementById("background"); // 更新 video 元素的引用
    } else {
        // 如果選擇的是圖片，替換為圖片
        currentBackground.outerHTML = `<img id="background" class="layer" src="${backgroundOptions[index]}" alt="背景圖">`;
    }
}

const backgroundOptions = [
    "./images/bg_dot.mp4",      // 動態背景（影片）
    "./images/紙娃娃_簡易背景.png", // 靜態背景（圖片）
    "./images/紙娃娃_複雜背景.png" // 靜態背景（圖片）
];
const sizeOptions = ["./images/紙娃娃_大頭.png", "./images/紙娃娃_半身.png", "./images/紙娃娃_全身.png"];
const hairOptions = ["./images/紙娃娃_長髮.png", "./images/紙娃娃_短髮.png"];
const expressionOptions = ["./images/紙娃娃_表情-撲克臉.png", "./images/紙娃娃_表情-微笑.png", "./images/紙娃娃_表情-自訂.png"];
const simpleOptions = ["./images/紙娃娃_配件-簡易配件-愛心.png", "./images/紙娃娃_配件-簡易配件-星星.png", "./images/紙娃娃_配件-簡易配件-無.png"];
const complexOptions = ["./images/紙娃娃_配件-複雜配件-拿酒.png", "./images/紙娃娃_配件-複雜配件-對話框+酒.png", "./images/紙娃娃_配件-複雜配件-無.png"];

// 替換尺寸的函數
function changeSize(index) {
    const size = document.getElementById("size");
    const hair = document.getElementById("hair");
    const expression = document.getElementById("expression");
    const simple = document.getElementById("simple");
    const complex = document.getElementById("complex");
    const background = document.getElementById("background");
    size.src = sizeOptions[index];
}

function changeBackground(index) {
    const currentBackground = document.getElementById("background");

    // 如果選擇的是影片
    if (index === 0) {
        // 替換為影片
        currentBackground.outerHTML = `<video id="background" class="layer" autoplay loop muted>
                                           <source src="${backgroundOptions[index]}" type="video/mp4">
                                        </video>`;
        video = document.getElementById("background"); // 更新 video 元素的引用
    } else {
        // 如果選擇的是圖片，替換為圖片
        currentBackground.outerHTML = `<img id="background" class="layer" src="${backgroundOptions[index]}" alt="背景圖">`;
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

// 替換複雜配件的函數
function changeComplex(index) {
    document.getElementById("complex").src = complexOptions[index];
}

// 替換背景的函數
//function changeBackground(index) {
    //document.getElementById("background").src = backgroundOptions[index];}


// 顯示不同元件選項的函數
function showOptions(type) {
    document.getElementById('size-options').style.display = type === 'size' ? 'block' : 'none';
    document.getElementById('hair-options').style.display = type === 'hair' ? 'block' : 'none';
    document.getElementById('expression-options').style.display = type === 'expression' ? 'block' : 'none';
    document.getElementById('simple-options').style.display = type === 'simple' ? 'block' : 'none';
    document.getElementById('complex-options').style.display = type === 'complex' ? 'block' : 'none';
    document.getElementById('background-options').style.display = type === 'background' ? 'block' : 'none';
}


// 拍照邏輯
cameraBtn.addEventListener('click', function() {
    const backgroundElement = document.getElementById('background');
    
     // 如果當前背景是影片
     if (backgroundElement.tagName.toLowerCase() === 'video') {
        const videoElement = backgroundElement;

        // 設定 Canvas 大小與影片一致
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;

        // 抓取當前幀並繪製到 Canvas
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    } 
    else {
        // 如果當前背景是圖片
        const imgElement = backgroundElement;

         // 使用當前顯示的寬高繪製圖片到 Canvas，而不是使用原圖尺寸
         const displayWidth = imgElement.offsetWidth;
         const displayHeight = imgElement.offsetHeight;

        // 設定 Canvas 大小與圖片的顯示大小一致
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        // 繪製圖片到 Canvas
        ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
    }

    // 抓取其他圖層並繪製到 Canvas
    applyTransform(document.getElementById('size'));
    applyTransform(document.getElementById('hair'));
    applyTransform(document.getElementById('expression'));
    applyTransform(document.getElementById('simple'));
    applyTransform(document.getElementById('complex'));
    // 將 Canvas 轉換為圖片並顯示在預覽區域
    const image = canvas.toDataURL('image/png');
    previewImage.src = image;

    // 顯示彈出式視窗
    previewModal.style.display = 'block';
});

// 通用的應用變換函數
function applyTransform(element) {
    const transform = window.getComputedStyle(element).transform;
    if (transform !== 'none') {
        // 解析變換矩陣
        const matrix = new DOMMatrix(transform);
        const scaleX = matrix.a; // 縮放 X 軸
        const scaleY = matrix.d; // 縮放 Y 軸
        const translateX = matrix.e; // X 軸位移
        const translateY = matrix.f; // Y 軸位移
        
        // 繪製應用變換後的圖像
        ctx.drawImage(element, xPos, yPos, newWidth, newHeight);
    } else {
        // 如果沒有變換，直接繪製
        ctx.drawImage(element, element.offsetLeft, element.offsetTop, element.width, element.height);
    }
}

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