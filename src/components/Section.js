export default class Section {
    constructor(renderer, selectorContainer) {
        this._container = document.querySelector(selectorContainer);
        // this._initialCard = items;
        this._renderer = renderer;
    }

    addCardFromArray(data) {
        data.forEach((element) => {
            this._renderer(element);
        });
    }

    addItemAppend(elementDom) {
        this._container.append(elementDom);
    }

    addItemPrepend(elementDom) {
        this._container.prepend(elementDom);
    }
}
