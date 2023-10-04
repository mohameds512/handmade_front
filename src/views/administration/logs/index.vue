<template>
  <DataTable :total="total" :filter="filter" :loading="load" @Refresh="refresh">
    <template #filter>
      <b-col md="6">
        <b-form-group>
          <flat-pickr placeholder="Date from to" v-model="filter.rangeDate" class="form-control" :config="{ mode: 'range' }" />
        </b-form-group>
      </b-col>
    </template>
    <template #customTable>
      <b-table class="position-relative" :items="items" responsive :fields="fields" primary-key="id" show-empty :empty-text="$t('Global.empty_text')">
        <template #cell(name)="data">
          <b-media vertical-align="center" v-if="data.item.user" class="d-flex align-items-center">
            <template #aside>
              <b-avatar size="32" :text="avatarText(data.item.user.name)" />
            </template>
            <b-link class="font-weight-bold d-block text-nowrap" :to="{ name: 'users-view', params: { id: data.item.user.id } }">
              {{ data.item.user.name }}
            </b-link>
            <small class="text-muted">{{ data.item.user.name_local }}</small>
          </b-media>
        </template>

        <template #cell(time)="data">
          <span class="text-nowrap">{{ toLocalDatetime(data.item.created_at, 'EN', true) }}</span>
        </template>

        <template #cell(actions)="data">
          <div>
            <b-link :to="{ name: 'log', params: { id: data.item.id } }">
              <feather-icon icon="EyeIcon" />
            </b-link>
          </div>
        </template>
      </b-table>
    </template>
  </DataTable>
</template>

<script>
import { BCard, BFormGroup, BRow, BCol, BFormInput, BButton, BTable, BMedia, BAvatar, BLink, BBadge, BDropdown, BDropdownItem, BPagination } from 'bootstrap-vue';
import vSelect from 'vue-select';
import DataTable from '@/views/components/table/DataTable';
import flatPickr from 'vue-flatpickr-component';
import { mapGetters } from 'vuex';

export default {
  components: {
    BCard,
    flatPickr,
    BRow,
    BFormGroup,
    DataTable,
    BCol,
    BFormInput,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BPagination,

    vSelect,
  },
  data() {
    return {
      fields: [
        {
          key: 'name',
          label: this.$t('Global.name'),
          sortable: true,
        },
        {
          key: 'action',
          label: this.$t('Global.action'),
          sortable: true,
        },
        {
          key: 'time',
          label: this.$t('Global.updated_at'),
          sortable: true,
        },
        {
          key: 'actions',
          label: this.$t('Global.actions'),
          thClass: 'customAction',
          tdClass: 'customWidth',
        },
      ],
      filter: { removed: 0 },
    };
  },
  computed: {
    ...mapGetters({
      items: 'log/items',
      total: 'log/total',
      load: 'log/load',
    }),
  },
  methods: {
    refresh(query) {
      this.$store.dispatch('log/getLogs', { query: query });
    },
  },
};
</script>

<style lang="scss" scoped>
.per-page-selector {
  width: 90px;
}
</style>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
