<!-- SearchBar.vue -->
<template>
    <div class="search-bar">
        <input
        type="text"
        placeholder="Search..."
        v-model="searchQuery"
        @input="onSearch"
        />
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
setup(_, { emit }) {
    const searchQuery = ref('');

    function onSearch() {
    emit('search', searchQuery.value);
    }

    return {
    searchQuery,
    onSearch
    };
}
};
</script>

<style>
/* SearchBar.vue styles */
.search-bar {
  margin-bottom: 20px; /* Space below the search bar */
  display: flex; /* Use flexbox for alignment */
  justify-content: center; /* Center the search bar */
}

.search-bar input {
  width: 100%; /* Full width of its container */
  max-width: 400px; /* Maximum width of the search bar */
  padding: 10px; /* Padding inside the search bar */
  border: 1px solid #ccc; /* Border color */
  border-radius: 5px; /* Rounded corners */
  font-size: 16px; /* Text size */
}

/* Style for the input when it's focused */
.search-bar input:focus {
  outline: none; /* Removes the default focus outline */
  border-color: #007bff; /* Changes border color on focus */
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25); /* Adds a glow effect */
}

/* Placeholder text style */
.search-bar input::placeholder {
  color: #888; /* Placeholder text color */
}

/* You can add media queries if you need responsiveness */
@media (max-width: 600px) {
    .search-bar input {
    width: 90%; /* Smaller width on smaller screens */
    }
}
</style>