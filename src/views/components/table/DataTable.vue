<template>
    <div>
        <b-card no-body>
            <b-card-header v-if="title" class="text-white pb-0 w-100">
                <b-row class="d-flex justify-content-between w-100">
                    <b-col cols="12" md="6">
                        <h3 :style="titleFontSize?'font-size:'+titleFontSize+'px':''" class="m-0">{{ title }}</h3>
                        <h5 class="m-0" style="color: darkgray" v-if="subTitle">{{ subTitle }}</h5>
                    </b-col>
                    <b-col v-if="allowSearch && title" cols="12" md="5" sm="2" class="p-0">
                        <div class="d-flex">
                            <b-form-input v-model="search" v-if="allowFilterWithoutSearch"
                                          @keydown.enter.native="Refresh(true)" class="d-inline-block mb-1"
                                          :placeholder="$t('Global.search_text')"/>
                            <b-button v-b-tooltip.hover="$t('Global.filter')" v-if="!!$slots.filter" variant="primary"
                                      class="btn-icon ml-2" v-b-toggle.filter>
                                <feather-icon icon="SlidersIcon"/>
                            </b-button>
                            <slot name="more"></slot>
                        </div>
                    </b-col>
                    <div v-if="!title" class=" mt-sm-2">
                        <slot name="action"></slot>
                    </div>
                </b-row>
            </b-card-header>
            <hr class="mb-0" v-if="title && !allowActions"/>
            <div v-if="!basicTable" :class="!!$slots.filter && visible ? 'mx-2 my-1' : !title ? 'my-1 mx-2' : 'mx-2'">
                <b-row class="d-flex justify-content-end">
                    <b-col v-if="allowSearch && !title">
                        <div class="d-flex w-100 justify-content-between">
                            <b-form-input v-if="allowFilterWithoutSearch" v-model="search"
                                          @keydown.enter.native="Refresh(true)"
                                          class="w-50 d-inline-block custom_search"
                                          :placeholder="$t('Global.search_text')"/>
                            <slot v-else name="studentSerach"></slot>
                            <b-button v-b-tooltip.hover="$t('Global.filter')" v-if="!!$slots.filter" variant="primary"
                                      class="btn-icon ml-1" v-b-toggle.filter>
                                <feather-icon icon="SlidersIcon"/>
                            </b-button>
                        </div>
                    </b-col>
                    <!-- <div class=" mt-sm-2 d-flex justify-content-center w-100"> -->
                    <b-button v-if="!title && $slots.filter" v-b-tooltip.hover="$t('Global.reset')"
                              class="btn-icon mr-1" variant="primary"
                              @click="$emit('reset')">
                        <feather-icon icon="RotateCwIcon"/>
                    </b-button>
                    <slot v-if="!title || allowActions" name="action"></slot>
                    <!-- </div> -->
                </b-row>

                <b-row v-if="!!$slots.filter">
                    <b-col cols="12" md="12">
                        <b-collapse v-model="visible" id="filter" class="mt-2">
                            <!--              <b-card class="border mb-0">-->
                            <b-row>
                                <slot name="filter"></slot>
                            </b-row>
                            <!--                <b-card-text class="card-text"> Collapse contents Here </b-card-text>-->
                            <!--              </b-card>-->
                        </b-collapse>
                    </b-col>
                </b-row>
            </div>

            <b-overlay :show="loading" rounded="sm">
                <div v-if="draggable" id="drag-index">
                    <DragTable @drop="Drag">
                        <slot name="customTable"></slot>
                    </DragTable>
                </div>
                <div v-else>
                    <slot name="customTable"></slot>
                </div>
            </b-overlay>
            <div v-if="!basicTable && !browse" class="mx-2 mb-2">
                <b-row>
                    <b-col cols="12" sm="6"
                            class="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <div class="mx-1">
                            <label>{{$t('Global.show')}}</label>
                            <v-select v-model="perPage" :dir="$store.state.appConfig.layout.isRTL ? 'rtl' : 'ltr'"
                                :options="perPageOptions" :clearable="false"
                                class="per-page-selector d-inline-block mx-50"/>
                            <label>{{$t('Global.entries')}} .</label>
                            <label class="mx-05">{{$t('Global.from')}} {{ meta.from + 1 }} {{$t('Global.to')}} {{
                                perPage >= meta.of ? meta.of : meta.to }} {{$t('Global.of')}} {{ meta.of }}</label>
                        </div>
                        <div></div>
                    </b-col>
                    <!-- Pagination -->
                    <b-col cols="12" sm="6"
                            class="d-flex align-items-center justify-content-center justify-content-sm-end">
                        <b-pagination v-model="page" :total-rows="total" :per-page="perPage" first-number last-number
                            class="mb-0 mt-1 mt-sm-0" prev-class="prev-item" next-class="next-item">
                            <template #prev-text>
                                <feather-icon icon="ChevronLeftIcon" size="18"/>
                            </template>
                            <template #next-text>
                                <feather-icon icon="ChevronRightIcon" size="18"/>
                            </template>
                        </b-pagination>
                    </b-col>
                </b-row>
            </div>
        </b-card>
    </div>
