<template>
    <div class="bg-white p-2">
        <div class="style-form-content">
            <validation-observer ref="mainForm" >
                <b-form @submit="save" @reset="reset" >
                    <b-row>
                        <b-col cols="4">
                            <h3 class="mt-2 " > bill4-00001 </h3>
                        </b-col>
                        <b-col md="4">
                            <validation-provider #default="{ errors }" name="date" rules="required">
                            <b-form-group :label="$t('pur.Billed-At')" label-for="date-input" :description="$t('pur.you can not select date in the future')">
                                <b-form-datepicker :max="maxDate" v-model="bill.billed_at" disabled placeholder="Enter date" required></b-form-datepicker>
                            </b-form-group>
                            <ValidationErrors default-message :frontend-errors="errors"
                            :backend-errors="getBackendFieldError(errorsdata, 'bill.billed_at')" />
                            </validation-provider>
                        </b-col>
                        <b-col md="4">
                          <b-form-group :label="$t('pur.due-at')" >
                            <validation-provider #default="{ errors }" name="due-at" rules="required">
                                <b-form-select v-model="sel_due">
                                <b-form-select-option v-for="due in due_array" :value="due.value" :key="due.value">
                                    {{ due.name }}
                                </b-form-select-option>
                                </b-form-select>
                                <ValidationErrors default-message :frontend-errors="errors" :backend-errors="getBackendFieldError(errorsdata, 'due-at')
                                " />
                            </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col cols="4">
                          <div v-if="hide_selected_vendor == false">
                            <span><strong> {{ selected_vendor.name }}</strong> </span>
                            <span class="ml-2"><strong> {{ selected_vendor.phone }}</strong> </span> <br>
                            <span><strong> {{ selected_vendor.city }}</strong> </span>
                          
                          </div>
                            <b-form-group :label="$t('pur.vendor')" v-else label-for="date-input" >
                              <b-form-input v-model="search_vendor" ></b-form-input>
                              <div class="main_searched_container">
                                <div v-for="vendor in searched_vendor" :key="vendor.id" @click="select_vendor(vendor)" class="inner_main_searched_container">
                                  <span>{{ vendor.name }}</span>
                                </div>
                                <div @click="model_create_vendor = true" class="inner_main_searched_container text-center create-class" v-if="search_vendor">
                                  <span class="create-class"> <feather-icon icon="PlusIcon"></feather-icon> {{ $t('pur.create-vendor') }} </span>
                                </div>
                              </div>
                            </b-form-group>
                        </b-col>
                        <b-col md="4">
                            <b-form-group :label="$t('pur.bill number')" >
                            <validation-provider #default="{ errors }" name="number" rules="required">
                                <b-form-input v-model="bill.number" type="number" placeholder=" Bill Number"></b-form-input>
                                <ValidationErrors default-message :frontend-errors="errors"
                                :backend-errors="getBackendFieldError(errorsdata, 'number')" />
                            </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="2">
                            <b-form-group :label="$t('pur.status')" >
                            <validation-provider #default="{ errors }" name="status" rules="required">
                                <b-form-select v-model="bill.status_id">
                                <b-form-select-option v-for="stat in statuses" :value="stat.id">
                                    {{ stat.name }}
                                </b-form-select-option>
                                </b-form-select>
                                <ValidationErrors default-message :frontend-errors="errors" :backend-errors="getBackendFieldError(errorsdata, 'status')
                                " />
                            </validation-provider>
                            </b-form-group>
                        </b-col>
                        <b-col md="2" >
                            <b-form-group :label="$t('pur.amount')" v-if="bill.status_id == 14">
                            <validation-provider #default="{ errors }" name="paid" rules="required">
                                <b-form-input v-model="bill.paid" type="number" placeholder=" Bill paid"></b-form-input>
                                <ValidationErrors default-message :frontend-errors="errors"
                                :backend-errors="getBackendFieldError(errorsdata, 'paid')" />
                            </validation-provider>
                            </b-form-group>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            <b-button v-if="hide_selected_vendor == false" variant="outline-primary" @click="hide_selected_vendor = true" > {{ $t('pur.change vendor') }} </b-button>
                            <!-- <b-button v-else variant="success" @click="model_create_vendor = !model_create_vendor" > {{ $t('pur.create-vendor') }} </b-button> -->
                            <div v-if="model_create_vendor">
                                <p>create vendor</p>
                            </div>
                        </b-col>
                        
                    </b-row>
                    <b-row>
                      <b-col>
                        <div class="text-right m-1 inner-form-content ">
                          <!-- <b-button class="m-2" @click="addNewItem()" v-b-tooltip.hover="$t('Global. add item')" variant="primary"> 
                            <feather-icon
                              icon="PlusIcon"
                            />
                          </b-button> -->
                          <b-modal
                            id="modalPopover"
                            v-model="add_item_modal"
                            no-close-on-backdrop
                            size="sm"
                            
                          >
                            <validation-observer ref="simpleRules">
                              <div v-if="checkProduct"> <strong class="text-danger"> {{ $t('pur.item_selected_before') }} </strong> </div>
                              <b-form >
                                <div class="row">
                                  <b-col md="12">
                                    <b-form-input v-model="search_product"></b-form-input>
                                    <div class="main_searched_container">
                                      <div v-for="product in searched_products" :key="product.id" @click="select_product(product)" class="inner_main_searched_container">
                                        <span>{{ product.name }}</span>
                                      </div>
                                    </div>
                                  </b-col>
                                </div>
                              </b-form>
                            </validation-observer>
                            <template #modal-footer>
                              <b-row>
                                <b-col md="12">
                                  <b-button
                                    variant="outline-secondary"
                                    @click="add_item_modal = false"
                                  >
                                    {{ $t("Global.cancel") }}
                                  </b-button>
                                </b-col>
                              </b-row>
                            </template>
                          </b-modal>
                          <b-table
                            class="text-center"
                            bordered
                            :items="bill.billItems"
                            :fields="[
                                  { key: 'name', label: 'name',thStyle:'width:25%' },
                                  { key: 'quantity', label: 'quantity',thStyle:'width:25%' },
                                  { key: 'price', label: 'price',thStyle:'width:25%' },
                                  { key: 'amount', label: 'amount',thStyle:'width:20%' },
                                  { key: 'action', label: '#',thStyle:'width:5%' },
                            ]"
                          >
                            <template #cell(quantity)="data">
                              <b-form-input type="number" v-model="data.item.quantity"></b-form-input>
                            </template>
                            <template #cell(price)="data">
                              <b-form-input type="number" v-model="data.item.price"></b-form-input>
                            </template>
                            <template #cell(amount)="data">
                              <strong> {{ getItemTotalPrice(data) }} </strong>
                            </template>
                            <template #cell(action)="data">
                              <b-button  class="pr-1" variant="outline-danger"  @click="removeProduct(data)">
                                <feather-icon icon="TrashIcon"  ></feather-icon>
                              </b-button>
                            </template>
                          </b-table>

                          <div v-if="add_item_cont" class="row text-center  m-0">
                            <div class="col-sm-3 border p-1">
                              <b-form-input v-model="search_product"></b-form-input>
                                <div class="main_searched_container">
                                  <div v-for="product in searched_products" :key="product.id" @click="select_product(product)" class="inner_main_searched_container">
                                    <span>{{ product.name }}</span>
                                  </div>
                                  <div @click="model_create_vendor = true" class="inner_main_searched_container text-center create-class" v-if="search_product">
                                  <span class="create-class"> <feather-icon icon="PlusIcon"></feather-icon> {{ $t('pur.create-product') }} </span>
                                </div>
                                </div>
                            </div>
                            <div class="col-sm-3 border p-1">
                              <b-form-input type="number" disabled  :placeholder="$t('pur.quantity')"></b-form-input>
                            </div>
                            <div class="col-sm-3 border p-1">
                              <b-form-input type="number" disabled :placeholder="$t('pur.price')"></b-form-input>
                            </div>
                            <div class="col-sm-3 border p-1">
                              <span>--</span> 
                              <feather-icon @click="add_item_cont = false"  icon="TrashIcon" class="text-danger" style="margin-left: 50%;height: 100%;width:25px;cursor: pointer;"></feather-icon>
                              
                            </div>
                          </div>
                          <div v-else @click="add_item_cont = true" class="btn-add-item text-center p-1">
                            <feather-icon  icon="PlusIcon"></feather-icon> <span>{{ $t('pur.add-item') }}</span>
                          </div>
                        </div>
                        <div>
                          
                        </div>
                      </b-col>
                    </b-row>
                    <div class="inner-form-content">
                      <b-row>

                      <b-col cols="8">
                        
                        <validation-observer ref="simpleRules">
                              <div v-if="checkProduct"> <strong class="text-danger"> {{ $t('pur.item_selected_before') }} </strong> </div>
                              <b-form >
                                <div class="row">
                                  <b-col md="12">
                                    <b-form-textarea
                                      id="textarea"
                                      v-model="bill.notes"
                                      placeholder="Enter something..."
                                      rows="3"
                                      max-rows="3"
                                    ></b-form-textarea>
                                  </b-col>
                                </div>
                              </b-form>
                            </validation-observer>
                      </b-col>
                      <b-col cols="4">
                        <div class="taxes_discount_container">
                          <div class="row" style="margin: 0px !important;">
                            <div class="left_part col-sm-6 p-1"> {{$t('put.sub_total')}} </div>
                            <div class="right_part col-sm-6 p-1"> {{ check_if_exist(getSubTotal())  }} </div>
                          </div>
                          <div class="row" style="margin: 0px !important;">
                            <div class="left_part col-sm-6 p-1"> 
                              <span>{{$t('pur.taxes')}} </span> 
                              <span> 
                                <b-form-group  >
                                  <validation-provider #default="{ errors }" name="taxes" rules="required">
                                      <b-form-select v-model="bill.tax_id">
                                      <b-form-select-option v-for="item in taxes" :value="item.id" :key="item.id">
                                          {{ item.name  }}(%{{ item.rate }})
                                      </b-form-select-option>
                                      </b-form-select>
                                      <ValidationErrors default-message :frontend-errors="errors" :backend-errors="getBackendFieldError(errorsdata, 'taxes')
                                      " />
                                  </validation-provider>
                                </b-form-group>
                              </span> 
                            </div>
                            <div class="right_part col-sm-6 p-1"> {{ check_if_exist(bill.tax_total).toFixed(2)  }} </div>
                          </div>
                          <div class="row" style="margin: 0px !important;">
                            <div class="left_part col-sm-6 p-1"> 
                              <span>{{$t('put.discount')}} <b-form-checkbox v-model="disc_type" switch></b-form-checkbox> </span>
                            </div>
                            <div class="col-sm-6">
                              <span v-if="disc_type" >$</span>
                              <span v-else >%</span>
                              
                              <validation-provider #default="{ errors }" name="discount" rules="required">
                                  <b-form-input class="mt-1 mb-1" type="number" @change="check_balance" v-model="get_discount"></b-form-input>
                              </validation-provider>
                            </div>
                              
                          </div>
                          <div class="row" style="margin: 0px !important;">
                            <div class="left_part col-sm-6 p-1"> {{$t('pur.total')}} </div>
                            <div class="right_part col-sm-6 p-1"> {{ check_if_exist(bill.total).toFixed(2)  }} </div>
                          </div>
                        </div>
                      </b-col>
                      </b-row>
                    </div>
                    <div class="text-center">
                      <b-button @click="save"> {{ $t('pur.save') }} </b-button>
                    </div>
                    </b-form>
            </validation-observer>
        
        </div>
        
    </div>
