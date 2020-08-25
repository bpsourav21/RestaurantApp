//'use strict';
import Realm from 'realm';

const ItemSchema = {
    name: 'Item',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        name: 'string',
        price: { type: 'float', default: 0 },
        category: 'string',
        sub_category: 'string',
        barcode: 'string',
        img_url: 'string',
        discount: 'string',
        tag: 'string',
        // quantity: { type: 'int', default: 0 },
        // total_price: { type: 'float', default: 0 },
        created_at: 'date',
    }
};
const CategorySchema = {
    name: 'Category',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        name: 'string',
        created_at: 'date',
    }
};
const TagSchema = {
    name: 'Tag',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        name: 'string',
        created_at: 'date',
    }
};

const OrderSchema = {
    name: 'Order',
    properties: {
        name: 'string',
        price: { type: 'float', default: 0 },
        quantity: { type: 'int', default: 0 },
        total_price: { type: 'float', default: 0 },
    }
};

const WaiterSchema = {
    name: 'Waiter',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        name: 'string',
        code: 'string',
        phone: 'string',
        created_at: 'date',
    }
};

const SaleSchema = {
    name: 'Sale',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        order: "Order[]",
        invoice_no: "string",
        table: "string",
        sub_total: { type: 'float', default: 0 },
        tax: { type: 'float', default: 0 },
        discount: { type: 'float', default: 0 },
        total_price: { type: 'float', default: 0 },
        paid: { type: 'float', default: 0 },
        change: { type: 'float', default: 0 },
        due: { type: 'float', default: 0 },
        customer_name: { type: 'string', default: "none" },
        customer_phone: { type: 'string', default: "none" },
        waiter: { type: 'string', default: "none" },
        order_status: { type: 'string', default: "pending" },
        day: "string",
        month: "string",
        year: "int",
        created_at: 'date',
    }
};

const DailyReportSchema = {
    name: 'DailyReport',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        invoice_no: "string",
        sale_id: "string",
        sub_total: { type: 'float', default: 0 },
        tax: { type: 'float', default: 0 },
        discount: { type: 'float', default: 0 },
        total_price: { type: 'float', default: 0 },
        day: "string",
        created_at: 'date',
    }
};

const MonthlyReportSchema = {
    name: 'MonthlyReport',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        daily_report: "DailyReport[]",
        daily_total: { type: 'float', default: 0 },
        month: "string",
        created_at: 'date',
    }
};
const YearlyReportSchema = {
    name: 'YearlyReport',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        monthly_report: "MonthlyReport[]",
        monthly_total: { type: 'float', default: 0 },
        year: "int",
        created_at: 'date',
    }
};
const AccountSchema = {
    name: 'Account',
    primaryKey: '_id',
    properties: {
        _id: 'string',
        shop_name: 'string',
        address: 'string',
        vat_registration_number: 'string',
        vat_active: "bool",
        backup_database: "bool",
        vat_rate: { type: 'float', default: 0 },
        report_password: 'string',
        phone_number: 'string',
        cashier_subscription_expiry: 'string',
        last_backup: 'date',
        created_at: 'date',
    }
};


export default new Realm({ schema: [ItemSchema, CategorySchema, TagSchema, OrderSchema, WaiterSchema, SaleSchema, DailyReportSchema, MonthlyReportSchema, YearlyReportSchema, AccountSchema] })

