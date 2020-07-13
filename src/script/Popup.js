class Popup {
    constructor(popup) {
        this.popup = popup;
    }

    open() {
        this.popup.classList.toggle('popup_is-opened');
    }

    close() {
        this.popup.classList.toggle('popup_is-opened');
    }
}