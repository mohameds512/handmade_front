<template>
    <Edit   ></Edit>
</template>

<script>
import Edit from "@/views/purchases/vendors/components/edit";
import { BCard, BCardText, BCol, BRow, BTab } from "bootstrap-vue";
import { mapGetters } from 'vuex';

export default {
  name: "edit",
  components: { Edit, BTab, BCardText, BCard, BCol, BRow },
  computed: {
    ...mapGetters({
      vendor: "vendors/vendor",
      load: "vendors/load",
    }),
    id() {
      return this.$route.params.id ? this.$route.params.id : null
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      if (this.id) {
        this.$store.dispatch("vendors/get", this.id).then((_) => {
        });
      }
    },
  },
};
</script>

<style scoped></style>
