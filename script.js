let previousState = '';

function init() {
    const splitButton = document.getElementById('splitButton');
    const clearButton = document.getElementById('clearButton');
    const undoButton = document.getElementById('undoButton');
    const inputText = document.getElementById('inputText');
    
    splitButton.addEventListener('click', splitText);
    clearButton.addEventListener('click', clearText);
    undoButton.addEventListener('click', undo);
    inputText.addEventListener('input', updateCharCount);

    document.getElementById('toggleTheme').addEventListener('click', toggleTheme);
}

// DOM要素を取得
const inputText = document.getElementById("inputText");
const outputContainer = document.getElementById("outputContainer");
const copyMessage = document.getElementById("copyMessage");

// サニタイズ関数（XSS対策）
function sanitizeInput(input) {
    const element = document.createElement('div');
    element.innerText = input;
    return element.innerHTML;  // エスケープされた安全な文字列
}

// テキストを分割して表示
function splitText() {
    if (!validateInput()) return;

    saveState(); // 現在の状態を保存
    const rawInput = inputText.value;
    const sanitizedInput = sanitizeInput(rawInput);
    const maxLength = parseInt(document.getElementById('splitSize').value) || 4000;

    clearOutput();

    const textParts = splitIntoParts(sanitizedInput, maxLength);

    textParts.forEach((part, index) => {
        displayTextPart(part, index + 1);
    });
}

// テキストを分割
function splitIntoParts(text, maxLength) {
    const parts = [];
    for (let i = 0; i < text.length; i += maxLength) {
        parts.push(text.slice(i, i + maxLength));
    }
    return parts;
}

// 分割されたテキストの表示
function displayTextPart(part, partNumber) {
    const outputDiv = document.createElement('div');

    const info = createInfoText(partNumber, part.length);
    outputDiv.appendChild(info);

    const textArea = createTextArea(part);
    outputDiv.appendChild(textArea);

    const copyButton = createCopyButton(partNumber, textArea);
    outputDiv.appendChild(copyButton);

    const downloadButton = document.createElement('button');
    downloadButton.innerText = `ダウンロード（パート${partNumber}）`;
    downloadButton.className = 'download-button';
    downloadButton.onclick = function() {
        downloadText(part, partNumber);
    };
    outputDiv.appendChild(downloadButton);

    outputContainer.appendChild(outputDiv);
}

// 文字数情報を作成
function createInfoText(partNumber, length) {
    const info = document.createElement('div');
    info.className = 'output-info';
    info.innerText = `パート${partNumber} - 文字数: ${length}`;
    return info;
}

// テキストエリアを作成
function createTextArea(text) {
    const textArea = document.createElement('textarea');
    textArea.readOnly = true;
    textArea.value = text;
    return textArea;
}

// コピー用ボタンを作成
function createCopyButton(partNumber, textArea) {
    const copyButton = document.createElement('button');
    copyButton.innerText = `コピー（パート${partNumber}）`;
    copyButton.className = 'copy-button';
    copyButton.onclick = function() {
        copyToClipboard(textArea);
    };
    return copyButton;
}

// クリップボードにコピー
function copyToClipboard(textArea) {
    textArea.select();
    document.execCommand("copy");
    showCopyMessage();
}

// コピー完了メッセージを表示
function showCopyMessage() {
    copyMessage.style.display = 'block';
    setTimeout(() => {
        copyMessage.style.display = 'none';
    }, 2000);
}

// 出力エリアをクリア
function clearOutput() {
    outputContainer.innerHTML = '';
    copyMessage.style.display = 'none';
}

// 入力フィールドと出力をクリア
function clearText() {
    saveState();  // 現在の状態を保存
    inputText.value = '';
    clearOutput();
    updateCharCount();
}

// ダウンロード処理
function downloadText(part, partNumber) {
    const blob = new Blob([part], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `part_${partNumber}.txt`;
    link.click();
}

// リアルタイムで文字数を更新
function updateCharCount() {
    const charCount = document.getElementById('charCount');
    charCount.innerText = `現在の文字数: ${inputText.value.length}`;
}

// 操作の元に戻す処理
function undo() {
    if (previousState) {
        inputText.value = previousState;
        updateCharCount();
        clearOutput();
    }
}

// 現在の状態を保存
function saveState() {
    previousState = inputText.value;
}

// 入力のバリデーション
function validateInput() {
    if (inputText.value.trim() === '') {
        alert('テキストを入力してください。');
        return false;
    }
    const splitSize = parseInt(document.getElementById('splitSize').value);
    if (splitSize <= 0) {
        alert('正しい分割文字数を指定してください。');
        return false;
    }
    return true;
}

// テーマ切り替え
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    const themeButton = document.getElementById('toggleTheme');
    if (body.classList.contains('light-theme')) {
        themeButton.innerText = "ダークモードに切り替え";
    } else {
        themeButton.innerText = "ライトモードに切り替え";
    }
}

// 初期化処理を実行
init();
