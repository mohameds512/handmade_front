<template>
    <div class="main_ecb_wrapper">
        <!-- //// Start Project Details  -->

        <b-tabs vertical nav-wrapper-class="nav-hidden" align="left" v-model="tabIndex">

    <b-tab>
        <template #title>
            <span>بيانات عامة للمشروع </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form v-if="this.hide == true">
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">بيانات عامة للمشروع</h3>
                                    </b-col>

                                    <b-col md="1"></b-col>

                                    <b-col class="d-flex justify-content-center" md="8">
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="اسم المشروع">
                                            <validation-provider #default="{ errors }" name="اسم المشروع"
                                                rules="required">
                                                <b-form-input v-model="project.project_name"
                                                    :state="errors.length > 0 ? false : null"
                                                    placeholder="اسم المشروع" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="المالك">
                                            <validation-provider #default="{ errors }" name="المالك"
                                                rules="required">
                                                <b-form-input v-model="project.owner"
                                                    :state="errors.length > 0 ? false : null"
                                                    placeholder="المالك" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="تاريخ بداية  المشروع">
                                            <validation-provider #default="{ errors }"
                                                name="تاريخ بداية  المشروع" rules="required">
                                                <b-form-datepicker v-model="project.start_date"
                                                    :state="errors.length > 0 ? false : null"
                                                    label-no-date-selected="تاريخ بداية  المشروع" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="تاريخ انتهاء  المشروع">
                                            <validation-provider #default="{ errors }"
                                                name="تاريخ انتهاء المشروع" rules="required">
                                                <b-form-datepicker v-model="project.end_date"
                                                    :state="errors.length > 0 ? false : null"
                                                    label-no-date-selected="تاريخ انتهاء المشروع" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="تاريخ انتهاء المعدل للمشروع">
                                            <validation-provider #default="{ errors }"
                                                name="تاريخ انتهاء المعدل للمشروع" rules="required">
                                                <b-form-datepicker v-model="project.modified_end_date"
                                                    :state="errors.length > 0 ? false : null"
                                                    label-no-date-selected="تاريخ انتهاء المعدل المشروع" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="تاريخ الانتهاء المتوقع للمشروع">
                                            <validation-provider #default="{ errors }"
                                                name="تاريخ الانتهاء المتوقع للمشروع" rules="required">
                                                <b-form-datepicker v-model="project.expected_end_date"
                                                    :state="errors.length > 0 ? false : null"
                                                    label-no-date-selected="تاريخ الانتهاء المتوقع المشروع" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="قيمة العقود">
                                            <validation-provider #default="{ errors }" name="قيمة العقود"
                                                rules="required">
                                                <b-form-input v-model="project.contract_amount"
                                                    :state="errors.length > 0 ? false : null"
                                                    placeholder="قيمة العقود" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="مدة العقد">
                                            <validation-provider #default="{ errors }" name="مدة العقد"
                                                rules="required">
                                                <b-form-input v-model="project.contract_duration"
                                                    :state="errors.length > 0 ? false : null"
                                                    placeholder="مدة العقد" type="number" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col md="6">
                                        <b-form-group class="text-right" label="قيمة الاعمال الاضافية">
                                            <validation-provider #default="{ errors }"
                                                name="قيمة الاعمال الاضافية" rules="required">
                                                <b-form-input v-model="project.extra_work_amount"
                                                    :state="errors.length > 0 ? false : null"
                                                    placeholder="قيمة الاعمال الاضافية" />
                                                <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                    مطلوب</small>
                                            </validation-provider>
                                        </b-form-group>
                                    </b-col>

                                    <b-col cols="12 text-right pt-2">
                                        <b-button variant="primary" type="submit"
                                            @click.prevent="submitAddProjectForm">
                                            حفظ
                                        </b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> القطاعات </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">القطاعات</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_division(null)">اضافة قطاع
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modall" id="ddd"
                                                v-model="levelModal2" hide-footer title="divisions">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="division.name"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="القطاع" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitDivision()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal2 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="division_list" :fields="[
                        { key: 'name', label: 'اسم القطاع' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_division(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>

                                    <b-col cols="12 text-right pt-2"></b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> المخطط الرئيسى </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2"> المخطط الرئيسى </h3>


                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_plan_images(null)">تحديث المخطط الرئيسى
                                            </b-button>
                                        </div>


                                        <br />
                                        <div>
                                            <b-modal ref="my-modal" id="ddmd" v-model="levelModal_2" hide-footer
                                                :title="$t('Global.level')">


                                                <div class="demo-vertical-spacing mb-5">
                                                    <b-form-group label="القطاع" class="text-right">
                                                        <validation-provider #default="{ errors }"
                                                            name="divisions" rules="">
                                                            <v-select :options="list_contractors.divisions"
                                                                :dir="
                                                $store.state.appConfig.layout.isRTL
                                                ? 'rtl'
                                                : 'ltr'
                                            " v-model="plan_images_division_id" :reduce="(val) => val.id">
                                                                <template v-slot:option="option">
                                                                    {{ option.name }}
                                                                </template>
                                                                <template #selected-option="{
                                name,
                                name_local,
                                label,
                            }">
                                                                    <div style="
                                display: flex;
                                align-items: baseline;
                                ">
                                                                        <strong v-if="$i18n.locale == 'ar'">{{
                                                                            name_local || label
                                                                            }}</strong>
                                                                        <strong v-else>{{
                                                                            name || label
                                                                            }}</strong>
                                                                    </div>
                                                                </template>
                                                                <template #no-options>
                                                                    {{ $t('noMatching') }}
                                                                </template>
                                                            </v-select>
                                                            <small v-if="errors.length" class="text-danger">{{
                                                                validation(null, 0).message }}</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label="  المخطط الرئيسى   ">
                                                        <input type="file" name="image"
                                                            accept="image/apng, image/jpeg, image/png, image/webp"
                                                            @input="previewFilesPlan()" ref="myFilesPlan"
                                                            multiple />
                                                    </b-form-group>
                                                </div>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitPlanImg()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal_2= false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>


                                            <b-row>
                                                <b-col md="4" v-if="$store.getters['ecb_forms/gallery']"
                                                    v-for="(img , index) in $store.getters['ecb_forms/gallery'].plan_images"
                                                    :key="index">

                                                    <img :src="img.img" style="max-width: 200px" />
                                                </b-col>
                                            </b-row>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> المقاولين </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">المقاولين</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit(null)">اضافة مقاول</b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal" hide-footer>
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="contractor.name"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="المقاول" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitContractor()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table striped class="text-right" hover :items="contractor_list"
                                                :fields="[
                                                { key: 'name', label: 'اسم المقاول' },
                                                { key: 'action', label: ' تعديل' },
                                            ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> العقود </span>
        </template>
        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">العقود</h3>
                                    </b-col>
                                    <div class="d-flex justify-content-right">
                                        <b-button @click="edit_contracts(null)" class="mb-2 mr-2">اضافة عقد
                                        </b-button>
                                    </div>

                                    <br />
                                    <div>
                                        <b-modal hide-header-close ref="my-modal3" id="model3"
                                            v-model="levelModal30" hide-footer title=" العقود" size="lg">
                                            <div class="demo-vertical-spacing">
                                                <b-form-group label="بيان الأعمال">
                                                    <validation-provider #default="{ errors }" name="divisions"
                                                        rules="">

                                                        <v-select :options="work_statements_work" :dir="
                            $store.state.appConfig.layout.isRTL
                                ? 'rtl'
                                : 'ltr'
                            " v-model="contracts.work_statement_id" :reduce="(val) => val.id">
                                                            <template v-slot:option="option">
                                                                {{ option.name }}
                                                            </template>
                                                            <template #selected-option="{
                                name,

                            }">
                                                                <div style="
                                display: flex;
                                align-items: baseline;
                                ">
                                                                    {{name}}
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                        <small v-if="errors.length" class="text-danger">{{
                                                            validation(null, 0).message }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group label="المقاول">
                                                    <validation-provider #default="{ errors }"
                                                        name="contractors" rules="">
                                                        <v-select :options="list_contractors.contractors" :dir="
                            $store.state.appConfig.layout.isRTL
                                ? 'rtl'
                                : 'ltr'
                            " v-model="contracts.contractor_id" :reduce="(val) => val.id">
                                                            <template v-slot:option="option">
                                                                {{ option.name }}
                                                            </template>
                                                            <template #selected-option="{
                                name,
                                name_local,
                                label,
                            }">
                                                                <div style="
                                display: flex;
                                align-items: baseline;
                                ">
                                                                    <strong v-if="$i18n.locale == 'ar'">{{
                                                                        name_local || label
                                                                        }}</strong>
                                                                    <strong v-else>{{
                                                                        name || label
                                                                        }}</strong>
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                        <small v-if="errors.length" class="text-danger">{{
                                                            validation(null, 0).message }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group label="القطاع">
                                                    <validation-provider #default="{ errors }" name="divisions"
                                                        rules="">
                                                        <v-select :options="list_contractors.divisions" :dir="
                                                            $store.state.appConfig.layout.isRTL
                                                            ? 'rtl'
                                                            : 'ltr'
                                                        " v-model="contracts.division_id" :reduce="(val) => val.id">
                                                                                        <template v-slot:option="option">
                                                                                            {{ option.name }}
                                                                                        </template>
                                                                                        <template #selected-option="{
                                                            name,
                                                            name_local,
                                                            label,
                                                        }">
                                                                                            <div style="
                                                            display: flex;
                                                            align-items: baseline;
                                                            ">
                                                                    <strong v-if="$i18n.locale == 'ar'">{{
                                                                        name_local || label
                                                                        }}</strong>
                                                                    <strong v-else>{{
                                                                        name || label
                                                                        }}</strong>
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                        <small v-if="errors.length" class="text-danger">{{
                                                            validation(null, 0).message }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="رقم العقد">
                                                    <validation-provider #default="{ errors }" name="رقم العقد"
                                                        rules="required">
                                                        <b-form-input v-model="contracts.contract_number"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="رقم العقد" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="قيمة العقد">
                                                    <validation-provider #default="{ errors }" name="قيمة العقد"
                                                        rules="required">
                                                        <b-form-input v-model="contracts.contract_amount"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="قيمة العقد" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>


                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="مدة العقد">
                                                    <validation-provider #default="{ errors }" name="مدة العقد"
                                                        rules="required">
                                                        <b-form-input v-model="contracts.contract_duration"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="مدة العقد" type="number" />
                                                        <small class="text-danger" v-if="errors[0] ">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>


                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="قيمة الاعمال الاضافية ">
                                                    <validation-provider #default="{ errors }"
                                                        name="قيمة الاعمال الاضافية " rules="required">
                                                        <b-form-input v-model="contracts.extra_work_amount"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="قيمة الاعمال الاضافية "
                                                            type="number" />
                                                        <small class="text-danger" v-if="errors[0] ">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <!-- <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="اسم النشاط ">
                                                    <validation-provider #default="{ errors }"
                                                        name="اسم النشاط " rules="required">
                                                        <b-form-tags input-id="tags-basic"
                                                            v-model="contracts.activity_name"></b-form-tags>

                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div> -->

<p>{{contracts.activity_look_up}}</p>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group label="الأنشطة">
                                                    <validation-provider #default="{ errors }" name="activity_look_up"
                                                        rules="">
                                                        <v-select multiple :options="list_contractors.activity_look_up" :dir="
                                                            $store.state.appConfig.layout.isRTL
                                                            ? 'rtl'
                                                            : 'ltr'
                                                        " v-model="contracts.activity_look_up" :reduce="(val) => val.id">
                                                                                        <template v-slot:option="option">
                                                                                            {{ option.activity_name }}
                                                                                        </template>
                                                                                        <template #selected-option="{
                                                                                            activity_name
                                                        }">
                                                                                            <div style="
                                                            display: flex;
                                                            align-items: baseline;
                                                            ">
                                                                    {{activity_name}}
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                        <small v-if="errors.length" class="text-danger">{{
                                                            validation(null, 0).message }}</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>

                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="الاستشاري   ">
                                                    <validation-provider #default="{ errors }" name="الاستشاري "
                                                        rules="required">
                                                        <b-form-input v-model="contracts.consultant"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="الاستشاري" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label=" تخصصه  ">
                                                    <validation-provider #default="{ errors }" name="تخصصه "
                                                        rules="required">
                                                        <b-form-input v-model="contracts.specialization"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="تخصصه" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right" label="تاريخ بداية العقد   ">
                                                    <validation-provider #default="{ errors }"
                                                        name="تاريخ بداية العقد   " rules="required">
                                                        <b-form-datepicker v-model="contracts.start_date"
                                                            :state="errors.length > 0 ? false : null"
                                                            label-no-date-selected="تاريخ بداية العقد  " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right"
                                                    label="  تاريخ انتهاء العقد   ">
                                                    <validation-provider #default="{ errors }"
                                                        name="  تاريخ انتهاء العقد   " rules="required">
                                                        <b-form-datepicker v-model="contracts.end_date"
                                                            :state="errors.length > 0 ? false : null"
                                                            label-no-date-selected="  تاريخ انتهاء العقد   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>

                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right"
                                                    label="تاريخ الانتهاء المعدل للعقد">
                                                    <validation-provider #default="{ errors }"
                                                        name="تاريخ الانتهاء المعدل للعقد" rules="required">
                                                        <b-form-datepicker v-model="contracts.modified_end_date"
                                                            :state="errors.length > 0 ? false : null"
                                                            label-no-date-selected="تاريخ الانتهاء المعدل للعقد" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing">
                                                <b-form-group class="text-right"
                                                    label="تاريخ الانتهاء المتوقع للعقد">
                                                    <validation-provider #default="{ errors }"
                                                        name="تاريخ الانتهاء المتوقع للعقد" rules="required">
                                                        <b-form-datepicker v-model="contracts.expected_end_date"
                                                            :state="errors.length > 0 ? false : null"
                                                            label-no-date-selected="تاريخ الانتهاء المتوقع للعقد" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>
                                            </div>
                                            <div class="demo-vertical-spacing"></div>
                                            <div class="demo-vertical-spacing"></div>

                                            <div class="mt-2">
                                                <b-col cols="12" md="12">
                                                    <div class="d-flex justify-content-end">
                                                        <b-button variant="primary" type="submit"
                                                            @click.prevent="SaveContract">
                                                            تأكيد
                                                        </b-button>
                                                        <b-button type="reset" variant="outline-primary"
                                                            @click="levelModal30 = false">
                                                            الغاء
                                                        </b-button>
                                                    </div>
                                                </b-col>
                                            </div>
                                        </b-modal>
                                    </div>

                                    <b-table style="max-width: 70% important!; position: relative"
                                        class="text-right border" bordered striped hover responsive
                                        :items="contract_list" :fields="[
                    { key: 'work_statements.name', label: 'اسم العقد ' },
                    { key: 'contract_number', label: 'رقم العقد ' },
                    { key: 'contract_amount', label: 'قيمة العقد ' },
                    { key: 'consultant', label: ' الاستشاري ' },
                    { key: 'specialization', label: '  تخصصه' },
                    { key: 'activities', label: 'النشاط' },
                    { key: 'contractor', label: 'المقاول' },
                    { key: 'divisions', label: 'القطاع' },
                    { key: 'contract_duration'  , label: ' مدة العقد' },
                    { key: 'extra_work_amount'  , label: ' قيمة الاعمال الاضافية' },
                    { key: 'start_date', label: ' التواريخ' },
                    { key: 'action', label: ' تعديل' },
                ]" dir="rtl">

                                        <!-- { key: 'end_date'  , label: ' تاريخ انتهاء العقد' },

                        { key: 'modified_end_date'  , label: ' تاريخ الانتهاء المعدل للعقد' } -->

                                        <template #cell(start_date)="data" style="font-size: 10px !important">
                                            <p style="font-size: 10px !important">
                                                <strong>تاريخ بداية العقد </strong> :
                                                {{ toLocalDatetime(data.item.start_date) }}
                                            </p>
                                            <p style="font-size: 10px !important">
                                                <strong>تاريخ انتهاء العقد </strong> :
                                                {{ toLocalDatetime(data.item.end_date) }}
                                            </p>
                                            <p style="font-size: 10px !important">
                                                <strong>تاريخ الانتهاء المتوقع للعقد </strong>:
                                                {{ toLocalDatetime(data.item.expected_end_date) }}
                                            </p>
                                            <p style="font-size: 10px !important">
                                                <strong>تاريخ الانتهاء المعدل للعقد </strong> :
                                                {{ toLocalDatetime(data.item.modified_end_date) }}
                                            </p>
                                        </template>

                                        <template #cell(action)="data">
                                            <feather-icon @click="edit_contracts(data.item)" size="16"
                                                icon="EditIcon" class="m-0 plus_icon" />
                                        </template>

                                        <template #cell(activities)="data">
                                            <div v-for="(activity, index) in data.item.activities" :key="index">
                                                <p v-if="activity.activitylookup">{{ activity.activitylookup.activity_name }}</p>
                                            </div>
                                        </template>

                                        <template #cell(divisions)="data">
                                            <p>{{ data.item.divisions.name }}</p>
                                            <!-- <div v-for=" (div,index) in  data.item.disivion" :key="index">
                        <p>{{div.name}}</p>
                    </div> -->
                                        </template>

                                        <template #cell(contractor)="data">
                                            <p>{{ data.item.contractor.name }}</p>

                                        </template>

                                        <template #cell(work)="data">
                                            <p>{{ data.item.work_statements.name }}</p>

                                        </template>
                                        <!--
