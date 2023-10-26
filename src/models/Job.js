export class Job {
  constructor(data) {
    this.id = data.id || data._id
    this.company = data.company
    this.jobTitle = data.jobTitle
    this.hours = data.hours
    this.rate = data.rate
    this.description = data.description
    this.creator = data.creator
  }
}