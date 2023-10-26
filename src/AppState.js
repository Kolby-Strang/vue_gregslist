import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  /** @type {import('./models/Account.js').Account} */
  account: {},
  /** @type {import('./models/Car.js').Car[]} */
  cars: [],
  /** @type {import('./models/Car.js').Car | null} */
  activeCar: null,
  /** @type {import('./models/Job.js').Job[]} */
  jobs: [],
  /** @type {import('./models/Job.js').Job | null} */
  activeJob: null
})
