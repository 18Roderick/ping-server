(() => {
  console.log('inicio de server')
})()

const url = '/users/agregar-servidor'
function addServer(){
  const serverName = document.querySelector('#serverName').value
  const ip = document.querySelector('#ipNumber').value
  const options = {
    method: 'POST',
    body: JSON.stringify({serverName, ip}),
    headers: {
      'Content-Type': 'application/json'
    }
  }

  fetch(url, options).then(r => r.json())
    .then(data => {
      createRow(data)
    })
    .catch( error => {
      console.error(error)
    }) 
}

function createRow(data){
  let serverTable = document.getElementById('serverTable').querySelector('tbody')
  let rows = serverTable.querySelectorAll('tr')
  let tr = document.createElement('tr')
  let indexTd = document.createElement('td')
  let serverTd = document.createElement('td')
  let ipTd = document.createElement('td')

  indexTd.appendChild(document.createTextNode(rows.length))
  serverTd.appendChild(document.createTextNode(data.serverName))
  ipTd.appendChild(document.createTextNode(data.ip))

  tr.appendChild(indexTd)
  tr.appendChild(serverTd)
  tr.appendChild(ipTd)

  serverTable.appendChild(tr)

  console.log(serverTable)
}