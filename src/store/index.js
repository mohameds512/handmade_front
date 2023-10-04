import Vue from "vue";
import Vuex from "vuex";

// Modules
import app from "./app";
import appConfig from "./app-config";
import verticalMenu from "./vertical-menu";

// users
import usersModule from "./modules/hr/users/user";
import employeesModule from "./modules/hr/employees/employee";

import addProjectModule from "./modules/ecb_forms/add_project";

//accounting
import accountsModule from "./modules/accounting/accounts/account";
import entriesModule from "./modules/accounting/entries/entry";

// CRM
import actionsModule from "./modules/crm/actions/action";
import clientsModule from "./modules/crm/clients/client";

// Inventory
import itemsModule from "./modules/inv/items/item";
import productsModule from "./modules/inv/products/product";
import warehousesModule from "./modules/inv/warehouses/warehouse";

// Purchases
import billsModule from "./modules/purchases/bills/bill";
import paymentsModule from "./modules/purchases/payments/payment";
import vendorsModule from "./modules/purchases/vendors/vendor";

// Sales
import invoicesModule from "./modules/sales/invoices/invoice";
import revenuesModule from "./modules/sales/revenues/revenue";

// bbx_forms
import bbxAddModule from "./modules/bbx_forms/bbx_add_projects";

// system
import roleModule from "./modules/hr/roles/role";
import logModule from "./modules/administration/logs/log";

import dashboardModule from "./modules/system/dashboard";
import lookupsModule from "./modules/system/lookups";
import EngineTypeModule from "./modules/lookups/engine_type";
import settingModule from "./modules/administration/management/settings";

import OperatorsModule from "./modules/lookups/operators";
import Delay_CodesModule from "./modules/lookups/delay_codes";
import FleetTypeModule from "./modules/lookups/fleet_type";
import ManufacturersModule from "./modules/lookups/manufacturers";

import FlightsModule from "./modules/flights/flights";
import CountriesModule from "./modules/lookups/countries";

Vue.use(Vuex);
import EnginePhysicalClassModule from "./modules/lookups/engine_physical_class";
import AircraftStatusModule from "./modules/lookups/aircraft_status";
import ManufacturerTypesModule from "./modules/lookups/manufacturer_types";

export default new Vuex.Store({
  modules: {
    app,
    appConfig,
    verticalMenu,
    users: usersModule,
    roles: roleModule,
    employees: employeesModule,
    accounts: accountsModule,
    entries: entriesModule,

    actions: actionsModule,
    clients: clientsModule,

    items: itemsModule,
    products: productsModule,
    warehouses: warehousesModule,

    bills: billsModule,
    payments: paymentsModule,
    vendors: vendorsModule,

    invoices: invoicesModule,
    revenues: revenuesModule,

    ecb_forms: addProjectModule,
    bbx_forms: bbxAddModule,
    log: logModule,
    settings: settingModule,
    dashboard: dashboardModule,
    lookups: lookupsModule,
    engine_type: EngineTypeModule,

    flights: FlightsModule,
    engine_physical_class: EnginePhysicalClassModule,
    aircraft_status: AircraftStatusModule,
    manufacturer_types: ManufacturerTypesModule,

    operators: OperatorsModule,
    delay_codes: Delay_CodesModule,
    fleet_type: FleetTypeModule,
    manufacturers: ManufacturersModule,
    countries: CountriesModule,
    flights: FlightsModule,
  },
});
