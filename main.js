//日付処理
// ページが読み込まれたときに実行される
window.onload = function() {
    // ローカルストレージから日付を取得して入力フィールドにセットする
    for (var i = 1; i <= 5; i++) {
      var storedDate = localStorage.getItem("date-input-" + i);
      if (storedDate !== null) {
        document.getElementById("date-input-" + i).value = storedDate;
      }
    }
    displayTasks();
    displayBugs();

    // ローカルストレージから値を取得
    var savedTitle = localStorage.getItem('game-title');
    var titleInput = document.getElementById('title-input');

    // ローカルストレージに保存された値があれば、インプットにその値を表示する
    if (savedTitle) {
        titleInput.value = savedTitle;
    }
}
  
function showDates() {
    for (var i = 1; i <= 5; i++) {
      var dateInput = document.getElementById("date-input-" + i).value; 
      // ローカルストレージに日付を保存する
      localStorage.setItem("date-input-" + i, dateInput);
    }
    // インプット要素を取得
    var titleInput = document.getElementById('title-input');

    // インプットの値を取得
    var title = titleInput.value;

    // ローカルストレージに値を保存
    localStorage.setItem('game-title', title);

    alert('企画が保存されました');
}
  
function resetDates() {
    var dateInputFields = document.getElementsByClassName("date-input-fields");
    for (var i = 0; i < dateInputFields.length; i++) {
      dateInputFields[i].style.display = "inline"; // 入力フィールドを表示する
    }
  
    var displayDatesElement = document.getElementById("display-dates");
    displayDatesElement.innerHTML = ""; // 表示エリアをクリアする
  
    // 日付入力フィールドをクリアする
    for (var i = 1; i <= 5; i++) {
      var dateInput = document.getElementById("date-input-" + i);
      dateInput.value = "";
  
      // ローカルストレージから日付を削除する
      localStorage.removeItem("date-input-" + i);
    }
}
  
//タスク処理
  
function addTask() {
    var taskInput = document.getElementById("task-input").value;
    if (taskInput.trim() !== "") { // 入力が空でないことを確認
      var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // ローカルストレージからタスクを取得
      taskList.push({task: taskInput, crossedOut: false}); // タスクを追加
      localStorage.setItem("tasks", JSON.stringify(taskList)); // ローカルストレージに保存
      displayTasks(); // タスクを表示する
      document.getElementById("task-input").value = ""; // 入力欄をクリアする
    }
}
  
function displayTasks() {
    var taskList = JSON.parse(localStorage.getItem("tasks")) || []; // ローカルストレージからタスクを取得
    var taskListElement = document.getElementById("task-list");
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
    taskList[index].crossedOut = !taskList[index].crossedOut; // ステータスを切り替え
    localStorage.setItem("tasks", JSON.stringify(taskList)); // ローカルストレージに保存
    displayTasks(); // タスクを再表示する
}
  
//バグ処理
  
function addBug() {
    var bugInput = document.getElementById("bug-input").value;
    if (bugInput.trim() !== "") { // 入力が空でないことを確認
      var bugList = JSON.parse(localStorage.getItem("bugs")) || []; // ローカルストレージからバグを取得
      bugList.push({bug: bugInput, crossedOut: false}); // バグを追加
      localStorage.setItem("bugs", JSON.stringify(bugList)); // ローカルストレージに保存
      displayBugs(); // バグを表示する
      document.getElementById("bug-input").value = ""; // 入力欄をクリアする
    }
}
  
function displayBugs() {
    var bugList = JSON.parse(localStorage.getItem("bugs")) || []; // ローカルストレージからバグを取得
    var bugListElement = document.getElementById("bug-list");
    bugListElement.innerHTML = ""; // バグリストをクリアする
    bugList.forEach(function(bug, index) {
      var li = document.createElement("li");
      li.textContent = bug.bug;
      li.addEventListener("click", function() {
        // 左クリックでバグを削除
        removeBug(index);
      });
      li.addEventListener("contextmenu", function(event) {
        event.preventDefault(); // 右クリックのデフォルト動作を無効化
        // 右クリックでバグに横線を表示
        toggleBugCrossedOut(index);
      });
      if (bug.crossedOut) {
        li.style.textDecoration = "line-through";
      }
      bugListElement.appendChild(li);
    });
}
  
function removeBug(index) {
    var bugList = JSON.parse(localStorage.getItem("bugs")) || []; // ローカルストレージからバグを取得
    bugList.splice(index, 1); // バグを削除
    localStorage.setItem("bugs", JSON.stringify(bugList)); // ローカルストレージに保存
    displayBugs(); // バグを再表示する
}
  
function toggleBugCrossedOut(index) {
    var bugList = JSON.parse(localStorage.getItem("bugs")) || []; // ローカルストレージからバグを取得
    bugList[index].crossedOut = !bugList[index].crossedOut; // ステータスを切り替え
    localStorage.setItem("bugs", JSON.stringify(bugList)); // ローカルストレージに保存
    displayBugs(); // バグを再表示する
}
