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
    // console.log(items);
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
        //  console.log("successfull");
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
    // console.log(items);
    generateItems(items);
    numberOfItems(items.length);
    

    
  });
}

function generateItems(items) {
  let itemsHTML = "";
  items.forEach((item) => {
    // console.log(item);
    itemsHTML += `
          <div class="todo-item white">
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
    // console.log(checkMark);
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
  // console.log(id);
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

// function setTheme(){
//   let background = document.getElementsByClassName("background-image")[0];
//   let oImg = document.createElement("img");
//   oImg.setAttribute('src', './images/bg-desktop-dark.jpg');
//   oImg.setAttribute('id', 'image');
//   oImg.setAttribute('alt', 'na');
//   oImg.setAttribute('theme', 'dark');
//   background.appendChild(oImg);

// }
// setTheme();

function themeChange(event){
  console.log("clicked");
  
  let background = document.getElementById("background-image");
  let oImg1 = document.getElementById("image");
  let theme = oImg1.getAttribute("theme");
  console.log(theme);

  // var element = document.getElementById(");
  // oImg1.classList.toggle("mystyle");
  
  // oImg.setAttribute('theme', 'dark');
  if(theme =="dark") {
    console.log("dark er moddhe");
    background.innerHTML = "";
    let oImg = document.createElement("img");
    oImg.setAttribute('src', './images/bg-desktop-light.jpg');
    oImg.setAttribute('id', 'image');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('theme', 'light');
    let body = document.getElementsByClassName("body")[0];
    console.log(body);
    body.style.backgroundColor = "white";
    body.style.color = "black";
    let whites = document.getElementsByClassName("white");
    for(i=0;i<whites.length;i++){
      whites[i].style.backgroundColor = "white";
      whites[i].style.color = "rgb(70, 78, 84)";
    }
    background.appendChild(oImg);
    let sunMoon = document.getElementById("sun-moon");
    sunMoon.innerHTML = "";
    let sunMoonImg = document.createElement("img");
    sunMoonImg.setAttribute('src','./images/icon-moon.svg');
    sunMoonImg.setAttribute('alt','sun-icon');
    sunMoon.appendChild(sunMoonImg);

  }
  else if(theme =="light") {
    console.log("lighter moddhe");
    background.innerHTML = "";
    let oImg = document.createElement("img");
    oImg.setAttribute('src', './images/bg-desktop-dark.jpg');
    oImg.setAttribute('id', 'image');
    oImg.setAttribute('alt', 'na');
    oImg.setAttribute('theme', 'dark');
    let body = document.getElementsByClassName("body")[0];
    body.style.backgroundColor = "#181824";
    body.style.color = "black";
    let whites = document.getElementsByClassName("white");
    for(i=0;i<whites.length;i++){
      whites[i].style.backgroundColor = "#181824";
      whites[i].style.color = "white";
    }
    
    console.log(body);
      background.appendChild(oImg) ;
      let sunMoon = document.getElementById("sun-moon");
    sunMoon.innerHTML = "";
    let sunMoonImg = document.createElement("img");
    sunMoonImg.setAttribute('src','./images/icon-sun.svg');
    sunMoonImg.setAttribute('alt','sun-icon');
    sunMoon.appendChild(sunMoonImg);
  }
 
  // oImg.setAttribute('theme', 'dark');
  

}

