class UserInfo {
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

    /*
        Смущает простыня параметров в конструкторе. Это нормально? Можно как то аптимизировать?
        Также не ясно как лучше поступить когда UserInfo инециализируется несколько с разным количеством параметров,
        можно легко запутаться в порядке передоваемых параметров.
    */
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