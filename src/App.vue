<template>
  <div id="app">
    <header>
      <h1 @click="topFunction">Logging Web UI</h1>
      <div id="search" class="form-group row justify-content-center">
        <label class="col-form-label col-2">Search:</label>
        <input class="form-control col-6" name="query" v-model="searchQuery">
        <div class="col-1"></div>
        <button @click="refresh" type="button" class="btn btn-primary col-2">Refresh</button>
      </div>
    </header>
    <grid-table
      :data="gridData"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </grid-table>
  </div>
</template>

<script>
import GridTable from './GridTable.vue';
export default {
  name: 'app',
  components:{
    'grid-table': GridTable
  },
  created: function(){
    this.refresh();
  },
  data () {
    // this.refresh();
    return {
      endpoint: window.location.href + 'api',
      searchQuery: '',
      gridColumns:[
        'Id',
        'TimeStamp',
        'Source',
        'LogLevel',
        'LogLevelName',
        'Message',
        'Module',
        'FuncName',
        'LineNo',
        'Exception',
        'Process',
        'Thread',
        'ThreadName'
      ],
      gridData: []
    }
  },
  methods:{
    refresh(){
      fetch(this.endpoint)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          this.gridData = data;});
    },
    topFunction() {
        document.body.scrollTop = 0; // For Safari
        document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
    } 
  }
}
</script>

<style>
#app{
  width: 100%;
  
}

#search{
  margin: 0 0 0 auto;
  font-size: 1.2em;
  width: 600px;
}

header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: #e9ecef;
  box-sizing: border-box;
  height: 75px;
  padding: 10px;
  border-bottom: 3px solid #212529;
  display: flex;
  z-index: 1;
}
header > h1{
  cursor: pointer;
}
</style>
