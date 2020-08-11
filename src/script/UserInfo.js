export class UserInfo {
    constructor(userAbout, userName, userInfoName, userInfoJob, userInfoAvatar, name, about, avatar) {
        this.name = name;
        this.about = about;
        this.avatar = avatar;
        this.userAbout = userAbout;
        this.userName = userName;
        this.userInfoName = userInfoName;
        this.userInfoJob = userInfoJob;
        this.userInfoAvatar = userInfoAvatar;
    }

    setUserInfo() {
        this.userName.value = this.userInfoName.textContent;
        this.userAbout.value = this.userInfoJob.textContent;
    }

    updateUserInfo() {
        this.userInfoName.textContent = this.name;
        this.userInfoJob.textContent = this.about;
        this.userInfoAvatar.style.backgroundImage = `url(` + this.avatar + `)`;
    }
}