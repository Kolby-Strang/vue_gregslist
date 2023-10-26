<template>
    <div class="container-fluid">
        <section class="row p-2">
            <div class="col-12 d-flex">
                <h1>Job</h1>
                <button class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#jobModal">List a Job</button>
            </div>
            <div v-for="job in jobs" :key="job.id" class="col-4 p-2">
                <JobCard :job="job" />
            </div>
        </section>
    </div>
    <JobModal />
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { jobsService } from '../services/JobsService'
import JobCard from "../components/JobCard.vue";
import JobModal from "../components/JobModal.vue";

export default {
    setup() {
        const jobs = computed(() => AppState.jobs);
        async function getJobs() {
            await jobsService.getJobs();
        }
        onMounted(() => {
            jobsService.clearData()
            getJobs();
        });
        return {
            jobs
        };
    },
    components: { JobCard, JobModal }
};
</script>


<style lang="scss" scoped></style>