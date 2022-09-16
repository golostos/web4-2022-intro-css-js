// DOM tree
let form = document.getElementById('form_id')
// let form = document.querySelector('.form-elem')
// let form = document.body.children[1]
form.onsubmit = function(event) {
    console.log('Click');
    event.preventDefault()
    let userInfo = {
        name: form.name.value,
        lastname: form.lastname.value,
        email: form.email.value, 
        phone: form.phone.value,
        password: form.password.value
    }
    console.log(JSON.stringify(userInfo));
}

const burger = document.querySelector('.menu-burger')
const menuGroup = document.querySelector('.main-menu-group')
burger.addEventListener('click', () => {
    menuGroup.classList.toggle('main-menu-group__show')
})

const signupBtn = document.getElementById('signup-btn')
const formBackground = document.querySelector('.form-background')
signupBtn.addEventListener('click', () => {
    formBackground.classList.add('form-background__show')
})