</template>

<script>
    import {
        BCard,
        BCardText,
        BRow,
        BCol,
        BCollapse,
        VBToggle,
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
        BOverlay,
        BCardHeader,
        BCardBody
    } from 'bootstrap-vue';
    import DragTable from "@/views/components/table/DragTable";
    import vSelect from 'vue-select';

    export default {
        name: 'DataTable',
        components: {
            BCard,
            DragTable,
            BRow,
            BCol,
            BOverlay,
            BCollapse,
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
            vSelect,
        },
        props: {
            items: [],
            fields: [],
            browse: Boolean,
            basicTable: Boolean,
            loading: false,
            total: 0,
            icon: String,
            filter: {},
            nofilter: Boolean,
            draggable: {default: false, type: Boolean},
            name: String,
            title: String,
            subTitle: String,
            allowSearch: {
                type: Boolean,
                default: true,
            },
            allowActions: {
                type: Boolean,
                default: true,
            },
            titleFontSize: false,
            allowFilterWithoutSearch: {
                type: Boolean,
                default: true
            }
        },
        directives: {
            'b-toggle': VBToggle,
        },
        data() {
            return {
                visible: false,
                perPage: 10,
                search: '',
                rerender: true,
                perPageOptions: [10, 25, 50, 100],
                page: 1,
                hasFilterSlot: false,
            };
        },
        computed: {
            meta() {
                return {
                    from: this.perPage * (this.page - 1),
                    to: this.perPage * (this.page - 1) + this.perPage,
                    of: this.total,
                    
                };
            },
        },
        watch: {
            filter: {
                handler(val) {
                    this.Refresh();
                },
                deep: true
            },
            page(val) {
                // localStorage.setItem("page", val);
                this.Refresh();
            },
            perPage(val) {
                // localStorage.setItem("perPage", val);
                this.Refresh();
            },
            'filter.sort_order'(val) {
                this.filter.order_direction = val ? 'DESC' : 'ASC'
                this.Refresh()
            },
            // 'filter.order_by'() {
            //     this.Refresh()
            // },
            'filter.export'() {
                this.Export();
            },
            'filter.type_id'() {
                this.Refresh();
            },
            // 'filter.flags'(){
            //   this.Refresh();
            // },
            'filter.competent_employee'() {
                this.Refresh();
            },
            'filter.manager_director'() {
                this.Refresh();
            },
            'filter.dean'() {
                this.Refresh()
            },
            'filter.president'() {
                this.Refresh()
            },
            'filter.affair_manager'() {
                this.Refresh()
            },
            'filter.registration_unit'() {
                this.Refresh()
            },
            'filter.administration_manager'() {
                this.Refresh()
            },
            'filter.vice_president'() {
                this.Refresh()
            },
            'filter.search_student'() {
                this.Search();
            },
            'filter.student_id'() {
                this.Refresh();
            }
        },
        mounted() {
            let myButton = document.querySelector('.CustomBtn .vs__actions ')
            if (myButton) {
                let childrens = myButton.children
                if (childrens[1]) {
                    childrens[1].remove()
                }
            }
            this.Refresh();
            this.hasFilterSlot = !!this.$slots.filter;
            // this.rerender = false;
            // setTimeout(() => {
            //   this.rerender = true;
            // }, 3000);
            // this.page = localStorage.getItem("page");
        },
        methods: {
            Refresh(search = false) {
                Object.filter = (obj, predicate) =>
                    Object.keys(obj).filter(key => predicate(obj[key])).reduce((res, key) => ((res[key] = obj[key]), res), {});
                let query = {
                    limit: this.perPage,
                    offset: search ? 0 : (this.page - 1) * this.perPage,
                    keywords: this.search,
                    page:this.page,
                    ...Object.filter(this.filter, el => el != ''),
                    // id:this.$router.currentRoute.params.id
                };
                this.$store.commit("app/SET_FILTER", this.filter);
                this.$emit('Refresh', query);
            },
            Drag(e) {
                this.$emit('Drag', e);
            },
            Export() {
                let query = {
                    ...Object.filter(this.filter, el => el != ''),
                    keywords: this.search,
                };
                if (this.filter.export == 0) {
                    return;
                } else {
                    this.$emit('Export', query);
                }
            },
            Search(val) {
                console.log("whhaaaat !");
                this.$emit('search', this.filter.search_student);
            },
            searchStudent2(val) {
                console.log("am i fired !")
                console.log(val)
            }
        },
    };
</script>

<style scoped>

</style>
