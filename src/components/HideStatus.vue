<template>
  <!-- Hide By status Bar -->
  <div class="hideBar">
    <label class="hideLabel"> Hide: </label>
    <div class="checkbox">
      <!-- All status -->
      <input
          id="allStatus"
          type="checkbox"
          class="styled"
          @click="hideShowALLstatus"
          v-model="allCheck"
        />
      <label for="allStatus">All statuses</label>

      <!-- Dynamic status -->
      <div v-for="status in productDataBystatus.status" :key="status">
        <input
          :id="status"
          type="checkbox"
          class="styled"
          :value="status"
          v-model="hidestatus"
        />
        <label :for="status">
          {{ status }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  props: {
    statuses: {
      type: Array,
      default: () => [] 
    }
  },
  emits: ['update:hidestatus'],
  setup(props, { emit }) {
    const hidestatus = ref([]);
    const allCheck = ref(false);

    function hideShowALLstatus() {
      if (allCheck.value) {
        hidestatus.value = []; 
      } else {
        hidestatus.value = [...props.statuses]; 
      }
      allCheck.value = !allCheck.value;
      emit('update:hidestatus', hidestatus.value);
    }

    return {
      hidestatus,
      allCheck,
      hideShowALLstatus,
    };
  }
};
</script>

<style>
.hideBar {
  list-style: none;
  display: flex;
}

.checkbox {
  list-style: none;
  display: flex;
}

.checkbox label {
  margin-left: 10px;
}
</style>