import { LitElement, html } from "lit-element";
import { styleMap } from 'lit-html/directives/style-map';
import { wcNameStyles } from "./calendar-inline-style.js";

/**
 * `calendar-inline`
 * CalendarInline
 *
 * @customElement calendar-inline
 * @litElement
 * @demo demo/index.html
 */

export class CalendarInline extends LitElement {
  static get is() {
    return "calendar-inline";
  }

  static get properties() {
    return {
      /**
       * Example of property
       * @property
       * @type { String }
       */
      title: { type: String },
      /**
       * Example of property
       * @property
       * @type { Number }
       */
      counter: { type: Number },
      stylesMonthHeader: { type: String },
      styleMonthHeaderEls: { type: Array },
      arrHolidays: { type: Array }
    };
  }

  static get styles() {
    return [wcNameStyles];
  }

  constructor() {
    super();
    this.today = new Date();
    this.DAYHEADERLENGTH = 31;
    this.arrPublicHolidays = [];
    this.arrHolidays = [];
    this.YEARNOW = new Date().getFullYear();
    this.year = this.YEARNOW;
    this.YEAR = this.year;
    this.structureName = '';
    this.MAIN_CONTAINER = null;
    this.DAYS_HEADER = null;
    this.MONTH_HEADER = null;
    this.lang = 'sp';
    this.stylesMonthHeader = { width: '700px' };
    this.styleMonthHeaderEls = [];
    this.styleMonthHeaderEls.length = 12;
    this.styleMonthHeaderEls.fill({ width: 'auto' });
    this.MONTH_LETTERS = {
      sp: [
        { letter: 'E', name: 'Enero' },
        { letter: 'F', name: 'Febrero' },
        { letter: 'M', name: 'Marzo' },
        { letter: 'A', name: 'Abril' },
        { letter: 'M', name: 'Mayo' },
        { letter: 'J', name: 'Junio' },
        { letter: 'J', name: 'Julio' },
        { letter: 'A', name: 'Agosto' },
        { letter: 'S', name: 'Septiembre' },
        { letter: 'O', name: 'Octubre' },
        { letter: 'N', name: 'Noviembre' },
        { letter: 'D', name: 'Diciembre' }
      ],
      en: [
        { letter: 'J', name: 'January' },
        { letter: 'F', name: 'February' },
        { letter: 'M', name: 'March' },
        { letter: 'A', name: 'April' },
        { letter: 'M', name: 'May' },
        { letter: 'J', name: 'June' },
        { letter: 'J', name: 'July' },
        { letter: 'A', name: 'August' },
        { letter: 'S', name: 'September' },
        { letter: 'O', name: 'October' },
        { letter: 'N', name: 'November' },
        { letter: 'D', name: 'December' }
      ]
    };
    this.DAYOFTHEWEEK = {
      sp: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
      en: ['Sunday', 'Monday', 'Thursday', 'Wendsday', 'Tuesday', 'Friday', 'Saturday', 'Sunday']
    };
    this.arrDaysByMonth = this.getArrDaysByMonth();

    this._setArrHolidays = this._setArrHolidays.bind(this);
    this._setArrPublicHolidays = this._setArrPublicHolidays.bind(this);
    this._setMonth = this._setMonth.bind(this);

    document.addEventListener('set-public-holidays', this._setArrPublicHolidays); 
    document.addEventListener('set-holidays', this._setArrHolidays);
    document.addEventListener('set-month', this._setMonth);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('set-public-holidays', this._setArrPublicHolidays); 
    document.removeEventListener('set-holidays', this._setArrHolidays);
    document.removeEventListener('set-month', this._setMonth);
  }

  _setArrPublicHolidays(ev) {
    const { id } = ev.detail;
    if (this.id === id || id === undefined) {
      if (ev.detail.noupdate) {
        this.arrPublicHolidays = ev.detail.arrPublicHolidays;
      } else {
        this.arrPublicHolidays = [...this.arrPublicHolidays, ...ev.detail.arrPublicHolidays];
      }
      this.drawPublicHolidays();
    }
  }

  _setArrHolidays(ev) {
    const { id } = ev.detail;
    if (this.id === id || id === undefined) {
      if (ev.detail.noupdate) {
        this.arrHolidays = ev.detail.arrHolidays;
      } else {
        this.arrHolidays = [...this.arrHolidays, ...ev.detail.arrHolidays];
      }
      this.drawHolidays();
    }
  }

