<template>
    <Edit :type="user ? user.type : null"></Edit>
</template>

<script>
import Edit from "@/views/hr/components/edit";
import { BCard, BCardText, BCol, BRow, BTab } from "bootstrap-vue";
import { mapGetters } from 'vuex';

export default {
  name: "edit",
  components: { Edit, BTab, BCardText, BCard, BCol, BRow },
  computed: {
    ...mapGetters({
      user: "users/item",
      load: "users/load",
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
        this.$store.dispatch("users/get", this.id).then((_) => {
          this.user.type = this.user?.type.type;
        });
      }
    },
  },
};
</script>

<style scoped></style>
