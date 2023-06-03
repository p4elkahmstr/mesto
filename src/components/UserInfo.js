export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(
            configInfo.selectorProfileName
        );
        this._profileDescription = document.querySelector(
            configInfo.selectorProfileDescription
        );
        this._profileAvatar = document.querySelector(
            configInfo.selectorProfileAvatar
        );
    }

    getUserInfo() {
        return {
            username: this._profileName.textContent,
            description: this._profileDescription.textContent,
        };
    }

    setUserInfo({ username, description, avatar }) {
        if (username) this._profileName.textContent = username;
        if (description) this._profileDescription.textContent = description;
        if (avatar) this._profileAvatar.src = avatar;
    }
}
