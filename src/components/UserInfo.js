export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(
            configInfo.selectorProfileName
        );
        this._profileDescription = document.querySelector(
            configInfo.selectorProfileDescription
        );
    }

    getUserInfo() {
        return {
            username: this._profileName.textContent,
            description: this._profileDescription.textContent,
        };
    }

    setUserInfo(data) {
        this._profileName.textContent = data.username;
        this._profileDescription.textContent = data.description;
    }
}
