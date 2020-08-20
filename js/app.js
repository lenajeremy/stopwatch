const allInputs = document.querySelectorAll('input');
const hours = Array.from(allInputs)[0];
const minutes = Array.from(allInputs)[1];
const seconds = Array.from(allInputs)[2];
const endSound = new Audio();
endSound.src = '../audio1.mp3';
allInputs.forEach(input => input.addEventListener('input', () => {
    zeroPad(input);
}))
const zeroPad = (input) => {
    if (Number(input.value) < 10) {
        if (Number(input.value < 0)) {
            input.value = 0;
        }
        input.value = '0' + input.value.toString();
    }
}
var button = document.querySelector('button');
button.addEventListener('click', () => {
    document.querySelector('.display').style.animation = 'none';
    endSound.pause();
    endSound.currentTime = 0;
    let totalTimeInSeconds = Number(seconds.value) + Number(minutes.value * 60) + Number(hours.value * 3600);
    if (button.innerHTML === 'START' && totalTimeInSeconds !== 0) {
        button.innerHTML = 'RESET';
        document.querySelectorAll('input').forEach(input => input.style.pointerEvents = 'none');
        decrement();
        async function decrement() {
            while (totalTimeInSeconds >= 0) {
                seconds.value--;
                resetSeconds();
                totalTimeInSeconds--;
                zeroPad(seconds)
                await sleep(1000);
                resetSeconds();
                endChecker();
                resetMinutes();
                if(button.innerHTML === 'START'){
                    break;
                }
            }
        }
    }
    else{
        button.innerHTML = 'START';
        seconds.value = '00';
        minutes.value = '00';
        hours.value = '00';
        totalTimeInSeconds = 0;
        document.querySelectorAll('input').forEach(input => input.style.pointerEvents = 'all');

    }

    function endChecker() {
        if (minutes.value === '00' && seconds.value === '01' && hours.value === '00') {
            endSound.play();
            document.querySelector('.display').style.animation = 'flashColor 1s infinite'
        }
    }

    function resetSeconds() {
        if (seconds.value === '00' && minutes.value !== '00') {
            seconds.value = 60;
            minutes.value--;
            zeroPad(minutes);
        }
    }

    function resetMinutes() {
        if (minutes.value === '00' && seconds.value === '00' && hours.value !== '00') {
            hours.value--;
            zeroPad(hours);
            minutes.value = 59;
            seconds.value = 60;
        }
    }
    function sleep(ms) {
        return new Promise(resolve => {
            setTimeout(resolve, ms)
        })
    }
});
// function compareTriplets(a, b) {
//     let alice = 0;
//     let bob = 0;
//     for(let i = 0; i < a.length; i++){
//         if(a[i] > b[i]){
//             alice++
//         } else if(b[i] > a[i]) bob++
//     }
//     return [alice, bob];
// }
// console.log(compareTriplets([17, 28, 30], [99, 16, 8]));
const themeChanger = document.getElementById('switch')
const controls = document.getElementById('changer')
themeChanger.addEventListener('click', ()=>{
    // if(!(controls.classList.contains('dark') && controls.classList.contains('normals'))){
    //     controls.classList.add('dark');
    // }
    if(controls.classList.contains('dark') === false){
        if(controls.classList.contains('normal') === false){
            controls.classList.add('dark');
        }
    }
    else if(controls.classList.contains('dark')){
        controls.classList.remove('dark');
        controls.classList.add('normal');
        console.log('to be reversed')
    }
    else if(controls.classList.contains('normal')){
        controls.classList.remove('normal');
        controls.classList.add('dark');
    }
    console.log('the Animation should be working by now');
})