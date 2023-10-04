<template>
    <div>

          <Aircraft_Status></Aircraft_Status>
    </div>
    </template>
    
    <script>
        // import Airports from "@/views/airport/components/airports";
        import Aircraft_Status from "../aircraft_status/components/aircraft_status.vue"
    
        export default {
            name: "index",
            components: {Aircraft_Status}
        }
    </script>
    
    <style scoped>
    
    </style>