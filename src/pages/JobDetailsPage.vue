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
        </div>
    </div>
    <div v-else class="container-fluid">
        <div class="row">
            <div class="col-12 text-center">
                <h1>Loading...</h1>
            </div>
        </div>
    </div>
</template>


<script>
import { useRoute, useRouter } from "vue-router";
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { jobsService } from "../services/JobsService";
export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const job = computed(() => AppState.activeJob)

        async function getJobById() {
            const jobId = route.params.jobId
            await jobsService.getJobById(jobId)
        }

        onMounted(() => {
            jobsService.clearData()
            getJobById()
        })
        return { job }
    }
};
</script>


<style lang="scss" scoped></style>