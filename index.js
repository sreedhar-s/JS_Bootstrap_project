const taskContainer = document.querySelector(".task_container");
// console.log(taskContainer);

// Global Store

let globalStore = [];

const newcard = ({id,imageUrl,taskTitle,taskDescription,taskType}) => 
`<div class="col-md-6 col-lg-4 id=${id}">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
    <button type="button id="${id}" class="btn btn-outline-danger onclick="deleteCard.apply(this, arguments)"><i class="fas fa-trash-alt" id="${id}" onclick="deleteCard.apply(this, arguments)"></i></button>
  </div>
  <img src=${imageUrl} class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">${taskTitle}</h5>
    <p class="card-text">${taskDescription}</p>
    <span class="badge bg-primary">${taskType}</span>
  </div>
  <div class="card-footer text-muted">
    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
  </div>
</div>
</div>`;

const loadInitialTaskCards = () => {
  // access local storage
  const getInitialData = localStorage.getItem("tasky"); //null
  if(!getInitialData) return ;


  // convert strinified-object to object
  const {cards} = JSON.parse(getInitialData);


  //map around the array to generate HTML card and inject to DOM
  cards.map((cardObject) => {
    const createNewCard = newcard(cardObject);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);
    globalStore.push(cardObject);
  });
}

const updateLocalStorage = () => localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`, // unique number for card id
        imageUrl : document.getElementById("imageurl").value,
        taskTitle:document.getElementById("tasktitle").value,
        taskType:document.getElementById("tasktype").value,
        taskDescription:document.getElementById("taskdescription").value,
    };
    
    //HTML Code
    const createNewCard = newcard(taskData);
    taskContainer.insertAdjacentHTML("beforeend",createNewCard);

    globalStore.push(taskData);

    // add to local storage
    updateLocalStorage();
};

const deleteCard = (event) => {
  //id
  
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  //search the global, remove the object which matches with the id

  const newUpdatedArray = globalStore.filter((cardObject) => cardObject.id != targetID);

  // newUpdatedArray.map((cardObject) => {
  //   const createNewCard = newcard(cardObject);
  //   taskContainer.insertAdjacentHTML("beforeend",createNewCard);
  // });

  globalStore = newUpdatedArray;
  updateLocalStorage();

  // Accesss DOM to remove them

  if(tagname === "BUTTON"){
    // 
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode // col-lg-4;
    );
  }
    return taskContainer.removeChild(
      event.target.parentNode.parentNode.parentNode.parentNode // col-lg-4;
    );
};

// Features

// Edit

// Open



