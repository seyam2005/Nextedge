const aiOrb = document.getElementById("aiOrb");

const aiPanel = document.getElementById("aiPanel");

const closeAI = document.getElementById("closeAI");

const sendBtn = document.getElementById("sendBtn");

const userInput = document.getElementById("userInput");
const aiChat = document.getElementById("aiChat");
const aiSound = document.getElementById("aiSound");
document.body.addEventListener("click",()=>{

    aiSound.load();

},{ once:true });
/* OPEN */

aiOrb.addEventListener("click",()=>{

    aiPanel.classList.add("active");
aiSound.currentTime = 0;

aiSound.play().catch(err => console.log(err));
})

/* CLOSE */

closeAI.addEventListener("click",()=>{

    aiPanel.classList.remove("active");

})

/* SEND */

sendBtn.addEventListener("click",sendMessage);

async function sendMessage(){

    const text = userInput.value;

    if(text === "") return;

    /* USER MESSAGE */

    const userMsg = document.createElement("div");

    userMsg.classList.add("ai-message");

    userMsg.style.alignSelf = "flex-end";

    userMsg.style.background = "#0ea5e9";

    userMsg.innerText = text;

    aiChat.appendChild(userMsg);

    userInput.value = "";

    /* TYPING */

    const typing = document.createElement("div");

    typing.classList.add("typing");

    typing.innerHTML = `
    
    <span></span>
    <span></span>
    <span></span>

    `;

    aiChat.appendChild(typing);

    aiChat.scrollTop = aiChat.scrollHeight;

    try{

        const response = await fetch("http://localhost:5001/api/ai-chat",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                message:text

            })
        });

        const data = await response.json();

        typing.remove();

        const aiMsg = document.createElement("div");

        aiMsg.classList.add("ai-message");

        typeText(aiMsg, data.reply);

        aiChat.appendChild(aiMsg);

        aiChat.scrollTop = aiChat.scrollHeight;

    }

    catch(error){

        typing.remove();

        const errorMsg = document.createElement("div");

        errorMsg.classList.add("ai-message");

        errorMsg.innerText = "AI connection failed.";

        aiChat.appendChild(errorMsg);
    }
}



/* ENTER KEY */

userInput.addEventListener("keypress",(e)=>{

    if(e.key === "Enter"){

        sendMessage();

    }

})

/* MOUSE GLOW */

const glow = document.querySelector(".mouse-glow");

document.addEventListener("mousemove",(e)=>{

    glow.style.left = e.clientX + "px";

    glow.style.top = e.clientY + "px";

})


/* TYPE EFFECT */

function typeText(element,text){

    let index = 0;

    const interval = setInterval(()=>{

        if(index < text.length){

            element.innerHTML += text.charAt(index);

            index++;

            aiChat.scrollTop = aiChat.scrollHeight;

        }

        else{

            clearInterval(interval);

        }

    },15);
}