<template>
    <layout-vertical>
        <router-view/>
        <app-customizer v-if="showCustomizer" slot="customizer"/>
    </layout-vertical>
</template>

<script>
    import LayoutVertical from '@core/layouts/layout-vertical/LayoutVertical.vue';
    import AppCustomizer from '@core/layouts/components/app-customizer/AppCustomizer.vue';
    import {$themeConfig} from '@themeConfig';

    export default {
        components: {
            AppCustomizer,
            LayoutVertical,
        },
        data() {
            return {
                showCustomizer: $themeConfig.layout.customizer,
            };
        },
        watch: {
            // $route(to, from) {
            //     if (this.authUser() && this.authUser().id) {
            //         this.$store.dispatch('roles/getAuthUserRolesPermissions', this.authUser().id);
            //         if(to.name && (to.name != from.name)){
            //             this.$store.commit('app/UPDATE_PAGE_DETAILS', null, {root: true});
            //         }
            //     }
            // },
        },
        mounted() {
            // if (this.authUser() && this.authUser().id) {
            //     this.$store.dispatch('roles/getAuthUserRolesPermissions', this.authUser().id);
            // }
        }

    };
</script>

<style>
    .main-menu.menu-light .navigation .navigation-header span {
        font-weight: 700;
        font-size: 1rem;
        color: #19680f;
    }
    .main-menu.menu-light .navigation > li ul{
        position: relative;
    }
</style>