<template #cell(activity)="data">
                    <p></p>
                        -->
                                    </b-table>

                                    <!-- End Submit Button  -->
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> بيان الأعمال </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">بيان الاعمال</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_work_statement(null)">اضافة بيان الاعمال
                                            </b-button>

                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal3" id="model3"
                                                v-model="levelModal4" hide-footer title="بيان الاعمال">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="work_statement.name"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="بيان الاعمال" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitWorkStatement()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal4 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="work_statements_work" :fields="[
                        { key: 'name', label: 'بيان الاعمال ' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_work_statement(data.item)"
                                                        size="16" icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>

                                    <b-col cols="12 text-right pt-2"></b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
            <template #title>
                <span> الاستشاريين </span>
            </template>

            <b-row>
                <b-col cols="12">
                    <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                        rounded="sm">
                        <div class="add_project_details_wrapper">
                            <validation-observer ref="addProjectRules">
                                <b-form>
                                    <b-row class="bg-white pt-2 pb-2">
                                        <b-col md="12">
                                            <h3 class="text-center pb-2">الاستشاريين</h3>

                                            <b-col class="d-flex justify-content-center" md="12">
                                            </b-col>

                                            <div class="d-flex justify-content-right">
                                                <b-button @click="edit_consultant(null)">اضافة استشارى
                                                </b-button>
                                            </div>

                                            <br />
                                            <div>
                                                <b-modal hide-header-close ref="my-modal3" id="model3"
                                                    v-model="levelModal3" hide-footer title="الاستشاريين">
                                                    <div class="demo-vertical-spacing">
                                                        <b-form-group class="text-right">
                                                            <validation-provider #default="{ errors }"
                                                                rules="required">
                                                                <b-form-input v-model="consultant.name"
                                                                    :state="errors.length > 0 ? false : null"
                                                                    placeholder="الاستشارى" />
                                                                <small class="text-danger" v-if="errors[0]">هذا
                                                                    الحقل مطلوب</small>
                                                            </validation-provider>
                                                        </b-form-group>
                                                    </div>
                                                    <div class="mt-2">
                                                        <b-col cols="12" md="12">
                                                            <div class="d-flex justify-content-end">
                                                                <b-button type="submit" variant="primary"
                                                                    class="mr-1" @click="submitConsultant()">
                                                                    تأكيد
                                                                </b-button>
                                                                <b-button type="reset" variant="outline-primary"
                                                                    @click="levelModal3 = false">
                                                                    الغاء
                                                                </b-button>
                                                            </div>
                                                        </b-col>
                                                    </div>
                                                </b-modal>

                                                <!-- @click="edit(data.item)" -->
                                                <b-table class="text-right border" bordered striped hover
                                                    :items="consultant_list" :fields="[
                            { key: 'name', label: 'اسم الاستشارى' },
                            { key: 'action', label: ' تعديل' },
                        ]" dir="rtl">
                                                    <template #cell(action)="data">
                                                        <feather-icon @click="edit_consultant(data.item)" size="16"
                                                            icon="EditIcon" class="m-0 plus_icon" />
                                                    </template>
                                                </b-table>
                                            </div>
                                        </b-col>

                                        <b-col cols="12 text-right pt-2"></b-col>
                                    </b-row>
                                </b-form>
                            </validation-observer>
                        </div>
                    </b-overlay>
                </b-col>
            </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> التخصصات </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">التخصصات</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_specialization(null)">اضافة تخصص
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal3" id="model3"
                                                v-model="levelModal5" hide-footer title="التخصصات ">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="specialization.name"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder=" التخصصات" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitSpecialization()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal5 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="specialization_list" :fields="[
                        { key: 'name', label: ' التخصص' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_specialization(data.item)"
                                                        size="16" icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>

                                    <b-col cols="12 text-right pt-2"></b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> مؤشرات القيمة المكتسبة </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">مؤشرات القيمة المكتسبة</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_earned_value(null)">اضافة مؤشرات القيمة
                                                المكتسبة
                                            </b-button>
                                        </div>


                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal12" hide-footer :title="$t('Global.level')">
                                                <!-- <b-form-group class="text-right"> -->


                                                <b-form-group label="بيان الأعمال" class="text-right">
                                                    <v-select :options="list_contractors.work_statements" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="earned_value.work_statement_id" :reduce="(val) => val.work_statement_id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group class="text-right" label=" القيمة المكتسبة">
                                                    <validation-provider #default="{ errors }"
                                                        name=" القيمة المكتسبة" rules="required">
                                                        <b-form-input v-model="earned_value.earned_value"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder=" القيمة المكتسبة" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="القيمة المخططة">
                                                    <validation-provider #default="{ errors }"
                                                        name="القيمة المخططة" rules="required">
                                                        <b-form-input v-model="earned_value.planned_value"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="القيمة المخططة" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  القيمة الفعلية ">
                                                    <validation-provider #default="{ errors }"
                                                        name="  القيمة الفعلية " rules="required">
                                                        <b-form-input v-model="earned_value.actual_value"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="  القيمة الفعلية " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitEarnedValue()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal12 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table striped hover :items="earned_value_list" :fields="[
                        { key: 'work_statement_id', label: 'العقد ' },

                        {
                        key: 'earned_value',
                        label: '  القيمة المكتسبة ',
                        },
                        {
                        key: 'planned_value',
                        label: ' القيمة المخططة ',
                        },
                        {
                        key: 'actual_value',
                        label: ' القيمة الفعلية ',
                        },

                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_earned_value(data.item)"
                                                        size="16" icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> التدفقات النقدية </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">التدفقات النقدية</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_cash_flow(null)">اضافة التدفقات النقدية
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal23" hide-footer :title="$t('Global.level')">

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group label="العقد" class="text-right">
                                                        <v-select
                                                            :options="list_contractors.work_statements_lookup"
                                                            :dir="
                            $store.state.appConfig.layout.isRTL
                                ? 'rtl'
                                : 'ltr'
                            " v-model="cash_flow.work_statement_id" :reduce="(val) => val.id">
                                                            <template v-slot:option="option">
                                                                {{ option.name }}
                                                            </template>
                                                            <template #selected-option="{
                                name,

                            }">
                                                                <div style="
                                display: flex;
                                align-items: baseline;
                                ">
                                                                    {{name}}
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                    </b-form-group>
                                                </div>


                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="الشهر ">
                                                        <validation-provider #default="{ errors }" name="الشهر "
                                                            rules="required">
                                                            <b-form-datepicker v-model="cash_flow.planned_month"
                                                                :state="errors.length > 0 ? false : null"
                                                                label-no-date-selected="الشهر" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>


                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="المخطط">
                                                        <validation-provider #default="{ errors }" name="المخطط"
                                                            rules="required">
                                                            <b-form-input v-model="cash_flow.planned"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="المخطط" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>


                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="الفعلي">
                                                        <validation-provider #default="{ errors }" name="الفعلي"
                                                            rules="required">
                                                            <b-form-input v-model="cash_flow.actual"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="الفعلي" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="ما تم صرفه">
                                                        <validation-provider #default="{ errors }"
                                                            name="ما تم صرفه" rules="required">
                                                            <b-form-input v-model="cash_flow.spent"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="ما تم صرفه" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <!-- <div class="demo-vertical-spacing">
                        <b-form-group
                        class="text-right"
                        label="الشهر للفعلى"
                        >
                        <validation-provider
                            #default="{ errors }"
                            name="الشهر للفعلى"
                            rules="required"
                        >
                            <b-form-datepicker
                            v-model="cash_flow.actual_month"
                            :state="errors.length > 0 ? false : null"
                            label-no-date-selected="الشهر"
                            />


                            <small class="text-danger" v-if="errors[0]"
                            >هذا الحقل مطلوب</small
                            >
                        </validation-provider>
                        </b-form-group>
                    </div> -->

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitCashFlow()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal23 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="cash_flow_list" :fields="[
                        { key: 'work_statement_id', label: '  العقد  ' },

                        { key: 'planned', label: '   المخطط ' },
                        {
                        key: 'planned_month',
                        label: 'الشهر ',
                        },
                        { key: 'actual', label: '   الفعلي ' },
                        { key: 'spent', label: '   ما تم صرفه ' },


                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_cash_flow(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>

                                                <template #cell(planned_month)="data">
                                                    {{toLocalDatetime(data.item.planned_month)}}
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> المعدات </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">المعدات</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_equipment(null)">اضافة معدة
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal7" hide-footer :title="$t('Global.level')">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="اسم المعدة">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input dir="rtl"
                                                                v-model="equipment.equipment_name"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="اسم المعدة" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label=" وحدة العمل ">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input dir="rtl" v-model="equipment.unit"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder=" وحدة العمل " />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label=" الانتاجية في اليوم  ">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input dir="rtl" v-model="
                                equipment.planned_quantity_for_equipment
                            " :state="errors.length > 0 ? false : null"
                                                                placeholder="    الانتاجية في اليوم  " />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitEquipment()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal7 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="equipment_list" :fields="[
                        { key: 'equipment_name', label: 'اسم المعدة' },
                        {
                        key: 'planned_quantity_for_equipment',
                        label: 'الانتاجية فى اليوم ',
                        },
                        { key: 'unit', label: 'وحدة العمل ' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_equipment(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> العمالة </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">العمالة</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_man_power_category(null)">اضافة العمالة
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal9" hide-footer :title="$t('Global.level')">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="نوع العمالة">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input
                                                                v-model="man_power_category.labor_type"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="نوع العمالة " />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label="  الانتاجية في اليوم">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="
                                man_power_category.productivity_per_day
                            " :state="errors.length > 0 ? false : null" placeholder="  الانتاجية في اليوم" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="وحدة العمل">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required" label="وحدة العمل">
                                                            <b-form-input v-model="man_power_category.unit"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="    وحدة العمل" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitManPowerCategory()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal9 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <b-table class="text-right border" bordered striped hover
                                                :items="man_power_category_list" :fields="[
                        { key: 'labor_type', label: 'نوع العمالة ' },
                        {
                        key: 'productivity_per_day',
                        label: ' الانتاجية في اليوم  ',
                        },
                        { key: 'unit', label: ' وحدة العمل ' },

                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_man_power_category(data.item)"
                                                        size="16" icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> الخامات </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">الخامات</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="editRawMaterial(null)">اضافة خامة
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal6" hide-footer :title="$t('Global.level')">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="اسم الخامة">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input dir="rtl" v-model="raw_material.name"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="اسم الخامة" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="وحدة الخامة">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input dir="rtl" v-model="raw_material.unit"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="وحدة الخامة" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitRawMaterial()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal6 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="raw_material_list" :fields="[
                        { key: 'name', label: 'اسم الخامة' },
                        { key: 'unit', label: 'وحدة الخامة ' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="editRawMaterial(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> طلبات الفحص </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">طلبات الفحص</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_check_request(null)">اضافة طلبات الفحص
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal13" hide-footer :title="$t('Global.level')">
                                                <!-- <b-form-group class="text-right"> -->
                                                <b-form-group label="العقد" class="text-right">
                                                    <v-select :options="list_contractors.work_statements" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="check_request.work_statement_id" :reduce="(val) => val.work_statement_id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group label=" التخصص" class="text-right">
                                                    <v-select :options="list_contractors.specializations" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="check_request.specialization_id" :reduce="(val) => val.id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الموافق عليه">
                                                    <validation-provider #default="{ errors }"
                                                        name="  الموافق عليه" rules="required">
                                                        <b-form-input v-model="check_request.approval"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="  الموافق عليه" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label=" المرفوض">
                                                    <validation-provider #default="{ errors }" name=" المرفوض"
                                                        rules="required">
                                                        <b-form-input v-model="check_request.rejection"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder=" المرفوض" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="   المعلق ">
                                                    <validation-provider #default="{ errors }" name="   المعلق "
                                                        rules="required">
                                                        <b-form-input v-model="check_request.pending"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   المعلق " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitCheckRequest()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal13 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="check_request_list" :fields="[
                        { key: 'work_statement_id', label: ' العقد ' },

                        { key: 'approval', label: 'الموافق عليه ' },
                        { key: 'pending', label: ' المعلق' },
                        { key: 'rejection', label: '  المرفوض ' },
                        { key: 'specialization_id', label: 'التخصص' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_check_request(data.item)"
                                                        size="16" icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> الرسومات التشغيلية </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">الرسومات التشغيلية</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_operational_graphics(null)">اضافة الرسومات
                                                التشغيلية
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal14" hide-footer :title="$t('Global.level')">
                                                <!-- <b-form-group class="text-right"> -->

                                                <b-form-group label="العقد" class="text-right">
                                                    <v-select :options="list_contractors.work_statements_lookup"
                                                        :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="operational_graphics.work_statement_id" :reduce="(val) => val.id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group label=" التخصص" class="text-right">
                                                    <v-select :options="list_contractors.specializations" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="operational_graphics.specialization_id" :reduce="(val) => val.id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الموافق عليه">
                                                    <validation-provider #default="{ errors }"
                                                        name="  الموافق عليه" rules="required">
                                                        <b-form-input v-model="operational_graphics.approval"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="  الموافق عليه" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label=" المرفوض">
                                                    <validation-provider #default="{ errors }" name=" المرفوض"
                                                        rules="required">
                                                        <b-form-input v-model="operational_graphics.rejection"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder=" المرفوض" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="   المعلق ">
                                                    <validation-provider #default="{ errors }" name="   المعلق "
                                                        rules="required">
                                                        <b-form-input v-model="operational_graphics.pending"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   المعلق " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1"
                                                                @click="submitOperationalGraphics()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal14 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="operational_graphics_list" :fields="[
                        { key: 'work_statement_id', label: ' العقد ' },

                        { key: 'approval', label: 'الموافق عليه ' },
                        { key: 'pending', label: ' المعلق' },
                        { key: 'rejection', label: '  المرفوض ' },
                        { key: 'specialization_id', label: 'التخصص' },
                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_operational_graphics(data.item)"
                                                        size="16" icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> المعوقات وأهم المشكلات </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">المعوقات وأهم المشكلات</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_problems(null)">اضافة المشكلات
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal22" hide-footer :title="$t('Global.level')">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group label="العقد" class="text-right">
                                                        <v-select :options="list_contractors.work_statements"
                                                            :dir="
                            $store.state.appConfig.layout.isRTL
                                ? 'rtl'
                                : 'ltr'
                            " v-model="problems.work_statement_id" :reduce="(val) => val.work_statement_id">
                                                            <template v-slot:option="option">
                                                                {{ option.name }}
                                                            </template>
                                                            <template #selected-option="{
                                name,
                                name_local,
                                label,
                            }">
                                                                <div style="
                                display: flex;
                                align-items: baseline;
                                ">
                                                                    <strong v-if="$i18n.locale == 'ar'">{{
                                                                        name_local || label
                                                                        }}</strong>
                                                                    <strong v-else>{{
                                                                        name || label
                                                                        }}</strong>
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="المشاكل">
                                                        <validation-provider #default="{ errors }"
                                                            name="المشاكل" rules="required">
                                                            <b-form-input v-model="problems.problem"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="المشاكل" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitProblems()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal22 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="problems_list" :fields="[
                        { key: 'work_statement_id', label: '  العقد  ' },

                        { key: 'problem', label: '   المشكلة ' },

                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_problems(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> البرنامج الزمنى </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2"> البرنامج الزمنى</h3>


                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_periodic_program(null)">تحديث البرنامج الزمنى
                                            </b-button>
                                        </div>


                                        <br />
                                        <div>
                                            <b-modal ref="my-modal" id="ddmd" v-model="levelModal_1" hide-footer
                                                :title="$t('Global.level')">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label=" صورة البرنامج الزمنى  ">
                                                        <input type="file" name="image"
                                                            accept="image/apng, image/jpeg, image/png, image/webp"
                                                            @input="previewFilesProgram()" ref="myFilesProgram"
                                                            multiple />
                                                    </b-form-group>
                                                </div>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitProgramImg()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal_1= false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>


                                        </div>


                                        <b-row>
                                            <b-col md="4" v-if="$store.getters['ecb_forms/gallery']"
                                                v-for="(img , index) in $store.getters['ecb_forms/gallery'].periodic_program_gallery"
                                                :key="index">

                                                <img :src="img.img" style="max-width: 200px" />
                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> صور المشروع </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">صور المشروع</h3>


                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_project_img(null)">تحديث صور المشروع
                                            </b-button>
                                        </div>


                                        <br />
                                        <div>
                                            <b-modal ref="my-modal" id="ddmd" v-model="levelModal24" hide-footer
                                                :title="$t('Global.level')">


                                                <div class="demo-vertical-spacing mb-5">
                                                    <b-form-group label="العقد" class="text-right">
                                                        <validation-provider #default="{ errors }"
                                                            name="divisions" rules="">
                                                            <v-select
                                                                :options="list_contractors.work_statment_dropdown"
                                                                :dir="
                                                $store.state.appConfig.layout.isRTL
                                                ? 'rtl'
                                                : 'ltr'
                                            " v-model="project_images_contract_id"
                                                                :reduce="(val) => val.contract_id">
                                                                <template v-slot:option="option">
                                                                    {{ option.name }}
                                                                </template>
                                                                <template #selected-option="{
                                name,
                                name_local,
                                label,
                            }">
                                                                    <div style="
                                display: flex;
                                align-items: baseline;
                                ">
                                                                        <strong v-if="$i18n.locale == 'ar'">{{
                                                                            name_local || label
                                                                            }}</strong>
                                                                        <strong v-else>{{
                                                                            name || label
                                                                            }}</strong>
                                                                    </div>
                                                                </template>
                                                                <template #no-options>
                                                                    {{ $t('noMatching') }}
                                                                </template>
                                                            </v-select>
                                                            <small v-if="errors.length" class="text-danger">{{
                                                                validation(null, 0).message }}</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label=" صورة المشروع   ">
                                                        <input type="file" name="image"
                                                            accept="image/apng, image/jpeg, image/png, image/webp"
                                                            @input="previewFilesProject()"
                                                            ref="myFilesProject" />
                                                    </b-form-group>
                                                </div>


                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="الوصف">
                                                        <validation-provider #default="{ errors }" name="الوصف"
                                                            rules="required">
                                                            <b-form-input v-model="image_label"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="الوصف" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>






                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitProjectImg()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal24 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>


                                        </div>
                                        <b-row>
                                            <b-col md="4" v-if="$store.getters['ecb_forms/gallery']"
                                                v-for="(img , index) in $store.getters['ecb_forms/gallery'].project_gallery"
                                                :key="index">

                                                <img :src="img.img" style="max-width: 200px" />
                                                <p>{{img.image_label}}</p>

                                            </b-col>
                                        </b-row>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> الانشطة</span>
        </template>
        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">الانشطة</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <!-- <b-button @click="edit_activity(null)"
                    >اضافة نشاط</b-button -->

                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal8" hide-footer :title="$t('Global.level')">
                                                <!-- <b-form-group class="text-right"> -->

                                                <b-form-group label="بيان الأعمال" class="text-right">
                                                    <v-select disabled="true"
                                                        :options="list_contractors.work_statements" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="activity.contract_id" :reduce="(val) => val.contract_id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template #selected-option="{ name }">
                                                            <div style="display: flex; align-items: baseline">
                                                                {{ name }}
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group label="اسم النشاط " class="text-right">

                                                    <v-select disabled="true" :options="   filterActivities
" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="activity.activity_name" :reduce="(val) => val.activity_names">
                                                        <template v-slot:option="option">
                                                            {{ option.activity_names }}
                                                        </template>
                                                        <template #selected-option="{ activity_names }">
                                                            <div style="display: flex; align-items: baseline">
                                                                {{ activity_names }}
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>


                                                    <!-- <v-select
                        label="activity_names"
                        :options="filterActivities"
                        :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        "
                        v-model="activity.activity"
                        :reduce="(val) => val.activity_id"
                        >
                            <template v-slot:option="option">
                            {{ option.activity_names }}
                            {{ option.activity_id }}
                        </template>
                        <template
                            #selected-option="{ activity_names  }"
                        >
                            <div
                            style="display: flex; align-items: baseline"
                            >
                            {{ activity_names }}
                            </div>
                        </template>
                        <template #no-options>
                            {{ $t("noMatching") }}
                        </template>
                        </v-select> -->
                                                </b-form-group>

                                                <b-form-group class="text-right"
                                                    label=" المخطط   خلال الفترة  ">
                                                    <validation-provider #default="{ errors }"
                                                        name=" المخطط   خلال الفترة  " rules="required">
                                                        <b-form-input v-model="activity.planned_this_period"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder=" المخطط   خلال الفترة  " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="نسبة الانجاز الفعلي ">
                                                    <validation-provider #default="{ errors }"
                                                        name="نسبة الانجاز الفعلي " rules="required">
                                                        <b-form-input
                                                            v-model="activity.actual_progress_percentage"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder=" المخطط   خلال الفترة  " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  نسبة الانجاز المخطط ">
                                                    <validation-provider #default="{ errors }"
                                                        name="  نسبة الانجاز المخطط " rules="required">
                                                        <b-form-input
                                                            v-model="activity.planned_progress_percentage"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder=" المخطط   خلال الفترة  " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الوحدة   ">
                                                    <validation-provider #default="{ errors }"
                                                        name="    الوحدة " rules="required">
                                                        <b-form-input v-model="activity.unit"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الوحدة   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الفئة   ">
                                                    <validation-provider #default="{ errors }" name="    الفئة "
                                                        rules="required">
                                                        <b-form-input v-model="activity.cost"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الفئة   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الكمية الاجمالية   ">
                                                    <validation-provider #default="{ errors }"
                                                        name="    الكمية الاجمالية " rules="required">
                                                        <b-form-input v-model="activity.total_quantity"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الكمية الاجمالية   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الوزن   ">
                                                    <validation-provider #default="{ errors }" name="    الوزن "
                                                        rules="required">
                                                        <b-form-input v-model="activity.weight"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الوزن   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="  الكمية المنفذة   ">
                                                    <validation-provider #default="{ errors }"
                                                        name="    الكمية المنفذة " rules="required">
                                                        <b-form-input v-model="activity.actual_quantity"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الكمية المنفذة   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label="تاريخ الانتهاء المتوقع ">
                                                        <validation-provider #default="{ errors }"
                                                            name="تاريخ الانتهاء المتوقع " rules="required">
                                                            <b-form-datepicker
                                                                v-model="activity.expected_end_date"
                                                                :state="errors.length > 0 ? false : null"
                                                                label-no-date-selected="تاريخ الانتهاء المتوقع " />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label="تاريخ الانتهاء المخطط ">
                                                        <validation-provider #default="{ errors }"
                                                            name="تاريخ الانتهاء المخطط " rules="required">
                                                            <b-form-datepicker
                                                                v-model="activity.planned_end_date"
                                                                :state="errors.length > 0 ? false : null"
                                                                label-no-date-selected="تاريخ الانتهاء المخطط " />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label="تاريخ البدء المخطط ">
                                                        <validation-provider #default="{ errors }"
                                                            name="تاريخ البدء المخطط " rules="required">
                                                            <b-form-datepicker
                                                                v-model="activity.planned_start_date"
                                                                :state="errors.length > 0 ? false : null"
                                                                label-no-date-selected="تاريخ البدء المخطط " />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitActivity()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal8 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->
                                            <b-table class="text-right border" bordered striped hover
                                                :items="activity_list" :fields="[
                        { key: 'activity_names', label: 'اسم النشاط' },
                        {
                        key: 'planned_this_period',
                        label: 'المخطط خلال الفترة ',
                        },
                        {
                        key: 'actual_progress_percentage',
                        label: ' نسبة الانجاز الفعلي',
                        },
                        {
                        key: 'planned_progress_percentage',
                        label: ' نسبة الانجاز المخطط',
                        },
                        {
                        key: 'expected_end_date',
                        label: ' تاريخ الانتهاء المتوقع  ',
                        },
                        {
                        key: 'planned_end_date',
                        label: ' تاريخ الانتهاء المخطط  ',
                        },

                        {
                        key: 'planned_start_date',
                        label: '   تاريخ البدأ المخطط  ',
                        },
                        { key: 'unit', label: '     الوحدة  ' },
                        { key: 'cost', label: '   الفئة    ' },
                        {
                        key: 'total_quantity',
                        label: '   الكمية الاجمالية    ',
                        },
                        { key: 'weight', label: '    الوزن    ' },
                        {
                        key: 'actual_quantity',
                        label: '    الكمية المنفذة    ',
                        },

                        { key: 'action', label: ' تعديل' },
                    ]" dir="rtl">
                                                <template #cell(action)="data">
                                                    <feather-icon @click="edit_activity(data.item)" size="16"
                                                        icon="EditIcon" class="m-0 plus_icon" />
                                                </template>
                                                <template #cell(expected_end_date)="data">
                                                    {{ toLocalDatetime(data.item.expected_end_date) }}
                                                    <!--                                                            {{data.item}}-->
                                                </template>

                                                <template #cell(planned_end_date)="data">
                                                    {{ toLocalDatetime(data.item.planned_end_date) }}
                                                </template>

                                                <template #cell(planned_start_date)="data">
                                                    {{
                                                    toLocalDatetime(data.item.planned_start_date)
                                                    }}
                                                </template>
                                            </b-table>
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> موقف تقدم الاعمال بالكمية </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">
                                            موقف تقدم الاعمال بالكمية
                                        </h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_work_progress(null)">اضافة موقف تقدم الاعمال
                                                بالكمية
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal11" hide-footer :title="$t('Global.level')">
                                                <!-- <b-form-group class="text-right"> -->
                                                <b-form-group label="بيان الأعمال" class="text-right">
                                                    <v-select :options="list_contractors.work_statements" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="work_progress.contract_id" :reduce="(val) => val.contract_id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t("noMatching") }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                            


                                                <b-form-group label="اسم النشاط " class="text-right">
                                                    <v-select :options="list_contractors.activities" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="work_progress.activity_id" :reduce="(val) => val.activity_id">
                                                        <template v-slot:option="option">
                                                            {{ option.activity_names }}
                                                        </template>
                                                        <template #selected-option="{ activity_names }">
                                                            <div style="display: flex; align-items: baseline">
                                                                {{ activity_names }}
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t("noMatching") }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group class="text-right"
                                                    label="  الكمية المخططة  خلال الشهر   ">
                                                    <validation-provider #default="{ errors }"
                                                        name="    الكمية المخططة  خلال الشهر " rules="required">
                                                        <b-form-input v-model="work_progress.planned_amount"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الكمية المخططة  خلال الشهر   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right"
                                                    label=" الكمية الفعلية خلال الشهر ">
                                                    <validation-provider #default="{ errors }"
                                                        name="  الكمية الفعلية خلال الشهر  " rules="required">
                                                        <b-form-input v-model="work_progress.actual_amount"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   الكمية المخططة  خلال الشهر   " />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="الشهر">
                                                    <validation-provider #default="{ errors }" name="الشهر"
                                                        rules="required">
                                                        <b-form-datepicker v-model="work_progress.month"
                                                            :state="errors.length > 0 ? false : null"
                                                            label-no-date-selected="الشهر" />

                

                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitWorkProgress()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal11 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <work-progress :work_progress="work_progress_list"
                                                @edit="edit_work_progress" />

                                            <!-- @click="edit(data.item)" -->
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> الانتاجية للمعدات </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">الانتاجية للمعدات</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_equipment_productivity(null)">اضافة الانتاجية
                                                للمعدات
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal15" hide-footer :title="$t('Global.level')">
                                                <!-- <b-form-group class="text-right"> -->

                                                <b-form-group label="العقد" class="text-right">
                                                    <v-select :options="list_contractors.work_statements" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="
                            equipment_productivity.work_statement_id
                        " :reduce="(val) => val.work_statement_id">
                                                        <template v-slot:option="option">
                                                            {{ option.name }}
                                                        </template>
                                                        <template
                                                            #selected-option="{ name, name_local, label }">
                                                            <div style="display: flex; align-items: baseline">
                                                                <strong v-if="$i18n.locale == 'ar'">{{
                                                                    name_local || label
                                                                    }}</strong>
                                                                <strong v-else>{{ name || label }}</strong>
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group label="المعدة" class="text-right">
                                                    <v-select :options="list_contractors.equipments" :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="equipment_productivity.equipment_id" :reduce="(val) => val.id">
                                                        <template v-slot:option="option">
                                                            {{ option.equipment_name }}
                                                        </template>
                                                        <template #selected-option="{ equipment_name }">
                                                            <div style="display: flex; align-items: baseline">
                                                                {{ equipment_name }}
                                                            </div>
                                                        </template>
                                                        <template #no-options>
                                                            {{ $t('noMatching') }}
                                                        </template>
                                                    </v-select>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="   متوسط فعلي">
                                                    <validation-provider #default="{ errors }"
                                                        name="   متوسط فعلي" rules="required">
                                                        <b-form-input
                                                            v-model="equipment_productivity.avg_actual"
                                                            :state="errors.length > 0 ? false : null"
                                                            placeholder="   متوسط فعلي" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <b-form-group class="text-right" label="التاريخ">
                                                    <validation-provider #default="{ errors }" name=" التاريخ"
                                                        rules="required">
                                                        <b-form-datepicker v-model="equipment_productivity.date"
                                                            :state="errors.length > 0 ? false : null"
                                                            label-no-date-selected="التاريخ" />
                                                        <small class="text-danger" v-if="errors[0]">هذا الحقل
                                                            مطلوب</small>
                                                    </validation-provider>
                                                </b-form-group>

                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1"
                                                                @click="submitEquipmentProductivity()">
                                                                تأكيد
                                                            </b-button>
                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal15 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <!-- @click="edit(data.item)" -->

                                            <equipment-productivity
                                                :equipment_productivity_list="equipment_productivity_list"
                                                @edit="edit_equipment_productivity" />
                                            <!--                                                    <b-table-->
                                            <!--                                                            class="text-right border"-->
                                            <!--                                                            bordered-->
                                            <!--                                                            striped-->
                                            <!--                                                            hover-->
                                            <!--                                                            :items="equipment_productivity_list"-->
                                            <!--                                                            :fields="[-->
                                            <!--                              { key: 'work_statement_id', label: ' العقد ' },-->
                                            <!--                              { key: 'equipment_id', label: 'نوع المعدة' },-->
                                            <!--                              {-->
                                            <!--                                key: 'avg_actual',-->
                                            <!--                                label: '  متوسط فعلي يومي ',-->
                                            <!--                              },-->
                                            <!--                              { key: 'date', label: '  التاريخ ' },-->

                                            <!--                              { key: 'action' },-->
                                            <!--                            ]"-->
                                            <!--                                                            dir="rtl"-->
                                            <!--                                                    >-->
                                            <!--                                                        <template #cell(action)="data">-->
                                            <!--                                                            <feather-icon-->
                                            <!--                                                                    @click="edit_equipment_productivity(data.item)"-->
                                            <!--                                                                    size="16"-->
                                            <!--                                                                    icon="EditIcon"-->
                                            <!--                                                                    class="m-0 plus_icon"-->
                                            <!--                                                            />-->
                                            <!--                                                        </template>-->

                                            <!--                                                        <template #cell(date)="data">-->
                                            <!--                                                            {{ toLocalDatetime(data.item.date) }}-->
                                            <!--                                                        </template>-->
                                            <!--                                                    </b-table>-->
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
        <template #title>
            <span> العمالة اليومية </span>
        </template>

        <b-row>
            <b-col cols="12">
                <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                    rounded="sm">
                    <div class="add_project_details_wrapper">
                        <validation-observer ref="addProjectRules">
                            <b-form>
                                <b-row class="bg-white pt-2 pb-2">
                                    <b-col md="12">
                                        <h3 class="text-center pb-2">العمالة اليومية</h3>

                                        <b-col class="d-flex justify-content-center" md="12">
                                        </b-col>

                                        <div class="d-flex justify-content-right">
                                            <b-button @click="edit_man_power(null)">اضافة العمالة
                                            </b-button>
                                        </div>

                                        <br />
                                        <div>
                                            <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                v-model="levelModal20" hide-footer :title="$t('Global.level')">
                                                <div class="demo-vertical-spacing">
                                                    <b-form-group label="العقد" class="text-right">
                                                        <v-select :options="list_contractors.work_statements"
                                                            :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="man_power.contract_id" :reduce="(val) => val.id">
                                                            <template v-slot:option="option">
                                                                {{ option.name }}
                                                            </template>
                                                            <template #selected-option="{
                            name,
                            name_local,
                            label,
                            }">
                                                                <div style="
                                display: flex;
                                align-items: baseline;
                            ">
                                                                    <strong v-if="$i18n.locale == 'ar'">{{
                                                                        name_local || label
                                                                        }}</strong>
                                                                    <strong v-else>{{
                                                                        name || label
                                                                        }}</strong>
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <p>{{ man_power.category_id }}</p>

                                                    <b-form-group label="العمالة" class="text-right">
                                                        <v-select :options="
                            list_contractors.manpower_categories
                        " :dir="
                            $store.state.appConfig.layout.isRTL
                            ? 'rtl'
                            : 'ltr'
                        " v-model="man_power.category_id" :reduce="(val) => val.id">
                                                            <template v-slot:option="option">
                                                                {{ option.labor_type }}
                                                            </template>
                                                            <template #selected-option="{ labor_type }">
                                                                <div style="
                                display: flex;
                                align-items: baseline;
                            ">
                                                                    {{ labor_type }}
                                                                </div>
                                                            </template>
                                                            <template #no-options>
                                                                {{ $t('noMatching') }}
                                                            </template>
                                                        </v-select>
                                                    </b-form-group>
                                                </div>

                                                <br />

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right"
                                                        label="اعداد العمالة فى اليوم">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="man_power.daily_manpower"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder="اعداد العمالة فى اليوم" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="المخطط اليومى">
                                                        <validation-provider #default="{ errors }"
                                                            rules="required">
                                                            <b-form-input v-model="man_power.planned_daily"
                                                                :state="errors.length > 0 ? false : null"
                                                                placeholder=" المخطط اليومى" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <div class="demo-vertical-spacing">
                                                    <b-form-group class="text-right" label="التاريخ">
                                                        <validation-provider #default="{ errors }"
                                                            name=" التاريخ" rules="required">
                                                            <b-form-datepicker v-model="man_power.date"
                                                                :state="errors.length > 0 ? false : null"
                                                                label-no-date-selected="التاريخ" />
                                                            <small class="text-danger" v-if="errors[0]">هذا
                                                                الحقل مطلوب</small>
                                                        </validation-provider>
                                                    </b-form-group>
                                                </div>

                                                <!-- <div class="demo-vertical-spacing">
                    <b-form-group class="text-right" label="الشهر">
                    <validation-provider
                        #default="{ errors }"
                        name=" الشهر"
                        rules="required"

                    >
                        <b-form-datepicker
                        :date-format-options="{ 'year': 'numeric', 'month': 'long' }"
                        v-model="
                        man_power
                            .month
                        "
                        :state="errors.length > 0 ? false : null"
                        label-no-date-selected="الشهر"
                        />
                        <small class="text-danger" v-if="errors[0]"
                        >هذا الحقل مطلوب</small
                        >
                    </validation-provider>
                    </b-form-group>
                            </div> -->
                                                <div class="mt-2">
                                                    <b-col cols="12" md="12">
                                                        <div class="d-flex justify-content-end">
                                                            <b-button type="submit" variant="primary"
                                                                class="mr-1" @click="submitManPower()">
                                                                تأكيد
                                                            </b-button>

                                                            <b-button type="reset" variant="outline-primary"
                                                                @click="levelModal20 = false">
                                                                الغاء
                                                            </b-button>
                                                        </div>
                                                    </b-col>
                                                </div>
                                            </b-modal>

                                            <man-power :man_power_list="man_power_list" @edit="edit_man_power">
                                            </man-power>

                                        </div>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </validation-observer>
                    </div>
                </b-overlay>
            </b-col>
        </b-row>
    </b-tab>

    <b-tab>
                <template #title>
                    <span> توريدات الخامات الهامة / طويلة الامد </span>
                </template>

                <b-row>
                    <b-col cols="12">
                        <b-overlay variant="white" :show="load" spinner-variant="primary" blur="0" opacity=".75"
                            rounded="sm">
                            <div class="add_project_details_wrapper">
                                <validation-observer ref="addProjectRules">
                                    <b-form>
                                        <b-row class="bg-white pt-2 pb-2">
                                            <b-col md="12">
                                                <h3 class="text-center pb-2">
                                                    توريدات الخامات الهامة / طويلة الامد
                                                </h3>

                                                <b-col class="d-flex justify-content-center" md="12">
                                                </b-col>

                                                <div class="d-flex justify-content-right">
                                                    <b-button @click="edit_exports(null)">اضافة توريدات الخامات الهامة
                                                    </b-button>
                                                </div>

                                                <br />
                                                <div>
                                                    <b-modal hide-header-close ref="my-modal" id="ddmd"
                                                        v-model="levelModal21" hide-footer :title="$t('Global.level')">
                                                        <div class="demo-vertical-spacing">
                                                            <b-form-group label="العقد" class="text-right">
                                                                <v-select :options="list_contractors.work_statements"
                                                                    :dir="
                                    $store.state.appConfig.layout.isRTL
                                      ? 'rtl'
                                      : 'ltr'
                                  " v-model="exports.contract_id" :reduce="(val) => val.id">
                                                                    <template v-slot:option="option">
                                                                        {{ option.name }}
                                                                    </template>
                                                                    <template #selected-option="{
                                      name,
                                      name_local,
                                      label,
                                    }">
                                                                        <div style="
                                        display: flex;
                                        align-items: baseline;
                                      ">
                                                                            <strong v-if="$i18n.locale == 'ar'">{{
                                                                                name_local || label
                                                                                }}</strong>
                                                                            <strong v-else>{{
                                                                                name || label
                                                                                }}</strong>
                                                                        </div>
                                                                    </template>
                                                                    <template #no-options>
                                                                        {{ $t('noMatching') }}
                                                                    </template>
                                                                </v-select>
                                                            </b-form-group>
                                                        </div>

                                                        <div class="demo-vertical-spacing">
                                                            <b-form-group label="اسم الخامة" class="text-right">
                                                                <v-select :options="list_contractors.raw_materials"
                                                                    :dir="
                                    $store.state.appConfig.layout.isRTL
                                      ? 'rtl'
                                      : 'ltr'
                                  " v-model="exports.raw_material_id" :reduce="(val) => val.id">
                                                                    <template v-slot:option="option">
                                                                        {{ option.name }}
                                                                    </template>
                                                                    <template #selected-option="{
                                      name,
                                      name_local,
                                      label,
                                    }">
                                                                        <div style="
                                        display: flex;
                                        align-items: baseline;
                                      ">
                                                                            <strong v-if="$i18n.locale == 'ar'">{{
                                                                                name_local || label
                                                                                }}</strong>
                                                                            <strong v-else>{{
                                                                                name || label
                                                                                }}</strong>
                                                                        </div>
                                                                    </template>
                                                                    <template #no-options>
                                                                        {{ $t('noMatching') }}
                                                                    </template>
                                                                </v-select>
                                                            </b-form-group>
                                                        </div>

                                                        <div class="demo-vertical-spacing">
                                                            <b-form-group class="text-right" label="الفعلى">
                                                                <validation-provider #default="{ errors }" name="الفعلى"
                                                                    rules="required">
                                                                    <b-form-input v-model="exports.actual"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        placeholder="الفعلى" />
                                                                    <small class="text-danger" v-if="errors[0]">هذا
                                                                        الحقل مطلوب</small>
                                                                </validation-provider>
                                                            </b-form-group>
                                                        </div>

                                                        <div class="demo-vertical-spacing">
                                                            <b-form-group class="text-right" label="المخطط اليومي">
                                                                <validation-provider #default="{ errors }" name="المخطط"
                                                                    rules="required">
                                                                    <b-form-input v-model="exports.planned"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        placeholder="المخطط اليومي" />
                                                                    <small class="text-danger" v-if="errors[0]">هذا
                                                                        الحقل مطلوب</small>
                                                                </validation-provider>
                                                            </b-form-group>
                                                        </div>

                                                        <div class="demo-vertical-spacing">
                                                            <b-form-group class="text-right" label="التاريخ">
                                                                <validation-provider #default="{ errors }"
                                                                    name=" التاريخ" rules="required">
                                                                    <b-form-datepicker v-model="exports.date"
                                                                        :state="errors.length > 0 ? false : null"
                                                                        label-no-date-selected="التاريخ" />
                                                                    <small class="text-danger" v-if="errors[0]">هذا
                                                                        الحقل مطلوب</small>
                                                                </validation-provider>
                                                            </b-form-group>
                                                        </div>

                                                        <!-- <div class="demo-vertical-spacing">
                              <b-form-group class="text-right" label="الشهر">
                                <validation-provider
                                  #default="{ errors }"
                                  name=" الشهر"
                                  rules="required"
                                >
                                  <b-form-datepicker
                                    v-model="exports.month"
                                    :state="errors.length > 0 ? false : null"
                                    label-no-date-selected="الشهر"
                                  />
                                  <small class="text-danger" v-if="errors[0]"
                                    >هذا الحقل مطلوب</small
                                  >
                                </validation-provider>
                              </b-form-group>
                            </div> -->
                                                        <div class="mt-2">
                                                            <b-col cols="12" md="12">
                                                                <div class="d-flex justify-content-end">
                                                                    <b-button type="submit" variant="primary"
                                                                        class="mr-1" @click="submitExports()">
                                                                        تأكيد
                                                                    </b-button>
                                                                    <b-button type="reset" variant="outline-primary"
                                                                        @click="levelModal21 = false">
                                                                        الغاء
                                                                    </b-button>
                                                                </div>
                                                            </b-col>
                                                        </div>
                                                    </b-modal>

                                                    <exports :exports="exports_list" @edit="edit_exports" />

                                                    <!-- @click="edit(data.item)" -->
                                                    <!--                                                    <b-table-->
                                                    <!--                                                            class="text-right border"-->
                                                    <!--                                                            bordered-->
                                                    <!--                                                            striped-->
                                                    <!--                                                            hover-->
                                                    <!--                                                            :items="exports_list"-->
                                                    <!--                                                            :fields="[-->
                                                    <!--                              { key: 'contract_name', label: '   العقد ' },-->
                                                    <!--                              { key: 'name', label: '   الخامة ' },-->
                                                    <!--                              { key: 'actual', label: '  الفعلى اليومى ' },-->
                                                    <!--                              { key: 'planned', label: ' المخطط  اليومى ' },-->
                                                    <!--                              { key: 'date', label: 'التاريخ' },-->


                                                    <!--                              { key: 'action', label: ' تعديل' },-->
                                                    <!--                            ]"-->
                                                    <!--                                                            dir="rtl"-->
                                                    <!--                                                    >-->
                                                    <!--                                                        <template #cell(action)="data">-->
                                                    <!--                                                            <feather-icon-->
                                                    <!--                                                                    @click="edit_exports(data.item)"-->
                                                    <!--                                                                    size="16"-->
                                                    <!--                                                                    icon="EditIcon"-->
                                                    <!--                                                                    class="m-0 plus_icon"-->
                                                    <!--                                                            />-->
                                                    <!--                                                        </template>-->

                                                    <!--                                                        <template #cell(date)="data">-->
                                                    <!--                                                            {{toLocalDatetime(data.item.date) }}-->
                                                    <!--                                                        </template>-->
                                                    <!--                                                    </b-table>-->
                                                </div>
                                            </b-col>
                                        </b-row>
                                    </b-form>
                                </validation-observer>
                            </div>
                        </b-overlay>
                    </b-col>
                </b-row>
    </b-tab>

