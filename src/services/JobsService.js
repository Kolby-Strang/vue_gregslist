import { applyStyles } from "@popperjs/core"
import { AppState } from "../AppState"
import { Job } from "../models/Job"
import { logger } from "../utils/Logger"
import { api } from "./AxiosService"

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

  clearData() {
    AppState.activeJob = null
  }
}

export const jobsService = new JobsService()