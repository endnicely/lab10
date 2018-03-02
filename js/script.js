/*eslint-env browser*/
//Global Variables
var storage;
var list="";
var task;
var tasks = [];

//get dom elements
var $ = function(id) {
    "use strict";
    return window.document.getElementById(id);
    
};
//Display the tasks
var displayTaskList = function () {
    "use strict";
    //If there are no task in the array
    //check the storage object
    if (tasks.length === 0) {
        storage = localStorage.getItem("tasks") || "";
        //If the storage object contains tasks
        //repopulate the tasks array
        if (storage.length > 0) {
            tasks = storage.split("|");
        }
    }
    //If there are tasks in the array
    //Sort them
    //Return  a break-delimited strign into the list variable
    if(tasks.length > 0) {
        tasks.sort();
        list = tasks.join("\n");
    }
    //Populate the textarea with the list of tasks
    $("tasklist").value = list;
};

//add a task
var addToTaskList = function () {
    "use strict";
    task = $("task");
    if(task.value === "") {
       window.alert("Please enter a task.");
    } else {
        tasks.push(task.value);
        localStorage.tasks = tasks.join("|");
        task.value = "";
        displayTaskList();
    }
};
//clear task list
var clearTaskList = function () {
    "use strict";
    tasks.length = 0;   //clear out array
    localStorage.tasks = "";  //clear out storage object
    $("tasklist").value = ""; // clear out task list
    
};

//wire up event handlers and display task list
window.addEventListener("load", function(){
    "use strict";
    $("addtask").addEventListener("click", addToTaskList);
    $("cleartasks").addEventListener("click", clearTaskList);
    displayTaskList();
});