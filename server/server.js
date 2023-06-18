const http = require('http');
const moment = require('moment');
const express = require('express')
const os = require('os')
const app = express()

const PORT = '3000'
const hostname = os.hostname();


// Adres i port serwera
const serverAddress = 'localhost';
const serverPort = 3000;

// Imię i nazwisko autora serwera
const authorName = 'John Doe';

// Logowanie informacji o uruchomieniu serwera
const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(`Serwer uruchomiony - ${currentDateTime}`);
console.log(`Autor serwera: ${authorName}`);
console.log(`Serwer nasłuchuje na porcie ${serverPort}`);

// Funkcja do poprawnia ip servera
const getIPAddress = () => {
  const ifaces = os.networkInterfaces()
  let ipAddress

  Object.keys(ifaces).forEach((ifname) => {
    ifaces[ifname].forEach((iface) => {
      if (iface.family === 'IPv4' && !iface.internal) {
        ipAddress = iface.address
      }
    })
  })

  return ipAddress
}
const address = getIPAddress()

// Response po wejściu na server
app.get("/", (req, res) => {
    const clientIp = req.remoteAddress;
    const data = `<h1>IP: ${address}:${PORT} </h1> <h1> Hostname: ${hostname} </h1> <h1> ${moment().format()} </h1>`

    res.send(data)
})
// Uruchomienie aplikacji
app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});
