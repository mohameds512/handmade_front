<template>
    <div>

        <b-card>
            <b-table
                    striped
                    class="text-right"
                    hover
                    :items="projects_list"
                    :fields="[
                              { key: 'name', label: 'اسم المشروع' },
                              { key: 'action' , label: ' بيانات المشروع'   },
                              { key: 'dashboard' , label: '  تقرير المشروع'   },
                            ]"
                    dir="rtl"
            >
                <template #cell(action)="data">

                    <router-link :to="`/add-project/${data.item.id}`">
                        <feather-icon

                                size="16"
                                icon="EditIcon"
                                class="m-0 plus_icon"
                        />
                    </router-link>


                </template>

                <template #cell(dashboard)="data">
                    <router-link :to="`/overview`">
                        <b-button>
                            عرض
                        </b-button>

                    </router-link>

                </template>
            </b-table>
        </b-card>
        <!-- <b-table striped hover :items="projects" v-if="this.projects" :responsive="true"></b-table> -->

    </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { required, min_value } from '@validations'
  import vSelect from 'vue-select'
  import DataTable from '@/views/components/table/DataTable'
  import {
    // BOverlay,
    // https://ecb.dev.vero-cloud.com/api/
    BFormInput,
    BFormTag,
    BFormTags,
    BFormGroup,
    BForm,
    BRow,
    BCol,
    BTab,
    BTabs,
    BOverlay,
    BButton,
    BCardText,
    BCard,
    BModal,
    BFormDatepicker,
    BFormFile,
    BTable,
  } from 'bootstrap-vue'

  export default {
    name: 'Add Project',
    data() {
      return {
        projects_list: [{
          'name': 'مشروع ترعة الحمام',
          'id': 20
        }]
      }
    },
    components: {
      ValidationProvider,
      ValidationObserver,
      // BOverlay,
      BCardText,
      BCard,
      BModal,
      BFormInput,
      BFormGroup,
      BForm,
      BRow,
      BCol,
      BTab,
      BTabs,
      BOverlay,
      BTable,
      DataTable,
      BButton,
      BFormTag,
      BFormTags,
      BFormDatepicker,
      vSelect,
      BFormFile,
    }
  }
</script>