</template>


<script>
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import { FormWizard, TabContent } from "vue-form-wizard";
import VSelect from "vue-select";
import "vue-form-wizard/dist/vue-form-wizard.min.css";
import { required, email, digits, length } from "@validations";
import {
  BFormCheckbox,
  BTable,
  BRow,
  BCol,
  BOverlay,
  BCard,
  BForm,
  BFormGroup,
  BFormInput,
  BFormDatepicker,
  BFormTextarea,
  BInputGroupAppend,
  BFormSelect,
  BFormSelectOption,
} from "bootstrap-vue";
import { localize, ValidationObserver, ValidationProvider } from "vee-validate";
import ValidationErrors from "@/views/components/common/ValidationErrors";
import { mapActions, mapGetters } from "vuex";
import vSelect from "vue-select";
import { credit } from "@/@core/utils/validations/validations";
import { useToast } from "vue-toastification";
import vendor from '@/api/purchases/vendors/vendor';
import FeatherIcon from '@/@core/components/feather-icon/FeatherIcon.vue';
import { data } from 'vue-echarts';


export default {
  components: {
    BFormCheckbox,
    BTable,
    BForm,
    BFormSelect,
    BFormSelectOption,
    BInputGroupAppend,
    FormWizard,
    BOverlay,
    TabContent,
    BRow,
    BFormDatepicker,
    BCol,
    BFormGroup,
    BCard,
    BFormInput,
    vSelect,
    BFormTextarea,
    ValidationProvider,
    ValidationObserver,
    localize,
    ValidationErrors,
    FeatherIcon,
  },
  computed: {
    // ...mapGetters({
    //   load: "entry/load",
    // }),
    // sumTotal() {
    //   return this.entries.reduce((acc, item) => {
    //     return acc + Number(item.credit - item.debit);
    //   }, 0);
    // },
  },
  props: {
  },
  data() {
    return {
        disc_type:true,
        add_item_cont:true,
        sel_due:null,
        due_array:[
          {name:'1 Day',value: 1},
          {name:'7 Day',value: 7},
          {name:'15 Day',value: 15},
          {name:'30 Day',value: 30},
          {name:'45 Day',value: 45},
          {name:'60 Day',value: 60},
        ],
        checkProduct:false,
        
        selected_product:[],
        hide_selected_product:false,
        selected_vendor:[],
        hide_selected_vendor:true,
        searched_products:[],
        search_product:null,
        itemsShow:[
          {
            item:null,
            quantity:1,
            price:null,
            amount:null,
          }
        ],
        model_create_vendor:false,
        search_vendor:null,
        searched_vendor:[],
        
        maxDate: new Date().toISOString().split("T")[0],
        
        accounts: [],
        errors_data: {},
        errorsdata: {},
        total: 0,
        get_discount:null,
          bill: {
              billItems:[],
              vendor_id:null,
              code: '121315315',
              number: null,
              billed_at: null,
              due_at: null,
              tax_id: null,
              paid: null,
              sub_total: null,
              tax_total: null,
              discount: null,
              total: null,
              notes: null,
              status_id:null,
          
        },
        add_item_modal:false,
        statuses:[],
        taxes:[],
    };
  },
  watch:{
    disc_type(val){
      this.getTaxesTotal()
    },
    sel_due(val){
      if(val){
        const currentDate = new Date();
        const due_date = new Date(currentDate.getTime() + val * 24 * 60 * 60 * 1000);
        this.bill.due_at = due_date.toISOString().split("T")[0];
      }
    },
    search_vendor(val){
      if(val == null || val == '' ){
        this.searched_vendor = [];
      }else{
        this.go_search_vendors();
      }
      
    },
    search_product(val){
      if(val == null || val == '' ){
        this.searched_products = [];
      }else{
        this.go_search_products();
      }
      
    }
  },
    mounted() {
        this.init();
        // const currentDate = new Date();
        this.bill.billed_at = new Date();
        // const next15Days = new Date(currentDate.getTime() + 15 * 24 * 60 * 60 * 1000); 
        // this.bill.due_at = next15Days.toISOString().split("T")[0]; 
    },

  methods: {
    // ...mapActions({
    //   saveEntry: "entries/put",
    // }),
    getSubTotal(){
      let totalSub = 0;
      this.bill.billItems.forEach(element => {
        totalSub += element.quantity * element.price
      });
      this.bill.sub_total = totalSub;
      this.getTaxesTotal();
      return this.bill.sub_total.toFixed(2);
    },
    check_balance(){
      let half_total = (this.bill.sub_total + this.bill.tax_total)/2
      let disc = this.bill.discount
      if (disc > half_total) {
        return this.errorToast("discount Must be smaller then 50%")
      }
      console.log('check')
      console.log(half_total);
      console.log(disc);
    },
    check_if_exist(value){
      if(value != null){
        return value;
      }else{
        return 0;
      }
    },
    getTaxesTotal(){
      
      console.log(this.bill.tax_id);
      let allTaxes = this.taxes;
      let items = allTaxes.filter((el)=>el.id == this.bill.tax_id);
      if (items.length > 0) {
        this.bill.tax_total = this.bill.sub_total * (items[0].rate/100);
        if (this.disc_type == true) {
          this.bill.total = this.get_discount;
        }else{
          this.bill.discount = (this.bill.sub_total + this.bill.tax_total ) * (this.get_discount/100);
        }
        this.bill.total = this.bill.sub_total + this.bill.tax_total - this.bill.discount;
      }else{
        return '--';
      }
      
    },
    select_vendor(vendor){
      this.hide_selected_vendor=false;
      this.search_vendor = null;
      this.bill.vendor_id = vendor.id;
      this.selected_vendor = vendor;
      console.log(this.selected_vendor)
    },
    select_product(product){
      this.hide_selected_product=true;
      this.search_product = null;
      // this.selected_product = product;
      let allItems = this.bill.billItems
      
      let checkExisted = allItems.filter((element)=>{element.id = 2});
      console.log('checkExisted');
      
      console.log(checkExisted);
      if(checkExisted.length > 0){
        this.checkProduct = true;
      }else{
        this.checkProduct = false;
        this.bill.billItems.push(product);
        
        this.add_item_modal = false;
      }
      
    },
    go_search_vendors(){

      this.$store.dispatch('bills/getVendor',{ keywords : this.search_vendor, limit:5 }).then((res) => {
        console.log(res.data);
        this.searched_vendor = res.data.vendors;
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    go_search_products(){
      this.$store.dispatch('bills/getProducts',{ keywords : this.search_product,limit:5 }).then((res) => {
        
        this.searched_products = res.data.products;
        
      })
      .catch((error)=>{
        console.log(error);
      });
    },
    addNewItem(){
      this.add_item_modal = true
      // this.itemsShow.push(
      //   {
      //     item:null,
      //     quantity:1,
      //     price:null,
      //     amount:null,
      //   }
      // );
    },
    init(){
      this.$store.dispatch('bills/createBill').then((res) => {
        this.statuses = res.data.statuses;
        this.taxes = res.data.taxes;
        
      })
      .catch((error)=>{
        console.log(error);
      });
    },

    getItemTotalPrice(data){
      // console.log(data);
      let totalPrice = data.item.price * data.item.quantity
      data.item.amount = totalPrice
      this.getSubTotal();
      if (totalPrice > 0) {
        return totalPrice.toFixed(2);  
      }else{
        return '--'
      }
      
    },
    addEntry() {
      this.entries.push({
        account_id: null,
        credit: 0,
        debit: 0,
      });
    },
    removeProduct(index) {
      this.bill.billItems.splice(index, 1);
    },
    validateAsync: function (index) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$refs.mainForm.validate().then((success) => {
            if (success) {
              resolve(true);
            } else {
              resolve(false);
            }
          });
        }, 1000);
      });
    },


    save() {

      
      this.$refs.mainForm.validate().then((success) => {
        if (success) {
          if(this.bill.vendor_id == null){
            return      this.errorToast('select vendor');
          }
          if(this.bill.total < this.bill.paid){
            return      this.errorToast('bill amount must be smaller than bill total');
          }
          this.check_balance();
          // const data = new FormData() ;
          // data.append('bill',this.bill);
          // data.append('items',this.selected_product);
          // console.log(data);
          this.$store
            .dispatch("bills/saveBill", {
              query: this.bill,
            })
            .then((_) => {
              this.$swal({
                icon: "success",
                title: this.$t("Global.Saved"),
                showConfirmButton: false,
                timer: 1500,
              });
              this.$router.push({ name: "bills" });
            })
            .catch((error) => {
              this.errorsdata = this.handleBackendError(
                error.response.data.errors
              );
            });
        }
      });
    },
    reset() {
      // this.date = null;
      // this.description = null;


      // this.entries = [
      //   {
      //     account_id: null,
      //     credit: 0,
      //     debit: 0,
      //   },
      //   {
      //     account_id: null,
      //     credit: 0,
      //     debit: 0,
      //   }
      // ];


    },
  },
};
</script>
<style lang="scss" >

    .style-form-content{
        background-color: rgb(248, 251, 251);
        padding: 1rem;
        border-radius: 5px;
      .inner-form-content{
        padding: 1rem;
        border-radius: 5px;
        background-color: rgb(244, 253, 255);
        border: 1px;
      }
    }
    .taxes_discount_container{
      background-color: rgb(196, 227, 216) !important;
      font-size: medium;
      .left_part{
        border: 0.01rem solid #c6c5c5;
        
      }
      .right_part{
        border: 0.01rem solid #c6c5c5;
      }
    }
    .main_searched_container{
      
      position: relative  !important;
      z-index:3 !important;
      background-color: rgb(196, 227, 216) !important;
      border: 0.01rem solid #c6c5c5;
      border-radius: 3px;
      text-align: left !important;
      .inner_main_searched_container{
        padding: 5px; 
      };
      .inner_main_searched_container:hover{
        background-color: rgb(238, 240, 239) !important;
        cursor: pointer;
        border-radius: 3px;
      }
    }
    .create-class{
      color: #0454ea !important;
    }
    .btn-add-item{
      cursor: pointer;
      background-color: #f5f2f2 !important;
      color: #0520cf;
      border-radius: 3px;
    }
</style>