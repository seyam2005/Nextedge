const commandCenter =
document.getElementById(
"commandCenter"
);

const commandBtn =
document.getElementById(
"commandBtn"
);

const commandInput =
document.getElementById(
"commandInput"
);

/* CTRL + K */

document.addEventListener(
"keydown",
e => {

if(
e.ctrlKey &&
e.key.toLowerCase()==="k"
){

e.preventDefault();

commandCenter.classList.add(
"active"
);

commandInput.focus();

}

}
);

/* CLOSE */

document.addEventListener(
"keydown",
e => {

if(e.key==="Escape"){

commandCenter.classList.remove(
"active"
);

}

}
);

/* MOBILE */

commandBtn.addEventListener(
"click",
()=>{

commandCenter.classList.add(
"active"
);

commandInput.focus();

}
);

/* ITEMS */

document
.querySelectorAll(".command-item")
.forEach(item=>{

item.addEventListener(
"click",
()=>{

const link =
item.dataset.link;

const secret =
item.dataset.secret;

if(link){

window.location.href =
link;

}

if(secret==="matrix"){

document.body.classList.toggle(
"matrix-mode"
);

}

}
);

});