</b-tabs>

        <!----------------------////////////-------------/////////////--------///////------->
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import { ValidationProvider, ValidationObserver } from 'vee-validate'
    import { required, min_value } from '@validations'
    import vSelect from 'vue-select'
    import DataTable from '@/views/components/table/DataTable'
    import {
        // BOverlay,
        // https://ecb.dev.vero-cloud.com/api/
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
    } from 'bootstrap-vue'
    // import EquipmentProductivity from "@/views/dashboard/component/equipmentProductivity";
    // import Exports from "@/views/dashboard/component/exports";
    // import ManPower from "@/views/dashboard/component/manPower";
    // import WorkProgress from "@/views/dashboard/component/workProgress";

    export default {
        name: 'Add Project',
        data() {
            return {
                image_label: null,
                project_images_contract_id: null,
                plan_images: [],
                plan_images_division_id: null,
                levelModal: false,
                levelModal2: false,
                levelModal3: false,
                levelModal4: false,
                levelModal5: false,
                levelModal_2: false,
                levelModal6: false,
                levelModal7: false,
                levelModal8: false,
                levelModal9: false,
                levelModal11: false,
                levelModal12: false,
                levelModal13: false,
                levelModal14: false,
                levelModal15: false,
                levelModal20: false,
                levelModal21: false,
                levelModal22: false,
                levelModal23: false,
                levelModal24: false,
                levelModal30: false,
                levelModal_1: false,
                contractor_id: null,
                check_request_id: null,
                levelModal22: false,
                levelModal23: false,
                cash_flow_id: null,
                project_img_id: null,
                man_power_category_id: null,
                exports_id: null,
                man_power_id: null,
                earned_value_id: null,
                activity_id: null,
                problem_id: [],

                work_progress_id: null,
                equipment_id: null,
                equipment_productivity_id: null,
                raw_material_id: null,
                specialization_id: null,
                division_id: null,
                consultant_id: null,
                contract_id: null,
                work_statement_id: null,
                hide: true,
                projects1: [],
                contractor_list: [],
                project_images_list: [],
                contract_list: [],
                problems_list: [],
                cash_flow_list: [],
                check_request_list: [],
                operational_graphics_list: [],
                activity_list: [],
                exports_list: [],
                earned_value_list: [],
                man_power_category_list: [],
                man_power_list: [],
                raw_material_list: [],
                work_progress_list: [],
                equipment_list: [],
                equipment_productivity_list: [],
                specialization_list: [],
                consultant_list: [],
                division_list: [],
                work_statement_list: [],
                filePreview: null,
                tabIndex: 0,
                name: '',
                required,
                min_value,
                filter: { removed: 0 },

                contractor: {
                    name: null,
                    project_id: this.$route.params.id,
                },

                division: {
                    name: null,
                    project_id: this.$route.params.id,
                },
                problems: {
                    problem: null,
                    work_statement_id: null,
                },

                project_img: null,

                cash_flow: {
                    work_statement_id: null,
                    actual: null,
                    planned: null,
                    actual_month: null,
                    planned_month: null,
                    spent: null
                },

                man_power_category: {
                    labor_type: null,
                    productivity_per_day: null,
                    unit: null,
                    project_id: this.$route.params.id,
                },
                man_power: {
                    daily_manpower: null,
                    planned_daily: null,
                    month: null,
                    date: null,
                    category_id: null,
                    contract_id: null,
                    planned: null,
                },
                //// Hello
                activity: {
                    activity_name: null,
                    contract_id: null,

                    planned_this_period: null,
                    actual_progress_percentage: null,
                    planned_progress_percentage: null,
                    expected_end_date: null,
                    planned_end_date: null,
                    planned_start_date: null,
                    unit: null,
                    cost: null,
                    total_quantity: null,
                    weight: null,
                    actual_quantity: null,
                },

                earned_value: {
                    work_statement_id: null,
                    earned_value: null,

                    planned_value: null,

                    actual_value: null,
                },

                consultant: {
                    name: null,
                    project_id: this.$route.params.id,
                },
                work_statement: {
                    name: null,
                    project_id: this.$route.params.id,
                },

                specialization: {
                    name: null,
                    project_id: this.$route.params.id,
                },

                check_request: {
                    work_statement_id: null,
                    specialization_id: null,
                    approval: null,

                    rejection: null,

                    pending: null,
                },

                work_statements_work: [],
                operational_graphics: {
                    work_statement_id: null,
                    specialization_id: null,
                    approval: null,

                    rejection: null,

                    pending: null,
                },

                raw_material: {
                    name: null,
                    project_id: this.$route.params.id,
                    unit: null,
                },

                equipment: {
                    equipment_name: null,
                    project_id: this.$route.params.id,
                    planned_quantity_for_equipment: null,
                    unit: null,
                },

                project: {
                    project_name: null,
                    contract_amount: null,
                    owner: null,
                    extra_work_amount: null,
                    start_date: null,
                    contract_duration: null,
                    end_date: null,
                    modified_end_date: null,
                    expected_end_date: null,
                },

                equipment_productivity: {
                    work_statement_id: null,
                    equipment_id: null,
                    avg_actual: null,
                    date: null,
                },

                exports: {
                    contract_id: null,
                    raw_material_id: null,
                    actual: null,
                    planned: null,
                    date: null,
                    month: null,
                },

                work_progress: {
                    activity_id : null
                },

                contracts: {
                    contractor_id: null,
                    division_id: null,
                    work_statement_id: null,
                    project_id: this.$route.params.id,
                    contract_amount: null,

                    contract_number: null,
                    activity_look_up: [],

                    consultant: null,
                    specialization: null,

                    start_date: null,
                    end_date: null,
                    modified_end_date: null,
                    expected_end_date: null,
                },
                periodic_program: [],
                work_statement_work: [],
                monthes: [
                    { title: 'يناير' },
                    { title: 'فبراير' },
                    { title: 'مارس' },
                    { title: 'ابريل' },
                    { title: 'مايو' },
                    { title: 'يونيو' },
                    { title: 'يوليو' },
                    { title: 'أغسطس' },
                    { title: 'سبتمبر' },
                    { title: 'اكتوبر' },
                    { title: 'نوفمبر' },
                    { title: 'ديسمبر' },
                ],
            }
        },
        components: {
            WorkProgress,
            ManPower,
            Exports,
            EquipmentProductivity,
            ValidationProvider,
            ValidationObserver,
            // BOverlay,
            BCardText,
            BCard,
            BModal,
            BFormInput,
            BFormGroup,
            BForm,
            BRow,
            BCol,
            BTab,
            BTabs,
            BOverlay,
            BTable,
            DataTable,
            BButton,
            BFormTag,
            BFormTags,
            BFormDatepicker,
            vSelect,
            BFormFile,
        },
        mounted() {
            this.$store.dispatch('ecb_forms/listProjects', this.id)
                .then((res) => {
                    console.log(res)
                    this.project = res
                })

            this.$store.dispatch('ecb_forms/listcontractors', this.id)
                .then((res) => {
                    this.contractor_list = res.contractors
                    this.consultant_list = res.consultants
                    this.division_list = res.divisions
                    this.work_statement_list = res.work_statements
                    this.work_statement_work = res.work_statements_work
                    this.specialization_list = res.specializations
                    this.raw_material_list = res.raw_materials
                    this.equipment_list = res.equipments
                    this.activity_list = res.activities
                    this.man_power_category_list = res.manpower_categories
                    this.man_power_list = res.manpower
                    this.work_progress_list = res.work_progress
                    this.earned_value_list = res.earned_value
                    this.check_request_list = res.check_request
                    this.operational_graphics_list = res.operational_graphics
                    this.equipment_productivity_list = res.equipment_productivity
                    this.exports_list = res.exports
                    this.problems_list = res.problems
                    this.cash_flow_list = res.cash_flow
                    this.project_images_list = res.project_images
                    this.contract_list = res.contracts
                    this.work_statements_work = res.work_statements_work

                    console.log(res)
                })

            this.$store.dispatch('ecb_forms/viewImg', {
                id: 20,
                query: {

                    contract_id: null,
                },
            })
                .then((res) => {

                    console.log(res)
                })

        },
        methods: {  
            edit_contracts(project) {
                this.levelModal30 = true
                this.contract_id = null

                if (project == null) {

                    this.contracts.contractor_id = null
                    this.contracts.division_id = null
                    this.contracts.work_statement_id = null
                        (this.contracts.project_id = this.$route.params.id),
                        (this.contracts.contract_amount = null)

                    this.contracts.contract_number = null
                    this.contracts.contract_duration = null
                    this.contracts.extra_work_amount = null
                    //  this.contracts.activity_name=null;
                    project.activities.forEach((element) => {
                        this.contracts.activity_look_up.push(element.activitylookup.id)
                    })
                    console.log(this.contracts.activity_name);
                    //  this.contracts.activity_name=

                    (this.contracts.consultant = null),
                        (this.contracts.specialization = null)

                    this.contracts.start_date = null
                    this.contracts.end_date = null
                    this.contracts.modified_end_date = null
                    this.contracts.expected_end_date = null

                }

                if (project) {
                    console.log(project)
                    this.contract_id = project.id
                    this.contracts.contractor_id = project.contractor_id
                    this.contracts.division_id = project.divisions.id
                    this.contracts.work_statement_id = project.work_statements.id;
                    (this.contracts.project_id = this.$route.params.id),
                        (this.contracts.contract_amount = project.contract_amount)

                    this.contracts.contract_number = project.contract_number
                    this.contracts.contract_duration = project.contract_duration
                    this.contracts.extra_work_amount = project.extra_work_amount
                    //  this.contracts.activity_name=null;
                    console.log(project.activities);
                    this.contracts.activity_look_up = [];


                    project.activities.forEach((element) => {
                        if(element.activitylookup)
                        {
                        this.contracts.activity_look_up.push(element.activitylookup.id)}
                    })

                   
                    //  this.contracts.activity_name=

                    (this.contracts.consultant = project.consultant),
                        (this.contracts.specialization = project.specialization)

                    this.contracts.start_date = project.start_date
                    this.contracts.end_date = project.end_date
                    this.contracts.modified_end_date = project.modified_end_date
                    this.contracts.expected_end_date = project.expected_end_date
                }
            },
            
            
            SaveContract() {
                console.log(this.contracts)
                this.$store
                    .dispatch('ecb_forms/save_contract', {
                        id: this.contract_id,
                        query: this.contracts,
                    })
                    .then((response) => {
                        this.contracts.activity_name = null
                        console.log(response)
                        this.levelModal30 = false

                        this.contracts.contractor_id = null
                        this.contracts.division_id = null
                        this.contracts.work_statement_id = null
                        this.contracts.project_id = null
                        this.contracts.contract_amount = null

                        this.contracts.contract_number = null
                        this.contracts.contract_duration = null
                        this.contracts.extra_work_amount = null;
                        (this.contracts.consultant = null),
                            (this.contracts.specialization = null),
                            (this.contracts.start_date = null)
                        this.contracts.end_date = null
                        this.contracts.modified_end_date = null
                        this.contracts.expected_end_date = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.contract_list = res.contracts
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.earned_value_list = res.earned_value
                                this.check_request_list = res.check_request
                                this.operational_graphics_list = res.operational_graphics
                                this.equipment_productivity_list = res.equipment_productivity
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },


            edit_project_img(project) {
                console.log(project)
                this.levelModal24 = true
                this.project_img_id = null

                if (project) {
                    this.project_img_id = project.id
                }
            },

            edit_plan_images(project) {
                console.log(project)
                this.levelModal_2 = true
                this.plan_img_id = null

                if (project) {
                    this.plan_img_id = project.id
                }
            },

            edit_periodic_program(project) {

                console.log(project)
                this.levelModal_1 = true
                this.periodic_program_img_id = null

                if (project) {
                    this.periodic_program_img_id = project.id
                }

            },

            addInput() {
                //api to save

                this.hide = true
            },
            edit(project) {
                console.log(project)
                this.levelModal = true
                this.contractor_id = null

                if (project) {
                    this.contractor_id = project.id
                    this.contractor.name = project.name
                }
            },

            edit_problems(project) {
                console.log(project)
                this.levelModal22 = true
                this.problem_id = null
                this.problem_id = null
                this.problems.problem = null
                this.problems.work_statement_id = null
                if (project) {
                    this.problem_id = project.id
                    this.problems.problem = project.problem
                    this.problems.work_statement_id = project.work_statement_idd
                }
            },


            edit_division(project) {
                console.log(project)
                this.levelModal2 = true
                this.division_id = null

                if (project) {
                    this.division_id = project.id
                    this.division.name = project.name
                }
            },

            edit_check_request(project) {
                console.log(project)
                this.levelModal13 = true
                this.check_request_id = null
                this.check_request.work_statement_id = null
                this.check_request.specialization_id = null
                this.check_request.approval = null

                this.check_request.rejection = null

                this.check_request.pending = null

                if (project) {
                    this.check_request_id = project.id
                    this.check_request.work_statement_id = project.work_statement_idd
                    this.check_request.specialization_id = project.specialization_idd
                    this.check_request.approval = project.approval

                    this.check_request.rejection = project.rejection

                    this.check_request.pending = project.pending
                }
            },

            edit_operational_graphics(project) {
                this.levelModal14 = true
                this.operational_graphics_id = null

                this.operational_graphics.work_statement_id = null
                this.operational_graphics.specialization_id = null
                this.operational_graphics.approval = null

                this.operational_graphics.rejection = null

                this.operational_graphics.pending = null

                if (project) {
                    this.operational_graphics_id = project.id
                    this.operational_graphics.work_statement_id =
                        project.work_statement_idd
                    this.operational_graphics.specialization_id =
                        project.equipment_idd
                    this.operational_graphics.approval = project.approval

                    this.operational_graphics.rejection = project.rejection

                    this.operational_graphics.pending = project.pending
                }
                console.log(project)
            },

            edit_earned_value(project) {
                console.log(project)
                this.levelModal12 = true
                this.earned_value_id = null

                if (project) {
                    this.earned_value_id = project.id
                    this.earned_value.earned_value = project.earned_value
                    this.earned_value.work_statement_id = project.work_statement_idd
                    this.earned_value.planned_value = project.planned_value
                    this.earned_value.actual_value = project.actual_value
                }
            },

            edit_equipment_productivity(project) {
                console.log(project)
                this.levelModal15 = true
                this.equipment_productivity_id = null

                if (project) {
                    this.equipment_productivity_id = project.id
                    this.equipment_productivity.equipment_id = project.equipment_idd
                    this.equipment_productivity.work_statement_id =
                        project.work_statement_idd
                    this.equipment_productivity.avg_actual = project.avg_actual
                    this.equipment_productivity.date = project.date
                }
            },

            edit_work_progress(project) {
                this.levelModal11 = true;
                this.work_progress_id = null;

                if (project) {
                    this.work_progress_id = project.id;

                    (this.work_progress.contract_id = project.contract_id),
                        (this.work_progress.activity_id = project.activity_id),
                        (this.work_progress.planned_amount = project.planned_amount),
                        (this.work_progress.actual_amount = project.actual_amount),
                        (this.work_progress.month = project.month);
                }
            },

            edit_cash_flow(project) {
                this.levelModal23 = true
                this.cash_flow_id = null
                this.cash_flow.work_statement_id = null
                this.cash_flow.planned = null
                this.cash_flow.planned_month = null
                this.cash_flow.actual = null
                this.cash_flow.actual_month = null
                this.cash_flow.spent = null

                if (project) {
                    this.cash_flow_id = project.id;

                    (this.cash_flow.work_statement_id = project.work_statement_idd),
                        (this.cash_flow.planned = project.planned),
                        (this.cash_flow.planned_month = project.planned_month),
                        (this.cash_flow.actual = project.actual),
                        (this.cash_flow.actual_month = project.planned_month)
                            (this.cash_flow.spent = project.spent)
                }
            },

            edit_man_power_category(project) {
                console.log(project)
                this.levelModal9 = true
                this.man_power_category_id = null
                this.man_power_category.project_id = 20

                if (project) {
                    this.man_power_category_id = project.id
                    this.man_power_category.labor_type = project.labor_type
                    this.man_power_category.project_id = this.$route.params.id
                    this.man_power_category.productivity_per_day =
                        project.productivity_per_day
                    this.man_power_category.unit = project.unit
                }
            },

            edit_man_power(project) {
                console.log(project)
                this.levelModal20 = true
                this.man_power_id = null

                if (project) {
                    this.man_power_id = project.id
                    this.man_power.planned_daily = project.planned_daily
                    this.man_power.daily_manpower = project.daily_manpower
                    this.man_power.month = project.month
                    this.man_power.date = project.date
                    this.man_power.category_id = project.category_id
                    this.man_power.contract_id = project.contract_id
                    this.man_power.planned = project.unit
                }
            },

            edit_exports(project) {
                console.log(project)
                this.levelModal21 = true
                this.exports_id = null
                if (project) {
                    this.exports_id = project.id

                    this.exports.month = project.month
                    this.exports.date = project.date
                    this.exports.raw_material_id = project.raw_material_id
                    this.exports.contract_id = project.contract_id
                    this.exports.planned = project.planned
                    this.exports.actual = project.actual
                }
            },
            edit_activity(project) {
                console.log(project)
                this.levelModal8 = true
                this.activity_id = null

                if (project) {
                    console.log(project)
                    this.activity_id = project.activity_id
                    this.activity.contract_id = project.contract_id
                    this.activity.activity_name = project.activity_names
                    this.activity.planned_this_period = project.planned_this_period
                    this.activity.actual_progress_percentage =
                        project.actual_progress_percentage
                    this.activity.planned_progress_percentage =
                        project.planned_progress_percentage
                    this.activity.expected_end_date = project.expected_end_date
                    this.activity.planned_end_date = project.planned_end_date
                    this.activity.planned_start_date = project.planned_start_date
                    this.activity.unit = project.unit
                    this.activity.cost = project.cost
                    this.activity.total_quantity = project.total_quantity
                    this.activity.weight = project.weight
                    this.activity.actual_quantity = project.actual_quantity
                }
            },
            edit_consultant(project) {
                console.log(project)
                this.levelModal3 = true
                this.consultant_id = null

                if (project) {
                    this.consultant_id = project.id
                    this.consultant.name = project.name
                }
            },

            edit_work_statement(project) {
                console.log(project)
                this.levelModal4 = true
                this.work_statement_id = null

                if (project) {
                    this.work_statement_id = project.id
                    this.work_statement.name = project.name
                }
            },
            edit_equipment(project) {
                console.log(project)
                this.levelModal7 = true
                this.equipment_id = null

                if (project) {
                    this.equipment_id = project.id
                    this.equipment.equipment_name = project.equipment_name

                    this.equipment.planned_quantity_for_equipment =
                        project.planned_quantity_for_equipment
                    this.equipment.unit = project.unit
                }
            },
            editRawMaterial(project) {
                console.log(project)
                this.levelModal6 = true
                this.raw_material_id = null

                if (project) {
                    this.raw_material_id = project.id
                    this.raw_material.name = project.name
                    this.raw_material.unit = project.unit
                }
            },

            edit_specialization(project) {
                console.log(project)
                this.levelModal5 = true
                this.specialization_id = null

                if (project) {
                    this.specialization_id = project.id
                    this.specialization.name = project.name
                }
            },
            previewFilesOwners(index) {
                console.log(this.$refs.myFiles[0].files[0])
                this.projectData.images_owners[index].owner_img =
                    this.$refs.myFiles[0].files

                console.log(this.projectData.images_owners[index].owner_img)
            },

            previewFilesPeriodic(index) {
                this.projectData.periodic_program = this.$refs.myFilesPeriodic[0].files
            },

            previewFilesContractors(index) {
                console.log(this.$refs.myFilesContractors[0].files[0])
                this.projectData.images_contractors[index].contractor_img =
                    this.$refs.myFilesContractors[0].files

                console.log(this.projectData.images_contractors[index].contractor_img)
            },

            previewFilesProject(index) {
                console.log(this.$refs.myFilesProject.files)
                // console.log(this.$refs.myFilesProject[0].files[0]);
                this.project_img = this.$refs.myFilesProject.files[0];

                console.log(this.project_img)
            },

            previewFilesPlan() {

                console.log(this.$refs.myFilesPlan.files)
                // console.log(this.$refs.myFilesProject[0].files[0]);
                this.plan_images = this.$refs.myFilesPlan.files

            },

            previewFilesProgram() {

                console.log(this.$refs.myFilesProgram.files)
                // console.log(this.$refs.myFilesProject[0].files[0]);
                this.periodic_program = this.$refs.myFilesProgram.files

            },

            previewFilesDivisions(index) {
                console.log(this.$refs.myFilesDivisions[0].files[0])
                this.projectData.images_divisions[index].division_img =
                    this.$refs.myFilesDivisions[0].files

                console.log(this.projectData.images_divisions[index].division_img)
            },
            // submitAddProjectForm

            submitContractor() {
                this.$store
                    .dispatch('ecb_forms/save_contractor', {
                        id: this.contractor_id,
                        query: this.contractor,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal = false
                        this.contractor.name = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitPlanImg() {

                const plan_images = new FormData()

                for (var i = 0; i < this.plan_images.length; i++) {
                    plan_images.append('plan_images[]', this.plan_images[i])
                }

                plan_images.append('division_id', this.plan_images_division_id)

                this.$store
                    .dispatch('ecb_forms/save_project_image', {
                        id: null,
                        query: plan_images,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal_2 = false
                        this.plan_images = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store.dispatch('ecb_forms/viewImg', {
                            id: 20,
                            query: {

                                contract_id: null,
                            }
                        })
                            .then((res) => {

                                console.log(res)
                            })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })

            },

            submitProgramImg() {

                const periodic_program = new FormData()

                for (var i = 0; i < this.periodic_program.length; i++) {
                    periodic_program.append('periodic_program[]', this.periodic_program[i])
                }
                // periodic_program.append('contract_id', this.project_images_contract_id)


                this.$store
                    .dispatch('ecb_forms/save_project_image', {
                        id: null,
                        query: periodic_program,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal_1 = false
                        this.periodic_program = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store.dispatch('ecb_forms/viewImg', {
                            id: 20,
                            query: {

                                contract_id: null,
                            }
                        })
                            .then((res) => {

                                console.log(res)
                            })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })

            },
            submitProjectImg() {
                console.log(this.project_img)
                const project = new FormData()
                //  project_img.append('project_img[]' , this.project_img)


                project.append('project_img', this.project_img)


                project.append('contract_id', this.project_images_contract_id)
                project.append('image_label', this.image_label)


                this.$store
                    .dispatch('ecb_forms/save_project_image', {
                        id: null,
                        query: project,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal24 = false
                        this.project_img = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store.dispatch('ecb_forms/viewImg', {
                            id: 20,
                            query: {

                                contract_id: null,
                            }
                        })
                            .then((res) => {

                                console.log(res)
                            })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitRawMaterial() {
                this.$store
                    .dispatch('ecb_forms/save_raw_material', {
                        id: this.raw_material_id,
                        query: this.raw_material,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal6 = false
                        this.raw_material.name = null
                        this.raw_material.unit = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.raw_material_list = res.raw_materials

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitWorkProgress() {
                this.$store
                    .dispatch("ecb_forms/save_work_progress", {
                        id: this.work_progress_id,
                        query: this.work_progress,
                    })
                    .then((response) => {
                        console.log(response);
                        this.levelModal11 = false;

                        this.work_progress.contract_id = null;
                        this.work_progress.activity_id = null;
                        this.work_progress.planned_amount = null;
                        this.work_progress.actual_amount = null;
                        this.work_progress.month = null;
                        this.$swal({
                            icon: "success",
                            title: "تم الحفظ",
                            showConfirmButton: false,
                            timer: 1500,
                        });

                        this.$store
                            .dispatch("ecb_forms/listcontractors", this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors;
                                this.consultant_list = res.consultants;
                                this.division_list = res.divisions;
                                this.work_statement_list = res.work_statements;
                                this.specialization_list = res.specializations;
                                this.raw_material_list = res.raw_materials;
                                this.equipment_list = res.equipments;
                                this.activity_list = res.activities;
                                this.man_power_category_list = res.manpower_categories;
                                this.work_progress_list = res.work_progress;
                                this.work_statements_work = res.work_statements_work;
                            });
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors);
                    });
            },

            submitCashFlow() {
                this.cash_flow.actual_month = this.cash_flow.planned_month
                this.$store
                    .dispatch('ecb_forms/save_cash_flow', {
                        id: this.cash_flow_id,
                        query: this.cash_flow,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal23 = false

                        this.cash_flow.work_statement_id = null
                        this.cash_flow.planned = null
                        this.cash_flow.planned_month = null
                        this.cash_flow.actual = null
                        this.cash_flow.actual_month = null
                        this.cash_flow.spent = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.cash_flow_list = res.cash_flow
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitCheckRequest() {
                this.$store
                    .dispatch('ecb_forms/save_check_request', {
                        id: this.check_request_id,
                        query: this.check_request,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal13 = false

                        this.check_request.work_statement_id = null
                        this.check_request.specialization_id = null
                        this.check_request.approval = null

                        this.check_request.rejection = null

                        this.check_request.pending = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.earned_value_list = res.earned_value
                                this.check_request_list = res.check_request
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitOperationalGraphics() {
                this.$store
                    .dispatch('ecb_forms/save_operational_graphics', {
                        id: this.operational_graphics_id,
                        query: this.operational_graphics,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal14 = false

                        this.operational_graphics.work_statement_id = null
                        this.operational_graphics.specialization_id = null
                        this.operational_graphics.approval = null

                        this.operational_graphics.rejection = null

                        this.operational_graphics.pending = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.earned_value_list = res.earned_value
                                this.check_request_list = res.check_request
                                this.operational_graphics_list = res.operational_graphics
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitEquipmentProductivity() {
                this.$store
                    .dispatch('ecb_forms/save_equipment_productivity', {
                        id: this.equipment_productivity_id,
                        query: this.equipment_productivity,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal15 = false

                        this.equipment_productivity.equipment_id = null
                        this.equipment_productivity.work_statement_id = null
                        this.equipment_productivity.avg_actual = null
                        this.equipment_productivity.date = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.earned_value_list = res.earned_value
                                this.check_request_list = res.check_request
                                this.operational_graphics_list = res.operational_graphics
                                this.equipment_productivity_list = res.equipment_productivity
                                // this.equipment_list = res.equipment;
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

       
            submitProblems() {
                this.$store
                    .dispatch('ecb_forms/save_problems', {
                        id: this.problem_id,
                        query: this.problems,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal22 = false

                        this.problems.problem = null
                        this.problems.work_statement_id = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.earned_value_list = res.earned_value
                                this.check_request_list = res.check_request
                                this.operational_graphics_list = res.operational_graphics
                                this.equipment_productivity_list = res.equipment_productivity
                                this.problems_list = res.problems
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },
            submitEarnedValue() {
                this.$store
                    .dispatch('ecb_forms/save_earned_value', {
                        id: this.earned_value_id,
                        query: this.earned_value,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal12 = false

                        this.earned_value.work_statement_id = null
                        this.earned_value.earned_value = null
                        this.earned_value.planned_value = null
                        this.earned_value.actual_value = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories
                                this.work_progress_list = res.work_progress
                                this.earned_value_list = res.earned_value
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitActivity() {
                console.log(this.activity)
                this.$store
                    .dispatch('ecb_forms/save_activity', {
                        id: this.activity_id,
                        query: this.activity,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal8 = false
                        this.activity.activity_name = null
                        this.activity.planned_this_period = null
                        this.activity.actual_progress_percentage = null
                        this.activity.planned_progress_percentage = null
                        this.activity.expected_end_date = null
                        this.activity.planned_end_date = null
                        this.activity.planned_start_date = null
                        this.activity.unit = null
                        this.activity.cost = null
                        this.activity.total_quantity = null
                        this.activity.weight = null
                        this.activity.actual_quantity = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.raw_material_list = res.raw_materials
                                this.activity_list = res.activities

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },
            submitEquipment() {
                this.$store
                    .dispatch('ecb_forms/save_equipment', {
                        id: this.equipment_id,
                        query: this.equipment,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal7 = false
                        this.equipment.equipment_name = null

                        this.equipment.planned_quantity_for_equipment = null
                        this.equipment.unit = null
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.equipment_productivity_list = res.equipment_productivity

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },
            submitDivision() {
                this.$store
                    .dispatch('ecb_forms/save_division', {
                        id: this.division_id,
                        query: this.division,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal2 = false
                        this.division.name = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitManPower() {
                this.$store
                    .dispatch('ecb_forms/save_man_power', {
                        id: this.man_power_id,
                        query: this.man_power,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal20 = false

                        this.man_power_id = null
                        this.man_power.daily_manpower = null
                        this.man_power.planned_daily = null
                        this.man_power.month = null
                        this.man_power.date = null
                        this.man_power.category_id = null
                        this.man_power.contract_id = null
                        this.man_power.planned = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.man_power_categories
                                this.man_power_list = res.manpower

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitExports() {
                this.$store
                    .dispatch('ecb_forms/save_exports', {
                        id: this.exports_id,
                        query: this.exports,
                    })
                    .then((response) => {
                        this.levelModal21 = false

                        this.exports_id = null
                        this.exports.actual = null
                        this.exports.month = null
                        this.exports.date = null
                        this.exports.raw_material_id = null
                        this.exports.contract_id = null
                        this.exports.planned = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.man_power_categories
                                this.man_power_list = res.manpower
                                this.exports_list = res.exports

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitManPowerCategory() {
                this.$store
                    .dispatch('ecb_forms/save_man_power_category', {
                        id: this.man_power_category_id,
                        query: this.man_power_category,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal9 = false

                        this.man_power_category.labor_type = null
                        this.man_power_category.project_id = null
                        this.man_power_category.productivity_per_day = null
                        this.man_power_category.unit = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work
                                this.specialization_list = res.specializations
                                this.raw_material_list = res.raw_materials
                                this.equipment_list = res.equipments
                                this.activity_list = res.activities
                                this.man_power_category_list = res.manpower_categories

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitConsultant() {
                this.$store
                    .dispatch('ecb_forms/save_consultant', {
                        id: this.consultant_id,
                        query: this.consultant,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal3 = false
                        this.consultant.name = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitWorkStatement() {
                this.$store
                    .dispatch('ecb_forms/save_work_statement', {
                        id: this.work_statement_id,
                        query: this.work_statement,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal4 = false
                        this.work_statement.name = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.work_statement_list = res.work_statements
                                this.work_statements_work = res.work_statements_work

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            submitSpecialization() {
                this.$store
                    .dispatch('ecb_forms/save_specialization', {
                        id: this.specialization_id,
                        query: this.specialization,
                    })
                    .then((response) => {
                        console.log(response)
                        this.levelModal5 = false
                        this.specialization.name = null

                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        this.$store
                            .dispatch('ecb_forms/listcontractors', this.id)
                            .then((res) => {
                                this.contractor_list = res.contractors
                                this.consultant_list = res.consultants
                                this.division_list = res.divisions
                                this.specialization_list = res.specializations

                                console.log(res)
                            })
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })
            },

            //   SaveContract() {

            // console.log(this.contracts);
            //       this.$store
            //           .dispatch("ecb_forms/save_contract",{id: this.id, query: this.contracts}) .then((response) => {

            //           this.$swal({
            //             icon: "success",
            //             title: 'تم الحفظ',
            //             showConfirmButton: false,
            //             timer: 1500,
            //           });

            //          })
            //         .catch((error) => {
            //           this.errorsdata = this.handleBackendError(
            //             error.response.data.errors
            //           );
            //         });

            //     },

            submitAddProjectForm() {
                console.log(this.projectData)

                // this.$refs.addProjectRules.validate().then((success) => {
                //   if (success) {
                //     // eslint-disable-next-line
                //     // alert("form submitted!");
                //     // this.$store.dispatch("ecb_forms/listProjects");

                //     //de el kant msh commented
                this.$store
                    .dispatch('ecb_forms/editProject', {
                        id: this.id,
                        query: this.project
                    })
                    .then((response) => {
                        this.$swal({
                            icon: 'success',
                            title: 'تم الحفظ',
                            showConfirmButton: false,
                            timer: 1500,
                        })

                        //   this.$router.push({
                        //     name:"Add Project",
                        //     params: { id: this.project_id },
                        //   });
                    })
                    .catch((error) => {
                        this.errorsdata = this.handleBackendError(error.response.data.errors)
                    })

                // });
            },

            selectImgFile() {
                //   let fileInput = this.$refs.fileInput;
                //     console.log(this.$refs.fileInput[0].files[0]);
                //   // if (fileInput.files || fileInput.files[0])
                //   // {
                //   // }
                //   let imgFile =this.$refs.fileInput[0].files[0]
                //   if (imgFile) {
                //     let reader = new FileReader();
                //     reader.onload = (e) => {
                //       this.filePreview = e.target.result;
                //     };
                //     reader.readAsDataURL(imgFile[0]);
                //     this.$emit("fileInput", imgFile[0]);
                //   document.getElementById("im").style.width = "160px";
                //     document.getElementById("im").style.height = "160px";
                //  }
            },

            //  Overall Project Progress Status
            submitProjectProgressForm() {
                this.$refs.progressProjectRules.validate()
                    .then((success) => {
                        if (success) {
                            // eslint-disable-next-line
                            alert('form submitted!')
                        }
                    })
            },
            //  Start Form Number Three
            submitFormPartThree() {
                this.$refs.partThreeRules.validate()
                    .then((success) => {
                        if (success) {
                            // eslint-disable-next-line
                            alert('form submitted!')
                        }
                    })
            },

            cloneimagesOwners() {
                this.projectData.images_owners.push({
                    owner_name: null,
                    owner_img: null,
                })
            },

            cloneimagesDivisions() {
                this.projectData.images_divisions.push({
                    division_name: null,
                    division_img: null,
                })
            },

            cloneimagesContractors() {
                this.projectData.images_contractors.push({
                    contractor_name: null,
                    contractor_img: null,
                })
            },

            cloneWorkSituation() {
                this.projectData.work_situation.push({
                    planned_this_period: null,
                    contract_name: null,
                    work_statement: null,
                    activity_name: null,
                    progress_percentage: null,
                    expected_end_date: null,
                    planned_end_date: null,
                    weight: null,
                    quantity: null,
                })
            },
            cloneWorkProgress() {
                this.projectData.work_progress.push({
                    contract_name: null,
                    work_statement: null,
                    activity_name: null,
                    planned_amount: null,
                    actual_amount: null,
                    month: null,
                })
            },

            cloneEquipmentProductivity() {
                this.projectData.equipment_productivity.push({
                    contract_name: null,
                    equipment_name: null,
                    avg_actual: null,
                    date: null,
                })
            },

            cloneEquipments() {
                this.projectData.equipments.push({
                    planned_quantity_for_equipment: null,
                    equipment_name: null,
                })
            },
            cloneEmploymentCategory() {
                this.projectData.employment_category.push({
                    labor_type: null,
                    productivity_per_day: null,
                    unit: null,
                })
            },
            cloneEmployment() {
                this.projectData.employments.push({
                    contract_name: null,

                    daily_manpower: null,
                    date: null,
                })
            },
            cloneEarnedValue() {
                this.projectData.earned_values.push({
                    contract_name: null,
                    earned_value: null,

                    planned_value: null,

                    actual_value: null,
                })
            },

            cloneExports() {
                this.projectData.exports.push({
                    contract_name: null,
                    material_name: null,
                    actual: null,
                    planned: null,
                })
            },
            cloneCashFlow() {
                this.projectData.cash_flow.push({
                    actual: null,
                    planned: null,
                    actual_month: null,
                    planned_month: null,
                })
            },

            cloneCheckRequests() {
                this.projectData.check_requests.push({
                    approval: null,
                    rejection: null,

                    pending: null,
                })
            },
            cloneProblems() {
                this.projectData.problems.push({
                    contract_name: null,
                    problem: null,
                })
            },
            cloneOperationalGraphics() {
                this.projectData.operational_graphics.push({
                    specialization: null,
                    approval: null,
                    rejection: null,

                    pending: null,
                })
            },
            cloneContractors() {
                this.contracts.push({
                    contractor_id: null,
                    division_id: null,
                    work_statement_id: null,
                    project_id: this.$route.params.id,
                    contract_amount: null,

                    contract_number: null,
                    activity_name: null,
                    consultant_specialization: {
                        consultant: null,
                        specialization: null,
                    },

                    start_date: null,
                    end_date: null,
                    modified_end_date: null,
                    expected_end_date: null,
                })
            },

            cloneContractors1() {
                this.projectData.contractors1.push({
                    name: null,
                })
            },

            cloneDivisions1() {
                this.projectData.divisions.push({
                    division_name: null,
                })
            },
            // الاستشارى والتخصص
            cloneConsulstans() {
                this.projectData.consultants.push({
                    consultant: null,
                    consultant_specialization: null,
                })
            },

            cloneRow() {
                this.projectProgress.clonePartOne.push({
                    activity_name: null,
                    drawings_approval: null,
                    percentage_done: null,
                    cost: null,
                })
            },
            cloneRowTwo() {
                this.projectProgress.clonePartTwo.push({
                    activity_name: null,
                    drawings_approval: null,
                    percentage_done: null,
                    cost: null,
                })
            },
            clonePartThreeForm() {
                this.partThree.objData.push({
                    selectedMonth: { title: 'يناير' },
                    concreteQuantity: null,
                    planned_amount: null,
                    actual_amount: null,
                })
            },
            clonePartThreeFormSections() {
                this.partThree.sections.push({
                    name: null,
                })
            },
            clonePartThreeFormSectors() {
                this.partThree.sectors.push({
                    name: null,
                })
            },
            clonePartThreeFormDrawing() {
                this.partThree.drawingData.push({
                    drawing_name: null,
                    actual: null,
                    planned: null,
                })
            },
            clonePartThreeFormMaterial() {
                this.projectData.material_data.push({
                    material_name: null,
                    unit: null,
                })
            },
            clonePartThreeFormProblems() {
                this.partThree.problemsData.push({
                    name: null,
                })
            },
            cloneWorkStatement() {
                this.projectData.work_statement.push({
                    work: null,
                })
            },
        },
        computed: {
            ...mapGetters({
                load: 'users/load',
            }),

            filterActivity_work_progress() {
                let filter_Activities = []
                let listContractors = this.list_contractors.activities
                listContractors.forEach((element) => {
                    if (element.contract_id == this.work_progress.contract_id) {
                        filter_Activities.push({
                            activity_id: element.activity_id,
                            activity_names: element.activity_names
                        })
                    }
                })
                return filter_Activities
            },

            filterActivities() {
                let filter_Activities = []
                let listContractors = this.list_contractors.activities
                listContractors.forEach((element) => {
                    if (element.contract_id == this.activity.contract_id) {
                        filter_Activities.push({
                            activity_id: element.activity_id,
                            activity_names: element.activity_names
                        })
                    }
                })
                return filter_Activities
            },
            list_contractors() {
                let list_contractors = this.$store.getters['ecb_forms/listcontractors']

                return list_contractors
            },
            projects() {
                let projects = this.$store.getters['ecb_forms/projectList']
                console.log(projects)
                return projects
            },

            project_id() {
                let project_id = this.$store.getters['ecb_forms/id']
                return project_id
            },
            id() {
                return this.$route.params && this.$route.params.id
                    ? this.$route.params.id
                    : null
            },
            // contractors() {
            //   let contractors = [
            //     {
            //       id: 0,
            //       name: "contractor 1",
            //     },
            //     {
            //       id: 1,
            //       name: "contractor 2",
            //     },
            //   ];
            //   return contractors;
            // },

            divisions() {
                let divisions = [
                    {
                        id: 0,
                        name: 'divisions 1'
                    },
                    {
                        id: 1,
                        name: 'divisions 2'
                    },
                ]
                return divisions
            },

            owners() {
                let owners = [{
                    id: 0,
                    name: 'owners 1'
                }]
                return owners
            },

            work_statements() {
                let work_statements = [
                    {
                        id: 0,
                        name: ' اعمال كهرباء'
                    },
                    {
                        id: 1,
                        name: ' اعمال ميكانيكا'
                    },
                ]
                return work_statements
            },

            equipments() {
                let equipments = [
                    {
                        id: 0,
                        name: 'معدة 1'
                    },
                    {
                        id: 1,
                        name: 'معدة2'
                    },
                ]
                return equipments
            },

            materials() {
                let materials = [
                    {
                        id: 0,
                        name: 'materials 1'
                    },
                    {
                        id: 1,
                        name: 'materials 2'
                    },
                ]
                return materials
            },
        },
    }
</script>

<style lang="scss" scoped>
    @import "@core/scss/vue/libs/vue-select.scss";

    .modal-header .close {
        display: none;
    }

    .main_ecb_wrapper {
        direction: rtl;

        .form_label {
            margin-bottom: 10px;
        }

        .project_details_icon_warpp {
            display: flex;
            justify-content: flex-start;
            gap: 10px;
            margin-bottom: 10px;
        }

        .project_progress_wrapper {
            border-top: 1px solid #ccc;

            .for_percentage_wrapper {
                display: flex;
                // background: bisque;
                gap: 10px;
                align-items: center;

                .form-control {
                    width: 150px;
                    // background: #eee;
                }
            }

            // .work_situations {
            //   .for_percentage_wrapper {
            //     display: flex;
            //     background: bisque;
            //     gap: 10px;
            //     align-items: center;
            //     .form-control {
            //       width: 150px;
            //       background: #eee;
            //     }
            //   }
            // }

            // // Start main_wrapper_for_duplicate
            .main_wrapper_for_duplicate {
                // background: #eee;
                margin-top: 15px;
                display: flex;
                align-items: center;
                justify-content: space-between;

                .part_one {
                    align-items: center;
                    display: flex;
                    gap: 10px;

                    .form-group {
                        margin-bottom: 0;
                    }
                }
            }
        }

        .custom-file-upload {
            cursor: pointer;
            padding: 10px;
            box-shadow: 8px -1px 3px -3px #b569bb;
            border-radius: 4px 17px 17px 4px;
        }

        .main_title_icon_wrapper {
            display: flex;
            align-items: center;
            gap: 30px;
        }

        // Part Three
        .project_part_three_wrapper {
            border-top: 1px solid #ccc;

            .part_three_heading {
                // background: #eee;
                display: flex;
                align-items: center;
                gap: 15px;
            }

            .main_container_for_values_monthes {
                padding-top: 2.2rem;

                &.main_for_workers {
                    .span_work {
                        min-width: 100px;
                        text-align: right;
                    }
                }

                .input_with_text_and_select {
                    display: flex;
                    align-items: center;
                    gap: 15px;

                    &.with_draw {
                        gap: 50px;
                    }

                    .part_a {
                        align-items: center;
                        display: flex;
                        gap: 8px;

                        .form-group {
                            margin-bottom: 0;
                        }
                    }

                    .every_plan_month {
                        align-items: center;
                        display: flex;
                        gap: 8px;

                        .form-group {
                            margin-bottom: 0;
                        }
                    }
                }

                .input_with_quantity {
                    .part_a {
                        align-items: center;
                        display: flex;
                        gap: 15px;
                        padding-top: 1.5rem;

                        .form-group {
                            margin-bottom: 0;
                        }

                        .qunt {
                            min-width: 100px;
                            display: block;
                        }
                    }
                }
            }

            .part_two_form_three {
                .every_part {
                    align-items: center;
                    display: flex;
                    gap: 15px;
                    padding-top: 1.5rem;

                    .form-group {
                        margin-bottom: 0;
                    }
                }
            }

            .sections_and_sectors {
                .sections {
                    .part_e {
                        text-align: right;
                        align-items: center;
                        display: flex;
                        gap: 15px;
                    }

                    .part_d {
                        text-align: right;
                        align-items: center;
                        display: flex;
                        gap: 15px;
                    }

                    .minumm {
                        min-width: 150px;
                    }
                }
            }

            .approval_and_rejection {
                .part_d {
                    text-align: right;
                    align-items: center;
                    display: flex;
                    gap: 15px;

                    .form-group {
                        margin-bottom: 0;
                    }

                    .minumm {
                        min-width: 100px;
                    }
                }
            }

            .drawing_name_container {
                .part_e {
                    text-align: right;
                    align-items: center;
                    display: flex;
                    gap: 15px;

                    .minumm {
                        min-width: 100px;
                    }
                }

                .parts_drwing_container {
                    display: flex;
                    justify-content: space-between;

                    .every_part {
                        align-items: center;
                        display: flex;
                        gap: 15px;
                        padding-top: 1.5rem;

                        .form-group {
                            margin-bottom: 0;
                        }

                        &.problem {
                            min-width: 50%;

                            .form-group {
                                margin-bottom: 0;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }

        .plus_icon {
            border: 1px solid #ccc;
            border-radius: 50%;
            cursor: pointer;
            width: 20px;
            height: 20px;
            padding: 2px;
        }

        //  Start Matrial
        .material_wrapper {
            border-top: 1px solid #ccc;

            .box_wrapper {
                display: flex;
                align-items: center;

                gap: 15px;
            }
        }

        // mony_wrapper
        .mony_wrapper {
            .input_with_text_and_select {
                display: flex;
                align-items: center;
                gap: 50px;

                .money_planned_text {
                    min-width: 150px;
                    text-align: right;
                }
            }
        }

        .choose_images {
            .choosing_photos_ {
                display: flex;
                justify-content: center;

                .photos_label {
                    border: 1px solid #ccc;
                    min-width: 200px;
                    text-align: center;
                    height: 50px;
                    line-height: 50px;
                    cursor: pointer;
                }
            }
        }
    }
</style>