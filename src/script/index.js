import  {Api} from './Api';
import  {Popup} from './Popup';
import  {Card} from './Card';
import  {CardList} from './CardList';
import  {FormValidator} from './FormValidator';
import  {UserInfo} from './UserInfo';
import "../pages/index.css";

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
    const cardList = new CardList(placesList);


    function handlerRenderEditInfoPopup() {
    const popup = new Popup(popupEditUserInfo);
    const userInfo = new UserInfo(userAbout, userName, userInfoName, userInfoJob, userInfoAvatar);
    const popupButton = formUserInfo.querySelector('.popup-user-info__save-button');
    const formValidator = new FormValidator(formUserInfo, errorMessages);

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
