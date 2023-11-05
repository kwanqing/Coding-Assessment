<template>
  <div>
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

    <!-- Main Table Design -->
    <table>
      <thead>
        <tr>
          <td :colspan="12">Dashboard SLA</td>
        </tr>
        <tr>
          <th colspan="3">{{ wwData }}</th>
          <th colspan="8">Product Info</th>
        </tr>
        <tr>
          <th>Status</th>
          <th>Cores</th>
          <th class="width1">Product</th>
          <th class="width1">Lithography</th>
          <th>Threads</th>
          <th>Base Freq</th>
          <th>Max Turbo Freq</th>
        </tr>
      </thead>
      <tbody>

    <template v-for="status in paginatedData.status">
      <!-- status -->
      <tr :class="getStatusClass(status)">
        <td class="width1" :rowspan="calstatusRowspan(paginatedData.data[status])">
          {{ status }}
        </td>
      </tr>

      <template v-for="cores in Object.keys(paginatedData.data[status])">
        <!-- cores -->
        <tr>
          <td class="width1" :rowspan="Object.keys(paginatedData.data[status][cores]).length + 1">
            {{ cores }}
          </td>
        </tr>

        <tr v-for="product in paginatedData.data[status][cores]">
          <!-- product -->
          <td class="productColumn">{{ product.Product }}</td>

          <!-- Lithography -->
          <td>{{ product.Lithography }}</td>

          <!-- Threads -->
          <td>
            <div class="innerCells">
              <input :value="product.Threads" disabled type="text" />
            </div>
          </td>

          <!-- Base Freq -->
          <td>
            <div class="innerCells">
              <input :value="product.Base_Freq" disabled type="text" />
            </div>
          </td>

          <!-- Max Turbo Freq -->
          <td>
            <div class="innerCells">
              <input :value="product.Max_Turbo_Freq" disabled type="text" />
            </div>
          </td>
        </tr>
      </template>
    </template>
  </tbody>
    </table>
    <!-- End of Table Design -->

    <!-- Pagination Component -->
    <Pagination
      :current-page="currentPage"
      :total-rows="totalRows"
      :rows-per-page="rowsPerPage"
      @update:currentPage="setPage"
    />
    
    <!-- Search bar component
    <div class="search-bar-container">
      <SearchBar @search="handleSearch" />
    </div> -->
  </div>
</template>

<script>
import { ref, computed } from 'vue';
import data from "../assets/data.json";
import Pagination from './pagination.vue';
// import SearchBar from './SearchBar.vue';

