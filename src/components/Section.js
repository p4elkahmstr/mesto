export default class Section {
    constructor({ items, renderer }, selectorContainer) {
        this._container = document.querySelector(selectorContainer);
        this._initialCard = items;
        this._renderer = renderer;
    }

    addCardFromArray() {
        this._initialCard.forEach((element) => {
            this.addItem(element);
        });
    }

    addItem(data) {
        this._container.prepend(this._renderer(data));
    }
}
