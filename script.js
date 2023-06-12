const word=document.getElementById("word")
const means=document.getElementById("meaning")
const btn=document.getElementById("btn")
const image=document.getElementsByClassName("image")[0]
const body=document.getElementsByTagName("body")[0]
const theme=document.getElementsByClassName("change-theme")[0]
const slider=document.getElementsByClassName("slider")[0]
const image2=document.getElementsByClassName("sun")[0]
const notHeader=document.getElementsByClassName("not-header")[0]
const wordAgain=document.getElementsByClassName("word-again")[0]

console.log(image)
let count=0
theme.addEventListener("click",()=>{
    console.log(count)
    if (count%2==0){
        body.classList.add("dark")
        body.classList.remove("light")
        slider.classList.add("slider-active")
        slider.classList.remove("slider-deactive")
        image2.classList.add("moon")
        image2.classList.remove("sun")
        theme.style.backgroundColor="black"
        theme.style.boxShadow="0px 0px 5px 0px rgb(164, 69, 237)"
        wordAgain.style.color="black"
    }
    else{
        body.classList.add("light")
        body.classList.remove("dark")
        image2.classList.add("sun")
        image2.classList.remove("moon")
        slider.classList.add("slider-deactive")
        slider.classList.remove("slider-active")
        theme.style.backgroundColor="white"
        theme.style.boxShadow="0px 0px 5px 0px rgb(164, 69, 237)"
    }
    count+=1
})

async function meaning(word){

    try{
        const mean=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+word)
        let res=await mean.json()
        const curr=res
        res=res[0].meanings[0].definitions
        console.log(res)
        
        const wordAgain=document.getElementsByClassName("word-again")[0]
        wordAgain.textContent=word
        

        const phonetic=document.getElementsByClassName("word-phonetic")[0]
        phonetic.textContent=curr[0].phonetic

        const listen=document.getElementsByClassName("listen")[0]
        listen.style.backgroundImage="url('https://em-content.zobj.net/thumbs/120/microsoft/319/speaker-high-volume_1f50a.png')"

        const wordInfo=document.getElementsByClassName("word-info")[0]
        wordInfo.style.backgroundColor="aliceblue"
        
        const wordPhonetic=document.getElementsByClassName("word-phonetic")[0]
        wordPhonetic.style.backgroundColor="aliceblue"

        // const wordInfo=
        listen.addEventListener("click",()=>{
            pronounce(word)
        })

        const meanings=curr[0].meanings
        console.log(meanings)
        console.log(meanings.length)
        for (let i=0;i<meanings.length;i++){
            let newDiv=document.createElement("div")
            newDiv.classList.add("meaning-type")

            let type=document.createElement("div") 
            type.classList.add("type")
            type.textContent=meanings[i].partOfSpeech
            type.innerHTML+="<hr>"
            means.append(newDiv)
            newDiv.appendChild(type)
            
            let meaningMain=document.createElement("div")
            meaningMain.classList.add("meaning-main")
            meaningMain.textContent="Meaning"
            meaningMain.style.fontSize="20px"
            meaningMain.style.fontWeight="100"
            meaningMain.style.color="gray"
            newDiv.appendChild(meaningMain)
            
            for (let j=0;j<meanings[i].definitions.length;j++){
                let newDiv2=document.createElement("div")
                newDiv2.classList.add("means")
                newDiv2.textContent=meanings[i].definitions[j].definition
                newDiv.appendChild(newDiv2)

                try{
                    if (meanings[i].definitions[j].example==undefined){
                    let example=document.createElement("div")
                    example.innerHTML=`" `
                    example.classList.add("example")
                    example.textContent+=meanings[i].definitions[j].example
                    example.innerHTML+=` "`
                    newDiv.appendChild(example)
                    
                }
                catch(error){
                    console.log("error ",error)
                }
            }
        }
        
        
    }
    catch (error){
        const mainWord=document.getElementById("word")
        const wordAgain1=document.getElementsByClassName("word-again")[0]

        
        wordAgain1.innerText=mainWord.value
        console.log("error ",error)
        let newDiv=document.createElement("div")
        newDiv.classList.add("means")
        
        if (mainWord.value.toLowerCase()=="kumail"){
            newDiv.textContent="Aatankwadi 💣"
            newDiv.style.color="green"
            newDiv.style.fontSize="50px"

            let bombDiv=document.createElement("div")
            bombDiv.classList.add("bomb")
            means.append(newDiv)
            return
        }

        newDiv.textContent="Whoops !!! Word does not exist in the dictionary"
        newDiv.style.color="red"
        newDiv.style.fontWeight="100"
        means.append(newDiv)
    }
}

async function pronounce(word){          
        const hear=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+word)
        let response=await hear.json()
        response=response[0].phonetics[0].audio
        response=new Audio(response)
        response.play()
}   
    



// image.addEventListener("click",()=>{    
//     meaning(word.value)
// })
word.addEventListener("keydown",(event)=>{
    if (event.key=="Enter"){
        means.replaceChildren()
        meaning(word.value)
    }
    // if (event.key=="m"){
    //     // means.replaceChildren()
    //     pronounce(word.value)
    // }

})
body.addEventListener("keydown",(event)=>{
    if (event.key=="m"){
        pronounce(word.value)
    }
})

notHeader.addEventListener("click",(event)=>{
    theme.style.boxShadow="none"
})
