var tasks = [];

function load_tasks() {
    for (let task of localStorage.getItem("data").split("\t")) {
        if (task) {
            tasks.push(task);
        }
    }
}

function create_new_task() {
    let modal = document.getElementById("new-task-popup");
    let input = document.getElementById("create-new-task-input");

    if (!input.value.replaceAll(" ", "")) {
        input.focus();
        return;
    }

    tasks.push(input.value);
    localStorage.setItem("data", tasks.join("\t"));

    input.value = "";
    
    draw_cards();
    modal.classList.remove("is-active");
}

function card_template(task_id, task) {
    return `
        <div class="column is-full">
            <div class="box columns is-gapless is-mobile">
                <div class="column is-narrow">
                    <button class="delete" onclick="tasks.splice(${task_id}, 1); draw_cards(); localStorage.setItem('data', tasks.join('\t'));"></button>
                </div>
                <div class="column">
                    <div class="pl-4">
                        ${task}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function draw_cards() {
    let container = document.getElementById("tasks");
    container.innerHTML = "";

    if (!tasks.length) {
        container.innerHTML = `
            <i class="fa-solid fa-dove"></i>
            <span class="ml-2">
                There are no tasks! Try making one now!
            </span>
        `;
    } else {
        for (let task_id in tasks) {
            let task = tasks[task_id];
            container.innerHTML += card_template(task_id, task);
        }
    }
}

