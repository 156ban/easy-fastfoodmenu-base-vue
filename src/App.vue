<template>
  <div id="app">
    <left-nav></left-nav>
    <div id="" class="main">
		
	<router-view></router-view>
	</div>
  </div>
</template>
<script>
	import leftNav from './components/commo/leftNav.vue'
	export default{
		name:"app",
		components: {
			leftNav
		}
	}
</script>

<style scoped="scoped">

  #app
  {
	  overflow: hidden;
	height: 100%;
  }
  
  .main{
	  float: left;
	  width: 95%;
	   height: 100%;
	  background-color: lightgray;
  }
</style>
