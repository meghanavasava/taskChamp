export class Streak {
  constructor() {
    this.dates = [];
  }

  addDate(date) {
    if (!this.dates.includes(date)) {
      this.dates.push(date);
    }
  }

  getDates() {
    return this.dates;
  }

  hasDate(date) {
    return this.dates.includes(date);
  }
}
