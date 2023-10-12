<template>
    <div class="bg-white m-1 p-2">
        <validation-observer ref="settings_model">
            <b-form>
                <div class="d-flex justify-content-start">
                    <div class="img_setting"  @click="changeImg()">
                        <img style="width: 100%;height: 100%; background-color: blanchedalmond; border-radius: 5px;padding: 5px;" :src="get_setting_data.img_route" alt="">
                        <!-- <input type="file" class="pointer_cls" ref="select_img"  accept="image/apng,image/png,image/jpg,image/jpeg,image/webp" style="opacity: 0.0; position: absolute; top: 0; left: 0; bottom: 0; right: 0; max-width: 100%;" /> -->
                    </div>
                    <div class="setting_info ">
                        <div class=" d-flex justify-content-lg-end">
                            <feather-icon
                                class="pointer_cls text-warning "
                                icon="EditIcon"
                                size="18"
                                @click="editData()"
                            /> 
                        </div>
                        <div class="d-flex justify-content-start">
                            <strong> Name : </strong> <p class="pl-1"> {{get_setting_data.vendor_name}}</p> 
                        </div>
                        <div class="d-flex justify-content-start">
                            <strong> Desc: </strong> <p class="pl-1">  {{get_setting_data.vendor_desc}} </p> 
                        </div>
                        <div  v-if="editBasicInfo">
                            <div class=" d-flex justify-content-end">
                                <feather-icon
                                    class="pointer_cls text-danger "
                                    icon="XIcon"
                                    size="18"
                                    @click="editBasicInfo = false"
                                /> 
                            </div>
                            <div >
                                <b-row>
                                    
                                    <b-col lg="6" md="6" sm="12" >
                                        <b-form-group :label="$t('name')">
                                            <validation-provider #default="{ errors }" name="name" >
                                                <b-form-input v-model="setting_info.vendor_name" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col lg="6" md="6" sm="12" >
                                        <b-form-group :label="$t('desc')">
                                            <validation-provider #default="{ errors }" name="desc" >
                                                <b-form-textarea v-model="setting_info.vendor_desc" :state="errors.length > 0 ? false : null">
                                                </b-form-textarea>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col>
                                        <b-form-group :label="$t('image')">
                                            <validation-provider #default="{ errors }" name="image" >
                                                <input type="file" class="pointer_cls pb-2" ref="select_img" @change="previewProduct_img($event)"  accept="image/apng,image/png,image/jpg,image/jpeg,image/webp"  />
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                            </div>
                            <div>
                                <b-button variant="outline-success" @click="saveBasicSetting()">{{ $t('save') }}</b-button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="setting_address">
                    <strong class="pt-5 " > Addresses :- </strong>
                    <div class="pt-2 ">
                        <div class=" d-flex justify-content-start">
                            <strong class="pl-1" > name : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                            <strong class="pl-1"> city : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                            <strong class="pl-1"> street : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                        </div>
                        <div class=" d-flex justify-content-start">
                            <strong class="pl-1" > name : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                            <strong class="pl-1"> city : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                            <strong class="pl-1"> street : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                        </div>
                        
                        <div class=" d-flex justify-content-start">
                            <strong class="pl-1" > name : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                            <strong class="pl-1"> city : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                            <strong class="pl-1"> street : </strong> <p class="pl-1"> mohamsed dfa daf</p> 
                        </div>
                        <div class="setting_map">
                            
                            <GmapMap
                                :center="{lat:10, lng:10}"
                                :zoom="7"
                                map-type-id="terrain"
                                style="width: 800px; height: 500px"
                                >
                                    <!-- <GmapMarker
                                        :key="index"
                                        v-for="(m, index) in markers"
                                        :position="m.position"
                                        :clickable="true"
                                        :draggable="true"
                                        @click="center=m.position"
                                    /> -->
                                </GmapMap>
                        </div>
                    </div>
                </div>
            </b-form>
        </validation-observer>
    </div>
</template>

<script>
    
    import {
        BCardTitle,
        BCardImg,
        BProgress,
        BFormInput,
        BFormTextarea,
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
        BPagination,
        BSpinner,
        BIconNutFill,
        BCardBody,
    } from 'bootstrap-vue'
    import { ValidationProvider,ValidationObserver } from 'vee-validate';
import { formatDate } from '@/@core/utils/filter';
    import {gmapApi} from 'vue2-google-maps';
    export default {
        components:{
            BCardTitle,
            BCardImg,
            BCardBody,
            ValidationProvider,ValidationObserver,
            BProgress,
            BFormTextarea,
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
            BPagination,
            BSpinner,
            BIconNutFill,
            BRow,
            BCol
        },
        data(){
            return {
                markers:[
                    {
                        position:{lat: 1.38, lng: 103.80}
                    }
                ],
                setting_img:false,
                editBasicInfo:false,
                setting_info:{
                    id:null,
                    vendor_name:null,
                    vendor_desc:null,
                    vendor_img:null,
                },        
                get_setting_data:null,     
            }
        },
        mounted(){
            this.getDataSetting();
        },
        methods:{
            previewProduct_img(e){
            this.setting_info.vendor_img = this.$refs.select_img.files[0];
            console.log(this.setting_info.vendor_img);
        },
            getDataSetting(){
                this.$store.dispatch("settings/getSettings")
                    .then((res)=>{
                        
                            this.get_setting_data = res;
                            
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            },
            editData(){
                this.editBasicInfo = true;
                this.setting_info.vendor_name = this.get_setting_data.vendor_name
                this.setting_info.vendor_desc = this.get_setting_data.vendor_desc
            },
            saveBasicSetting(){

                const sett_data = new FormData();
                sett_data.append('vendor_name',this.setting_info.vendor_name)
                sett_data.append('vendor_desc',this.setting_info.vendor_desc)
                sett_data.append('vendor_image',this.setting_info.vendor_img)

                this.$store.dispatch("settings/storeData",{
                        id:this.get_setting_data.id,
                        query:sett_data
                    }
                    ).then((res) => {
                        this.editBasicInfo = false;
                        this.getDataSetting();

                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                    
            }
        }
    }
</script>

<style lang="scss">
    @import '@core/scss/vue/pages/dashboard-ecommerce.scss';
    @import '@core/scss/vue/libs/chart-apex.scss';

    

</style>
<style scoped>
 .pointer_cls{
    cursor: pointer;
 }
.img_setting{
    position: relative;
    width: 35%;
    height: 450px;
    cursor: pointer;

    }
    .setting_info{
        width: 65%;
        padding: 10px;
    }
    .setting_address{
        padding-top: 20px;
    }
</style>