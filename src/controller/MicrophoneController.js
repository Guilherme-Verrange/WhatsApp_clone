import { ClassEvent } from "../util/ClassEvent";

export class MicrophoneController extends ClassEvent {

    constructor(){

        super();

        this._mimeType = 'audio/webm';

        this._available = false;

        navigator.mediaDevices.getUserMedia({
            audio: true
        }).then(stream=>{
            
            this._available = true;

            this._stream = stream;

            this.trigger('ready', this._stream);

        }).catch(err=>{
            console.error(err);
        });
    }

    isAvailable(){

        return this._available;
    }

    stop(){

        this._stream.getTracks().forEach(track => {
            
            track.stop();

        });

    }

    startRecoder(){

        if(this.isAvailable()){

            this._mediaRecord =  new MediaRecorder(this._stream, {
                mimeType: this._mimeType
            });

            this._recordedChunks = [];

            this._mediaRecord.addEventListener('dataavailable', e=>{

                if(e.data.size > 0) this._recordedChunks.push(e.data);

            });

            this._mediaRecord.addEventListener('stop', e=>{

                let blob = new Blob (this._recordedChunks, {

                    type: this._mimeType

                });

                let filename = `rec${Date.now}.webm`;

                let file = new File ([blob], filename, {
                    
                    type: this._mimeType,
                    lastModified: Date.now()

                });

                console.log('file', file);


            });

            this._mediaRecord.start();
            this.startTimer();

        }

    }
    stopRecoder(){

        if(this.isAvailable()){

            this._mediaRecord.stop();
            this.stop();
            this.stopTimer();

        }
        
    }

    startTimer(){

        let start = Date.now();
        this._recordMicrophoneInterval = setInterval(() => {
            
            this.trigger('recordtimer', (Date.now() - start));

        }, 100);

    }

    stopTimer(){

        clearInterval(this._recordMicrophoneInterval);

    }

}