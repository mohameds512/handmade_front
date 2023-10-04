<template>
  <div>
  
    <b-overlay
      :show="loading"
      rounded="sm"
    > 
    <edit-component>
      <template #inputs>
        <validation-observer ref="simpleRules">
          <b-form ref="formRequest" @submit.stop.prevent="save">
            <b-row >
              <b-col md="12" v-for="(input, k) in formRequest.access" :key="k">
                <b-row>
                  <b-col md="12">
                    <hr />
                    <h6>{{$t("User Access")}}</h6>
                  </b-col>
                  <b-col md="12">
                    <b-row>
                      <b-col md="11">
                        <b-row>
                          <b-col md="3">
                            <b-form-group
                              v-if="options"
                              :label="$t('Role')"
                              label-for="role-input"
                            >
                              <validation-provider
                                #default="{ errors }"
                                :name=" 'role ' + (k+1)"
                                rules="required"
                              >
                                <v-select
                                  v-model="input.role_id"
                                  :filter="fuseSearch"
                                  :dir="
                                    $store.state.appConfig.layout.isRTL
                                      ? 'rtl'
                                      : 'ltr'
                                  "
                                  :options="options.roles"
                                  :clearable="false"
                                  input-id="role-input"
                                  :reduce="(val) => val.id"
                                >
                                  <template v-slot:option="option">
                                    {{
                                         option.name
                                    }}
                                  </template>
                                  <template
                                    #selected-option="{ name }"
                                  >
                                    <div
                                      style="
                                        display: flex;
                                        align-items: baseline;
                                      "
                                    >
                                      
                                      <strong >{{ name }}</strong>
                                    </div>
                                  </template>
                                  <template #no-options>
                                    {{ $t("noMatching") }}
                                  </template>
                                </v-select>
                                <ValidationErrors :frontend-errors="errors" />
                              </validation-provider>
                            </b-form-group>
                          </b-col>

                          <b-col md="3">
                            <b-form-group
                              v-if="options"
                              :label="$t('Global.faculty')"
                              label-for="faculty-input"
                            >
                              <validation-provider
                                #default="{ errors }"
                                :name=" 'faculty ' + (k+1)"
                                rules="required"
                              >
                                <v-select
                                  :filter="fuseSearch"
                                  v-model="input.faculty_id"
                                  :dir="
                                    $store.state.appConfig.layout.isRTL
                                      ? 'rtl'
                                      : 'ltr'
                                  "
                                  :clearable="false"
                                  input-id="faculty-input"
                                  :reduce="(val) => val.id"
                                  @input="
                                    (prop) => updateFaculty(input, prop, k)
                                  "
                                  :value="input.id"
                                  :options="options ? options.faculties : []"
                                >
                                  <template v-slot:option="option">
                                    {{
                                      $i18n.locale == "ar"
                                        ? option.name_local
                                        : option.name
                                    }}
                                  </template>
                                  <template
                                    #selected-option="{ name, name_local }"
                                  >
                                    <div
                                      style="
                                        display: flex;
                                        align-items: baseline;
                                      "
                                    >
                                      <strong v-if="$i18n.locale == 'ar'"
                                        >{{ name_local }}
                                      </strong>
                                      <strong v-else>{{ name }}</strong>
                                    </div>
                                  </template>
                                  <template #no-options>
                                    {{ $t("noMatching") }}
                                  </template>
                                </v-select>
                                <ValidationErrors :frontend-errors="errors" />
                              </validation-provider>
                            </b-form-group>
                          </b-col>

                          <b-col md="3">
                            <b-form-group
                              :label="$t('program')"
                              label-for="program-input"
                            >
                              <v-select
                                  :filter="fuseSearch"
                                  v-model="input.selected_programs"
                                  :dir="
                                  $store.state.appConfig.layout.isRTL
                                    ? 'rtl'
                                    : 'ltr'
                                "
                                :options="input.programs_data?input.programs_data:options.programs"
                                :clearable="false"
                                multiple
                                input-id="program-input"
                                :reduce="(val) => val.id"
                                :value="input.id"
                                @input="(prop) => programsList(input, prop, k)"
                              >
                                <template v-slot:option="option">
                                  {{
                                    $i18n.locale == "ar"
                                      ? option.name_local +`(${(option.bylaw.name_local ?option.bylaw.name_local:'-')})`
                                      : option.name +`(${(option.bylaw.name?option.bylaw.name:'-')})`
                                  }}
                                </template>
                                <template
                                  #selected-option="{ name, name_local,bylaw }"
                                >
                                  <div
                                    style="display: flex; align-items: baseline"
                                  >
                                    <strong v-if="$i18n.locale == 'ar'">
                                      {{ name_local }}{{`(${(bylaw.name_local?bylaw.name_local:'-')})`}}
                                    </strong>
                                    <strong v-else>
                                      {{ name }}{{`(${(bylaw.name?bylaw.name:'-')})`}}
                                    </strong>
                                  </div>
                                </template>
                                <template #no-options>
                                  {{ $t("noMatching") }}
                                </template>
                              </v-select>
                            </b-form-group>
                          </b-col>

                          <b-col md="3">
                            <b-form-group
                              v-if="options"
                              :label="$t('department')"
                              label-for="department-input"
                            >
                              <validation-provider
                                #default="{ errors }"
                                name="department"
                                rules=""
                              >
                                <v-select
                                  v-model="input.department_id"
                                  :filter="fuseSearch"
                                  :dir="
                                    $store.state.appConfig.layout.isRTL
                                      ? 'rtl'
                                      : 'ltr'
                                  "
                                  :options="input.departments_data?input.departments_data:options.faculty_departments"
                                  :clearable="false"
                                  input-id="department-input"
                                  :reduce="(val) => val.id"
                                >
                                  <template v-slot:option="option">
                                    {{
                                      $i18n.locale == "ar"
                                        ? option.name_local
                                        : option.name
                                    }}
                                  </template>
                                  <template
                                    #selected-option="{ name, name_local }"
                                  >
                                    <div
                                      style="
                                        display: flex;
                                        align-items: baseline;
                                      "
                                    >
                                      <strong v-if="$i18n.locale == 'ar'"
                                        >{{ name_local }}
                                      </strong>
                                      <strong v-else>{{ name }}</strong>
                                    </div>
                                  </template>
                                  <template #no-options>
                                    {{ $t("noMatching") }}
                                  </template>
                                </v-select>
                                <ValidationErrors :frontend-errors="errors" />
                              </validation-provider>
                            </b-form-group>
                          </b-col>
                        </b-row>
                      </b-col>

                      <b-col md="1">
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          variant="outline-danger"
                          class="mt-0 mt-md-2 float-right"
                          @click="remove(k)"
                          v-if="k !=0"
                        >
                          <feather-icon icon="XIcon" />
                        </b-button>
                      </b-col>
                    </b-row>
                  </b-col>
                </b-row>
              </b-col>
              
              <b-col md="12">
                
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  class="float-right mt-0 mt-md-2"
                  variant="primary"
                  @click="addNewCard"
                >
                  <feather-icon icon="PlusIcon" class="text-md-right" /> 
                  {{$t('Add User Access')}}
                </b-button>
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  class="float-right mt-0 mt-md-2 mr-1"
                  variant="danger"
                  @click="resetUserAccess()"
                >
                  {{$t('Reset')}}
                </b-button>
              </b-col>
              <!-- submit and reset -->
              <b-col md="12">
                <b-button
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  variant="primary"
                  class="mr-1"
                >
                  {{ $t("Global.save") }}
                </b-button>
                <b-button
                  v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                  variant="outline-secondary"
                  @click="cancel"
                >
                  {{ $t("Global.cancel") }}
                </b-button>
              </b-col>
            </b-row>
          </b-form>
        </validation-observer>
      </template>
    </edit-component>
    </b-overlay>
    
  </div>
