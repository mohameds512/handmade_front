<template>
  
   <!-- <statistics></statistics> -->
   <div>
    <h1> {{ $t('msg.help') }}</h1>
   </div>
  
   
</template>

<script>
    import {BRow, BCol} from 'bootstrap-vue'
    import statistics from './component/statistics'
   
    export default {
        components: {
            BRow,
            BCol,
            statistics
        },
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/pages/dashboard-ecommerce.scss';
    @import '@core/scss/vue/libs/chart-apex.scss';


</style>
