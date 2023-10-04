<template>
    <div class="bg-white m-1 p-2">
        <validation-observer ref="products_model">
            <b-form>
                
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
                                                icon="MaximizeIcon" @click="show_product(product)"
                                                class="text-success icon"
                                                size="18"
                                            />
                                            <feather-icon
                                                icon="RotateCwIcon" @click="ask_restore(product.id)"
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

    export default {
        name: 'Archived',
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
        this.getProducts();
      },
      
      methods: {
        ask_restore(item_id){
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
                    this.$store.dispatch("products/restoreProduct",{
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
        
        getProducts(){

            this.$store.dispatch("products/getArchivedProducts").then((res) => {
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