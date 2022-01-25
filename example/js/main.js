(async () => {
    const canvas = document.querySelector('#main-canvas');
    const ctx = canvas.getContext('2d')
    const resp = await fetch('/', { method: 'get' }).then(resp => resp.json())

    const image = new Image()

    image.onload = (event) => {
        canvas.width = image.width
        canvas.height = image.height
        ctx.drawImage(image, 0, 0)

        canvas.toBlob(async (blob) => {
            console.log(blob)
            // console.log(blob.type)
            const formData = new FormData();
            formData.append('file', blob, '');
            // console.log(blob)
            const resp = await fetch('/fuck/this', {
                body: formData, method: 'post',
            }).then(e => e.text());
            // console.log(resp)
            // console.log(formData.getAll('my-file'))
        });
    }

    image.crossOrigin = "Anonymous"; //! important header
    image.src = resp.find(r => r.isFile).url


    // var input = document.querySelector('input[type="file"]')
    // var data = new FormData()
    // data.append('file', input.files[0])
    // data.append('user', 'hubot')

    // fetch('/public/lol', {
    //     method: 'POST',
    //     body: data
    // })

})()

