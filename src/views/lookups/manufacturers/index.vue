<template>
<div>
  <h1></h1>
      <Manufacturers></Manufacturers>
</div>
</template>

<script>
    // import Airports from "@/views/airport/components/airports";

    import Manufacturers from "../manufacturers/components/manufacturers.vue"
    export default {
        name: "index",
        components: {Manufacturers}
    }
</script>

<style scoped>

</style>