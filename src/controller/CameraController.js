export class CameraController {

    constructor(videoEl){

        this._videoEl = videoEl;
        this._videoEl.setAttribute('autoplay', '');

        navigator.mediaDevices.getUserMedia({
            video: true
        }).then(stream=>{
            
            this._stream = stream;
            this._videoEl.srcObject=stream;
            

        }).catch(err=>{
            console.error(err);
        });
    }

    stop(){

        this._stream.getTracks().forEach(track => {
            
            track.stop();

        });

    }

    takePicture(mimeType = 'image/png'){

        let canvas = document.createElement('canvas');

        canvas.setAttribute('height', this._videoEl.videoHeight);
        canvas.setAttribute('width', this._videoEl.videoWidth);

        let context = canvas.getContext('2d');

        context.drawImage(this._videoEl, 0, 0, canvas.width, canvas.height);

        return canvas.toDataURL(mimeType);
    }
}