const word=document.getElementById("word")
const means=document.getElementById("meaning")
// console.log(word.value)
const btn=document.getElementById("btn")
const box=document.getElementById("input")
box.addEventListener('click', function(){
//     e.preventDefault();
//     box.style.borderColor="Blue"
    box.classList
});

// 0.meanings[0].definitions[0].definition
function meaning(word){
    const mean=fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+word)
            .then((res)=>res.json())
            .then((res)=>res[0].meanings[0].definitions)
            // .then((res)=>res)
            .then((res)=>{
                console.log(res)
                let myDiv=document.getElementById("meaning")
                for (let i=0;i<res.length;i++){
                    let newDiv=document.createElement("div")
                    newDiv.classList.add("means")
                    newDiv.textContent=res[i].definition
                    myDiv.append(newDiv)
                }
                
            })

    
function pronounce(word){
    const listen=fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/`+word)
        .then((res)=>res.json())
        .then((res)=>res[0].phonetics[1].audio)
        .then((res)=>new Audio(res))
        .then((res)=>means.inner=res.play())

}   
                
                // .then()
    // voice.play    

                // .then((res)=>{means.innerText=res})

    // const meanJson=mean.json()
    console.log(mean.json)
    // const phonetic

    // .then(res=>res.json())0.phonetic
    // .then(console.log(res))

    
}
btn.addEventListener("click",()=>{
    // meaning
    console.log(word.value)
    const i=2
    meaning(word.value,i)
})