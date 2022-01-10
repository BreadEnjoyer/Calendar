class Calendar {
    constructor(yearDisplay, monthDisplay, noteEditor) {
        this.yearDisplay = yearDisplay;
        this.monthDisplay = monthDisplay;
        this.currentYear = currentYear;
        this.currentMonth = currentMonth;
        this.noteEditor = noteEditor;
        this.updateDisplay();
    }

    setYear(change) {
        if(change === "-1" && this.currentYear === 2000) return;
        this.currentYear = this.currentYear + parseInt(change);
        this.updateDisplay();
    }

    setMonth(change) {
        if(change === "-1" && this.currentMonth === 0 && this.currentYear === 2000) return;
        if(change === "-1" && this.currentMonth == 0){
            this.currentMonth = 11;
            this.currentYear--;
        }else if(change === "1" && this.currentMonth == 11) {
            this.currentMonth = 0;
            this.currentYear++;
        }else{
            this.currentMonth = this.currentMonth + parseInt(change);
        }
        
        this.updateDisplay();
    }

    makeNote(tileDate) {
            document.querySelectorAll('.dayTile').forEach(tile => {
                tile.style="pointer-events: none";
            }) 
            console.log(`Event fired on date: ${tileDate}`);
            this.noteEditor.style.display = 'flex';

            if(localStorage.getItem(tileDate) !== null){
                let storageObj = JSON.parse(localStorage.getItem(tileDate));
                document.getElementById("noteEditorTextarea").value = storageObj.note
            }

            document.getElementById("dateDisplay").innerText = tileDate

            
     
    }

    exitNoteMaker() {
        this.noteEditor.style.display = 'none';
        document.getElementById('noteEditorTextarea').value = ""
        document.querySelectorAll('.dayTile').forEach(tile => {
            tile.style="";
        }) 
    }

    saveNote() {
        let noteDate = document.getElementById('dateDisplay').innerText;
        let selectedColor = document.querySelector("input[name='color']:checked").value;
        let noteContents = document.getElementById("noteEditorTextarea").value;
        
        console.log(noteDate);
        // console.log(noteContents);
        // console.log(selectedColor);

        let noteObj = {
            'color':selectedColor,
            'note': noteContents
        }
        
        //CHANGE TO localStorage AFTER FINISHING!!!
        if(!noteContents.trim()){
            if(localStorage.getItem(noteDate) !== null){
                localStorage.removeItem(noteDate);
            }
        }else {
            localStorage.setItem(noteDate, JSON.stringify(noteObj));
            let recentlySaved = JSON.parse(localStorage.getItem(noteDate));
            console.log(recentlySaved);
            console.log(recentlySaved.color);
            console.log(recentlySaved.note);
        }

        this.exitNoteMaker();
        this.updateDisplay();
    }

    updateDisplay() {
        //Clean day display
        allDayTiles.forEach(tile =>{
            tile.innerText = "";
            tile.classList.remove("notActiveMonth");
            delete tile.dataset.date;
        })
        //

        //Update year and month
        this.yearDisplay.innerText = this.currentYear.toString();
        this.monthDisplay.innerText = monthTable[this.currentMonth];
        //

        //Update display with first day of the month
        this.date = `${this.currentYear}-${this.currentMonth+1}-1`;
        this.firstWeekday = new Date(this.date).getDay();
        this.firstWeekdayDiv = document.querySelector(`[data-week-day="${this.firstWeekday}"][data-week-num="1"]`);
        
        this.firstWeekdayDiv.innerText = new Date(this.date).getDate();
        this.firstWeekdayDiv.dataset.date = this.date;
        
        this.firstDayTileNumber = parseInt(this.firstWeekdayDiv.dataset.tileNumber);
        //

        //Update display with last day of the month
        this.lastMonthDay = new Date(`${this.currentYear}`, `${this.currentMonth+1}`, 0).getDate();
        this.date = `${this.currentYear}-${this.currentMonth+1}-${this.lastMonthDay}`;
        this.lastMonthDayTileNumber = this.lastMonthDay + this.firstDayTileNumber - 1;
        this.lastMonthDayDiv = document.querySelector(`[data-tile-number="${this.lastMonthDayTileNumber}"]`);
        this.lastMonthDayDiv.innerText = this.lastMonthDay;
        this.lastMonthDayDiv.dataset.date = this.date;
        //

        //Update display with days from previous month
        this.prevMonthLastDay = new Date(`${this.currentYear}`, `${this.currentMonth}`, 0).getDate();
        this.prevMonthDayTileNumber = this.firstDayTileNumber - 1;
        
        while (this.prevMonthDayTileNumber != 0) {
            if(this.currentMonth===0) this.date = `${this.currentYear-1}-12-${this.prevMonthLastDay}`;
            else this.date = `${this.currentYear}-${this.currentMonth}-${this.prevMonthLastDay}`;
            
            this.prevMonthDayDiv = document.querySelector(`[data-tile-number="${this.prevMonthDayTileNumber}"]`);

            this.prevMonthDayDiv.innerText = this.prevMonthLastDay;
            this.prevMonthDayDiv.classList.add("notActiveMonth");
            this.prevMonthDayDiv.dataset.date = this.date;

            this.prevMonthDayTileNumber--;
            this.prevMonthLastDay--;
        }
        //

        //Update display with days from next month
        this.nextMonthDateTileNumber = this.lastMonthDayTileNumber + 1;
        this.nextMonthDay = 1;

        while (this.nextMonthDateTileNumber != 43) {
            this.nextMonthDayDiv = document.querySelector(`[data-tile-number="${this.nextMonthDateTileNumber}"]`);

            if(this.currentMonth+2 === 13) this.date = `${this.currentYear+1}-1-${this.nextMonthDay}`;
            else this.date = `${this.currentYear}-${this.currentMonth+2}-${this.nextMonthDay}`;

            this.nextMonthDayDiv.innerText = this.nextMonthDay;
            this.nextMonthDayDiv.classList.add("notActiveMonth");
            this.nextMonthDayDiv.dataset.date = this.date

            this.nextMonthDateTileNumber++;
            this.nextMonthDay++;
        }
        //

        //Update display with days between first and last days of the month
        this.dayCounter = 2;
        this.currentTileNumber = this.firstDayTileNumber + 1;

        while(this.currentTileNumber != this.lastMonthDayTileNumber){
            this.currentMonthDayDiv = document.querySelector(`[data-tile-number="${this.currentTileNumber}"]`);
            this.date = `${this.currentYear}-${this.currentMonth+1}-${this.dayCounter}`

            this.currentMonthDayDiv.innerText = this.dayCounter;
            this.currentMonthDayDiv.dataset.date = this.date

            this.dayCounter++;
            this.currentTileNumber++;
        }
        //

        

        //Check if each date has a note saved for it, and if so add a colored div indicating it.

        allDayTiles.forEach(tile =>{
            
            if(localStorage.getItem(tile.dataset.date) !== null){
                let storageObj = JSON.parse(localStorage.getItem(tile.dataset.date));
                let noteIndicator = document.createElement('div');
                noteIndicator.classList.add('noteIndicatorDiv');
                noteIndicator.style.background = `linear-gradient(to bottom right, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%, ${storageObj.color} 50%, ${storageObj.color} 100%)`; 
                noteIndicator.title = storageObj.note;
                tile.appendChild(noteIndicator);
            }
        })
    }
}

