# SERVER NODE + EXPRESS

```
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

// Imi─Ö i nazwisko autora serwera
const authorName = 'Adrian Kruczynski';

// Logowanie informacji o uruchomieniu serwera
const currentDateTime = moment().format('YYYY-MM-DD HH:mm:ss');
console.log(`Serwer uruchomiony - ${currentDateTime}`);
console.log(`Autor serwera: ${authorName}`);
console.log(`Serwer nas┼éuchuje na porcie ${serverPort}`);

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

// Response po wej┼¢ciu na server
app.get("/", (req, res) => {
    const clientIp = req.remoteAddress;
    const data = `<h1>IP: ${address}:${PORT} </h1> <h1> Hostname: ${hostname} </h1> <h1> ${moment().format()} </h1>`

    res.send(data)
})
// Uruchomienie aplikacji
app.listen(PORT, () => {
  console.log(`Server running at http://${hostname}:${PORT}/`);
});

```

## package.json

```
{
  "name": "serwer",
  "version": "1.0.0",
  "description": "",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.18.2",
    "http": "^0.0.1-security",
    "moment": "^2.29.4"
  }
}

```

# DOCKERFILE

```
# obraz bazowy
FROM ubuntu:latest
# Informacje o autorze
LABEL author="Adrian Kruczynski"
# Utworzenie katalogu roboczego
RUN mkdir -p /var/www/html
# Przekopiowanie aplikacji z hosta do kontenera
COPY server/* /var/www/html
# Przej┼¢cie / Ustawienie katalogu roboczego na /var/www/html
WORKDIR /var/www/html
# Nas┼éuchiwania na porcie 3000
EXPOSE 3000
# Aktualizacja i popranie npm, nodejs
RUN apt-get update && \
    apt-get install -y npm nodejs
# Pobranie potrzebnych modu┼é├│w
RUN npm install
# Uruchomienie aplikacji
CMD ["npm", "start"]
```

# TREE 

```
├── Dockerfile
├── README.md
└── server
    ├── node_modules
    ├── package-lock.json
    ├── package.json
    └── server.js
```

# NETWORK 

```
docker network create -d bridge --subnet=10.10.10.0/24 node_network
```

# BUILD

```
docker build -t express .
```

# RUN 

```
docker run --rm -itd --name express -p 3000:3000 --network node_network --ip=10.10.10.10 express:latest
```

# CURL 

```
curl http://localhost:3000
<h1>IP: 10.10.10.10:3000 </h1> <h1> Hostname: 950b7a46d657 </h1> <h1> 2023-05-28T23:17:34+00:00 </h1>
```

# INSPECT

```
docker logs express

> serwer@1.0.0 start
> node server.js

Serwer uruchomiony - 2023-05-28 23:10:13
Autor serwera: Adrian Kruczynski
Serwer nasłuchuje na porcie 3000
Server running at http://950b7a46d657:3000/
```

# HISTORY

```
 docker history express
IMAGE          CREATED          CREATED BY                                      SIZE      COMMENT
6f54b54dd1ba   18 minutes ago   CMD ["npm" "start"]                             0B        buildkit.dockerfile.v0
<missing>      18 minutes ago   RUN /bin/sh -c npm install # buildkit           7.68MB    buildkit.dockerfile.v0
<missing>      18 minutes ago   RUN /bin/sh -c apt-get update &&     apt-get…   855MB     buildkit.dockerfile.v0
<missing>      22 minutes ago   EXPOSE map[3000/tcp:{}]                         0B        buildkit.dockerfile.v0
<missing>      22 minutes ago   WORKDIR /var/www/html                           0B        buildkit.dockerfile.v0
<missing>      22 minutes ago   COPY server/* /var/www/html # buildkit          6.26MB    buildkit.dockerfile.v0
<missing>      3 hours ago      RUN /bin/sh -c mkdir -p /var/www/html # buil…   0B        buildkit.dockerfile.v0
<missing>      3 hours ago      LABEL author=Adrian Kruczynski                           0B        buildkit.dockerfile.v0
<missing>      4 weeks ago      /bin/sh -c #(nop)  CMD ["/bin/bash"]            0B
<missing>      4 weeks ago      /bin/sh -c #(nop) ADD file:2fc6364d149eccc7f…   77.8MB
<missing>      4 weeks ago      /bin/sh -c #(nop)  LABEL org.opencontainers.…   0B
<missing>      4 weeks ago      /bin/sh -c #(nop)  LABEL org.opencontainers.…   0B
<missing>      4 weeks ago      /bin/sh -c #(nop)  ARG LAUNCHPAD_BUILD_ARCH     0B
<missing>      4 weeks ago      /bin/sh -c #(nop)  ARG RELEASE                  0B
```
