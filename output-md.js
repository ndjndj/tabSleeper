const getMD = (callback) => {
    // storage のデータを取得
    chrome.storage.sync.get(['mdString'], (result) => {
        callback(result.mdString);
    });

}

const copyClipboard = (id) => {
    let target = document.getElementById(id);
    target.querySelector();
    document.execCommand('copy');
}

const pasteMDString = (mdString) => {
    let textarea = document.getElementById('output-md');
    textarea.innerText = mdString;
}

const closeWindow = () => {
    window.close();
}

const run = () => {
    window.addEventListener('load', () => {
        getMD(pasteMDString);
        const copyButton = document.getElementById('copy');
        const exitButton = document.getElementById('exit');

        copyButton.addEventListener('click', () => {copyClipboard('output-md');});
        exitButton.addEventListener('click', () => {closeWindow();});
    });
}

run();