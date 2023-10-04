<template>
    <div>
        <b-card no-body>
            <b-card-header class="pb-50">
                <h5>{{$t('Global.user_role')}}</h5>
            </b-card-header>
            <b-card-body>
                <b-row class="d-flex justify-content-between">
                    <div class="flex-fill mx-1">
                        <form ref="ruleForm">
                            <b-form-group>
                                <v-select required placeholder="Roles" multiple v-model="role"
                                          :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" label="name"
                                          :options="roles">
                                    <template #option="{ name }">
                                        <span> {{ name }}</span>
                                    </template>
                                                            <template #no-options>
                              {{ $t('noMatching') }}
                            </template>
                            </v-select>
                            </b-form-group>
                        </form>
                    </div>
                    <div>
                        <b-button @click="save" variant="primary">
                            <feather-icon icon="HomeIcon" class="mr-50"/>
                            <span class="align-middle">{{$t('Global.save')}}</span></b-button
                        >
                    </div>
                </b-row>
            </b-card-body>
        </b-card>
        <b-overlay :show="load" rounded="sm">
            <b-row>
                <b-col cols="12" class="mb-2" lg="4" md="6" v-for="(permissions, name) in permissionsGroups"
                       :key="name">
                    <b-card no-body class="mb-0">
                        <b-card-header class="pb-0">
                            <h5>{{ $t(`Global.${name}`) }}</h5>
                        </b-card-header>
                        <div class="m-2 d-flex flex-wrap">
                            <b-form-checkbox class="mx-1" v-if=""  :disabled="(userRolesPermissions.indexOf(id) !== -1)? disabled : !disabled" v-for="(permission, id) in permissions" :value="id" v-model="Permissions" plain :label="id" :key="id"> {{                                shortName(permission) }}</b-form-checkbox>
                        </div>
                    </b-card>
                </b-col>
            </b-row>
        </b-overlay>
    </div>
</template>

<script>
    import {
        BModal,
        BTable,
        VBModal,
        BPopover,
        BFormCheckbox,
        BFormGroup,
        BCardText,
        BCard,
        BRow,
        BCol,
        BFormInput,
        BButton,
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
    import ToastificationContent from '@core/components/toastification/ToastificationContent.vue';
    import vSelect from 'vue-select';
    import Ripple from 'vue-ripple-directive';
    import {mapGetters} from 'vuex';
    import Cookies from 'js-cookie';
    import {PlusIcon, DeleteIcon} from 'vue-feather-icons';

    export default {
        components: {
            BCard,
            BPopover,
            PlusIcon,
            vSelect,
            BModal,
            VBModal,
            DeleteIcon,
            BFormCheckbox,
            BCardText,
            BRow,
            BFormGroup,
            BCol,
            BOverlay,
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
        },
        directives: {
            'b-modal': VBModal,
            Ripple,
        },
        data() {
            return {
                Permissions: [],
                disabled: true,
                role: [],
                changed: true,
            };
        },
        computed: {
            ...mapGetters({
                permissionsGroups: 'roles/permissionsGroups',
                userRolesPermissions: 'roles/userRolesPermissions',
                roles: 'roles/roles',
                userRoles: 'roles/userRoles',
                total: 'roles/total',
                load: 'roles/rolesLoad',
            }),
        },
        mounted() {
            this.refresh();
        },
        methods: {
            shortName(name) {
                var nameArr = name.split(' ');
                return nameArr[0]
            },
            refresh() {
                this.$store.dispatch('roles/getRoles').then(_ => {
                    this.$store.dispatch('roles/getUserRolesPermissions', this.$route.params.id).then(response => {
                        this.role = this.userRoles.map(role => {
                            return {name: role};
                        });
                        this.Permissions.push(...this.$store.getters['roles/userRolesPermissions']);
                        this.Permissions.push(...this.$store.getters['roles/userPermissions']);
                    });
                });
            },
            save() {
                let direct_permission = this.Permissions.filter(permission => this.$store.getters['roles/userRolesPermissions'].indexOf(permission) === -1);
                let roles = this.role.map(role => {
                    if (role.name) {
                        return role.name;
                    } else {
                        return role;
                    }
                });
                this.$store
                    .dispatch('roles/updateUserRolesPermissions', {
                        id: this.$route.params.id,
                        data: { roles: roles, permissions: direct_permission },
                    })
                    .then(response => {
                        this.$store.dispatch('roles/getUserRolesPermissions', this.$route.params.id).then(response => {
                            // this.roles = this.$store.getters['roles/userRoles'];
                            this.Permissions = [];
                            this.Permissions.push(...this.$store.getters['roles/userRolesPermissions']);
                            this.Permissions.push(...this.$store.getters['roles/userPermissions']);
                            this.$swal({
                                icon: 'success',
                                title: this.$t('Global.Saved'),
                                showConfirmButton: false,
                                timer: 1500,
                            })

                        });
                    });
            },
        },
    };
</script>

<style lang="scss" scoped>
    .per-page-selector {
        width: 90px;
    }
</style>

<style lang="scss">
    @import '@core/scss/vue/libs/vue-select.scss';
</style>
