<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  padding:5% 0px 50% 0px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  background-image: linear-gradient(#999 , #fff);
  text-align: center;
  margin: 8px ;
  color: #000;
  text-shadow: 2px 2px 4px white;
}

.button {
    background-image: radial-gradient(#000 , #444);
    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 10px;
    color: white;
    text-align: center-left;
    text-decoration: none;
    text-shadow: 2px 2px 4px white;
    box-shadow:2px 2px 4px black;
    transition: box-shadow 0.3s;
}
.button:hover{
    background-image: radial-gradient(#000 , #444);
    padding: 12px 20px;
    margin: 8px 0;
    border-radius: 10px;
    color: white;
    text-align: center-left;
    text-decoration: none;
    text-shadow: 2px 2px 4px white;
    box-shadow:0px 0px 10px white;
}
input[type=text] {
    padding: 12px 20px;
    margin: 8px 0;
    box-sizing: border-box;
    border:1px solid, black;
    box-shadow:2px 2px 4px black;
    border-radius: 10px;
    background-image: radial-gradient(white ,#cccccc);
    color: black;
    text-shadow: 2px 2px 4px #666;
}

</style>
