const socket = io()
console.log('load')

window.onload = () => {
  socket.emit('connection')

  const chat = document.getElementById('chat')
  const button = document.getElementById('button')
  const input = document.getElementById('input')

  socket.on('display message', (msg) => {
    const p = document.createElement('p')
    p.innerText = msg
    p.classList.add('msg')
    chat.appendChild(p)
  })

  button.onclick(() => socket.emit('display message', input.innerText))
}