  _setMonth(ev) {
    const { id } = ev.detail;
    if (this.id === id || id === undefined) {
      const { month } = ev.detail;
      this.gotoMonth(month - 1);
    }
  }

  getArrDaysByMonth() {
    const febDays = ((this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0) ? 29 : 28;
    return [31, febDays, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }

  _calcEasterWeek() {
    let M;
    let N;
    let dia;
    let mes;
    if      (this.year > 1583 && this.year < 1699) { M=22; N=2; } 
    else if (this.year > 1700 && this.year < 1799) { M=23; N=3; } 
    else if (this.year > 1800 && this.year < 1899) { M=23; N=4; } 
    else if (this.year > 1900 && this.year < 2099) { M=24; N=5; } 
    else if (this.year > 2100 && this.year < 2199) { M=24; N=6; } 
    else if (this.year > 2200 && this.year < 2299) { M=25; N=0; } 

    const a = this.year % 19;
    const b = this.year % 4;
    const c = this.year % 7;
    const d = ((19*a) + M) % 30;
    const e = ((2*b) + (4*c) + (6*d) + N) % 7;
    const f = d + e;

    if (f < 10) { 
    dia = f + 22;
    mes = 3;
    } else  {
    dia = f - 9;
    mes = 4;
    };

    if (dia === 26 && mes === 4){ 
    dia = 19;
    };

    if (dia === 25 && mes === 4 && d === 28 && e === 6 && a > 10){
    dia = 18;
    };

    const easterWeek = new Date(this.year, mes - 1, dia);
    const jS = new Date(this.year, mes - 1, dia);
    const vS = new Date(this.year, mes - 1, dia);
    const juevesSanto = new Date(jS.setDate(easterWeek.getDate() - 3));
    const viernesSanto = new Date(vS.setDate(easterWeek.getDate() - 2));
    this.arrPublicHolidays = this.arrPublicHolidays.filter((obj) => {
      return (obj.title !== 'Jueves Santo' && obj.title !== 'Viernes Santo');
    });
    this.arrPublicHolidays.push({title:'Jueves Santo', date:`${juevesSanto.getDate()}/${juevesSanto.getMonth() + 1}` });
    this.arrPublicHolidays.push({title:'Viernes Santo', date:`${viernesSanto.getDate()}/${viernesSanto.getMonth() + 1}` });
    // console.log(juevesSanto, viernesSanto);
  }

  drawIsWeekend(month, day) {
    let noWeekend = true;
    const DoW = new Date(`${this.year}/${Number(month) + 1}/${Number(day) + 1}`).getDay();
    if (DoW === 0 || DoW === 6) {
      this.dayContainer.style.background = '#CCC';
      noWeekend = false;
    }
    return noWeekend;
  }

  drawHolidays() {
    this.arrHolidays.forEach(dayHoliday => {
      const cell = this.shadowRoot.querySelector(`[data-date="${dayHoliday.date}"]`);
      if (cell && cell.dataset.noweekend === 'true' && cell.dataset.noholidays === 'true') {
        cell.style.background = '#393';
        cell.title = dayHoliday.title;
        cell.dataset.noHolidays = 'false';
      }
    });
  }

  drawPublicHolidays() {
    this.arrPublicHolidays.forEach(dayHoliday => {
      let cell = this.shadowRoot.querySelector(`[data-date="${dayHoliday.date}"]`);
      const dateParts = dayHoliday.date.split('/');
      const dateToTest = `${dateParts[1]}/${dateParts[0]}/${this.YEAR}`;
      if (cell.dataset.noweekend !== 'true' && new Date(dateToTest).getDay() === 0) {
        let fecha = new Date(dateToTest);
        const moreDay = fecha.setDate(fecha.getDate() + 1);
        fecha = new Date(moreDay);
        cell = this.shadowRoot.querySelector(`[data-date="${fecha.getDate()}/${fecha.getMonth() + 1}"]`);
      }
      if (cell && cell.dataset.noweekend === 'true' && cell.dataset.noholidays === 'true') {
        cell.style.background = '#933';
        cell.title = dayHoliday.title;
        cell.dataset.noHolidays = 'false';
      }
    });
  }

  setDayContent(dataMonthDay, month, day) {
    this.dayContainer = document.createElement('div');
    let noWeekend = true;
    this.dayContainer.className = 'dayContainer';
    const DoW = this.DAYOFTHEWEEK[this.lang][new Date(this.year, month, day).getDay()];
    if (dataMonthDay) {
      this.dayContainer.style.background = this._getGradient(this.LEGEND[dataMonthDay].code);
      this.dayContainer.title = `${this.LEGEND[dataMonthDay].label} - ${parseInt(day, 10) + 1}/${this.MONTH_LETTERS[this.lang][month].name}/${this.year}`
    } else {
      this.dayContainer.title = `${DoW} - ${parseInt(day, 10) + 1}/${this.MONTH_LETTERS[this.lang][month].name}/${this.year}`;
    }
    noWeekend = this.drawIsWeekend(month, day);
    this.dayContainer.dataset.noweekend = noWeekend;
    this.dayContainer.dataset.noholidays = true;
    this.dayContainer.dataset.month = parseInt(month, 10) + 1;
    this.dayContainer.dataset.day = parseInt(day, 10) + 1;
    this.dayContainer.dataset.date = `${parseInt(day, 10) + 1}/${parseInt(month, 10) + 1}`;
  }

  createDayCells(dayHeaderLength, month) {
    const monthDays = document.createElement('div');
    monthDays.classList.add('monthDays');
    monthDays.dataset.month = this.MONTH_LETTERS[this.lang][month].name;
    for (let day = 1; day <= dayHeaderLength; day += 1) {
      const DoW = this.DAYOFTHEWEEK[this.lang][new Date(this.year, month, day).getDay()];
      const dayHeader = document.createElement('div');
      dayHeader.className = 'dayHeader';
      dayHeader.textContent = day;
      dayHeader.setAttribute('title', `${DoW} - ${day}/${month}/${this.year}`);
      monthDays.appendChild(dayHeader);
    }
    this.DAYS_HEADER.appendChild(monthDays);
  }
  
  setMonthContainer(month, monthContainer) {
    const days = this.arrDaysByMonth[month];
    for (let day = 0; day < days; day += 1) {
      this.setDayContent('', month, day);
      monthContainer.appendChild(this.dayContainer);
    }
  }

  drawMonthContainer(month) {
    const monthContainer = document.createElement('div');
    monthContainer.className = 'monthContainer';
    this.setMonthContainer(month, monthContainer);
    this.MAIN_CONTAINER.appendChild(monthContainer);
  }

  drawMonthHeader(monthName) {
    const monthHeader = document.createElement('div');
    monthHeader.className = 'monthHeader';
    monthHeader.id = monthName;
    monthHeader.innerHTML = monthName;
    this.MONTH_HEADER.appendChild(monthHeader);

    const monthHeaderWith = parseInt(this.shadowRoot.querySelector(`[data-month="${monthName}"]`).clientWidth, 10) + 10;
    this.shadowRoot.querySelector(`#${monthName}`).style.width = `${monthHeaderWith}px`;
    return monthHeaderWith;
  }

  createMonths() {
    let monthHeaderSumWidth = 0;
    const months = Object.keys(this.getArrDaysByMonth());
    this.MAIN_CONTAINER.textContent = '';
    this.MAIN_CONTAINER.className = 'yearMainContainer';
    months.forEach(month => {
      this.createDayCells(this.arrDaysByMonth[month], month);
      const monthName = this.MONTH_LETTERS[this.lang][month].name;
      this.drawMonthContainer(month);
      const monthHeaderWith = this.drawMonthHeader(monthName);
      monthHeaderSumWidth += monthHeaderWith;
    });
    this.stylesMonthHeader = { width: `${monthHeaderSumWidth}px` };
  }

  gotoMonth(currentMonth) {
    const currentMonthName = this.MONTH_LETTERS[this.lang][currentMonth].name;
    const monthLayer = this.shadowRoot.querySelector(`[data-month=${currentMonthName}`);
    this.shadowRoot.getElementById('tableContainer').scrollTo(monthLayer.offsetLeft - document.body.clientWidth / 2.5, 0);
  }

  firstUpdated() {
    this.MAIN_CONTAINER = this.shadowRoot.querySelector('#mainContainer');
    this.DAYS_HEADER = this.shadowRoot.querySelector('#daysHeader');
    this.MONTH_HEADER = this.shadowRoot.querySelector('#monthHeader');
    this._calcEasterWeek();
    this.createMonths();
    this.gotoMonth(this.today.getMonth());
  }

  render() {
    return html`
      <div id="tableContainer">
        <div id="monthHeader" style="${styleMap(this.stylesMonthHeader)}"></div>
        <div id="daysHeader"></div>
        <div id="mainContainer"></div>
      </div>
    `;
  }
}