<template>
  <div class="searchWrapper">
    <h1>Movies database</h1>
    <input
        class="inputClass"
        id="searchTitle"
        name="search"
        type="text"
        placeholder="Title"
        v-model="searchVal.title"
    />
    <input
        class="inputClass"
        id="searchCast"
        name="search"
        type="text"
        placeholder="Cast"
        v-model="searchVal.cast"
    />
    <input
        class="inputClass"
        id="searchGenre"
        name="search"
        type="text"
        placeholder="Genre"
        v-model="searchVal.genre"
    />
    <input
        class="inputClass"
        id="searchDateFrom"
        name="search"
        type="text"
        placeholder="Date from"
        v-model="searchVal.dateFrom"
        min="1900"
        max="2100"
    />
    <input
        class="inputClass"
        id="searchDateTo"
        name="search"
        type="text"
        placeholder="Date to"
        v-model="searchVal.dateTo"
        min="1900"
        max="2100"
    />
    <button v-on:click="searchDB" class="btnClass">
      Search
    </button>

    <MoviesTable :jsonDatabase="jsonFiltered"
                 :key="renderKey"/>
  </div>


</template>

<script>
import MoviesTable from "@/components/MoviesTable";

export default {
  name: "Search",
  components: {
    MoviesTable
  },
  props: {
    jsonDatabase: Array,
    lodash: Object,
  },

  data() {
    return {
      renderKey: 0,
      jsonFiltered: this.lodash.cloneDeep(this.jsonDatabase),
      searchVal: {
        title: "",
        cast: "",
        genre: "",
        dateFrom: "",
        dateTo: "",
      },
    }
  },

  methods: {

    isFilled: function (val) {
      return val === "";
    },

    getLowerCaseVal: function (val) {
      return this.lodash.toLower(val);
    },

    isIncluded: function (array, input) {
      return (this.lodash.includes(this.getLowerCaseVal(array),
          this.getLowerCaseVal(input)))
    },

    checkDateFrom: function (arrayDate, dateFrom) {
      return this.isFilled(dateFrom) || dateFrom <= arrayDate;

    },

    checkDateTo: function (arrayDate, dateTo) {
      return this.isFilled(dateTo) || dateTo >= arrayDate;

    },

    checkInputs: function (item) {
      if (this.isIncluded(item.title, this.searchVal.title)
          && this.isIncluded(item.cast, this.searchVal.cast)
          && this.isIncluded(item.genres, this.searchVal.genre)
          && this.checkDateFrom(item.year, this.searchVal.dateFrom)
          && this.checkDateTo(item.year, this.searchVal.dateTo)
      ) {
        return true;
      }
      console.log("checkInput false");
      return false;
    },

    isInputFilled: function () {
      if (!(this.isFilled(this.searchVal.title)
          && this.isFilled(this.searchVal.cast)
          && this.isFilled(this.searchVal.genre)
          && this.isFilled(this.searchVal.dateFrom)
          && this.isFilled(this.searchVal.dateTo))) {
        return true;
      }
      return false;
    },

    searchDB: function () {
      this.jsonFiltered = [];

      if (this.isInputFilled()) {
        for (let movie in this.jsonDatabase) {
          if (this.checkInputs(this.jsonDatabase[movie])) {
            this.jsonFiltered.push(this.jsonDatabase[movie]);

          }
        }
      } else {
        this.jsonFiltered = this.lodash.cloneDeep(this.jsonDatabase);
      }
      this.renderKey = this.renderKey + 1;
    }
  },
}
</script>

<style scoped>

.searchWrapper {
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
  font-size: 34px;
  margin: 10px;
}

.inputClass {
  margin-bottom: 10px;
  width: 350px;
  height: 30px;
  align-content: center;
  border-style: ridge;
  border-radius: 15px;
  transition: box-shadow 0.3s ease-in-out;
}

.inputClass:focus {
  -webkit-box-shadow: 0px 10px 16px -5px rgba(0, 0, 0, 0.59);
  -moz-box-shadow: 0px 10px 16px -5px rgba(0, 0, 0, 0.59);
  box-shadow: 0px 10px 16px -5px rgba(0, 0, 0, 0.59);
  border: none;
}

.btnClass {
  width: 360px;
  height: 40px;
  align-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
  border-radius: 15px;
  border-style: groove;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 2px;
  transition: box-shadow 0.2s ease-in-out;
}

.btnClass:hover {
  -webkit-box-shadow: inset 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
  box-shadow: inset 0px 0px 8px 5px rgba(0, 0, 0, 0.1);
}


</style>
