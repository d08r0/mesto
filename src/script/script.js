(function() {

const formUserInfo = document.forms.info;
const placesList = document.querySelector('.places-list');
const buttonUserInfo = document.querySelector('.user-info__button');
const popupCard = document.querySelector('.popup');
const popupPic = document.querySelector('.popup-pic');
const buttonPopupPicClose = document.querySelector('.popup-pic__close');
const buttonPopupClose = document.querySelector('.popup__close');
const formCard = document.forms.new;
const nameNew = formCard.elements.name;
const linkNew = formCard.elements.link;
const userAbout = formUserInfo.elements.userInfo;
const userName = formUserInfo.elements.userName;
const buttonUserInfoEdit = document.querySelector('.user-info__edit-button');
const popupEditUserInfo = document.querySelector('.popup-edit-user-info');
const buttonPopupEditUserInfoClose = document.querySelector('.popup-edit-user-info__close');
const userInfoName = document.querySelector('.user-info__name');
const userInfoJob = document.querySelector('.user-info__job');
const userInfoAvatar = document.querySelector('.user-info__photo');
const popupPiImage = document.querySelector('.popup-pic__image');

const errorMessages = {
    empty: 'Это обязательное поле',
    wrongLength: 'Должно быть от 2 до 30 символов',
    wrongUrl: 'Здесь должна быть ссылка',
};

const config = {
    url: 'https://praktikum.tk/cohort11/',

    headers: {
        authorization: '14aa125f-ca54-46fc-8e88-a284e0254a02',
        'Content-Type': 'application/json',
    }
};

const api = new Api(config);

/*
    Можно лучше: загрузку начальных данных сделать с использованием Promise.all
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

    Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
        this.api.getUserInfo(),
        this.api.getCardList()
    ])    
        .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
            const [userData, initialCards] = values;
            ....................
        })
        .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
        })
      
*/
api.getUserInfo().then((data) => {
    const userInfo = new UserInfo(userAbout, userName, userInfoName, userInfoJob, userInfoAvatar, data.name, data.about, data.avatar);
    userInfo.updateUserInfo();
    const myId = data._id;

    api.getCardList().then((data) => {
        const cardList = new CardList(placesList, data, createCard, myId);

        function createCard(name, link, id) {
            const card = new Card(name, link, id);
            return card;
        }

        cardList.render();
    })
        .catch((err) => {
            console.log(err);
        });
})
    .catch((err) => {
        console.log(err);
    });

const popup = new Popup(popupPic);
const cardList = new CardList(placesList, initialCards);

function handlerRenderEditInfoPopup() {
    const popup = new Popup(popupEditUserInfo);
    const userInfo = new UserInfo(userAbout, userName, userInfoName, userInfoJob, userInfoAvatar);
    const popupButton = formUserInfo.querySelector('.popup-user-info__save-button');
    const formValidator = new FormValidator(formUserInfo, errorMessages);
    // const formValidator = new FormValidator(errorMessages);

    formValidator.setEventListeners();
    popupButton.setAttribute('disabled', "");
    formValidator.resetError();
    popup.open();
    userInfo.setUserInfo();
}

function handlerEditUserInfo(event) {
    const popup = new Popup(popupEditUserInfo);

    event.preventDefault();

    api.patchUserInfo(userName, userAbout).then((data) => {
        userInfoName.textContent = data.name;
        userInfoJob.textContent = data.about;
        popup.close(popupEditUserInfo);
    })
        .catch((err) => {
            console.log(err);
        });
}

function handlerAddCardViaTheForm(event) {
    const popup = new Popup(popupCard);
    const card = new Card(nameNew.value, linkNew.value, 1);
    api.addCard(nameNew, linkNew);
    event.preventDefault();
    cardList.addCard(card.create());
    card.setEventListeners();
    popup.close();
}

function handlerRenderPopup() {
    const popup = new Popup(popupCard);
    const popupButton = formCard.querySelector('.popup__button');
    const formValidator = new FormValidator(formCard, errorMessages);

    formValidator.setEventListeners()
    popupButton.setAttribute('disabled', "");
    formValidator.resetError(formCard);
    formCard.reset();
    popup.open();
}

buttonPopupClose.addEventListener('click', () => {
    const popup = new Popup(popupCard);
    popup.close();
});

buttonPopupPicClose.addEventListener('click', () => {
    const popup = new Popup(popupPic);
    popup.close();
});

buttonPopupEditUserInfoClose.addEventListener('click', () => {
    const popup = new Popup(popupEditUserInfo);
    popup.close();
});

buttonUserInfoEdit.addEventListener('click', handlerRenderEditInfoPopup);
buttonUserInfo.addEventListener('click', handlerRenderPopup);
formUserInfo.addEventListener('submit', handlerEditUserInfo);
formCard.addEventListener('submit', handlerAddCardViaTheForm);

}());

/*

    Здравствуйте, запросы на сервер отправляются, данные сохраняются, но к организации кода есть несколько замечаний:

    Наша команда приносит извинения, при проверке работы на предыдущем спринте были пропущены следующие ошибки:
        Надо исправить:
        - не использовать глобальные переменные в классах, это привязывает класс к окружению в котором он используется, нужно
        передавать все необходимое классу как параметры конструктора или методов

        - когда код расположен в разных файлах, его нужно 
        заключать в модули, т.к. если файлов будет много, то в разных 
        файлах могут появится функции или переменные с одинаковыми именами,
        они будут переопределять друг друга. Модуль должен предоставлять
        наружу только минимально необходимый api
        Для создании модулей можно воспользоваться IIFE, подробнее:
        https://learn.javascript.ru/closures-module
        https://habr.com/ru/company/ruvds/blog/419997/ 
        Нужно обернуть в модули как минимум содержимое файла script.js
        (function() {
                .............. //содержимое файла script.js
        }());
        Оборачивание кода в IIFE не позволит глобально использовать переменные объявленные в нем и
        и заставит явно передавать их туда, где они необходимы, как например в конструкторы классов
    Данные исправления необходимо внести, т.к в дальнейшем вы можете столкнуться с проблемами 
    при выполнении заданий и сдачи проектных и дипломной работы
    Для исправления данных замечаний попросил добавить Вам дней к делайну

    По 9 проектной работе:
        Надо исправить:
        - передавать отправляемые данные в методы класса Api как параметры метода, а не использовать глобальные переменные
        - в конце всех запросов к серверу должна быть обработка ошибок блоком catch
        - при сохранении профиля использовать данные которые вернул сервер, а не делать запрос данных ещё раз
        - все изменения на странице должны происходить, только после того, как сервер ответил подтверждением
        Закрывать попап редактирования профиля только после ответа сервера
        - не создавать экземпляры классов каждый раз когда необходимо ими воспользоваться, а создать их один раз в начале 
        скрипта и вызывать методы уже созданных экземпляров

        Можно лучше:
        - проверка ответа сервера и преобразование из json
        дублируется во всех методах класса Api, лучше вынести в отдельный метод
        - загрузку начальных данных сделать с использованием Promise.all


*/

/*
  Критические замечания исправлены

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания.
  Что бы реализовать оставшуюся часть задания необходимо разобраться с Promise.all
  https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
  Т.к. для отрисовки карточек нужен id пользователя, поэтому отрисовать мы сможем их только
  после полученния с сервера данных пользователя
  Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
      this.api.getUserData(),
      this.api.getInitialCards()
    ])    
      .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
        const [userData, initialCards] = values;
        ......................  //все данные получены, отрисовываем страницу
      })
      .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      })
      

  Если у Вас будет свободное время так же попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/