const date = new Date();

const monthTable = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const yearDisplay = document.querySelector('[data-year-display]');
const monthDisplay = document.querySelector('[data-month-display]');
const yearChangeButton = document.querySelectorAll('[data-year-change]');
const monthChangeButton = document.querySelectorAll('[data-month-change]');
const dayContainer = document.querySelector('[data-day-container]');
const noteEditor = document.getElementById('noteEditor');
const editorSaveBtn = document.getElementById('editorSaveBtn');
const editorExitBtn = document.getElementById('editorExitBtn');

var currentYear = date.getFullYear();
var currentMonth = date.getMonth();

// buttons for manipulating month/year

yearChangeButton.forEach(button => {
    button.addEventListener('click', () => {
        calendar.setYear(button.dataset.yearChange);
    })
})

monthChangeButton.forEach(button => {
    button.addEventListener('click', () => {
        calendar.setMonth(button.dataset.monthChange);
    })
})

//Generate divs displaying days of the month

var weekdayCounter = 1;
var weekNumber = 1;
var dayTileNumber = 1;

for(i = 0; i < 42; i++) {
    const div = document.createElement("div");
    div.classList.add("dayTile");
    if (weekdayCounter === 7) weekdayCounter = 0;

    div.dataset.weekDay = weekdayCounter;
    div.dataset.weekNum = weekNumber;
    div.dataset.tileNumber = dayTileNumber;

    if(weekdayCounter === 0) weekNumber++;
    
    weekdayCounter++
    dayTileNumber++

    dayContainer.appendChild(div);
}

// event starting note editor

const allDayTiles = document.querySelectorAll(".dayTile");

allDayTiles.forEach(tile => {
    tile.addEventListener('click', () => {
        calendar.makeNote(tile.getAttribute('data-date'));
    })
})

// note editor buttons

editorSaveBtn.addEventListener('click', () => {
    calendar.saveNote();
})
editorExitBtn.addEventListener('click', () => {
    calendar.exitNoteMaker();
})

//

flagIsNoteEditorActive = false;
const calendar = new Calendar(yearDisplay, monthDisplay, noteEditor);