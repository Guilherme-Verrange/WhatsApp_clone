 class Format {

    static getCamelCase(text){

        let div = document.createElement('div');

        div.innerHTML = `<div data-${text}="id"></div> `;

        return Object.keys(div.firstChild.dataset)[0];

    }//Converte os ID dos elementos HTML em CamelCase]


    static toTime(duration){

        let seconds = parseInt((duration / 1000 ) % 60);
        let minutes = parseInt((duration / (1000 * 60)) % 60);
        let hours = parseInt((duration / (1000 * 60 * 60)) % 24);

        if(hours > 0){

            return `${hours}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`; // O padStart vai fazer aparecer os 0 nos segundos do audio, 2 de duas casas e 0 é pra ele completar as casas vazias com 0

        }else{
            return `${minutes}:${seconds.toString().padStart(2,'0')}`;
        }

    }
}