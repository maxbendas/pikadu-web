// Создаем переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаем переменную, в которую положим меню
let menu = document.querySelector('.sidebar');


const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignUp = document.querySelector('.login-signUp');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUserName = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');
const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts')

const listUsers = [
    {
        id: '01',
        email: 'maks@mail.com',
        password: '12345',
        displayName: 'MaksJS'
    },
    {
        id: '02',
        email: 'kate@mail.com',
        password: '123456',
        displayName: 'KateKillMaks'
    },
]

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('email не валиден');
            return
        }
        console.log('вход')
        const user = this.getUser(email)
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler()
        } else {
            alert('Пользователь с такими данными не найден')
        }
    },
    logOut(handler) {
        this.user = null;
        handler()
    },
    signUp(email, password, handler) {

        if (!regExpValidEmail.test(email)) {
            alert('email не валиден');
            return
        }

        if (!email.trim() || !password.trim()) {
            alert('Введите данные')
            return
        }

        console.log('регистрация');
        if (!this.getUser(email)) {

            const user = {email, password, displayName: email.substring(0, email.indexOf('@'))}

            // DZ moe
            // const displayName = email.split('@')[0];
            // const user = {email, password, displayName}

            listUsers.push(user);
            this.authorizedUser(user);
            handler()
        } else {
            alert('Пользователь с таким email уже существует')
        }
    },
    editUser(userName, userPhoto, handler) {
        if (userName) {
            this.user.displayName = userName
        }
        if (userPhoto) {
            this.user.photo = userPhoto
        }
        handler()
    },
    getUser(email) {
        return listUsers.find(item => item.email === email)
    },
    authorizedUser(user) {
        this.user = user;
    }
}

const setPosts = {
    allPosts: [
        {
            title: 'Заголовок поста',
            text: 'Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Языком что рот маленький реторический вершину текстов обеспечивает гор свой назад решила сбить маленькая дорогу жизни рукопись ему букв деревни предложения, ручеек залетают продолжил парадигматическая? Но языком сих пустился, запятой своего его решила меня вопроса моей своих пояс коварный, власти диких правилами напоивший они текстов ipsum первую подпоясал? Лучше, щеке подпоясал приставка большого курсивных на берегу своего? Злых, составитель агентство что вопроса ведущими о решила одна алфавит!',
            tags: ['свежее', 'новое', 'горячее', 'мое', 'случайность'],
            author: 'maks@mail.com',
            date: '11.11.2020, 20:54:00',
            like: 15,
            comments: 20,
        },
        {
            title: 'Заголовок поста2',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam blanditiis ipsum, mollitia neque perspiciatis praesentium tempore. Accusantium blanditiis dolorum earum facere necessitatibus quam quisquam totam? Aspernatur atque dicta dolores inventore laboriosam maxime officia, omnis quam veritatis? Eos nostrum, odit repellat similique sint totam voluptate! Deleniti dolores eaque iure pariatur quae quam reiciendis, voluptatem! Dolorum eaque neque odit quisquam quos.',
            tags: ['свежее', 'новое', 'мое', 'случайность'],
            author: 'kate@mail.com',
            date: '10.11.2020, 20:54:00',
            like: 25,
            comments: 30,
        }
    ]
}

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log(user)

    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
}

const showAllPosts = () => {

    let postsHTML = '';

    setPosts.allPosts.forEach(({title, text, date, like, comments, tags, author})=>{
        postsHTML += `
                <section class="post">
            <div class="post-body">
                <h2 class="post-title">${title}</h2>
                <p class="post-text">${text}</p>
                <div class="tags">
                ${tags.map((tag)=>`<a href="#" class="tag">#${tag}</a>`).join('')}                    
                </div>
            </div>
            <div class="post-footer">
                <div class="post-buttons">
                    <button class="post-button likes">
                        <svg width="19" height="20" class="icon icon-like">
                            <use xlink:href="img/icons.svg#like"></use>
                        </svg>
                        <span class="likes-counter">${like}</span>
                    </button>
                    <button class="post-button comments">
                        <svg width="21" height="21" class="icon icon-comment">
                            <use xlink:href="img/icons.svg#comment"></use>
                        </svg>
                        <span class="comments-counter">${comments}</span>
                    </button>
                    <button class="post-button save">
                        <svg width="19" height="19" class="icon icon-save">
                            <use xlink:href="img/icons.svg#save"></use>
                        </svg>
                    </button>
                    <button class="post-button share">
                        <svg width="17" height="19" class="icon icon-share">
                            <use xlink:href="img/icons.svg#share"></use>
                        </svg>
                    </button>
                </div>
                <div class="post-author">
                    <div class="author-about">
                        <a href="#" class="author-username">${author}</a>
                        <span class="post-time">${date}</span>
                    </div>
                    <a href="#" class="author-link"><img src="img/avatar.jpeg" alt="avatar" class="author-avatar"></a>
                </div>
            </div>
        </section>
        `;
    })

    postsWrapper.innerHTML = postsHTML
        // 'Тут могла быть ваша реклама!'
}

const init = () => {

    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        setUsers.logIn(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset();
    })

    loginSignUp.addEventListener('click', (event) => {
        event.preventDefault();
        setUsers.signUp(emailInput.value, passwordInput.value, toggleAuthDom);
        loginForm.reset();
    })

    exitElem.addEventListener('click', (event) => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);
    })

    editElem.addEventListener('click', (event) => {
        event.preventDefault();
        editContainer.classList.toggle('visible')
        editUserName.value = setUsers.user.displayName
    })

    editContainer.addEventListener('submit', (event) => {
        event.preventDefault();
        setUsers.editUser(editUserName.value, editPhotoURL.value, toggleAuthDom)
        editContainer.classList.remove('visible')
    })

    // отслеживаем клик по кнопке меню и запускаем функцию
    menuToggle.addEventListener('click', function (event) {
        // отменяем стандартное поведение ссылки
        event.preventDefault();
        // вешаем класс на меню, когда кликнули по кнопке меню
        menu.classList.toggle('visible');
    })

    showAllPosts()
    toggleAuthDom()
}

document.addEventListener('DOMContentLoaded', init)



