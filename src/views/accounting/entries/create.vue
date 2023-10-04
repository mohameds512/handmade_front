<template>
  <div>
    <create-entry></create-entry>
  </div>
    
</template>

<script>
import createEntry from "@/views/accounting/entries/components/create";

export default {
  name: "create",
  components: { 
    createEntry,
  },
};
</script>

<style scoped></style>
