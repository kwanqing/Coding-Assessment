<!-- <template>
    <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage >= totalPages">Next</button>
    </div>
</template>

<script>
import { ref, computed, watch, defineProps, defineEmits } from 'vue';

export default {
    props: {
        totalRows: {
        type: Number,
        required: true
        },
        rowsPerPage: {
        type: Number,
        required: true
        }
    },
    setup(props) {
        const currentPage = ref(1);
        const totalPages = computed(() => Math.ceil(props.totalRows / props.rowsPerPage));

        function nextPage() {
        if (currentPage.value < totalPages.value) {
            currentPage.value++;
        }
        }

        function prevPage() {
        if (currentPage.value > 1) {
            currentPage.value--;
        }
        }

        // Emit current page to parent component
        const emit = defineEmits(['update:currentPage']);
        watch(currentPage, (newPage) => {
        emit('update:currentPage', newPage);
        });

        return {
        currentPage,
        totalPages,
        nextPage,
        prevPage
        };
    }
};
</script> -->

<template>
    <div class="pagination-controls">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
props: {
    currentPage: Number,
    totalRows: Number,
    rowsPerPage: Number
},
setup(props, { emit }) {
    const totalPages = computed(() => Math.ceil(props.totalRows / props.rowsPerPage));

    function nextPage() {
    if (props.currentPage < totalPages.value) {
        emit('update:currentPage', props.currentPage + 1);
    }
    }

    function prevPage() {
    if (props.currentPage > 1) {
        emit('update:currentPage', props.currentPage - 1);
    }
    }

    return {
    totalPages,
    nextPage,
    prevPage
    };
}
});
</script>
