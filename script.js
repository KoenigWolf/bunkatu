document.getElementById('splitButton').addEventListener('click', splitText);
document.getElementById('clearButton').addEventListener('click', clearText);

function splitText() {
    const inputText = document.getElementById("inputText").value;
    const maxLength = 4000;
    const outputContainer = document.getElementById("outputContainer");
    const copyMessage = document.getElementById("copyMessage");

    // 前回の出力結果をクリア
    outputContainer.innerHTML = '';
    copyMessage.style.display = 'none';

    // 4000文字ごとに分割
    let textParts = [];
    for (let i = 0; i < inputText.length; i += maxLength) {
        textParts.push(inputText.slice(i, i + maxLength));
    }

    // 分割したテキストを表示
    textParts.forEach((part, index) => {
        const outputDiv = document.createElement('div');
        
        // 文字数表示
        const info = document.createElement('div');
        info.className = 'output-info';
        info.innerText = `パート${index + 1} - 文字数: ${part.length}`;

        const textArea = document.createElement('textarea');
        textArea.readOnly = true;
        textArea.value = part;

        const copyButton = document.createElement('button');
        copyButton.innerText = `コピー（パート${index + 1}）`;
        copyButton.className = 'copy-button';
        copyButton.onclick = function() {
            textArea.select();
            document.execCommand("copy");
            copyMessage.style.display = 'block';
            setTimeout(() => {
                copyMessage.style.display = 'none';
            }, 2000);
        };

        outputDiv.appendChild(info);  // 文字数表示を追加
        outputDiv.appendChild(copyButton);
        outputDiv.appendChild(textArea);
        outputContainer.appendChild(outputDiv);
    });
}

function clearText() {
    document.getElementById("inputText").value = '';
    document.getElementById("outputContainer").innerHTML = '';
    document.getElementById("copyMessage").style.display = 'none';
}