export default {
  components: {
    Pagination,
    // SearchBar
  },
  setup() {
    const UIData = ref(data);
    const hidestatus = ref([]);
    const allCheck = ref(false);
    // const searchQuery = ref('');

    // Pagination refs
    const currentPage = ref(1);
    const rowsPerPage = ref(100);
    const totalRows = computed(() => Object.keys(productDataBystatus.value.data).reduce((acc, status) => acc + calstatusRowspan(productDataBystatus.value.data[status]), 0));
    
    const paginatedData = computed(() => {
    const startIndex = (currentPage.value - 1) * rowsPerPage.value;
    let endIndex = startIndex + rowsPerPage.value;
    let paginatedItems = [];
    let itemCount = 0;

    for (const status of Object.keys(productDataBystatus.value.data)) {
      for (const cores of Object.keys(productDataBystatus.value.data[status])) {
        for (const product of productDataBystatus.value.data[status][cores]) {
          if (itemCount >= startIndex && itemCount < endIndex) {
            if (!paginatedItems[status]) {
              paginatedItems[status] = {};
            }
            if (!paginatedItems[status][cores]) {
              paginatedItems[status][cores] = [];
            }
            paginatedItems[status][cores].push(product);
          }
          itemCount++;
          // console.log("no:", itemCount)
          if (itemCount >= endIndex) break;
        }
        if (itemCount >= endIndex) break;
      }
      if (itemCount >= endIndex) break;
    }

    return {
      status: Object.keys(paginatedItems),
      data: paginatedItems,
    };
  });

  // const handleSearch = (query) => {
  //     searchQuery.value = query;
  //     currentPage.value = 1;
  //   };

  //   const filteredData = computed(() => {
  //     if (!searchQuery.value) {
  //       return paginatedData.value;
  //     }
  //     const searchLower = searchQuery.value.toLowerCase();
  //     return {
  //       status: paginatedData.value.status.filter(status => 
  //         status.toLowerCase().includes(searchLower)),
  //       data: paginatedData.value.data 
  //     };
  //   });

    function setPage(page) {
      currentPage.value = page;
    }

    
    const wwInfo = computed(() => getWWFromDate());
    const productDataBystatus = computed(() => processProductDataByStatus(UIData.value, hidestatus.value));

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

    function processProductDataByStatus(data, hidestatus) {
      let tmp = {};
      let statusSet = new Set();

      data.forEach((element) => {
        let status = element.Status;
        let cores = element.Cores;

        statusSet.add(status);

        if (hidestatus.includes(status)) return;
        if (!tmp[status]) tmp[status] = {};
        if (!tmp[status][cores]) tmp[status][cores] = [];

        tmp[status][cores].push(element);
      });

      return {
        status: [...statusSet].sort(),
        data: tmp,
      };
    }

    function calstatusRowspan(data) {
      let sum = Object.keys(data).length + 1;
      for (const cores in data) {
        sum += Object.keys(data[cores]).length;
      }
      return sum;
    }

    function hideShowALLstatus() {
      if (allCheck.value) {
        hidestatus.value = []; // Show everything
      } else {
        hidestatus.value = [...productDataBystatus.value.status]; // Hide everything
      }
      allCheck.value = !allCheck.value;
    }

    function getStatusClass(status) {
      const statusClasses = {
        'Announced': 'status-Announced',
        'Discontinued': 'status-Discontinued',
        'Launched': 'status-Launched',
        'Launched (with IPU)': 'status-LaunchedwithIPU',
      };
      return statusClasses[status] || '';
    }

    return {
      hidestatus,
      allCheck,
      wwInfo,
      productDataBystatus,
      calstatusRowspan,
      hideShowALLstatus,
      currentPage,
      rowsPerPage,
      totalRows,
      paginatedData,
      setPage,
      getStatusClass,
      // searchQuery,
      // handleSearch,
      // filteredData
    };
  }
};
</script>


<style scoped>
.fas.fa-times {
  display: none;
}

.fas.fa-times.comment {
  display: block;
}

.overWrittenCells:hover .fas {
  display: block;
}

.innerCells {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.innerCells.comment {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

table {
  width: 100%;
  white-space: nowrap !important;
}

table td {
  position: relative;
}

i {
  cursor: pointer;
}

.legendColorBox {
  margin: 0.4%;
  float: left;
  height: 20px;
  width: 30px;
  border: 1px solid grey;
  margin-right: 4%;
}

.inputBox {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border: 0;
  text-transform: uppercase !important;
}

.inputBoxOverWritten {
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border: 0;
  width: 80px;
  text-transform: uppercase !important;
  background: none !important;
}

.overWrittenCells {
  border: 2px solid rgb(194, 1, 1);
}

.overWrittenCells input {
  outline: 0;
}

input::placeholder {
  color: black;
}

input:focus::-webkit-input-placeholder {
  color: grey;
}

input[disabled] {
  cursor: text;
  background-color: inherit;
  color: black;
}

.legend-labels {
  white-space: nowrap !important;
  padding: 0%;
  display: flex;
  list-style-type: none;
  margin-bottom: 5px;
}

.legend-labels li {
  font-size: small;
  margin-right: 2%;
}

select {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  text-align: center;
  border: 0;
}

table tr td:not(.skip),
table tr th {
  text-align: center;
}

td,
th {
  padding: 2px !important;
  width: 100px;
  border: 1px solid black;
}

.reference {
  width: 1%;
  background-color: #00b0f0;
}

.released {
  width: 1%;
  background-color: #7fff00;
}

.partial {
  width: 1%;
  background-color: #ffa500;
}

.tentative {
  width: 1%;
  background-color: #dcdcdc;
}

.planned {
  width: 1%;
  background-color: #82ffac;
}

.hideBar {
  list-style: none;
  display: flex;
}

.productColumn {
  width: 1%;
  background-color: white;
}

.checkbox {
  list-style: none;
  display: flex;
}

.checkbox label {
  margin-left: 10px;
}

.redActual {
  width: 1%;
  color: red;
  background-color: #dcdcdc;
}

.width1 {
  width: 1%;
  /* white-space: nowrap !important; */
}

.search-bar-container {
  margin-bottom: 1rem; /* Adjust as needed */
}

.table-container {
  overflow-x: auto; /* If table is wide, this allows for scrolling */
}

</style>