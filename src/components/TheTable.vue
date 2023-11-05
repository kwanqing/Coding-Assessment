<!-- <template>
    <div>
        <HideStatusBar :statuses="productDataBystatus.status" />
        <DataTable :productData="filteredProductData" :wwData="wwInfo" />
    </div>
</template> -->

<template>
    <div>
        <!-- Pass down the statuses and bind the hidestatus with v-model -->
        <HideStatus :statuses="statuses" v-model:hidestatus="hidestatus" />
        <!-- Pass down the filteredProductData and wwInfo to DataTable -->
        <DataTable :productData="filteredProductData" :wwData="wwInfo" />
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import HideStatus from './HideStatus.vue';
import DataTable from './DataTable.vue';
import data from '../assets/data.json';

export default {
    components: {
        HideStatus,
        DataTable
    },
    setup() {
    const UIData = ref(data);
    const hidestatus = ref([]);
    const wwInfo = computed(() => getWWFromDate());

    const statuses = computed(() => {
    // Extract statuses from UIData
    const statusSet = new Set();
    UIData.value.forEach(item => statusSet.add(item.Status));
    return Array.from(statusSet).sort();
    });

    const filteredProductData = computed(() => {
        // Filter UIData based on hidestatus
        const filteredData = {};
        UIData.value.forEach(item => {
        if (!hidestatus.value.includes(item.Status)) {
            if (!filteredData[item.Status]) {
            filteredData[item.Status] = {};
            }
            if (!filteredData[item.Status][item.Cores]) {
            filteredData[item.Status][item.Cores] = [];
            }
            filteredData[item.Status][item.Cores].push(item);
        }
        });
        return filteredData;
    });

    function getWWFromDate(date = null) {
        let currentDate = date || new Date();
        let startDate = new Date(currentDate.getFullYear(), 0, 1);
        let days = Math.floor((currentDate - startDate) / (24 * 60 * 60 * 1000));

        return {
        year: currentDate.getFullYear(),
        workweek: Math.ceil(days / 7),
        numofday: currentDate.getDay(),
        };
    }

    return {
        statuses,
        filteredProductData,
        wwInfo,
        hidestatus
    };
    }
};
</script>
