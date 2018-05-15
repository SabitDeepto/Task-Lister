//Define UI Vars
const form = document.querySelector('#task-form')
const taskList = document.querySelector('.collection')
const clearBtn = document.querySelector('.clear-tasks')
const filter = document.querySelector('#filter')
const taskInput  = document.querySelector('#task')



// set all eventListeners

document.addEventListener('DOMContentLoaded', getTasks)
form.addEventListener('submit', addTask)
taskList.addEventListener('click', removeItem)
clearBtn.addEventListener('click', removeTasks)
filter.addEventListener('keyup', filterItems)



function getTasks(){
	let tasks;
	if(localStorage.getItem('tasks')=== null){
		tasks = []
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach( function(task) {
		const li = document.createElement('li')
		li.className = 'collection-item'
		li.appendChild(document.createTextNode(task))
		
		const link = document.createElement('a')
		link.className = 'delete-item secondary-content'
		link.innerHTML = '<i class = "fa fa-remove"></i>'
		li.appendChild(link)
		taskList.appendChild(li)
	});
}


// *********************** Add Task (Creating the List) ************************/

function addTask(e){
	e.preventDefault()

	if(taskInput.value === ''){
		alert('add some task')
	}

	const li = document.createElement('li')
	li.className = 'collection-item'
	li.appendChild(document.createTextNode(taskInput.value))
	
	const link = document.createElement('a')
	link.className = 'delete-item secondary-content'
	link.innerHTML = '<i class = "fa fa-remove"></i>'
	li.appendChild(link)
	taskList.appendChild(li)

	//add to LS
	storeTaskinLocalStorage(taskInput.value)


}

//************************** Store to LS fun ***********************************

function storeTaskinLocalStorage(task){
	let tasks;
	if(localStorage.getItem('tasks')=== null){
		tasks = []
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}
	tasks.push(task)
	localStorage.setItem('tasks', JSON.stringify(tasks))
}



// ****************************** remove single task ****************************

function removeItem(e){
	if(e.target.classList.contains('fa-remove')){
		if(confirm('delete task?')){
			e.target.parentElement.parentElement.remove()
			//remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement)
		}
	}
}

//remove from LS func
function removeTaskFromLocalStorage(taskItem){
	if(localStorage.getItem('tasks')=== null){
		tasks = []
	}else{
		tasks = JSON.parse(localStorage.getItem('tasks'))
	}

	tasks.forEach( function(task, index) {
		if(taskItem.textContent === task){
			tasks.splice(index, 1)
		}
	});

	localStorage.setItem('tasks', JSON.stringify(tasks))
}

// ****************************** clear task list ****************************

function removeTasks(e){
	// taskList.innerHTML = ''

	while(taskList.firstChild){
		taskList.removeChild(taskList.firstChild)
	}

	//clear all
	clearTasksFromLocalStorage();
}

//clear tasks function
function clearTasksFromLocalStorage(){
	localStorage.clear()
}

// ****************************** Search a listed Task ****************************
function filterItems(e){
	var text = e.target.value.toLowerCase()
	var items = taskList.getElementsByTagName('li')
	Array.from(items).forEach( function(element) {
		var allItem = element.firstChild.textContent
		if(allItem.toLowerCase().indexOf(text) != -1){
			element.style.display = 'block'
		}else{
			element.style.display = 'none'

		}
	})
}
























