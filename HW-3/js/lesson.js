// PHONE CHECKER-----------------------------------------------------------------------------------------

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.addEventListener('click', () => {
    if (regExp.test(phoneInput.value)){
        phoneResult.innerHTML = 'ok'
        phoneResult.style.color = 'green'
    }else {
        phoneResult.innerHTML = 'not ok'
        phoneResult.style.color = 'red'
    }
})

//TAB SLIDER-------------------------------------------------------------------------------------------------

const tabContentItems = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabItemsParent = document.querySelector('.tab_content_items')
let index = 0

const hideTabContent = () => {
    tabContentItems.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentItems[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}

hideTabContent()
showTabContent(index)

tabItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')){
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem){
                hideTabContent()
                index = tabIndex
                showTabContent(index)
            }
        })
    }
}
const autoSlider = () => {
    hideTabContent()
    index = (index + 1) % tabItems.length
    showTabContent(index)
}

setInterval(autoSlider, 3000)