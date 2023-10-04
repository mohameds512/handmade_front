export default [{
    header: 'Global.interface',
    permission: 'public'
},
    {
        title: 'Global.dashboard',
        icon: 'CommandIcon',
        permission: 'public',
        route: 'dashboard',

    },
    {
        title: 'Global.reports',
        icon: 'CommandIcon',
        permission: 'public',
        route: 'Repotrs',

    },
    {
        header: 'Global.controls',
        permission: 'public'
    },
    // {
    //     title: 'Global.Products',
    //     icon: 'GiftIcon',
    //     permission: 'public',
    //     route: 'Products',

    // },

    
    {
        title: 'Global.hr',
        icon: 'UsersIcon',
        permission: 'public',
        children:[
            {
                title: 'Global.Users',
                icon: 'UserPlusIcon',
                permission: 'public',
                route: 'users',
            },
            {
                title: "Global.Roles",
                icon: 'KeyIcon',
                permission: 'public',
                route: 'roles',
            },
            {
                title: "hr.employees",
                icon: 'UserPlusIcon',
                permission: 'public',
                route: 'employees',
            },
        ]
    },
    {
        title: 'Global.crm',
        icon: 'BriefcaseIcon',
        permission: 'public',
        children:[
            {
                title: 'crm.clients',
                icon: 'SendIcon',
                permission: 'public',
                route: 'clients',
            },
            {
                title: 'crm.actions',
                icon: 'SendIcon',
                permission: 'public',
                route: 'actions',
            },
            {
                title: 'crm.companies',
                icon: 'SendIcon',
                permission: 'public',
                route: 'companies',
            },
        ]
    },
    {
        title: 'inv.inventory',
        icon: 'ArchiveIcon',
        permission: 'public',
        route: 'accounting',
        children:[
            {
                title: 'inv.Orders',
                icon: 'SendIcon',
                permission: 'public',
                route: 'Orders',
            },
            {
                title: 'inv.products',
                icon: 'GiftIcon',
                permission: 'public',
                route: 'products',
            },
            {
                title: 'inv.archived',
                icon: 'SendIcon',
                permission: 'public',
                route: 'archived',
            },
        ]
    },
    {
        title: 'acc.accounting',
        icon: 'DollarSignIcon',
        permission: 'public',
        route: 'accounting',
        children:[
            {
                title: 'acc.accounts',
                icon: 'SendIcon',
                permission: 'public',
                route: 'Accounts',
            },
            {
                title: 'acc.entries',
                icon: 'SendIcon',
                permission: 'public',
                route: 'entries',
            },
            {
                title: 'acc.general-ledger',
                icon: 'SendIcon',
                permission: 'public',
                route: 'ledger',
            },
        ]
    },
    {
        title: 'Global.purchases',
        icon: 'ShoppingBagIcon',
        permission: 'public',
        children:[
            {
                title: 'pur.bills',
                icon: 'SendIcon',
                permission: 'public',
                route: 'bills',
            },
            {
                title: 'pur.vendors',
                icon: 'SendIcon',
                permission: 'public',
                route: 'vendors',
            },
            {
                title: 'pur.payments',
                icon: 'SendIcon',
                permission: 'public',
                route: 'payments',
            },
        ]
    },
    {
        title: 'Global.sales',
        icon: 'DollarSignIcon',
        permission: 'public',
        route: 'sales',
        children:[
            {
                title: 'sal.invoices',
                icon: 'SendIcon',
                permission: 'public',
                route: 'Invoices',
            },
            {
                title: 'sal.revenues',
                icon: 'SendIcon',
                permission: 'public',
                route: 'Revenues',
            },
            {
                title: 'sal.returns',
                icon: 'SendIcon',
                permission: 'public',
                route: 'Returns',
            },
        ]
    },
    {
        title: 'Global.help',
        icon: 'HelpCircleIcon',
        permission: 'public',
        route: 'helpPage',
    },
    {
        title: 'Global.setting',
        icon: 'SlidersIcon',
        permission: 'public',
        route: 'settingPage',
        children:[
            {
                title: 'set.app-setting',
                icon: 'SettingsIcon',
                permission: 'public',
                route: 'settingPage',
            },
            {
                title: 'set.business-details',
                icon: 'SendIcon',
                permission: 'public',
                route: 'Business',
            },
            {
                title: 'set.invitation',
                icon: 'SendIcon',
                permission: 'public',
                route: 'sendInvitation',
            },
        ]
    },
];
