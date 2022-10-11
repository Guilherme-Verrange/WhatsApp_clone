

export class MicrophoneController extends ClassEvent {

    constructor(){

        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {

            this._stream = stream;

             let audio = new Audio();

             audio.src = URL.createObjectURL(streeam);

             audio.play();

             this.trigger('play', play);

        }).catch(err => {

            console.error(err);

        });

    }
}