</template>
<script>
import { mapGetters, mapActions,mapMutations } from "vuex";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormCheckbox,
  BForm,
  BButton,
  BOverlay
} from "bootstrap-vue";
import vSelect from "vue-select";
import { ValidationProvider, ValidationObserver, localize } from "vee-validate";
import { required, between } from "@validations";
import ValidationErrors from "@/views/components/common/ValidationErrors";
import Ripple from "vue-ripple-directive";
import EditComponent from "@/views/components/table/Edit";
import { forEach } from 'postcss-rtl/lib/affected-props';
import {getLookups} from "@/api/system/global";

export default {
  title: "access",
  components: {
    EditComponent,
    BCol,
    BRow,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BForm,
    BButton,
    vSelect,
    ValidationErrors,
    ValidationProvider,
    ValidationObserver,
    localize,
    BOverlay
  },
  directives: {
    Ripple,
  },
  computed: {
    ...mapGetters({
      options: "app/lookups",
      userAccessData: "users/userAccess",
      loading:'users/load'
    }),
    id() {
      if (this.params && this.params.id) return this.params.id;
      return this.$route.params.id ? this.$route.params.id : null;
    },
  },
  data() {
    return {
      formRequest: {
        access: [
          {
            rule_id:null,
            faculty_id: null,
            department_id: null,
            programs: [],
            selected_programs: [],
            oldSelectedPrograms: [],
          }
        ],
        delete_access: []
      },
      query: {
        faculties: true,
        roles: true,
      },

      errorsdata: {},
      access: [],
      show: false,

    };
  },
  methods: {
    ...mapActions({
      lookups: "app/GET_LOOKUPS",
      addUserAccess: "users/accessUser",
      getUserAccessData: "users/getUserAccess",
      resetAllUserAccess: "users/resetUserAccess"
    }),
    ...mapMutations({
      loadingMutate: 'users/SET_USERS_LOAD'
    }),

    init() {

      this.lookups(this.query);

      this.getUserAccessData(this.id).then((res) => {
        if(this.userAccessData.length>0){
          console.log('here ')
          this.formRequest.access=[]
        }else{
          this.loadingMutate(false)
        }
        
        res.data.forEach((element,key) => {
          let objectData = {}

          objectData.faculty_id = element.faculty_id;
          objectData.role_id = element.role_id;
          objectData.department_id = element.department_id;

          //to get facutly programs
          let queryPrograms = {
            faculty_departments: true,
            faculty_id: objectData.faculty_id,
            faculty_id_programs_with_bylaw: true,
          };
          getLookups(queryPrograms).then(resData => {
            //console.log('data11',resData);
            objectData.programs_data=resData.success.programs;
            objectData.departments_data=resData.success.faculty_departments;
            console.log('set loading');

            objectData.selected_programs=[];
            objectData.oldSelectedPrograms=[];
            element.programs.forEach((e) => {
              if(e.program_id){
                objectData.selected_programs.push(e.program_id);
              }
              objectData.programs=[];
              objectData.programs.push({
                access_id: e.access_id,
                program_id: e.program_id,
              });

              //to set old selected programs
              objectData.oldSelectedPrograms[e.program_id]=e.access_id;
            });
            //data.push(objectData)
            this.formRequest.access.push(objectData);
            console.log('sara2',this.formRequest);
            this.loadingMutate(false)
          })
        });
        console.log('sara',this.formRequest);
      });
      

    },
    cancel() {
      this.$router.go(-1);
    },
    save() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          const payload = { id: this.id, query: this.formRequest };

          console.log({ payload });
          this.addUserAccess(payload)
            .then((response) => {
              this.$swal({
                icon: "success",
                text: `${this.$t("Global.successMessage")}`,
                showConfirmButton: false,
                timer: 1500,
              });
              this.$router.go(-1);
            })
            .catch((error) => {
              this.errorsdata = this.handleBackendError(
                error.response.data.errors
              );
            });
        }
      });
    },
    updateFaculty(data, prop, index) {
      this.formRequest.access[index].faculty_id = prop;

      this.query = {
        ...this.query,
        faculty_departments: true,
        faculty_id: prop,
        faculty_id_programs_with_bylaw: true,
      };

      this.lookups(this.query);
    },

    addNewCard() {
      this.formRequest.access.push({
        role_id: null,
        faculty_id: null,
        department_id: null,
        program_id: null,
        selected_programs: [],
        programs: [],
        oldSelectedPrograms:[]
      });
      console.log("access", this.access);
    },
    remove(index) {
      this.rerender = false;
      setTimeout(() => {
        this.rerender = true;
      }, 50);
      if(this.formRequest.access[index].programs){
        this.formRequest.access[index].programs.forEach(data=>{
          if(data.access_id){
            this.formRequest.delete_access.push(data.access_id);
          }
        });
      }
      this.formRequest.access.splice(index, 1);
      console.log('test222',this.formRequest);
    },
    programsList(data, prop, index) {
      console.log( 'testee',data,prop,index );

      this.formRequest.access[index].programs=[];
      this.formRequest.access[index].selected_programs=[];
      // new => [1,4,6]   old => {1},{5},{4}   action => 5 removed
      data.oldSelectedPrograms.forEach((value,key)=>{
        if(!prop.includes(key) && !this.formRequest.delete_access.includes(value)){
          console.log('testestee',value);
          this.formRequest.delete_access.push(value);
        }else{
          // this.formRequest.delete_access = this.formRequest.delete_access.filter((v)=>{
          //   return v != value;
          // })
        }
      });

      console.log('old',data.oldSelectedPrograms)
      prop.forEach((element) => {
        console.log({ element });
        let newAccessId = data.oldSelectedPrograms[element]??null;
        // search  & check if item old selected or not
        this.formRequest.access[index].programs.push({
          access_id: newAccessId,
          program_id: element,
        });
        this.formRequest.access[index].selected_programs.push(element);
      });
      console.log('dddda',this.formRequest);
    },
    resetUserAccess() {
                this.$swal({
                    title: `${this.$t('Global.deleteTitle')}`,
                    text: 'You are about to delete all user access!',
                    icon: 'warning',
                    showCancelButton: true,
                    cancelButtonText: `${this.$t('Global.cancel')}`,
                    confirmButtonText: 'Yes, Reset!',
                    customClass: {
                        confirmButton: 'btn btn-primary',
                        cancelButton: 'btn btn-outline-primary ml-1',
                    },
                    buttonsStyling: false,
                }).then(result => {
                    if (result.value) {
                        this.resetAllUserAccess(this.id).then(_ => {
                           this.$swal({
                                icon: 'success',
                                title: 'Reseted!',
                                text: ' User access reseted successfully ',
                                customClass: {
                                    confirmButton: 'btn btn-success',
                                },
                           })
                       })
                    }
                  this.$router.go(-1);

                })
            },
  },
  mounted() {
    this.init();
  },
};
</script>
