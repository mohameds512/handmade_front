<template>
  <section>
    <b-row>
      <b-col cols="12">
        <b-overlay
          :show="loading"
          rounded="sm"
        >
          <b-card :no-body="no_body ? true : false">
            <div v-if="name">
              <b-card-header
                class="flex-wrap text-initial"
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                  padding: 0.5rem;
                "
              >
                <div
                  v-if="name"
                  style="display: inline-block; font-weight: bold"
                >
                  <feather-icon
                    v-if="$route.params.id && !add"
                    icon="EditIcon"
                    size="20"
                  />
                  <feather-icon
                    v-else
                    icon="PlusCircleIcon"
                    size="20"
                  />
                  {{ name }}
                  <slot name="status" />
                </div>
              </b-card-header>
              <hr>
            </div>
            <b-card-body>
              <slot name="inputs" />
              <div class="mt-2 d-flex justify-content-start">
                <slot name="footer" />
              </div>
            </b-card-body>
          </b-card>
        </b-overlay>
      </b-col>
    </b-row>
  </section>
</template>
<script>
import BCardActions from '@core/components/b-card-actions/BCardActions.vue'
import {
  BCard,
  BRow,
  BCol,
  BCardTitle,
  BFormInput,
  BButton,
  BCardText,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BPagination,
  BOverlay,
  BCardHeader,
  BCardBody,
} from 'bootstrap-vue'
import { mapGetters } from 'vuex'

export default {
  name: 'EditComponent',
  components: {
    BCardActions,
    BCardTitle,
    BCardText,
    BCard,
    BRow,
    BCol,
    BOverlay,
    BCardHeader,
    BCardBody,
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
  },
  props: {
    item: Array,
    name: String,
    formName: String,
    except: [],
    big_th: Boolean,
    no_body:Boolean,
    subtitle: Boolean,
    loading: Boolean,
    status: Number,
    add: false,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-good-table.scss';
</style>
