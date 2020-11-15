
const operateCurrentTabs = (callback) => {
    // 現在のウィンドウのタブをすべて取得する
    chrome.tabs.query(
        {currentWindow: true}, 
        (tabs) => {
            tabsInfo = tabs.map( (tab, i) => [String(i+1), tab.title, tab.url] );
            // タブの情報をコールバック関数に渡す
            callback(tabsInfo);
        }
    );
}

const downloadTabInfo = (tabsInfo) => {
    // タイトル文字列のエスケープ処理
    let processedTabsInfo = tabsInfo.map(tabs => [tabs[0], escapeForCSV(tabs[1]), tabs[2]]);
    // 配列→CSV文字列
    let csvString = arrToString(processedTabsInfo);
    execDownload(csvString, 'csv');
} 

const arrToString = (arr) => {
    const colDelimeter = ',';
    const rowDelimeter = '\n';
    let s = arr.map((row) => row.map((cell) => escapeForCSV(cell)).join(colDelimeter)).join(rowDelimeter);
    return s
}

const execDownload = (content, fileType) => {
    // ファイル名作成
    let nowDate = new Date();
    let fileName = `${dateToString(nowDate)}.${fileType}`;
    let link = document.createElement('a');
    link.href = `data:text/plain,${encodeURIComponent(content)}`;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

const zeroPadding = (targetNum, paddingNum) => {
    const ZERO = "0";
    let joinedZero = ZERO.repeat(paddingNum) + String(targetNum);
    return joinedZero.slice(-paddingNum)
}

const dateToString = (time) => {
    let year = zeroPadding(time.getFullYear(), 4);
    let month = zeroPadding(time.getMonth() + 1, 2);
    let day = zeroPadding(time.getDate(), 2);
    let hour = zeroPadding(time.getHours(), 2);
    let minutes = zeroPadding(time.getMinutes(), 2);
    let seconds = zeroPadding(time.getSeconds(), 2);

    return year + month + day + hour + minutes + seconds
}

const escapeForCSV = (s) => {
    return `\"${s.replace(/\"/g, '\"\"')}\"`
}

const log = (attr) => {
    console.log(attr);
}

const run = () => {
    window.addEventListener('load', () => {
        //operateCurrentTabs(log);
        const dlButton = document.getElementById('download');
        dlButton.addEventListener('click', () => {operateCurrentTabs(downloadTabInfo);});
    })

   
    
}

run();

