export default class Storage {
    constructor(params = {}) {

        this.params = {
            root: window.location.origin,
            ...params
        }
    }

    sanitize(path) {
        return new URL(path, this.params.root)
    }

    async list(path = '/') {
        const url = this.sanitize(path)
        return await fetch(url).then(resp => resp.json())
    }

    async upload(filePath, data) {

        const sections = filePath.split('/').filter(Boolean)
        const fileName = sections.pop()
        const path = sections.join('/')

        const url = this.sanitize(path)

        const formData = new FormData();

        if (data instanceof Image) {
            const blob = await this.imageToBlob(data)
            formData.append('file', blob, fileName);
        } else if (data instanceof HTMLCanvasElement) {
            const blob = await this.canvasToBlob(data)
            formData.append('file', blob, fileName);
            return
        } else if (data instanceof Blob) {
            formData.append('file', data, fileName);
        }

        return await fetch(url, {
            body: formData, method: 'post',
        }).then(e => e.text());
    }

    async imageToBlob(image) {

        if (!image.complete) await new Promise(resolve => {
            image.addEventListener('load', resolve, { once: true })
        })

        const canvas = document.createElement('canvas')
        canvas.width = image.width;     // update canvas size to match image
        canvas.height = image.height;
        canvas.getContext('2d').drawImage(image, 0, 0);       // draw in image

        return await this.canvasToBlob(canvas)
    }

    async canvasToBlob(canvas) {
        return new Promise(resolve => canvas.toBlob(resolve))
    }

    // uploadCanvas(path, canvas) {

    //     const blob = await new Promise(resolve => canvas.toBlob(resolve))

    //     const formData = new FormData();
    //     formData.append('file', blob, '');

    //     const resp = await fetch('/fuck/this', {
    //         body: formData, method: 'post',
    //     }).then(e => e.text());
    // }
}