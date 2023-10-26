<template>
    <div v-if="job" class="container-fluid">
        <div class="row">
            <div class="col-4">
                <p>Title: {{ job.jobTitle }}</p>
                <p>Company: {{ job.company }}</p>
                <p>${{ job.rate }} / Hour</p>
            </div>
            <div class="col-8">
                <p>{{ job.description }}</p>
                <div v-if="job.hours >= 40">
                    <p>Full time</p>
                </div>
                <div v-else>
                    <p>Part time</p>
                </div>
            </div>
            <button class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#jobModal">Edit a Job</button>
        </div>
    </div>
    <div v-else class="container-fluid">
        <div class="row">
            <div class="col-12 text-center">
                <h1>Loading...</h1>
            </div>
        </div>
    </div>
    <JobModal :jobId="jobId" />
</template>


<script>
import { useRoute } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { jobsService } from "../services/JobsService";
import JobModal from "../components/JobModal.vue";
export default {
    setup() {
        const route = useRoute();
        const job = computed(() => AppState.activeJob);
        const jobId = route.params.jobId;
        async function getJobById() {
            await jobsService.getJobById(jobId);
        }
        onMounted(() => {
            jobsService.clearData();
            getJobById();
        });
        return { job, jobId };
    },
    components: { JobModal }
};
</script>


<style lang="scss" scoped></style>