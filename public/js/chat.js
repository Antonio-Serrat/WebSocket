const socketChat = io()
const userName = document.querySelector('#username')
const containerMessages = document.querySelector('#messages')
const messageText = document.querySelector('#message')
const btnMessage = document.querySelector('#btn-message')
const divMessages = document.querySelector('#messages')


const message = {}
const users = []

socket.on('index', () => {
    renderChat()
})

socket.on('users' , data => {
    users = data
})


btnMessage.addEventListener('click', (e) => {
    e.preventDefault()
    if(!messageText.value){
        return
    }
    if(!userName.value){
        return alert('El campo email no puede estar vacio')
    }
    users.forEach(user =>{
        if(userName.value === user.name )
        return alert('El usuario ya esta en uso')

    })
    
    message.name = userName.value
    message.date = Date.now(),
    message.message = messageText.value
    
    socket.emit('message', message)
    messageText.value = null
})

socket.on('new-messages', ()=>{
        renderChat()
})


function renderChat(){
    fetch('/static/database/messages.json')
    .then((res) => {
        return res.json()
    })
    .then((msgs) => {
        divMessages.innerHTML= ""
        msgs.forEach(msg => {
            //create elements
            const divUser = document.createElement('div')
            const divData = document.createElement('div')
            const divMessage = document.createElement('div')
            const spanName = document.createElement('span')
            const spanDate = document.createElement('span')

            //assign class & value
            divData.className = 'message-data'
            spanName.className = 'user'
            spanDate.className = 'date-time'
            spanDate.innerHTML = ` [${new Date(msg.date).toLocaleString()}]: `

            divMessage.className = 'message-body'
            divMessage.innerHTML = msg.message
            
            // assign user Local or Remote
            if(msg.name == userName.value){
                divUser.className = 'local' 
                spanName.innerHTML = 'Yo'
                divData.appendChild(spanDate)
                divData.appendChild(spanName)
                divUser.appendChild(divData)
                divUser.appendChild(divMessage)
            }else{
                divUser.className = 'remote' 
                spanName.innerHTML = msg.name
                divData.appendChild(spanName)
                divData.appendChild(spanDate)
                divUser.appendChild(divData)
                divUser.appendChild(divMessage)
            }
            divMessages.appendChild(divUser)
            divMessages.scrollTop = divMessages.scrollHeight
        })
    })

}