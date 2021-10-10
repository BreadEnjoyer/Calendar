class Calendar {
    constructor(yearDisplay, monthDisplay) {
        this.yearDisplay = yearDisplay
        this.monthDisplay = monthDisplay
        this.currentYear = currentYear
        this.currentMonth = currentMonth
        this.updateDisplay()
    }

    setYear(change) {
        if(change === "-1" && this.currentYear === 2000) return
        this.currentYear = this.currentYear + parseInt(change)
        this.updateDisplay()
    }

    setMonth(change) {
        if(change === "-1" && this.currentMonth === 0 && this.currentYear === 2000) return
        if(change === "-1" && this.currentMonth == 0){
            this.currentMonth = 11
            this.currentYear--
        }else if(change === "1" && this.currentMonth == 11) {
            this.currentMonth = 0
            this.currentYear++
        }else{
            this.currentMonth = this.currentMonth + parseInt(change)
        }
        
        this.updateDisplay()
    }

    updateDisplay() {
        //Clean day display
        allDayTiles.forEach(tile =>{
            tile.innerText = ""
            delete tile.dataset.monthStart
            delete tile.dataset.notActiveMonth
        })
        //

        //Update year and month
        this.yearDisplay.innerText = this.currentYear.toString()
        this.monthDisplay.innerText = monthTable[this.currentMonth]
        //

        //Update display with first day of the month
        this.firstWeekday = new Date(`${this.currentYear}-${this.currentMonth+1}-01`).getDay()
        this.firstWeekdayDiv = document.querySelector(`[data-week-day="${this.firstWeekday}"][data-week-num="1"]`)
        this.firstWeekdayDiv.innerText = "1"
        this.firstWeekdayDiv.dataset.monthStart = ""
        this.firstDayTileNumber = parseInt(this.firstWeekdayDiv.dataset.tileNumber)
        //

        //Update display with last day of current month
        this.lastMonthDay = new Date(`${this.currentYear}`, `${this.currentMonth+1}`, 0).getDate()
        this.lastMonthDayTileNumber = this.lastMonthDay + this.firstDayTileNumber - 1
        document.querySelector(`[data-tile-number="${this.lastMonthDayTileNumber}"]`).innerText = this.lastMonthDay
        //

        //Update display with days from previous month
        this.prevMonthLastDay = new Date(`${this.currentYear}`, `${this.currentMonth}`, 0).getDate()
        this.prevMonthDayTileNumber = this.firstDayTileNumber - 1

        while (this.prevMonthDayTileNumber != 0) {
            document.querySelector(`[data-tile-number="${this.prevMonthDayTileNumber}"]`).innerText = this.prevMonthLastDay
            document.querySelector(`[data-tile-number="${this.prevMonthDayTileNumber}"]`).dataset.notActiveMonth = ""
            this.prevMonthDayTileNumber--
            this.prevMonthLastDay--
        }
        //

        //Update display with days from next month
        this.nextMonthDateTileNumber = this.lastMonthDayTileNumber + 1
        this.nextMonthDay = 1

        while (this.nextMonthDateTileNumber != 43) {
            document.querySelector(`[data-tile-number="${this.nextMonthDateTileNumber}"]`).innerText = this.nextMonthDay
            document.querySelector(`[data-tile-number="${this.nextMonthDateTileNumber}"]`).dataset.notActiveMonth = ""
            this.nextMonthDateTileNumber++
            this.nextMonthDay++
        }
        //

        //Update display with days between first and last days of the month
        this.dayCounter = 2
        this.currentTileNumber = this.firstDayTileNumber + 1
        while(this.currentTileNumber != this.lastMonthDayTileNumber){
            document.querySelector(`[data-tile-number="${this.currentTileNumber}"]`).innerText = this.dayCounter
            this.dayCounter++
            this.currentTileNumber++
        }
        //
    }
}

const date = new Date()

const monthTable = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const yearDisplay = document.querySelector('[data-year-display]')
const monthDisplay = document.querySelector('[data-month-display]')
const yearChangeButton = document.querySelectorAll('[data-year-change]')
const monthChangeButton = document.querySelectorAll('[data-month-change]')
const dayContainer = document.querySelector('[data-day-container]')

var currentYear = date.getFullYear()
var currentMonth = date.getMonth()

yearChangeButton.forEach(button => {
    button.addEventListener('click', () => {
        calendar.setYear(button.dataset.yearChange)
    })
})

monthChangeButton.forEach(button => {
    button.addEventListener('click', () => {
        calendar.setMonth(button.dataset.monthChange)
    })
})

//Generate divs displaying days of the month

var weekdayCounter = 1
var weekNumber = 1
var dayTileNumber = 1

for(i = 0; i < 42; i++) {
    const div = document.createElement("div")
    div.classList.add("dayTile")
    if (weekdayCounter === 7) weekdayCounter = 0

    div.dataset.weekDay = weekdayCounter
    div.dataset.weekNum = weekNumber
    div.dataset.tileNumber = dayTileNumber

    if(weekdayCounter === 0) weekNumber++
    
    weekdayCounter++
    dayTileNumber++

    dayContainer.appendChild(div)
}

const allDayTiles = document.querySelectorAll(".dayTile")
const calendar = new Calendar(yearDisplay, monthDisplay)