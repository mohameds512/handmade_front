<template>
    <Edit :type="employee ? employee.type : null"></Edit>
</template>

<script>
import Edit from "@/views/hr/employees/components/edit";
import { BCard, BCardText, BCol, BRow, BTab } from "bootstrap-vue";
import { mapGetters } from 'vuex';

export default {
  name: "edit",
  components: { Edit, BTab, BCardText, BCard, BCol, BRow },
  computed: {
    ...mapGetters({
      employee: "employees/item",
      load: "employees/load",
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
        this.$store.dispatch("employee/get", this.id).then((_) => {
          this.employee.type = this.employee?.type.type;
        });
      }
    },
  },
};
</script>

<style scoped></style>
