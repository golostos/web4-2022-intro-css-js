// SPA - Single Page App - React - Vue - Angular - Svelte
// SEO => Server Side Rendering SSR
// DOM tree
const burger = document.querySelector('.menu-burger')
const menuGroup = document.querySelector('.main-menu-group')
const signupBtn = document.getElementById('signup-btn')
const formBackground = document.querySelector('.form-background')

let form = document.getElementById('form_id')
// let form = document.querySelector('.form-elem')
// let form = document.body.children[1]
form.onsubmit = async function(event) {
    console.log('Click');
    event.preventDefault()
    let userInfo = {
        name: form.name.value,
        lastname: form.lastname.value,
        email: form.email.value, 
        phone: form.phone.value,
        password: form.password.value
    }
    userInfo = JSON.stringify(userInfo)
    
    const spinner = document.querySelector('.spinner')
    spinner.classList.add('spinner__show')
    const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: userInfo
    })
    if (response.ok) {
        spinner.classList.remove('spinner__show')
        formBackground.classList.remove('form-background__show')
        const user = await response.json()
        console.log(user);
    }
}

burger.addEventListener('click', () => {
    menuGroup.classList.toggle('main-menu-group__show')
})

signupBtn.addEventListener('click', () => {
    formBackground.classList.add('form-background__show')
})

formBackground.onclick = (event) => {
    if (event.target === formBackground) {
        formBackground.classList.remove('form-background__show')
    }
}