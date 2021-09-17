function activeItems(){
  db.collection("todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot.docs[0].data);
    let items = [];
    
    snapshot.docs.forEach((doc) => {
      if(doc.data().status == "active") {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      }
     
     
    });
    // console.log(items);
    generateItems(items);
    numberOfItems(items.length);
    

    
  });
 
}
function allItems(event) {
  db.collection("todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot.docs[0].data);
    let items = [];
    
    snapshot.docs.forEach((doc) => {
     
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(items);
    generateItems(items);
    numberOfItems(items.length);
    

    
  });

}

function completedItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot.docs[0].data);
    let items = [];
    
    snapshot.docs.forEach((doc) => {
      if(doc.data().status == "completed") {
        items.push({
          id: doc.id,
          ...doc.data(),
        });
      }
     
     
    });
    // console.log(items);
    generateItems(items);
    numberOfItems(items.length);
    

    
  });



}

function clearCompletedItems(event){
  db.collection("todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot.docs[0].data);
    let items = [];
    
    snapshot.docs.forEach((doc) => {
      if(doc.data().status == "completed") {
       db.collection("todo-items").doc(doc.id).delete().then(() => {
         console.log("successfull");
       }).catch((error) => {
        console.error("Error removing document: ", error);
    });
      }
     
     
    });
    // console.log(items);
    // generateItems(items);
    // numberOfItems(items.length);
    location.reload();
    

    
  });

}


// function clearCompletedItems(event){
  
  
// }
// function getActiveItems(){

//  }

function addItem(event) {

  event.preventDefault();
  // console.log("hello",event);
  let text = document.getElementById("todo-input");
  if(text.value != "" && text.value != " "){
    db.collection("todo-items").add({
      text: text.value,
      status: "active",
    });
    text.value = "";
  }
  else{
    alert(" write something !")
  }

  
}



function getItems() {
  db.collection("todo-items").onSnapshot((snapshot) => {
    // console.log(snapshot.docs[0].data);
    let items = [];
    
    snapshot.docs.forEach((doc) => {
     
      items.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    console.log(items);
    generateItems(items);
    numberOfItems(items.length);
    

    
  });
}

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    // console.log(item);
    itemsHTML += `
          <div class="todo-item">
               <div class="check">
                  <div data-id="${item.id}" class="check-mark ${item.status == "completed"? "checked": " "} ">
                      <img src="./images/icon-check.svg" alt="">
                  </div>
               </div>
               <div class="todo-text  ${item.status == "completed"? "checked": " "}">  
          
                 ${item.text}
               </div>

          </div>
    
    `;
  });
  document.querySelector(".todo-items").innerHTML = itemsHTML;
  createEventListeners();
}
function createEventListeners() {
  let todoCheckMarks = document.querySelectorAll(".todo-item .check ");
  // console.log(todoCheckMarks);
  todoCheckMarks.forEach((checkMark) => {  
    console.log(checkMark);
        checkMark.addEventListener("click", () => {
          // console.log(checkMark.lastElementChild.attributes[0]);
          let check = checkMark.querySelector(".check-mark").getAttribute("data-id");
          // console.log(check);
          markCompleted(check);
          // console.dir(checkMark);
         
        })
   })
    // console.log(todoCheckMarks);

}

function markCompleted(id) {
  console.log(id);
  let item = db.collection("todo-items").doc(id);
  item.get().then(function(doc) {
    if(doc.exists){
      // console.log("here is the doc",doc.data());
      let status = doc.data().status;
      if(status == "active") {
        item.update({
          status:"completed"
        })
      }
      else if(status == "completed") {
        item.update({
          status:"active"
        })


      }
    }
  })
}



getItems();




function numberOfItems(length) {
 document.querySelector(".total-items").innerText = length + " items";

}


