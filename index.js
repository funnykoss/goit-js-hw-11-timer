

const refs = {

    valueDays: document.querySelector('[data-value="days"]'),
    valueHours: document.querySelector('[data-value="hours"]'),
    valueMins: document.querySelector('[data-value="mins"]'),
    valueSecs: document.querySelector('[data-value="secs"]'),

};



class CountdownTimer {
    constructor({ selector, targetDate, onTick }) {
         this.selector = selector;
        this.intervalId = null;
        this.onTick = onTick;
        this.targetDate = targetDate;

        this.init();
    }
    
    init() {
    const time = this.getTimeComponents(0);
    this.onTick(time);
}

start(){
const startTime = this.targetDate;

this.intervalId = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = startTime - currentTime;
    const time = this.getTimeComponents(deltaTime);

    this.onTick(time);


    if (time.days < 0) {
        clearInterval(this.intervalId);
        
        const time = this.getTimeComponents(0);
        this.onTick(time);
    }
}, 1000);
    
}


 getTimeComponents(time){
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };

 }
   pad(value) {
    return String(value).padStart(2, '0');
  }
} 
    

function updateClockface({ days, hours, mins, secs }) {
    refs.valueDays.textContent = `${days}`;
    refs.valueHours.textContent = `${hours}`;
    refs.valueMins.textContent = `${mins}`;
    refs.valueSecs.textContent = `${secs}`;
}



const timer = new CountdownTimer({
    selector: '#timer-1',
    targetDate: new Date('Jul 17, 2022'),
    onTick: updateClockface,
});

timer.start();