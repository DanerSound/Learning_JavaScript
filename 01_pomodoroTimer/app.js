const task = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;

const addButton = document.querySelector("#bAdd");
const idTask = document.querySelector("#itTask");
const form = document.querySelector("#form");
const taskName = document.querySelector ('#time #taskName');

renderTime();
rendertask();

form.addEventListener('submit', e =>{
    e.preventDefault();
    if(idTask.value != ''){
        createTask(idTask.value);
        idTask.value='';
        rendertask();
    }
});

function createTask(value){
    const newTask = {
        id:(Math.random()*100).toString(36).slice(2),
        title: value,
        completed: false,
    }

    task.unshift(newTask);
}

function rendertask(){
    const html = task.map(task => {
        return `
                <div class="task">
                    <div class "Completed">
                    ${task.completed ? `<span class ="done"> Done </span>` :
                    `<button class="start-button" data-id="${task.id}"> Start </button></div>`}
                    <div class="title">${task.title}</div>
                </div>`;
    });

    const taskContainer =document.querySelector("#tasks");
    taskContainer.innerHTML = html.join("");

    const startButtons = document.querySelectorAll(".task .start-button");

    startButtons.forEach(button => {
        button.addEventListener('click',() =>{
            if(!timer){
                const id = button.getAttribute('data-id');
                startButtonHandler(id);
                button.textContent = "In progress...";
            }
        });

    });

}

function startButtonHandler(id){
    time = 25 * 60;
    current = id;

    const taskIndex = task.findIndex(task => task.id === id);
    taskName.textContent = task[taskIndex].title;
    timer = setInterval(()=>{timeHandler(id)},1000);
}

function timeHandler(id){
    time--;
    renderTime();

    if(time===0){
        clearInterval(timer);
        markCompleted(id); 
        timer = null;  
        rendertask();
        startBreak();
    }
}

function markCompleted(id) {
    const taskIndex = task.findIndex(task => task.id === id);
    task[taskIndex].completed = true;
}

function startBreak(){
    time = 5*60;
    taskName.textContent = 'Break';
    timerBreak = setInterval (()=>{
        timerBreakHandler();
    },1000);
}

function timerBreakHandler(){
    time--;
    renderTime();
        if(time===0){
            clearInterval(timerBreak);
            current = 'null';
            timerBreak = null; 
            taskName.textContent = "";
            rendertask();
    }
}

function renderTime (){
    const timeDiv = document.querySelector("#time #value");
    const minutes = parseInt(time/60);
    const seconds = parseInt(time%60);

    timeDiv.textContent = `${minutes <10 ? "0":""}${minutes}:${seconds <10 ? "0":""}${seconds}`;
                          
}

