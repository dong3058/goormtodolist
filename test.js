let btn=document.querySelector("#추가")
let listbox=document.querySelector("#list-box")
/*let textbox=document.querySelector(".text-box")
let checkbox=document.querySelector(".checkbox")
let write=document.querySelector(".write")
let f=document.querySelector("form")
let deletes=document.querySelector(".delete")
let enter=document.querySelector(".enter")
let body=document.querySelector("body")*/



let todos=[];


btn.addEventListener("click",createnewtodo)
function createnewtodo(){
  
    const item={
        id:new Date().getTime(),
        text:"",
        complete:false
    
    }
    todos.unshift(item)

    let checkbox=createcheckbox(item)
    let text=createtextbox(item)
    let write=createwrite()
    let deletes=createdelete(item)
    let f=createform(checkbox,text,write,deletes)
    listbox.prepend(f)
    if(item.complete){
        checkbox.parentElement.style.opacity=0.5;
        checkbox.nextElementSibling.style.textDecoration="line-through"
        checkbox.nextElementSibling.disabled="disabled"
       
    }
    else{
        checkbox.parentElement.style.opacity=1;
        checkbox.nextElementSibling.style.textDecoration="none"
        checkbox.nextElementSibling.disabled=""
    }

    savedata()
    
    

    

    /*let f=document.createElement("form")
    f.className="todo"
   let checkbox=document.createElement("input")
    checkbox.className="checkbox"
    let textbox=document.createElement("input")
    textbox.className="text-box"
    checkbox.type="checkbox"
    textbox.type="text"
    let deletes=document.createElement("img")
    deletes.setAttribute("src","delete.png")
    deletes.className="delete"
   
   let write=document.createElement("img")
   write.className="write"
   
   write.setAttribute("src","images.png")
   textbox.addEventListener("focus",()=>{
       textbox.style.borderBottom="3px solid white"
       textbox.style.borderRadius="1px"
   })
   textbox.addEventListener("blur",(e)=>{
       textbox.style.borderBottom="none"
       e.target.setAttribute("disabled","disabled")
   })
   
   
   checkbox.addEventListener("change",(event)=>{
       let x=event.target
       if(x.checked){
           x.parentElement.style.opacity=0.5;
           x.nextElementSibling.style.textDecoration="line-through"
           x.nextElementSibling.disabled="disabled"
          
       }
       else{
           x.parentElement.style.opacity=1;
           x.nextElementSibling.style.textDecoration="none"
           x.nextElementSibling.disabled=""
       }
   })
   deletes.addEventListener("click",(event)=>{
       let x=event.target
       x.parentElement.remove()
   })
   
   write.addEventListener("click",(event)=>{
       let x=event.target;
       x.previousElementSibling.disabled=""
       x.previousElementSibling.focus()
   })
   f.addEventListener("keydown",(e)=>{
      
       if(e.key=="Enter"){
           e.target.blur()
       }
   })
   
   
    f.appendChild(checkbox)
    f.appendChild(textbox)
    f.appendChild(write)
    f.appendChild(deletes)
    
   
   
    listbox.prepend(f)
    textbox.focus()*/
   
   }

function createcheckbox(item){
    let checkbox=document.createElement("input")
    checkbox.className="checkbox"
    checkbox.type="checkbox"


    checkbox.addEventListener("change",(event)=>{
        let x=event.target
        
        if(x.checked){
            x.parentElement.style.opacity=0.5;
            x.nextElementSibling.style.textDecoration="line-through"
            x.nextElementSibling.disabled="disabled"
            item.complete=true
            savedata()
        }
        else{
            x.parentElement.style.opacity=1;
            x.nextElementSibling.style.textDecoration="none"
            x.nextElementSibling.disabled=""
            item.complete=false
            savedata()
        }
    })
    return checkbox
}
function createtextbox(item){
    let textbox=document.createElement("input")
    textbox.className="text-box"
   
    textbox.type="text"

    textbox.value=item.text
    textbox.addEventListener("input",()=>{
        item.text=textbox.value
        savedata()
    })
    textbox.addEventListener("focus",()=>{
        textbox.style.borderBottom="3px solid white"
        textbox.style.borderRadius="1px"
    })
    textbox.addEventListener("blur",(e)=>{
        textbox.style.borderBottom="none"
        e.target.setAttribute("disabled","disabled")
    })
    textbox.focus()
    return textbox

}
function createform(check,text,write,deletes){
    let f=document.createElement("form")
    f.className="todo"
    f.addEventListener("keydown",(e)=>{
      
        if(e.key=="Enter"){
            e.target.blur()
        }
    })
    f.appendChild(check)
    f.appendChild(text)
    f.appendChild(write)
    f.appendChild(deletes)
    
   return f
   
    
    

}
function createwrite(){
    let write=document.createElement("img")
    write.className="write"
    write.setAttribute("src","images.png")
    write.addEventListener("click",(event)=>{
        let x=event.target;
        x.previousElementSibling.disabled=""
        x.previousElementSibling.focus()
    })
    return write
}

function createdelete(item){
    let deletes=document.createElement("img")
    deletes.setAttribute("src","delete.png")
    deletes.className="delete"
    deletes.addEventListener("click",(event)=>{
        let x=event.target
        /*let y=Array.from(event.target.parentElement.parentElement.children)
        let idx=y.indexOf(x.parentElement)

        todos.splice(idx,1)
        console.log(todos)
        
        */
        todos=todos.filter(t=>t.id!==item.id)
        x.parentElement.remove()
        savedata()
        // 두가지 방법
    })
    return deletes

}


function savedata(){
    const data=JSON.stringify(todos)
    window.localStorage.setItem("my_todos",data)
}

function loaddata(){
    const data=window.localStorage.getItem("my_todos")

    if(data){
        todos=JSON.parse(data)
        
    }

}

function displaydata(){
    loaddata()
    console.log(todos)

    for(let i=0;i<todos.length;i++){
        const item=todos[i]
        let checkbox=createcheckbox(item)
        let text=createtextbox(item)
        let write=createwrite()
        let deletes=createdelete(item)

        
        let f=createform(checkbox,text,write,deletes)

        if(item.complete){
            f.children[0].parentElement.style.opacity=0.5;
            f.children[0].nextElementSibling.style.textDecoration="line-through"
            f.children[0].nextElementSibling.disabled="disabled"
            f.children[0].checked=true
           
        }
        else{
            f.children[0].parentElement.style.opacity=1;
            f.children[0].nextElementSibling.style.textDecoration="none"
            f.children[0].nextElementSibling.disabled=""
        }

        listbox.appendChild(f)

}
}

displaydata()