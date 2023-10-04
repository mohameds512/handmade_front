<template>
    <div>
        
        <show @refresh="init" :item="user" :load="load" >
        <template #add_tab>
            <b-tab>
                <template #title>
                    <feather-icon icon="UserIcon"/>
                    <span>{{$t('Global.personal_info')}}</span>
                </template>
                
                <list :data="user" :loading="load"
                    :only="['name', 'code','email', 'birth_date', 'gender', 'national_id']"></list>
            </b-tab>
            <b-tab>
                <template #title>
                    <feather-icon icon="LinkIcon"/>
                    <span>{{$t('Global.contact_info')}}</span>
                </template>
                <list :data="user" :loading="load" :only="['personal_email', 'mobile','phone']"></list>
            </b-tab>
            <b-tab>
                <template #title>
                    <feather-icon icon="MapPinIcon"/>
                    <span>{{$t('Global.address_info')}}</span>
                </template>
                <list :data="user" :loading="load" :only="['address', 'postal_code']"></list>
            </b-tab>
        </template>
    </show>
    </div>
    
    
</template>

<script>
    import {mapGetters} from "vuex";
    import show from "@/views/hr/components/show";
    import {BTab, BCardText, BCard, BCol, BRow} from 'bootstrap-vue'
    import List from "@/views/components/info/list";
    import {getAuth} from "@/auth/utils";

    export default {
        name: "user",
        components: {show, BTab, BCardText, BCard, BCol, BRow, List},
        computed: {
            ...mapGetters({
                user: 'users/item',
                load: 'users/load',
            }),
            id() {
                return this.$route.params.id ? this.$route.params.id : this.authUser().id;
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {

                this.$store.dispatch('users/get', this.id);
            }
        }
    }
</script>

<style scoped>

</style>