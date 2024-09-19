// G-MAIL //
const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /\w@gmail.com$/
gmailButton.addEventListener('click', () => {
    if (regExp.test(gmailInput.value)){
        gmailResult.innerHTML = 'ok'
        gmailResult.style.color = 'green'
    }else {
        gmailResult.innerHTML = 'not ok'
        gmailResult.style.color = 'red'
    }
})


//MOVE BLOCK
const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')


let positionX = 0;
let positionY = 0;
const parentWidthFree = 449;
const moveSpeedChildBlock = 1;
const moveBlock = () => {
    if(positionX < parentWidthFree && positionY === 0){
        positionX++
        childBlock.style.left = `${positionX}px`
    }else if(positionX >= parentWidthFree && positionY < parentWidthFree ){
        positionY++
        childBlock.style.top = `${positionY}px`
    }else if(positionX > 0 && positionY === parentWidthFree){
        positionX--;
        childBlock.style.left = `${positionX}px`
    }else if (positionX === 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`
    }
    setTimeout(moveBlock, moveSpeedChildBlock);
}
moveBlock();


const zero = document.getElementById('seconds')
const stopButton = document.getElementById('stop')
const resetButton = document.getElementById('reset')
const startButton = document.getElementById('start')
const timeBlock = document.getElementsByClassName( 'time_block')
let count = 0
let interval

const stopwatch = () => {
    count++
    zero.innerHTML = count
}

startButton.addEventListener('click', () => {
    clearInterval(interval)
    interval = setInterval(stopwatch, 1000)

})
stopButton.addEventListener('click', () => {
    clearInterval(interval)
})
resetButton.addEventListener('click', () => {
    clearInterval(interval)
    count = 0
    zero.innerHTML = '0'
})


document.addEventListener('DOMContentLoaded',()=>{
    const charactersBlock = document.querySelector('.characters_block');
    const request= new XMLHttpRequest()
    request.open('GET', '../data/characters.json');
    request.setRequestHeader('Content-type','application.json');
    request.send();

    request.onload=()=>{
        if (request.status>=200 && request.status<400) {
            console.log('Response text:', request.responseText);
            const characters=JSON.parse(request.responseText);

            characters.forEach((character)=>{
                const characterContainer=document.createElement('div');
                characterContainer.classList.add('character_container');

                characterContainer.innerHTML =`
                <div class="character_photo">
                    <img src="${character.photo} 
                    alt="${character.name}"/>
                </div>
                <h2>${character.name}</h2>
                <p id="age_part"> Age:${character.age}</p>
                <p id="bio_part"> Bio:${character.bio}</p>
    
                
                `;
                const h2Element=characterContainer.querySelector('h2');
                const pElements=characterContainer.querySelectorAll('p');

                if (h2Element){
                    h2Element.style.color='white';
                }
                pElements.forEach(p=>{
                    p.style.color='white';
                });
                charactersBlock.append(characterContainer);
            }) ;
        } else {
            console.error('Request failed', request.status);
        }
    }
    request.onerror = ()=>{
        console.error("Request fully failed");
    };
});
