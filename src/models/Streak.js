export class Streak {
  constructor() {
    this.dates = [];
  }

  addDate(date) {
    if (!this.dates.includes(date)) {
      this.dates.push(date);
      this.dates.sort((a, b) => new Date(a) - new Date(b));
    }
  }

  removeDate(date) {
    this.dates = this.dates.filter((d) => d !== date);
  }

  getDates() {
    return this.dates;
  }

  hasDate(date) {
    return this.dates.includes(date);
  }

  getLongestStreak() {
    if (this.dates.length === 0) return 0;

    let longest = 0;
    let currentStreak = 1;

    for (let i = 1; i < this.dates.length; i++) {
      const prevDate = new Date(this.dates[i - 1]);
      const currDate = new Date(this.dates[i]);

      if (currDate - prevDate === 86400000) {
        currentStreak++;
      } else {
        longest = Math.max(longest, currentStreak);
        currentStreak = 1;
      }
    }

    longest = Math.max(longest, currentStreak);

    return longest;
  }

  getCurrentStreak() {
    if (this.dates.length === 0) return 0;

    let currentStreak = 1;
    const today = new Date().toLocaleDateString("en-GB");

    if (this.dates[this.dates.length - 1] === today) {
      for (let i = this.dates.length - 2; i >= 0; i--) {
        const prevDate = new Date(this.dates[i]);
        const currDate = new Date(this.dates[i + 1]);

        if (currDate - prevDate === 86400000) {
          currentStreak++;
        } else {
          break;
        }
      }
    }

    return currentStreak;
  }
}
