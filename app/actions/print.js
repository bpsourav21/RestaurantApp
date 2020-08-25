// import { NativeModules } from 'react-native';
import SunmiInnerPrinter from 'react-native-sunmi-inner-printer';
import { Logobase64 } from '../constant';
var sprintf = require('sprintf-js').sprintf;
// .........................................
export async function printReceipt(processed_order, account, due_client_name, due_client_number, callback) {
    var clientName = "";
    var clientPhone = "";
    var hasDue = false;
    if (due_client_name != null && due_client_number != null) {
        clientName = due_client_name;
        clientPhone = due_client_number;
        hasDue = true;
    } else {
        clientName = processed_order.client_name;
        clientPhone = processed_order.client_phone_number;
        hasDue = false;
    }
    var waiterName = processed_order.waiter;
    var table = processed_order.table;
    var orderList = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var shopphone = account.phone_number;
    var vat_reg_number = account.vat_registration_number;
    var invoice_no = processed_order.invoice_no;
    var order = processed_order.order;
    //var ret= 1100- processed_order.total_price
    var fPaid = "৳" + processed_order.paid.toFixed(2);
    var fDue = "৳" + processed_order.due.toFixed(2);
    var fDiscount = "৳" + processed_order.discount.toFixed(2);
    var fReturn = "৳" + processed_order.change.toFixed(2);
    for (var i = 0; i < order.length; i++) {
        var arr1 = [];
        var arr2 = [];
        var nmstr = (i + 1) + "." + order[i].name
        arr1 = [nmstr, "", ""]
        var prcstr = "  ৳" + order[i].price + " x " + order[i].quantity;
        var itmttl = "৳" + (order[i].price * order[i].quantity);
        arr2 = [prcstr, "", itmttl]
        orderList.push(arr1)
        orderList.push(arr2)
    }
    let columnAliment = [0, 1, 2];
    let nameColumnWidth = [30, 1, 1]
    let subColumnWidth = [1, 10, 25]
    let columnWidth = [22, 1, 13]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText("Phone Number: " + shopphone + "\n")
        if (account.vat_active) {
            await SunmiInnerPrinter.printOriginalText("Vat registration : " + vat_reg_number + "\n")
        }
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.printOriginalText("INVOICE ID: " + invoice_no + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        if (clientName.length > 0) await SunmiInnerPrinter.printColumnsText(["Customer Name", "", clientName], [17, 1, 16], [0, 1, 2]);
        if (clientPhone.length > 0) await SunmiInnerPrinter.printColumnsText(["Phone No", "", clientPhone], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.printColumnsText(["Waiter Name", "", waiterName], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.printColumnsText(["Table", "", table], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("ORDER-DETAILS\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in orderList) {
            if (i % 2 == 0) {
                await SunmiInnerPrinter.printColumnsText(orderList[i], nameColumnWidth, columnAliment);
            } else {
                await SunmiInnerPrinter.printColumnsText(orderList[i], columnWidth, columnAliment);
            }
        }
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT SUBTOTAL & TAX
        var subttstr = "৳" + processed_order.sub_total.toFixed(2);
        await SunmiInnerPrinter.printColumnsText(["", "SUBTOTAL", subttstr], subColumnWidth, [0, 2, 2]);
        if (processed_order.tax > 0) {
            var taxstr = "৳" + processed_order.tax.toFixed(2);
            await SunmiInnerPrinter.printColumnsText(["", "TAX", taxstr], subColumnWidth, [0, 2, 2]);
            await SunmiInnerPrinter.printColumnsText(["", "DISCOUNT", fDiscount], subColumnWidth, [0, 2, 2]);
        }
        // PRINT TOTAL
        var totaltaka = processed_order.total_price//(processed_order.total.toFixed(2) - processed_order.discount.toFixed(2))
        var ttstr = "৳" + totaltaka.toFixed(2);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        await SunmiInnerPrinter.printColumnsText(["", "TOTAL", ttstr], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["", "PAID", fPaid], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["", "RETURN", fReturn], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        // if (hasDue) {
        //     await SunmiInnerPrinter.printColumnsText(["", clientName + "", clientPhone + "  "], subColumnWidth, [0, 2, 2]);
        // }
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}
// .........................................
export async function printZReportForMonth(summary, graphData, account, callback) {
    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var data = graphData;
    for (var i = 0; i < data.length; i++) {
        var arr = [];
        var dtstr = (i + 1) + ". " + data[i].date
        var itmttl = "৳" + data[i].y.toFixed(2);
        arr = [dtstr, "", itmttl]
        datalist.push(arr)
    }
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [1, 10, 25]
    let columnWidth = [19, 1, 16]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("-----------------------------\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(26);
        await SunmiInnerPrinter.printOriginalText("MONTHLY-SALES-REPORT\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("-----------------------------\n");
        await SunmiInnerPrinter.printOriginalText(summary._id.split("sale-")[1] + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);
        }
        // PRINT TOTAL
        var ttstr = "৳" + summary.total;
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        await SunmiInnerPrinter.printColumnsText(["", "TOTAL", ttstr], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}
// .........................................
export async function printZReportForDay(dailyData, account, callback) {
    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var data = dailyData;
    var grandtotal = 0.00;
    for (var i = 0; i < data.length; i++) {
        var arr = [];
        var dtstr = (i + 1) + ". " + data[i]._id.split("|")[1] + ""
        var itmttl = "৳" + data[i].total.toFixed(2);
        var tempGrand = data[i].total;
        grandtotal = grandtotal + tempGrand;
        arr = [dtstr, " ", ""]
        datalist.push(arr)
        for (var k = 0; k < data[i].order.length; k++) {
            var arr_submenu = [];
            var item_name = data[i].order[k].name + " x " + data[i].order[k].quantity;
            var item_total = data[i].order[k].item_total.toFixed(2);
            arr_submenu = ["  " + item_name, "", "৳" + item_total];
            datalist.push(arr_submenu)
        }
        datalist.push(["  TOTAL", "", itmttl])
    }
    grandtotal = grandtotal.toFixed(2)
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [1, 11, 24]
    let columnWidth = [19, 1, 16]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("-----------------------------\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(26);
        await SunmiInnerPrinter.printOriginalText("DAILY-SALES-REPORT\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("-----------------------------\n");
        await SunmiInnerPrinter.printOriginalText(dailyData[0]._id.split("|")[0] + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);
            if (datalist[i][0] == "  TOTAL") {
                if (i != (datalist.length - 1)) {
                    await SunmiInnerPrinter.setAlignment(1);
                    await SunmiInnerPrinter.printOriginalText("----------------------------------\n");
                }
            }
        }
        // PRINT TOTAL
        // var ttstr = "৳" + summary.total.toFixed(2);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        await SunmiInnerPrinter.printColumnsText(["", "GRAND TOTAL", "৳" + grandtotal], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}
// .........................................
export async function printSalesSummary(account, summary, callback) {
    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var summtotal = "৳" + summary.total.toFixed(2)
    var summprofit = "৳" + summary.profit.toFixed(2)
    var summdue = "৳" + summary.total_due.toFixed(2)
    datalist.push(["  TOTAL", "", summtotal])
    datalist.push(["  PROFIT", "", summprofit])
    datalist.push(["  DUES", "", summdue])
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [1, 11, 24]
    let columnWidth = [19, 1, 16]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("-----------------------------\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(26);
        await SunmiInnerPrinter.printOriginalText("SALES SUMMARY\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("-----------------------------\n");
        await SunmiInnerPrinter.printOriginalText(summary._id.split("|")[0] + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);
            if (datalist[i][0] == "  TOTAL") {
                if (i != (datalist.length - 1)) {
                    await SunmiInnerPrinter.setAlignment(1);
                    await SunmiInnerPrinter.printOriginalText("----------------------------------\n");
                }
            }
        }
        // PRINT TOTAL
        // var ttstr = "৳" + summary.total.toFixed(2);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}
// .........................................
export async function printAllDuesSummary(account, allDues, callback) {
    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var ttl_due = 0.00
    var data = allDues;
    for (var i = 0; i < data.length; i++) {
        ttl_due = ttl_due + data[i].total_due
        var dtstr = (i + 1) + ". " + data[i].phone_number
        var namestr = "   " + data[i].name
        var itmttl = "৳" + data[i].total_due.toFixed(2);
        var empt = "\t"
        var arr = [dtstr, "", itmttl]
        var arr2 = [namestr, "", empt]
        datalist.push(arr)
        datalist.push(arr2)
    }
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [1, 10, 25]
    let columnWidth = [19, 1, 16]
    let custcolumwidth = [19, 1, 1]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(26);
        await SunmiInnerPrinter.printOriginalText("ALL-DUES\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS

        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);
        }
        // PRINT TOTAL
        var ttstr = "৳" + ttl_due.toFixed(2);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        await SunmiInnerPrinter.printColumnsText(["", "TOTAL DUES", ttstr], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("=================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}

function customDate(date) {
    var d = new Date(date)
    var day = d.getDate()
    var month = d.getMonth() + 1
    var year = d.getFullYear()
    var fullDate = day + '-' + month + '-' + year
    return fullDate
}
export async function printSpecificDuesSummary(account, specificDue, callback) {
    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var ttl_due = 0.00
    var data = specificDue.due;
    for (var i = 0; i < data.length; i++) {
        ttl_due = ttl_due + data[i].due
        var arr = [];
        var arr2 = [];
        var dtstr = (i + 1) + ". " + customDate(data[i].date)
        var itmttl = "৳" + data[i].due.toFixed(2);
        arr = [dtstr, "", itmttl]
        datalist.push(arr)
    }
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [1, 10, 25]
    let columnWidth = [19, 1, 16]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        await SunmiInnerPrinter.printColumnsText(["Customer Name", "", specificDue.name], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.printColumnsText(["Phone Num", "", specificDue.phone_number], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("SPECIFIC-DUES\n")
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);

        }
        // PRINT TOTAL
        var totalPaid = specificDue.total - specificDue.total_due
        var ttstr = "৳" + ttl_due.toFixed(2);
        var ttlpaid = "৳" + totalPaid
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        await SunmiInnerPrinter.printColumnsText(["", "TOTAL PAID", ttlpaid], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["", "TOTAL DUES", ttstr], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}
export async function printSpecificDuesHistory(account, specificDue, callback) {

    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var ttl_paid = 0.00
    var data = specificDue.paidinfo;
    for (var i = 0; i < data.length; i++) {
        var arr = [];
        var arr2 = [];
        var spltDate = data[i].date.split(",")[0]
        var spltTime = data[i].date.split(",")[1]
        var empt = "\t"
        var dtstr = (i + 1) + ". " + spltDate
        var dtstr2 = "  " + spltTime
        var itmttl = "৳" + data[i].paid_amnt.toFixed(2);
        arr = [dtstr, "", itmttl]
        arr2 = [dtstr2, "", empt]
        datalist.push(arr)
        datalist.push(arr2)
    }
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [1, 10, 25]
    let columnWidth = [19, 1, 16]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        await SunmiInnerPrinter.printColumnsText(["Customer Name", "", specificDue.name], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.printColumnsText(["Phone Num", "", specificDue.phone_number], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("DUES PAYMENT HISTORY\n")
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);

        }
        // PRINT TOTAL
        var totalPaid = specificDue.total - specificDue.total_due
        var ttlpaid = "৳" + totalPaid.toFixed(2);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        await SunmiInnerPrinter.printColumnsText(["", "TOTAL PAID", ttlpaid], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}


export async function printDetailsDuesSummary(account, currentDue, specificDue, callback) {
    var datalist = [];
    var shop_name = account.shop_name;
    var address = account.address;
    var vat_reg_number = account.vat_registration_number;
    var ttl_due = 0.00
    var data = specificDue.order;
    for (var i = 0; i < data.length; i++) {
        ttl_due = ttl_due // + data[i].due
        var arr = [];
        var arr2 = [];
        var dtstr = (i + 1) + ". " + data[i].name
        var prcstr = "৳" + data[i].price.toFixed(2) + " x " + data[i].quantity;
        var itmttl = "৳" + data[i].item_total.toFixed(2);
        arr = [dtstr, prcstr, itmttl]
        //arr2 = [namestr, "", ""]
        datalist.push(arr)
        // datalist.push(arr2)
    }
    let columnAliment = [0, 1, 2];
    let subColumnWidth = [10, 1, 25]
    let columnWidth = [10, 16, 10]
    try {
        //set aligment: 0-left,1-center,2-right
        await SunmiInnerPrinter.setAlignment(1);
        // PRINT SHOP NAME
        await SunmiInnerPrinter.setFontSize(32);
        await SunmiInnerPrinter.printOriginalText(shop_name + "\n")
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT OTHER SHOP DETAILS
        await SunmiInnerPrinter.printOriginalText(address + "\n")
        await SunmiInnerPrinter.printOriginalText(vat_reg_number + "\n")
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        await SunmiInnerPrinter.printColumnsText(["Customer Name", "", currentDue.name], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.printColumnsText(["Phone Num", "", currentDue.phone_number], [17, 1, 16], [0, 1, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        await SunmiInnerPrinter.setFontSize(24);
        await SunmiInnerPrinter.printOriginalText("ORDER-DETAILS\n")
        await SunmiInnerPrinter.printOriginalText(new Date(specificDue.date).toUTCString() + "\n");
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("================================\n");
        // PRINT RECEIPT ITEMS
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.setFontSize(22);
        for (var i in datalist) {
            await SunmiInnerPrinter.printColumnsText(datalist[i], columnWidth, columnAliment);

        }
        // PRINT TOTAL
        var totalPaid = specificDue.total - (specificDue.due + specificDue.discount)
        var total = specificDue.total.toFixed(2) - specificDue.discount.toFixed(2)
        var subttl = "৳ " + specificDue.subtotal.toFixed(2);
        var tax = "৳ " + specificDue.tax.toFixed(2);
        var discount = "৳ " + specificDue.discount.toFixed(2);
        var ttl = "৳ " + total.toFixed(2);
        var ttldue = "৳ " + specificDue.due.toFixed(2);
        var ttlpaid = "৳ " + totalPaid.toFixed(2);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        await SunmiInnerPrinter.printColumnsText(["SUB TOTAL", "", subttl], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["TAX", "", tax], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["DISCOUNT", "", discount], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        await SunmiInnerPrinter.printColumnsText(["TOTAL", "", ttl], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["PAID", "", ttlpaid], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.printColumnsText(["DUES", "", ttldue], subColumnWidth, [0, 2, 2]);
        await SunmiInnerPrinter.setAlignment(1);
        await SunmiInnerPrinter.printOriginalText("==================================\n");
        // PRINT POWERED BY LOGO
        await SunmiInnerPrinter.printBitmap(Logobase64, 304/*width*/, 380/*height*/);
        await SunmiInnerPrinter.printOriginalText("\n\n\n\n");
        callback()
    } catch (e) {
        console.log(e)
        alert("print error." + e.message);
    }
}