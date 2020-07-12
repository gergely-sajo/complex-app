export default class Chat {
    constructor() {
        this.openedYet = false
        this.chatWrapper = document.querySelector("#chat-wrapper")
        this.openIcon = document.querySelector(".header-chat-icon")
        this.injectHTML()
        this.chatField = document.querySelector("#chatField")
        this.chatForm = document.querySelector("#chatForm")
        this.closeIcon = document.querySelector(".chat-title-bar-close")
        this.events()
    }

    // Events
    events() {
        this.chatForm.addEventListener("submit", (e) => {
            e.preventDefault()
            this.sendMessageToServer()
        })

        this.openIcon.addEventListener("click", () => this.showChat())
        this.closeIcon.addEventListener("click", () => this.hideChat())
    }

    // Methods
    showChat() {
        if (!this.openedYet) {
            this.openConnection()
        }
        this.openedYet = true
        this.chatWrapper.classList.add("chat--visible")
    }

    hideChat() {
        this.chatWrapper.classList.remove("chat--visible")
    }

    openConnection() {
        this.socket = io() // the JS file in the footer makes the io available. It opens a connection between the browser and the server
        this.socket.on('chatMessageFromServer', function(data) {
            alert(data.message)
        })
    }

    sendMessageToServer() {
        this.socket.emit('chatMessageFromBrowser', {message: this.chatField.value})
        this.chatField.value = ""
        this.chatField.focus()
    }

    injectHTML() {
        this.chatWrapper.innerHTML = `
            <div class="chat-title-bar">Chat <span class="chat-title-bar-close"><i class="fas fa-times-circle"></i></span></div>
            <div id="chat" class="chat-log"></div>

            <form id="chatForm" class="chat-form border-top">
                <input type="text" class="chat-field" id="chatField" placeholder="Type a message…" autocomplete="off">
            </form>
        `
    }
}