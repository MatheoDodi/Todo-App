const FORM = document.getElementById('form');
const INPUT = document.getElementById('input');
const taskList = document.querySelector('.task_list');
let tasks = document.getElementsByClassName('task');
let filters = document.querySelector('.filters');

const ALL_TASKS = {
    active : [],
    completed : [],
    all: function() {
		return [...this.active, ...this.completed];
	}
}

let addTask = (value) => {
    ALL_TASKS.active.push(value);
}

let showTask = () => {
    let todo = ALL_TASKS.active[ALL_TASKS.active.length - 1];


    taskList.innerHTML += `<li class="task" data-active="active" data-all="all">${todo}</li>`;
}



FORM.addEventListener('submit', (event) => {

    if (event) {
        addTask(INPUT.value);
        showTask();
        INPUT.value = "";
    }


        //Preventing Page Reload on 'ENTER' key
        event.preventDefault();
})

INPUT.addEventListener( "keyup", (key) => {
    if (key.keyCode === 13) {
        if (tasks.length === 1) {
            filters.innerHTML = `<a id="active">
            Active
        </a>

        <a id="completed">
            Completed
        </a>

        <a id="all">
            All
        </a>`

        document.getElementById('active').addEventListener('click', () => {
            taskList.innerHTML = "";
                ALL_TASKS.active.forEach( (todo) => {
                    taskList.innerHTML += `<li class="task" data-active="active" data-all="all">${todo}</li>`
                })
            })

        document.getElementById('completed').addEventListener('click', () => {
            taskList.innerHTML = "";
                ALL_TASKS.completed.forEach( (todo) => {
                    taskList.innerHTML += `<li class="task strikethrough" data-completed="completed" data-all="all">${todo}</li>`
                })
            })

        document.getElementById('all').addEventListener('click', () => {
            taskList.innerHTML = "";
                ALL_TASKS.all().forEach( (todo) => {

                    if (ALL_TASKS.completed.indexOf(todo) !== -1) {
                        taskList.innerHTML += `<li class="task strikethrough" data-completed="completed" data-all="all">${todo}</li>`
                    } else {
                    taskList.innerHTML += `<li class="task" data-active="active" data-all="all">${todo}</li>`
                    }
                })
            })
        }
    }
} )

taskList.addEventListener('click', (event) => {
    let classes = [...event.target.classList];
    let index = classes.indexOf("strikethrough");
    let clickedTask = event.target;

    if (index === -1) {
        clickedTask.classList.add("strikethrough");
        let index2 = ALL_TASKS.active.indexOf(clickedTask.innerHTML);
        let completed_task = ALL_TASKS.active.splice( index2, 1 );
        ALL_TASKS.completed.push(...completed_task);
        
    } else {
        clickedTask.classList.remove("strikethrough");
        let index2 = ALL_TASKS.completed.indexOf(clickedTask.innerHTML);
        let completed_task = ALL_TASKS.completed.splice ( index2, 1 );
        ALL_TASKS.active.push(...completed_task);
    }
})