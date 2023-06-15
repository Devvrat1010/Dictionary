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
const main=document.getElementsByClassName("main")[0]
const init=document.getElementsByClassName("init")[0]
const changeFont=document.getElementsByClassName("change-font")[0]
const font=body.style.fontFamily
const fonts=document.getElementsByClassName("fonts")[0]
const inputWord=document.getElementsByClassName("input-word")[0]
const currFont=document.getElementsByClassName("curr-font")

console.log("currFont")
changeFont.innerHTML=currFont[0].innerText + ""

fonts.style.opacity="0"

for (let i=0;i<currFont.length;i++){
    currFont[i].addEventListener("click",()=>{
        body.style.fontFamily=currFont[i].style.fontFamily
        changeFont.innerHTML=currFont[i].innerText+""
        
        changeFont.style.boxShadow="0 0 5px 0px rgb(164, 69, 237)"
    })
}


changeFont.addEventListener("click",function changing(){
    if (inputWord.contains(fonts)){
        inputWord.removeChild(fonts)
        changeFont.style.boxShadow="none"
        fonts.style.opacity="1"
        
    }
    else{
        changeFont.style.boxShadow="0 0 5px 0px rgb(164, 69, 237)"
        inputWord.appendChild(fonts)
        fonts.style.opacity="1"

    }
})

function change_theme(){
    const word1=document.getElementsByClassName("word1")[0]
    const wordInfo=document.getElementsByClassName("word-info")[0]
    const wordPhonetic=document.getElementsByClassName("word-phonetic")[0]
    const indivWord=document.getElementsByClassName("indiv-word")
    
    if (body.classList.contains("dark")){   
        for (let i=0;i<indivWord.length;i++){
            word1.style.backgroundColor="#3b3b3b"
            wordAgain.style.color="white"
            indivWord[i].style.color="white"
            if (main.contains(init)){
                continue
            }
            else{
                wordPhonetic.style.backgroundColor="#3b3b3b"
                wordInfo.style.backgroundColor="#3b3b3b"
            }
        }
    }
    else{
        for (let i=0;i<indivWord.length;i++){
            word1.style.backgroundColor="#e8e8e8"
            wordAgain.style.color="black"
            if (main.contains(init)){
                continue
            }
            else{
                wordPhonetic.style.backgroundColor="#e8e8e8"
                wordInfo.style.backgroundColor="#e8e8e8"
            }
            indivWord[i].style.color="black"
        }
    }
}
theme.addEventListener("click",function changing_theme(){

    const indivWord=document.getElementsByClassName("indiv-word")
    if (body.classList.contains("light")){
        body.classList.add("dark")
        body.classList.remove("light")
        slider.classList.add("slider-active")
        slider.classList.remove("slider-deactive")
        image2.classList.add("moon")
        image2.classList.remove("sun")
        theme.style.backgroundColor="black"
        theme.style.boxShadow="0px 0px 5px 0px rgb(164, 69, 237)"
        wordAgain.style.color="black"
        change_theme()
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
        change_theme()
    }
})

async function meaning(word){
    
    let alpha="abcdefghijklmnopqrstuvwxyz"
    means.replaceChildren()
    let finalWord=""
    for (let i=0;i<word.length;i++){
        if (alpha.includes(word[i].toLowerCase()) || word[i]==" "){
            finalWord+=word[i]
        }
    }

    word=finalWord
    try{
        const currentWord=document.getElementById("word")
        currentWord.value=word
        const mean=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+word)
        let res=await mean.json()
        const curr=res
        res=res[0].meanings[0].definitions
        
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

            let more="false"
            newDiv.appendChild(meaningMain)
            let meanLength=meanings[i].definitions.length
            if (meanings[i].definitions.length>3){
                displayLength=3
                more="true"
            }
            else{
                more="false"
                displayLength=meanings[i].definitions.length
            }

            for (let j=0;j<displayLength;j++){
                showMeaning(i,meanings,newDiv,j)
     
            }
            if (more=="true"){
                let moreDiv=document.createElement("div")
                moreDiv.classList.add("more")
                moreDiv.textContent="Show More"
                newDiv.appendChild(moreDiv)
                moreDiv.addEventListener("click",()=>{
                    newDiv.removeChild(moreDiv)
                    for (let k=3;k<meanings[i].definitions.length;k++){
                        showMeaning(i,meanings,newDiv,k)   
                    }
                    if (meanings[i].synonyms.length>0){
                        synonyms(i,meanings,newDiv)
                    }
                    
                })
            }
            if (meanings[i].synonyms.length>0){
                synonyms(i,meanings,newDiv)
            }
        }        
    }
    catch (error){
        const mainWord=document.getElementById("word")
        const wordAgain1=document.getElementsByClassName("word-again")[0]

        
        wordAgain1.innerText=mainWord.value
        let newDiv=document.createElement("div")
        newDiv.classList.add("means")
        
        // if (mainWord.value.toLowerCase()=="kumail"){
        //     newDiv.textContent="Aatankwadi 💣"
        //     newDiv.style.color="green"
        //     newDiv.style.fontSize="50px"

        //     let bombDiv=document.createElement("div")
        //     bombDiv.classList.add("bomb")
        //     means.append(newDiv)
        //     return
        // }

        newDiv.textContent="Whoops !!! Word does not exist in the dictionary"
        newDiv.style.color="red"
        newDiv.style.fontWeight="100"
        means.append(newDiv)
    }
}

