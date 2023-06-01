export default class Section {
    constructor({ items, renderer }, selectorContainer) {
        this._container = document.querySelector(selectorContainer);
        this._initialCard = items;
        this._renderer = renderer;
    }

    addCardFromArray() {
        this._initialCard.forEach((element) => {
            this._renderer(element);
        });
    }

    addItem(elementDom) {
        this._container.prepend(elementDom);
    }
}
