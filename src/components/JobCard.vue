<template>
  <router-link :to="{ name: 'JobDetails', params: { jobId: job.id } }">
    <div class="card bg-light shadow p-2">
      <p>
        Company:
        {{ job.company }}
      </p>
      <p>
        Title:
        {{ job.jobTitle }}
      </p>
      <div v-if="job.hours >= 40">
        <p>Full time</p>
      </div>
      <div v-else>
        <p>Part time</p>
      </div>
    </div>
  </router-link>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Job } from "../models/Job";
export default {
  props: {
    job: { type: Job, required: true }
  },
  setup() {
    return {}
  }
};
</script>


<style lang="scss" scoped></style>