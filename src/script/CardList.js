class CardList {
    constructor(container, cards, createCard, myId) {
        this.container = container;
        this.cards = cards;
        this.createCard = createCard;
        this.myId = myId;
    }

    addCard(cardElement) {
        this.container.appendChild(cardElement);
    }

    render() {
        this.cards.forEach(function (elem) {
            let id = 0;
            if (elem.owner._id === this.myId) {
                console.log("TRUE");
                id = 1;
            } else {
                id = 0;
            }

            const card = this.createCard(elem.name, elem.link, id);
            this.addCard(card.create());
            card.setEventListeners();
        }, this);
    }
}