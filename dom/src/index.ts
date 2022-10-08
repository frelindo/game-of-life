const p = document.getElementById('pElement')
console.log(p)

let clicks = 0
p?.addEventListener('click', (evt) => {
  console.log(`Button clicked #${++clicks}`)
})

window.onclick = (evt) => {
  console.log(`Body clicked at ${evt.pageX}, ${evt.pageY}`)
}

function keyPressed() {
  console.log(key)
}

function setup() {}
