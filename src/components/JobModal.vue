<template>
  <div class="modal fade" id="jobModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>

            <div class="mb-3">
              <label for="make" class="form-label">Job Company</label>
              <input v-model="editable.company" type="text" class="form-control" id="make" required maxlength="500">
              <p>{{ editable.company }}</p>
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
import { computed, reactive, onMounted, ref } from 'vue';
export default {
  setup() {
    const editable = ref({})
    return { editable }
  }
};
</script>


<style lang="scss" scoped></style>