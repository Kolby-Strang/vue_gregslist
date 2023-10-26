<template>
  <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 v-if="jobId" class="modal-title fs-5" id="exampleModalLabel">Edit Job</h1>
          <h1 v-else class="modal-title fs-5" id="exampleModalLabel">Create Job</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="handleSubmit()">

            <div class="mb-3">
              <label for="company" class="form-label">Job Company</label>
              <input v-model="editable.company" type="text" class="form-control" id="company" required maxlength="100">
            </div>
            <div class="mb-3">
              <label for="jobTitle" class="form-label">Job Title</label>
              <input v-model="editable.jobTitle" type="text" class="form-control" id="jobTitle" required maxlength="100">
            </div>
            <div class="mb-3">
              <label for="hours" class="form-label">Hours a Week</label>
              <input v-model="editable.hours" type="number" class="form-control" id="hours" required>
            </div>
            <div class="mb-3">
              <label for="rate" class="form-label">Hourly Rate</label>
              <input v-model="editable.rate" type="number" class="form-control" id="rate" required>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Job Description</label>
              <textarea v-model="editable.description" type="text" class="form-control" id="description"
                maxlength="5000"></textarea>
            </div>

            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-primary mx-3">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref, popScopeId, watchEffect, onUnmounted } from 'vue';
import { Job } from "../models/Job";
import Pop from "../utils/Pop";
import { jobsService } from "../services/JobsService";
import { Modal } from "bootstrap";
export default {
  props: {
    jobId: { type: String }
  },
  setup(props) {
    const editable = ref({})

    async function handleSubmit() {
      if (props.jobId) {
        await jobsService.updateJob(editable.value)
        Modal.getOrCreateInstance('#jobModal').hide()
        Pop.success('Job Updated!')
      } else {
        await jobsService.createJob(editable.value)
        Modal.getOrCreateInstance('#jobModal').hide()
        Pop.success('Job Created!')
      }
    }


    watchEffect(() => {
      if (AppState.activeJob) {
        editable.value = { ...AppState.activeJob }
      }
      if (!props.jobId) {
        editable.value = {}
      }
    })


    return { editable, handleSubmit }
  }
};
</script>


<style lang="scss" scoped></style>