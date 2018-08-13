<template>
  <table class="table table-bordered table-dark table-fixed">
    <thead class="thead-light">
      <tr>
        <th v-for="key in columns" @click="sortBy(key)" :class="{ active: sortKey == key }">
          {{ key | capitalize }}
          <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="entry in filteredData" :class="rowStyle(entry)">
        <td v-for="key in columns">
          {{entry[key]}}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
    props: {
        data: Array,
        columns: Array,
        filterKey: String
    },
    data() {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    sortOrders['Id'] = -1;  
    return {
      sortKey: 'Id',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData() {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    },
    rowStyle(row){
      if (row['LogLevel'] === undefined) {return '';}
      if (row['LogLevel'] < 20) {return 'bg-secondary';}
      if (row['LogLevel'] == 30) {return 'bg-warning';}
      if (row['LogLevel'] >= 40) {return 'bg-danger';}
    }
  }
}
</script>

<style scoped>
  table{
    margin-top: 75px;
  }
  th {
    white-space: nowrap;
  }
  th, td {
    padding: 10px 20px;
  }
  th.active {
    color: #495057;
  }

  th.active .arrow {
    opacity: 1;
  }

  .arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.20;
  }

  .arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #495057;
  }

  .arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #495057;
  }
</style>

