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
            <div v-if="AppState.account.id == job.creator.id">
                <button class="btn btn-primary mx-3" data-bs-toggle="modal" data-bs-target="#jobModal">Edit a Job</button>
                <button @click="destroyJob()" class="btn btn-danger mx-3">Delete Job</button>
            </div>
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
import { useRoute, useRouter } from "vue-router";
import { AppState } from '../AppState';
import { computed, onMounted } from 'vue';
import { jobsService } from "../services/JobsService";
import JobModal from "../components/JobModal.vue";
import Pop from "../utils/Pop";
export default {
    setup() {
        const route = useRoute();
        const router = useRouter()
        const job = computed(() => AppState.activeJob);
        const jobId = route.params.jobId;
        async function getJobById() {
            await jobsService.getJobById(jobId);
        }
        async function destroyJob() {
            const confirmed = await Pop.confirm()
            if (!confirmed) return
            jobsService.destroyJob(job.value.id)
            router.push({ name: 'Jobs' })
            Pop.success('Job Listing Removed')
        }
        onMounted(() => {
            jobsService.clearData();
            getJobById();
        });
        return { job, jobId, destroyJob, AppState };
    },
    components: { JobModal }
};
</script>


<style lang="scss" scoped></style>