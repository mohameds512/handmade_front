<template>
<div>
  <h1></h1>
      <Delay_Codes></Delay_Codes>
</div>
</template>

<script>
    // import Airports from "@/views/airport/components/airports";

    import Delay_Codes from "../delay_codes/components/delay_codes.vue"

    export default {
        name: "index",
        components: {Delay_Codes}
    }
</script>

<style scoped>

</style>