import {Popup} from "./Popup";


export class Card {

    constructor(name, link, id) {
        this.name = name;
        this.link = link;
        this.id = id;
    }

    create() {
        const cardContainer = document.createElement('div');
        const cardImage = document.createElement('div');
        const buttonCardDelete = document.createElement('button');
        const cardDescription = document.createElement('div');
        const cardName = document.createElement('h3');
        const buttonCardLikeIcon = document.createElement('button');

        cardContainer.classList.add('place-card');
        cardImage.classList.add('place-card__image');
        buttonCardDelete.classList.add('place-card__delete-icon');
        cardDescription.classList.add('place-card__description');
        cardName.classList.add('place-card__name');
        buttonCardLikeIcon.classList.add('place-card__like-icon');
        cardContainer.appendChild(cardImage);
        cardImage.style.backgroundImage = `url(${this.link})`;
        cardImage.appendChild(buttonCardDelete);
        cardContainer.appendChild(cardDescription);
        cardDescription.appendChild(cardName);
        cardName.textContent = this.name;
        cardDescription.appendChild(buttonCardLikeIcon);

        if (this.id !== 1) {
            buttonCardDelete.classList.add('place-card__delete-icon_show');
        }

        this.cardElement = cardContainer;

        return cardContainer;
    }



    setEventListeners() {
        this
            .cardElement
            .querySelector('.place-card__delete-icon')
            .addEventListener('click', this.remove);


        this
            .cardElement
            .querySelector('.place-card__like-icon')
            .addEventListener('click', this.like);

        this
            .cardElement
            .querySelector('.place-card__image')
            .addEventListener('click', () => {
                popup.open();
                popupPiImage.src = this.link;
            });
    }

    like(event) {
        if (event.target.classList.contains('place-card__like-icon')) {
            event.target.classList.toggle('place-card__like-icon_liked');
        }
    }

    remove(event) {

        const card = event.target.parentElement.parentElement;
        // if (event.target.classList.contains('place-card__delete-icon')) {
        if (card.parentElement.removeChild(card)) {
            event.stopPropagation();
            /*
                Надо исправить: не стоит использовать глобальную переменную в классе, т.к.
                при дальнейшей разработке программы может получиться, что карточки будут вставляться 
                в несколько разных контейнеров
                Использование глобальных переменных считается плохим тоном при разработке программ.
                Если что-то нужно использовать в классе нужно передавать это через
                параметры конструктора или параметры метода. Так код получается более гибким и легче может переиспользоваться.
                Но в данном случае достаточно просто воспользоваться parentNode элемента карточки
                и удалять так:
                    const card = event.target.parentElement.parentElement;
                    card.parentElement.removeChild(card);
            */
            placesList.removeChild(event.target.closest(".place-card"));

        }
    }
}