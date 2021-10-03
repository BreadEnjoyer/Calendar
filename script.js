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
        this.yearDisplay.innerText = this.currentYear.toString()
        this.monthDisplay.innerText = monthTable[this.currentMonth]
    }
}

const date = new Date()
const monthTable = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const yearDisplay = document.querySelector('[data-year-display]')
const monthDisplay = document.querySelector('[data-month-display]')
const yearChangeButton = document.querySelectorAll('[data-year-change]')
const monthChangeButton = document.querySelectorAll('[data-month-change]')

var currentYear = date.getFullYear()
var currentMonth = date.getMonth()
console.log(currentYear)
console.log(currentMonth)

const calendar = new Calendar(yearDisplay, monthDisplay)



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