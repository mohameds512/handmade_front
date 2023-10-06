<template>
    <div class="bg-white m-1 p-2">
        <validation-observer ref="cats_model">
            <b-form>
                <b-button @click="addCat(null)">{{$t("inv.add_category")}}</b-button>
                
                <div class="justify-content-center pt-2">
                    
                    <b-table :items="categories" 
                        :fields="[
                            { key: 'name', label: $t('name') },
                            { key: 'name.en', label: $t('name_en') },
                            { key: 'desc', label: $t('desc') },
                            { key: 'desc.en', label: $t('desc_en') },
                            { key: 'img_route', label: $t('image') },
                            { key: 'action', label: $t('action') },
                        ]"
                    >
                        <template #cell(name) ="data">
                            
                            {{ transDB(data.item.name) }}
                        </template>
                        <template #cell(desc) ="data">
                        
                            {{ transDB(data.item.desc) }}
                        </template>
                        <template #cell(img_route) ="data">
                            <img :src="data.item.img_route" :alt="data.item.image" width="150px" />
                        </template>
                        <template #cell(action) ="data">
                            <feather-icon
                                icon="EditIcon" @click="addCat(data.item)"
                                class="text-warning icon" 
                            />
                        </template>
                    </b-table>
                </div>
                <div>
                    
                    <b-modal ref="my-model" hide-header-close id="dd" size="lg" v-model="catModal"  hide-footer :title="$t('inv.add_product')">
                        
                                <b-row>
                                    
                                    <b-col lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('name_ar')">
                                            <validation-provider #default="{ errors }" name="name_ar" >
                                                <b-form-input v-model="cat.name_ar" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('name_en')">
                                            <validation-provider #default="{ errors }" name="name_en" >
                                                <b-form-input v-model="cat.name_en" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col  lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('name_du')">
                                            <validation-provider #default="{ errors }" name="name_du" >
                                                <b-form-input v-model="cat.name_du" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    
                                    <b-col lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('desc_ar')">
                                            <validation-provider #default="{ errors }" name="desc_ar" >
                                                <b-form-input v-model="cat.desc_ar" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('desc_en')">
                                            <validation-provider #default="{ errors }" name="desc_en" >
                                                <b-form-input v-model="cat.desc_en" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col  lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('desc_du')">
                                            <validation-provider #default="{ errors }" name="desc_du" >
                                                <b-form-input v-model="cat.desc_du" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="6" md="6" sm="12">
                                        <b-form-group :label="$t('image')">
                                            <input type="file" accept="image/apng,image/png,image/jpg,image/jpeg,image/webp"
                                                @change="previewProduct_img($event)" ref="product_img"
                                            />
                                        </b-form-group>
                                    </b-col>
                                    
                                </b-row>
                                <div class="mt-2">
                                    <b-col cols="12">
                                        <div class="justify-content-end">
                                            <b-button variant="outline-success " class="mr-1" @click="submitProduct()"> {{ $t("Global.confirm") }} </b-button>
                                            <b-button variant="outline-danger" @click="catModal = false"> {{ $t("Global.cancel") }} </b-button>
                                        </div>
                                    </b-col>
                                </div>
                            
                    
                    </b-modal>
                    
                </div>
            </b-form>
        </validation-observer>
    </div>
    
    
</template>

<script>
    import VSelect from 'vue-select'
    import { ValidationProvider,ValidationObserver } from 'vee-validate';
    import {
        BCardTitle,
        BCardImg,
        BProgress,
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
        BCardBody,
    } from 'bootstrap-vue'
import { title } from '@/@core/utils/filter';
// import { useToast } from "vue-toastification";


    export default {
        
        name: 'Products',
        components:{
            BCardTitle,
            BCardImg,
            BCardBody,
            VSelect,
            ValidationProvider,ValidationObserver,
            BProgress,
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
      data() {
        return {
            catModal : false,
            
            categories:[],
            products:[],
            showProduct:false,
            cat:{
                name_ar : null,
                name_en : null,
                name_du : null,
                desc_ar : null,
                desc_en : null,
                desc_du : null,
                image : null
            }
        }
      },
      mounted(){
        this.getCats();
        // this.firebaseNotification();
      },
      
      methods: {
        // firebaseNotification(){
        //     const messaging = getMessaging();
        //     onMessage(messaging, (payload) => {          
        //     const notificationTitle = payload.notification.title;
        //         const notificationOptions = {
        //         body: payload.notification.body,
        //         icon: '/logo_one.png'
        //         };
        //         this.$toast.success(payload.notification.body);
            
        //     });
        // },
    
        addCat(item){
            this.catModal = true;
            this.cat.name_ar = null,
            this.cat.name_en = null,
            this.cat.name_du = null,
            this.cat.desc_ar = null,
            this.cat.desc_en = null,
            this.cat.desc_du = null,
            this.cat.image = null

            if (item != null) {
                this.cat.id = item.id
                this.cat.name_ar = item.name.ar,
                this.cat.name_en = item.name.en,
                this.cat.name_du = item.name.du,
                this.cat.desc_ar = item.desc.ar,
                this.cat.desc_en = item.desc.en,
                this.cat.desc_du = item.desc.du,
                this.cat.image = item.image
            }
        },
        previewProduct_img(e){
            this.cat.image = this.$refs.product_img.files[0];
            console.log(this.cat.image);
        },
        submitProduct(){
            this.$refs.cats_model.validate().then((success)=>{
                if (success) {
                    
                    const cat_data = new FormData();
                    cat_data.append('image',this.cat.image)
                    cat_data.append('name_ar',this.cat.name_ar)
                    cat_data.append('name_en',this.cat.name_en)
                    cat_data.append('name_du',this.cat.name_du)
                    cat_data.append('desc_ar',this.cat.desc_ar)
                    cat_data.append('desc_en',this.cat.desc_en)
                    cat_data.append('desc_du',this.cat.desc_du)

                    this.$store.dispatch("products/addCategory",{
                        id:this.cat.id,
                        query:cat_data
                    }
                    ).then(() => {
                    this.catModal = false
                    // this.$toast.success('Hello World!')
                    this.$swal({
                        icon:'success',
                        title:"successMessage",
                        shoeConfirmButton:false,
                        timer:1500,
                    })
                    this.getCats();
                    }).catch((error)=>{
                        console.log(error);
                    })
                }
            })
            .catch((error)=>{
                console.log("error");
                console.log(error);
                // this.handleBackendError(error.response.data.errors);
            })
        },
        showShortText(text){
            let length =  text.length;   
            if(length > 20){
                return text.substring(0,25) + ' ....';
            } 
            return text;
        },
        transDB(jsonVal){
            if (this.$i18n.locale == 'en') {
                return jsonVal.en;
            }else if(this.$i18n.locale == 'ar'){
                return jsonVal.ar;
            }else if(this.$i18n.locale == 'du'){
                return jsonVal.du;
            }
        },
        getCats(){
          this.$store.dispatch("products/getCategories").then((res) => {
            this.categories = res.categories;
            
             
          }).catch((error)=>{
            console.log(error);
          })
          ;
        },
        
      }
    }
  </script> 
   
  <style >
    
  </style> 
   
  <style  scoped>
    .icon {
      &:hover {
        cursor: pointer;
      }
    }
   
    .muted {
      color: gray;
      font-size: 80%;
    }
  </style> 