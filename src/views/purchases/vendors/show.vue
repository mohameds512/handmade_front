<template>
    <show @refresh="init" :item="vendor" :load="load">
        <template #add_tab>
            <b-tab>
                <template #title>
                    <feather-icon icon="UserIcon"/>
                    <span>{{$t('Global.vendor_details')}}</span>
                </template>
                <list :data="vendor" :loading="load"
                      :only="['name', 'code','name_local','email', 'birth_date', 'gender', 'national_id']"></list>
            </b-tab>
            <b-tab>
                <template #title>
                    <feather-icon icon="LinkIcon"/>
                    <span>{{$t('Global.account_details')}}</span>
                </template>
                <list :data="vendor" :loading="load" :only="['personal_email', 'mobile','phone']"></list>
            </b-tab>
        </template>
    </show>
</template>

<script>
    import {mapGetters} from "vuex";
    import show from "@/views/purchases/vendors/components/show";
    import {BTab, BCardText, BCard, BCol, BRow} from 'bootstrap-vue'
    import List from "@/views/components/info/list";
    import {getAuth} from "@/auth/utils";

    export default {
        name: "vendor",
        components: {show, BTab, BCardText, BCard, BCol, BRow, List},
        computed: {
            ...mapGetters({
                vendor: 'vendors/vendor',
                load: 'vendors/load',
            }),
            id() {
                return this.$route.params.id ;
                // return this.$route.params.id ? this.$route.params.id : this.authUser().id;

            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

                this.$store.dispatch('vendors/get', this.id);
            }
        }
    }
</script>

<style scoped>

</style>