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
  props: ['statuses'],
  emits: ['update:hidestatus'],
  setup(props, { emit }) {
    const hidestatus = ref([]);
    const allCheck = ref(false);

    function hideShowALLstatus() {
      if (allCheck.value) {
        hidestatus.value = []; // Show everything
      } else {
        hidestatus.value = [...props.statuses]; // Hide everything
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

<!-- <script>
import { ref, watch, emit } from 'vue';

export default {
  props: {
    statuses: Array
  },
  emits: ['update:hidestatus'],
  setup(props, { emit }) {
    const allCheck = ref(false);
    const hidestatus = ref([]);

    watch(allCheck, (newValue) => {
      hidestatus.value = newValue ? props.statuses : [];
      emit('update:hidestatus', hidestatus.value);
    });

    function hideShowALLstatus() {
      allCheck.value = !allCheck.value;
    }

    return {
      allCheck,
      hidestatus,
      hideShowALLstatus
    };
  }
};
</script> -->

<!-- <script>
export default {
  props: {
    statuses: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      hidestatus: [],
      allCheck: false
    };
  },
  methods: {
    hideShowALLstatus() {
      if (this.allCheck) {
        this.hidestatus = [];
      } else {
        this.hidestatus = [...this.statuses];
      }
      this.allCheck = !this.allCheck;
    }
  }
};
</script> -->

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