(async () => {

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 100
    canvas.height = 50
    ctx.fillStyle = 'red'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const storage = new Storage('myDatabaseName')

    await storage.upload('myText.txt', 'title\ncontent') //? upload text
    await storage.upload('myFolder/myCanvas.png', canvas) //? upload a canvas element (can be an image element)
    await storage.upload('myJson.json', { hello: "world" }) //? upload a json

    const list = await storage.list('/')

    console.log(list) //* [{ url, name, isFile }, ...]

})()

