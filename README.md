## simple-local-storage
Simple node.js server to share and save files via http

## Install the server
1. Donwload/clone this repo.
2. `npm install`

## Running the server
1. `npm run start`

## Storage.js
Refer to the `example/` code

### init storage
Make sure to set the correct origin of the server (Shown in the terminal if the server is running)
```javascript
const storage = new Storage('myDatabaseName')
// or
// const storage = new Storage({ path: 'myDatabaseName' })
// const storage = new Storage({ path: 'myDatabaseName', origin: 'http://localhost:1080' })
```
### list directory
```javascript
const list = await storage.list('/')
console.log(list) // [{ url, name, isFile }, ...]
```
### upload files
```javascript
await storage.upload('myText.txt', 'hello')
await storage.upload('myFolder/myImage.png', 'https://picsum.photos/id/237/200/300') // creates folder "myFolder" if inexistant
await storage.upload('myJson.json', { hello: "world" }) //json
```
