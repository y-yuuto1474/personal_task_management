//日付処理
// ページが読み込まれたときに実行される
window.onload = function() {
    // ローカルストレージから日付を取得して入力フィールドにセットする
    for (var i = 1; i <= 5; i++) {
      var storedDate = localStorage.getItem("dateInput" + i);
      if (storedDate !== null) {
        document.getElementById("dateInput" + i).value = storedDate;
      }
    }
    displayTasks();

    // ローカルストレージから値を取得
    var savedTitle = localStorage.getItem('gameTitle');
    var titleInput = document.getElementById('titleInput');

    // ローカルストレージに保存された値があれば、インプットにその値を表示する
    if (savedTitle) {
        titleInput.value = savedTitle;
    }
  }
  
  function showDates() {
    for (var i = 1; i <= 5; i++) {
      var dateInput = document.getElementById("dateInput" + i).value; 
      // ローカルストレージに日付を保存する
      localStorage.setItem("dateInput" + i, dateInput);
    }
    // インプット要素を取得
    var titleInput = document.getElementById('titleInput');

    // インプットの値を取得
    var title = titleInput.value;

    // ローカルストレージに値を保存
    localStorage.setItem('gameTitle', title);

    alert('企画が保存されました');
  }
  
  function resetDates() {
    var dateInputFields = document.getElementsByClassName("dateInputFields");
    for (var i = 0; i < dateInputFields.length; i++) {
      dateInputFields[i].style.display = "inline"; // 入力フィールドを表示する
    }
  
    var displayDatesElement = document.getElementById("displayDates");
    displayDatesElement.innerHTML = ""; // 表示エリアをクリアする
  
    // 日付入力フィールドをクリアする
    for (var i = 1; i <= 5; i++) {
      var dateInput = document.getElementById("dateInput" + i);
      dateInput.value = "";
  
      // ローカルストレージから日付を削除する
      localStorage.removeItem("dateInput" + i);
    }
  }
  
//タスク処理
  
  function addTask() {
    var taskInput = document.getElementById("taskInput").value;
    if (taskInput.trim() !== "") { // 入力が空でないことを確認
      var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // ローカルストレージからタスクを取得
      taskList.push({task: taskInput, crossedOut: false}); // タスクを追加
      localStorage.setItem("tasks", JSON.stringify(taskList)); // ローカルストレージに保存
      displayTasks(); // タスクを表示する
      document.getElementById("taskInput").value = ""; // 入力欄をクリアする
    }
  }
  
  function displayTasks() {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // ローカルストレージからタスクを取得
    var taskListElement = document.getElementById("taskList");
    taskListElement.innerHTML = ""; // タスクリストをクリアする
    taskList.forEach(function(task, index) {
      var li = document.createElement("li");
      li.textContent = task.task;
      li.addEventListener("click", function() {
        // 左クリックでタスクを削除
        removeTask(index);
      });
      li.addEventListener("contextmenu", function(event) {
        event.preventDefault(); // 右クリックのデフォルト動作を無効化
        // 右クリックでタスクに横線を表示
        toggleCrossedOut(index);
      });
      if (task.crossedOut) {
        li.style.textDecoration = "line-through";
      }
      taskListElement.appendChild(li);
    });
  }
  
  function removeTask(index) {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // ローカルストレージからタスクを取得
    taskList.splice(index, 1); // タスクを削除
    localStorage.setItem("tasks", JSON.stringify(taskList)); // ローカルストレージに保存
    displayTasks(); // タスクを再表示する
  }
  
  function toggleCrossedOut(index) {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // ローカルストレージからタスクを取得
    taskList[index].crossedOut = !taskList[index].crossedOut; // タスクの状態を切り替える
    localStorage.setItem("tasks", JSON.stringify(taskList)); // ローカルストレージに保存
    displayTasks(); // タスクを再表示する
  }

  // キーボードイベントを監視する関数
function disableEnterKey(e) {
    // イベントがEnterキーのものかどうかをチェック
    if (e.keyCode === 13) {
        // Enterキーの場合、何もしない（イベントをキャンセルする）
        e.preventDefault();
        e.stopPropagation();
    }
}

// ドキュメントのキーダウンイベントを監視し、disableEnterKey関数を呼び出す
document.addEventListener('keydown', disableEnterKey);