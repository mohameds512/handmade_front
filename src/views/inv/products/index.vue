<template>
    <div class="bg-white m-1 p-2">
        <validation-observer ref="products_model">
            <b-form>
                <b-button @click="addProduct(null)">{{$t("inv.add_product")}}</b-button>
                
                <div class="justify-content-center pt-2">
                    <b-row>
                        <b-col lg="4" md="4" sm="12" v-for="(product,i) in products" :key="i">
                            <div>
                                <b-card no-body border-variant="light">
                                    <b-row no-gutters>
                                    <b-col md="4">
                                        <b-card-img  :src="product.img_route" alt="Image" class="rounded-0 "></b-card-img>
                                    </b-col>
                                    <b-col md="8" >
                                        <b-card-body >
                                            <b-card-title class="m-0"> {{ transDB(product.name) }} </b-card-title>
                                            <b-card-text >
                                                
                                                <p class="m-0"  > {{ showShortText(transDB(product.desc)) }}</p>
                                                <div class="d-flex justify-content-start">
                                                    <p class="m-0"> <p>  <strong>{{$t('price')}} : </strong> </p> <p> {{ product.price }} $</p></p>

                                                </div>
                                                <div class="d-flex justify-content-start">
                                                    <p class="m-0" v-if="product.discount > 0"> <p>  <strong>{{$t('discount')}} : </strong> </p> <p> {{ product.discount }} %</p></p>
                                                </div>
                                            </b-card-text>
                                        </b-card-body>
                                        
                                    </b-col>
                                    </b-row>
                                    <b-card-text class="p-1 bg-light border-top ">
                                        <div class=" d-flex justify-content-between">
                                            <feather-icon
                                                icon="EditIcon" @click="addProduct(product)"
                                                class="text-warning icon" 
                                            />
                                            <feather-icon
                                                icon="MaximizeIcon" @click="show_product(product)"
                                                class="text-success icon"
                                                size="18"
                                            />
                                            <feather-icon
                                                icon="TrashIcon" @click="ask_delete(product.id)"
                                                class="text-danger icon"
                                            />
                                        </div>
                                        
                                    </b-card-text>

                                </b-card>
                            </div>
                        </b-col>
                    </b-row>
                    
                    <!-- <b-table :items="products" 
                        :fields="[
                            { key: 'name', label: $t('name') },
                            { key: 'desc', label: $t('desc') },
                            { key: 'count', label: $t('count') },
                            { key: 'price', label: $t('price') },
                            { key: 'discount', label: $t('discount') },
                            { key: 'img_route', label: $t('image') },
                        ]"
                    >
                        <template #cell(name) ="data">
                            
                            {{ transDB(data.item.name) }}
                        </template>
                        <template #cell(desc) ="data">
                        
                        {{ transDB(data.item.desc) }}
                    </template>
                    </b-table> -->
                </div>
                <div>
                    
                    <b-modal ref="my-model" hide-header-close id="dd" size="lg" v-model="productModal"  hide-footer :title="$t('inv.add_product')">
                        
                                <b-row>
                                    
                                    <b-col lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('name_ar')">
                                            <validation-provider #default="{ errors }" name="name_ar" >
                                                <b-form-input v-model="product.name_ar" :state="errors.length > 0 ? false : null">
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
                                                <b-form-input v-model="product.name_en" :state="errors.length > 0 ? false : null">
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
                                                <b-form-input v-model="product.name_du" :state="errors.length > 0 ? false : null">
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
                                                <b-form-input v-model="product.desc_ar" :state="errors.length > 0 ? false : null">
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
                                                <b-form-input v-model="product.desc_en" :state="errors.length > 0 ? false : null">
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
                                                <b-form-input v-model="product.desc_du" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <b-row>
                                    <b-col lg="4"   md="4" sm="12">
                                        
                                        <b-form-group :label="$t('category')">
                                            <v-select :options="categories" v-model="product.cat_id" :reduce="(val)=>val.id">
                                                <template v-slot:option="option">
                                                    {{ transDB(option.name) }}
                                                </template>
                                                <template #selected-option="{name}">
                                                    <strong>
                                                        {{ transDB(name) }}
                                                    </strong>
                                                </template>
                                            </v-select>
                                        </b-form-group>
                                    </b-col>
                                    <b-col  lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('Price')">
                                            <validation-provider #default="{ errors }" name="desc_du" >
                                                <b-form-input v-model="product.price" type="number" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                    <b-col  lg="4" md="4" sm="12" >
                                        <b-form-group :label="$t('discount')">
                                            <validation-provider #default="{ errors }" name="desc_du" >
                                                <b-form-input v-model="product.discount" type="number" :state="errors.length > 0 ? false : null">
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
                                    <b-col  lg="6" md="6" sm="12" >
                                        <b-form-group :label="$t('count')">
                                            <validation-provider #default="{ errors }" name="desc_du" >
                                                <b-form-input v-model="product.count" type="number" :state="errors.length > 0 ? false : null">
                                                </b-form-input>
                                                <small class="text-danger" v-if="errors[0]">
                                                    {{ $t("The name field is required") }}
                                                </small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>
                                </b-row>
                                <div class="mt-2">
                                    <b-col cols="12">
                                        <div class="justify-content-end">
                                            <b-button variant="outline-success " class="mr-1" @click="submitProduct()"> {{ $t("Global.confirm") }} </b-button>
                                            <b-button variant="outline-danger" @click="productModal = false"> {{ $t("Global.cancel") }} </b-button>
                                        </div>
                                    </b-col>
                                </div>
                            
                    
                    </b-modal>
                    
                    <b-modal ref="show-model"    id="dkkd"  v-model="showProduct"  hide-footer hide-header >
                        <div v-if="shown_product.name != null">
                            <b-card
                                tag="article"
                                class="mb-2"
                            >
                                <b-card-img  style="max-width: 70%;" :src="shown_product.img_route" alt="Image" class="ml-5 p-1 rounded-0 "></b-card-img>
                                <b-card-title class="mt-1 d-flex justify-content-between">
                                    <span>{{ transDB(shown_product.name) }}</span>
                                    <span>{{ transDB(shown_product.cat_name) }}</span>
                                </b-card-title>
                                <b-card-text  >
                                    <p  > {{ transDB(shown_product.desc)  }}</p>
                                    <div class="d-flex justify-content-between"  >
                                        <div class="m-0" > <p>  <strong>{{$t('price')}} :  </strong> </p> <p> {{ shown_product.price }} $</p></div>
                                        <div class="m-0"> <p>  <strong>{{$t('discount')}} : </strong></p> <p> {{ shown_product.discount }} %</p></div>
                                        <div class="m-0"> <p>   <strong>{{$t('count')}} : </strong></p><p> {{ shown_product.count }} </p></div>
                                        
                                    </div>
                                    <hr>
                                    <div class="d-flex justify-content-between">
                                        <div class="m-0"> <p>  <strong>{{$t('name_ar')}} : </strong> </p> <p>{{ shown_product.name_ar }} </p></div>
                                        <div class="m-0"> <p>  <strong>{{$t('name_en')}} : </strong> </p> <p> {{ shown_product.name_ar }} </p></div>
                                        <div class="m-0">
                                            <p>  <strong>{{$t('name_du')}} : </strong></p> 
                                            <p> {{ shown_product.name_du }} </p>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <div class="m-0">
                                            <p>  <strong>{{$t('name_du')}} : </strong></p> 
                                            <p> {{ shown_product.name_du }} </p>
                                        </div>
                                        
                                    </div>
                                    <div >
                                        <div class="m-0">
                                            <p>  <strong>{{$t('desc_ar')}} : </strong></p> 
                                            <p> {{ shown_product.desc_ar }} </p>
                                        </div>
                                        <div class="m-0">
                                            <p>  <strong>{{$t('desc_en')}} : </strong></p> 
                                            <p> {{ shown_product.desc_en }} </p>
                                        </div>
                                        <div class="m-0">
                                            <p>  <strong>{{$t('desc_du')}} : </strong></p> 
                                            <p> {{ shown_product.desc_du }} </p>
                                        </div>
                                        
                                    </div>
                                    <!-- <div> -->
                                        <!-- <div class="m-0"> <p>  <strong>{{$t('desc_ar')}} : </strong></p> <p></p> {{ shown_product.desc_ar }} <p></p>
                                        <div class="m-0"> <p>  <strong>{{$t('desc_en')}} : </strong> </p> <p> {{ shown_product.desc_en }} </p></div>
                                        <div class="m-0"> <p>  <strong>{{$t('desc_du')}} : </strong> </p> <p>{{ shown_product.desc_du }} </p></div> -->
                                    <!-- </div> -->
                                </b-card-text>

                            </b-card>
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
            productModal : false,
            product:{
                name_ar:null,
                name_en:null,
                name_du:null,
                desc_ar:null,
                desc_en:null,
                desc_du:null,
                cat_id:null,
                image:null,
                discount:null,
                count:null,
                price:null,
            },
            shown_product:{
                name_ar:null,
                name_en:null,
                name_du:null,
                desc_ar:null,
                desc_en:null,
                desc_du:null,
                cat_id:null,
                image:null,
                discount:null,
                count:null,
                price:null,
            },
            categories:[],
            products:[],
            showProduct:false,
        }
      },
      mounted(){
        this.getCats();
        this.getProducts();
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
        ask_delete(item_id){
            this.$swal({
                title:'Are you sure?',
                text:"You won't be able to revert this!",
                icon:'warning',
                showCancelButton:true,
                confirmButtonText:'Ok',
                cancelButtonText:'Cancel',
                customClass:{
                    confirmButton:'btn btn-outline-danger mr-1',
                    cancelButton: 'btn btn-primary',
                },
                buttonsStyling:false,
                }).then((result)=>{
                    this.$store.dispatch("products/deleteProduct",{
                        id:item_id,
                    }
                    ).then(() => {
                    this.$swal({
                        icon:'success',
                        title:"successMessage",
                        shoeConfirmButton:false,
                        timer:1500,
                    })
                    this.getProducts();
                    }).catch((error)=>{
                        console.log(error);
                    })
                })
        },
        show_product(item){
            this.shown_product.id = item.id
            this.shown_product.cat_name = item.cat_name
            this.shown_product.name = item.name,
            this.shown_product.name_ar = item.name.ar,
            this.shown_product.name_en = item.name.en,
            this.shown_product.name_du = item.name.du,
            this.shown_product.desc = item.desc,
            this.shown_product.desc_ar = item.desc.ar,
            this.shown_product.desc_en = item.desc.en,
            this.shown_product.desc_du = item.desc.du,
            this.shown_product.cat_id = item.category_id,
            this.shown_product.img_route = item.img_route,
            this.shown_product.discount = item.discount,
            this.shown_product.count = item.count,
            this.shown_product.price = item.price

            this.showProduct = true
        },
        addProduct(item){
            this.productModal = true;
            this.product.name_ar = null,
            this.product.name_en = null,
            this.product.name_du = null,
            this.product.desc_ar = null,
            this.product.desc_en = null,
            this.product.desc_du = null,
            this.product.cat_id = null,
            this.product.image = null,
            this.product.discount = null,
            this.product.count = null,
            this.product.price = null

            if (item != null) {
                this.product.id = item.id
                this.product.name_ar = item.name.ar,
                this.product.name_en = item.name.en,
                this.product.name_du = item.name.du,
                this.product.desc_ar = item.desc.ar,
                this.product.desc_en = item.desc.en,
                this.product.desc_du = item.desc.du,
                this.product.cat_id = item.category_id,
                this.product.image = item.image,
                this.product.discount = item.discount,
                this.product.count = item.count,
                this.product.price = item.price
            }
        },
        previewProduct_img(e){
            this.product.image = this.$refs.product_img.files[0];
            console.log(this.product.image);
        },
        submitProduct(){
            this.$refs.products_model.validate().then((success)=>{
                if (success) {
                    
                    const product_data = new FormData();
                    product_data.append('image',this.product.image)
                    product_data.append('name_ar',this.product.name_ar)
                    product_data.append('name_en',this.product.name_en)
                    product_data.append('name_du',this.product.name_du)
                    product_data.append('desc_ar',this.product.desc_ar)
                    product_data.append('desc_en',this.product.desc_en)
                    product_data.append('desc_du',this.product.desc_du)
                    product_data.append('price',this.product.price)
                    product_data.append('discount',this.product.discount)
                    product_data.append('count',this.product.count)
                    product_data.append('cat_id',this.product.cat_id)

                    this.$store.dispatch("products/addProduct",{
                        id:this.product.id,
                        query:product_data
                    }
                    ).then(() => {
                    this.productModal = false
                    // this.$toast.success('Hello World!')
                    this.$swal({
                        icon:'success',
                        title:"successMessage",
                        shoeConfirmButton:false,
                        timer:1500,
                    })
                    this.getProducts();
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
        getProducts(){

          this.$store.dispatch("products/getProducts").then((res) => {
            this.products = res.data.items;
            console.log(res);
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