function synonyms(i,meanings,newDiv,j){
    let synonymsWrapper=document.createElement("div")
    synonymsWrapper.classList.add("synonyms-wrapper")

    let synonyms=document.createElement("div")
    synonyms.classList.add("synonyms")
    
    synonyms.textContent="Synonyms"
    let arr=meanings[i].synonyms
    let stri=meanings[i].synonyms.toString()
    
    // 
    let synonymsText=individualWord(meanings,i)
    synonymsWrapper.appendChild(synonyms)
    synonymsWrapper.appendChild(synonymsText)
    newDiv.appendChild(synonymsWrapper)
    change_theme()

    
}

function individualWord(meanings,i){

    let synonymsText=document.createElement("div")
    synonymsText.classList.add("synonyms-text")
    for (let x=0;x<meanings[i].synonyms.length;x++){
        let synonymsWord=document.createElement("div")
        synonymsWord.classList.add("synonyms-word")
        synonymsWord.textContent=meanings[i].synonyms[x]
        synonymsText.appendChild(synonymsWord)
    
        synonymsWord.addEventListener("click",()=>{
    
            meaning(synonymsWord.innerText.toString())
        })
    }
    return synonymsText
}

function showMeaning(i,meanings,newDiv,j){
    try{
        const meaningType=document.getElementsByClassName("meaning-type")[i]
        let synonymsWrapper=document.getElementsByClassName("synonyms-wrapper")[i]
        meaningType.removeChild(synonymsWrapper)
    }
    catch(error){
    }
    let newDiv2=document.createElement("div")
    
    newDiv2.classList.add("means")
    let arr=meanings[i].definitions[j].definition.split(" ")
    for (let x=0;x<arr.length;x++){
        let indivWord=document.createElement("div")
        indivWord.classList.add("indiv-word")
        indivWord.textContent=arr[x]
        newDiv2.appendChild(indivWord)
        indivWord.addEventListener("click",()=>{
            meaning(indivWord.innerText.toString())
        })   
    }
    let meaningWrapper=document.createElement("div")
    meaningWrapper.classList.add("meaning-wrapper")

    let bullet=document.createElement("div")
    bullet.classList.add("bullet")
    meaningWrapper.appendChild(bullet)
    meaningWrapper.appendChild(newDiv2)
    newDiv.appendChild(meaningWrapper)
    
    let example=document.createElement("div")
    example.classList.add("example")
    example.textContent=meanings[i].definitions[j].example
    newDiv.appendChild(example)
    change_theme()


}

async function pronounce(word){          
        const hear=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+word)
        let response=await hear.json()
        response=response[0].phonetics[0].audio
        response=new Audio(response)
        response.play()
}   

image.addEventListener("click",()=>{    
    image.style.boxShadow="0px 0px 5px 0px rgb(164, 69, 237)"
    main.removeChild(init)
    meaning(word.value)
    
})
word.addEventListener("keydown",(event)=>{
    if (event.key=="Enter"){
        main.removeChild(init)
        meaning(word.value)
    }
})
body.addEventListener("keydown",(event)=>{
    if (event.key=="m"){
        pronounce(word.value)
    }
})
init.addEventListener("click",()=>{
    removeFont()
   
})
notHeader.addEventListener("click",(event)=>{
    theme.style.boxShadow="none"
    removeFont()
})
function removeFont(){
    if (inputWord.contains(fonts)){
        inputWord.removeChild(fonts)
        changeFont.style.boxShadow="none"
    }
}
