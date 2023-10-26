import { AppState } from "../AppState"
import { Job } from "../models/Job"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"
import Pop from "../utils/Pop"

class JobsService {
  async getJobs() {
    const res = await api.get('api/jobs')
    logger.log("GOT JOBS", res.data)
    AppState.jobs = res.data.map(pojo => new Job(pojo))
  }

  async getJobById(jobId) {
    const res = await api.get('api/jobs/' + jobId)
    logger.log(res.data)
    AppState.activeJob = new Job(res.data)
  }

  async createJob(jobData) {
    const res = await api.post('api/jobs', jobData)
    logger.log('CREATE JOB', res.data)
    AppState.jobs.push(new Job(res.data))
  }
  async updateJob(jobData) {
    const res = await api.put('api/jobs/' + jobData.id, jobData)
    logger.log('UPDATE JOB', res.data)
    AppState.activeJob = new Job(res.data)
  }

  clearData() {
    AppState.activeJob = null
  }
}

export const jobsService = new JobsService()