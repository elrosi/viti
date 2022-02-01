/**
 * Classic calculation, Water volume (l/ha)
 * Spritzbrühe [L / ha]
 * Result for column H
 * @param {object} B  | Product
 * @param {object} F  | Gesamtdüsenanzahl des Sprühgeräts
 * @param {object} G  | Einsparung bei Recyclinggeräten [%]
 * @param {string} ID | ID of the spraying plan
 * @return {number}
 */
function WATER_VOLUME (B, F, G, ID) {

    var calculationType = ID;
    var result = '0,00';

    var Fv = 0, Gv = 0;

    Fv = F.v;
    if (typeof Fv == 'string') {
        Fv = Fv.replace(',', '.').replace(' ', '');
    }

    Gv = G.v;
    if (typeof Gv == 'string') {
        Gv = Gv.replace(',', '.').replace(' ', '');
    }

    // Reb-Entwicklungsstadium
    var growth_stage = jQuery(calculationType).data('growth-stage').toLowerCase();

    // Berechnungsmethode
    var type = jQuery(calculationType).data('type');

    // Used water volume for 100 % leaf wall area [L] | Wasseraufwandmenge/ha bei voller Belaubung
    var singleValues3 = jQuery( calculationType + "_used_water" ).val();

    // Amount of used nozzles for 100 % leaf wall area [pcs] | Gesamtdüsenanzahl des Sprühgeräts
    var singleValues4 = jQuery( calculationType + "_used_nozzles" ).val();

    if (B.v == "Kumulus® WG" && growth_stage == "austrieb" && type == "Classic") {

        if (Gv > 0) {
            // (1-G.v)*(C21/C22*F25)
            result = (singleValues3 / singleValues4) * Fv;
            var save = 100 - Gv;
            result = (result / 100) * save;
        } else {
            // (C21/C22*F25)
            result = (singleValues3 / singleValues4) * Fv;

            if (Gv > 0)  {
                var save = 100 - Gv;
                result = (result / 100) * save;
            }

        }

    } else {
        if (Fv > 0) {
            if ( singleValues4 > 0) {
                result = singleValues3 * Fv / singleValues4;
                if (Gv > 0)  {
                    var save = 100 - Gv;
                    result = (result / 100) * save;
                }
            }
        }
    }

    result = parseFloat(result).toFixed(2);

    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Classic calculation, Does rate pre ha (kg/l)
 * Berechnete Aufwandmenge pro ha [kg, L, Stk]
 * Result for column I
 * @param {object} B | Product
 * @param {object} C | Aufwandmenge pro ha
 * @param {object} F | Geöffnete (benützte) Düsen
 * @param {object} G | Einsparung bei Recyclinggeräten [%]
 * @param {string} ID | ID of the spreadsheet
 * @return {number}
 */
function DOES_RATE_PER_HA (B,C,F,G,ID) {

    var calculationType = ID;
    var result = '0,00';

    var Cv, Fv, Gv;
    Cv = C.v;
    Fv = F.v;
    Gv = G.v;

    if (typeof Cv == 'string') {
        Cv = Cv.replace(',','.').replace(' ','');
    }

    if (typeof Fv == 'string') {
        Fv = Fv.replace(',','.').replace(' ','');
    }

    // Reb-Entwicklungsstadium
    var growth_stage = jQuery(calculationType).data('growth-stage').toLowerCase();

    // Berechnungsmethode
    var type = jQuery(calculationType).data('type');

    // Amount of used nozzles for 100 % leaf wall area [pcs]
    var singleValues4 = jQuery(calculationType + "_used_nozzles" ).val();

    if (B.v == "Kumulus® WG" && growth_stage == "austrieb" && type == "Classic") {
        if (G.v > 0) {
            result = C.v;
            var save = 100 - Gv;
            result = (result / 100) * save;
        } else {
            result = C.v;
        }
    } else if (B.v == "Kumulus® WG" && growth_stage != "austrieb" && type == "Classic") {
        result = 3;
    } else {
        if (Cv > 0 && Fv > 0) {

            result = Cv * Fv / singleValues4;

            // Einsparung bei Recyclinggeräten [%]
            if (G.v !== undefined) {

                if (typeof Gv == 'string') {
                    Fv = Fv.replace(',','.').replace(' ','');
                }

                if (G.v > 0) {
                    var save = 100 - Gv;
                    result = (result / 100) * save;
                }
            }
        }
    }

    result = parseFloat(result).toFixed(2);
    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Classic calculation, Demand of products per farm (kg/l)
 * Produkt pro Weingartenfläche (kg,l)
 * Result for column J
 * @param {object} B | Product
 * @param {object} E | Behandelte Fläche [ha]
 * @param {object} I | Berechnete Aufwandmenge pro ha [kg, L, Stk]
 * @param {string} ID | ID of the spreadsheet
 * @returns {number}
 * @constructor
 */
function PRODUCT_PER_FARM (B, E, I, ID) {

    var calculationType = ID;
    var result = '0,00';
    var Ev, Iv;

    Ev = E.v;
    if (typeof Ev == 'string' && Ev.charAt(0) != "=") {
        Ev = Ev.replace(',','.').replace(' ','');
    }

    Iv = I.v;
    if (typeof Iv == 'string' && Iv.charAt(0) != "=") {
        Iv = Iv.replace(',','.').replace(' ','');
    }

    // Reb-Entwicklungsstadium
    var growth_stage = jQuery(calculationType).data('growth-stage').toLowerCase();

    // Berechnungsmethode
    var type = jQuery(calculationType).data('type');

    // Behandelte Fläche [ha] | Size of the vineyard [ha]
    var singleValues1 = jQuery( calculationType + "_size_vineyard" ).val();

    if (B.v == "Kumulus® WG" && growth_stage == "austrieb" && type == "Classic") {
        if (Ev > 0) {
            result = Ev * Iv;
        } else {
            result = singleValues1 * Iv;
        }
    } else {
        if (Ev > 0) {
            result = Ev * Iv;
        } else {
            result = singleValues1 * Iv;
        }
    }

    result = parseFloat(result).toFixed(2);
    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Classic calculation, Products per spraying device kg/l)
 * Result for column K
 *
 * @param {string} B | product title
 * @param H {object}
 * @param G {object}
 * @param I {object}
 * @param {string} ID | ID of the spreadsheet
 * @returns {number}
 */
function PRODUCT_PER_SPRAING(B,G, H,I,ID) {

    // kumulus v inom ako Austrieb delene 2
    var calculationType = ID;
    var result = '0,00';
    var Gv, Hv, Iv;

    Gv = G.v;
    if (typeof Gv == 'string' && Gv.charAt(0) != "=") {
        Gv = Gv.replace(',','.').replace(' ','');
    }

    Hv = H.v;
    if (typeof Hv == 'string' && Hv.charAt(0) != "=") {
        Hv = Hv.replace(',','.').replace(' ','');
    }

    Iv = I.v;
    if (typeof Iv == 'string' && Iv.charAt(0) != "=") {
        Iv = Iv.replace(',','.').replace(' ','');
    }

    // Reb-Entwicklungsstadium
    var growth_stage = jQuery(calculationType).data('growth-stage').toLowerCase();

    // Berechnungsmethode
    var type = jQuery(calculationType).data('type');

    // Inhalt Spritzfass
    var singleValues2 = jQuery( calculationType + "_spraying_device" ).val();

    // specialne pre Kumulus v prvej rastovej faze
    if (B.v == "Kumulus® WG" && growth_stage == "austrieb" && type == "Classic") {
        if (Iv > 0 && Hv > 0) {
            // Kalkulation for &quot;Produktmenge pro Pflanzenschutzgerät&quot; = &quot;Berechnete Aufwandmenge pro ha (7)&quot; x Inhalt Spritzfass (200) / &quot;Spritzbrühe (80) = 17,5
            result =  (Iv * singleValues2) / Hv;
        }
    } else {
        if (Iv > 0 && Hv > 0) {
            result =  (Iv / Hv) * singleValues2;
        }
    }

    result = parseFloat(result).toFixed(2);
    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Leaf Wall Calculation, Water volume (l/ha)
 * Spritzbrühe [L / ha]
 * Result for column K
 * Formula: K = V3 /V4 * H
 * @param H {Object}
 * @param {string} ID | ID of the spreadsheet
 * @return {number}
 */
function LEAF_WALL_WATER_VOLUME(H,ID) {

    var calculationType = ID;
    var result = '0,00';
    var Hv;

    // Parse text to float
    Hv = H.v;
    if (typeof Hv == 'string' && Hv.charAt(0) != "=") {
        Hv = Hv.replace(',','.').replace(' ','');
    }

    // Used water volume for 100 % leaf wall area [L] | Wasseraufwandmenge/ha bei voller Belaubung
    var singleValues3 = $( calculationType + "_used_water" ).val();

    // Amount of used nozzles for 100 % leaf wall area [pcs]
    var singleValues4 = $( calculationType + "_used_nozzles" ).val();

    if (Hv > 0) {
        if (singleValues4 > 0) {
            result = singleValues3 / singleValues4 * Hv;
            result = parseFloat(result).toFixed(2);
        }
    }

    // Parse float to text
    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Leaf Wall calculation, Does rate pre ha (kg/l)
 * Berechnete Aufwandmenge pro ha [kg, L, Stk]
 * Column result for L
 * Formula: If I > 0   N = M / I
 *          If I = 0   N = M / V1
 * @param C {object}
 * @param E {object}
 * @param G {object}
 * @param J {object}
 * @param {string} ID | ID of the spreadsheet
 * @return {number}
 */
function LEAF_WALL_DOES_RATE_PER_HA (C,E,G,J,ID) {

    var calculationType = ID;
    var result = '0,00';
    var Cv, Ev, Gv, Jv;

    Cv = C.v;
    if (typeof Cv == 'string' && Cv.charAt(0) != "=") {
        Cv = Cv.replace(',','.').replace(' ','');
    }

    Ev = E.v;
    if (typeof Ev == 'string' && Ev.charAt(0) != "=") {
        Ev = Ev.replace(',','.').replace(' ','');
    }

    Gv = G.v;
    if (typeof Gv == 'string' && Gv.charAt(0) != "=") {
        Gv = Gv.replace(',','.').replace(' ','');
    }

    Jv = J.v;
    if (typeof Jv == 'string' && Jv.charAt(0) != "=") {
        Jv = Jv.replace(',','.').replace(' ','');
    }

    if (Cv > 0 && Ev > 0 && Gv > 0) {
        result = Cv * (10000 / Ev * Gv * 2) / 10000;
        if (Jv > 0) {
            var save = 100 - Jv;
            result = (result / 100) * save;
        }
        result = parseFloat(result).toFixed(2);
    }

    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Leaf Wall calculation, Demand of products per farm(M)
 * Produkt pro Weingartenfläche (kg,l)
 * Result for column M
 * Formula:
 * @param L {object}
 * @param I {object}
 * @param G {object}
 * @param E {object}
 * @param {string} ID | ID of the spreadsheet
 * @constructor
 */
function LEAF_WALL_PRODUCT_PER_FARM (L,I,G,E,ID) {

    var calculationType = ID;
    var result = '0,00';
    var Lv, Iv, Gv, Ev;

    Lv = L.v;
    if (typeof Lv == 'string' && Lv.charAt(0) != "=") {
        Lv = Lv.replace(',','.').replace(' ','');
    }

    Iv = I.v;
    if (typeof Iv == 'string' && Iv.charAt(0) != "=") {
        Iv = Iv.replace(',','.').replace(' ','');
    }

    Gv = G.v;
    if (typeof Gv == 'string' && Gv.charAt(0) != "=") {
        Gv = Gv.replace(',','.').replace(' ','');
    }

    Ev = E.v;
    if (typeof Ev == 'string' && Ev.charAt(0) != "=") {
        Ev = Ev.replace(',','.').replace(' ','');
    }

    // Size of the vineyard [ha]
    var singleValues1 = jQuery( calculationType + "_size_vineyard" ).val();

    if (Iv > 0) {
        result = Lv * Iv;
        result = parseFloat(result).toFixed(2);
    } else {
        result = Lv * singleValues1;
        result = parseFloat(result).toFixed(2);
    }

    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Leaf Wall Calculation, Products per spraying device (kg,l)
 * Produktmenge pro Pflanzenschutzgerät [kg, L, Stk]
 * Result for column L
 * Formula:
 * @param L {object}
 * @param M {object}
 * @param I {object}
 * @param {string} ID | ID of the spreadsheet
 * @return {number}
 */
function LEAF_WALL_PRODUCT_PER_SPRAING(L,M,I,ID) {

    var calculationType = ID;
    var result = '0,00';
    var Lv, Mv, Iv;

    Lv = L.v;
    if (typeof Lv == 'string' && Lv.charAt(0) != "=") {
        Lv = Lv.replace(',','.').replace(' ','');
    }

    Mv = M.v;
    if (typeof Mv == 'string' && Mv.charAt(0) != "=") {
        Mv = Mv.replace(',','.').replace(' ','');
    }

    Iv = I.v;
    if (typeof Iv == 'string' && Iv.charAt(0) != "=") {
        Iv = Iv.replace(',','.').replace(' ','');
    }

    // Size of the vineyard [ha]
    var singleValues1 = jQuery( calculationType + "_size_vineyard" ).val();

    // Used water volume for 100 % leaf wall area [L]
    var singleValues2 = jQuery( calculationType + "_spraying_device" ).val();

    if (Lv > 0 && Iv > 0 ) {
        result = Lv / Iv * singleValues2;
        result = parseFloat(result).toFixed(2);
    } else if (Lv > 0 && Iv == 0 ) {
        result = Lv / singleValues1 * singleValues2;
        result = parseFloat(result).toFixed(2);
    }

    if (result > 0) {
        return result.toString().replace('.',',');
    }

    return '0,00';
}

/**
 * Generate aggregate data for the final report
 * @param data array
 */
function getAggregateTableData(data) {

    let Aggregate = [],
        Products = [],
        Results = [],
        Parameters = [],
        Items = Object.values(data);

    if (Array.isArray(Items)) {

        for (var i = 0; i < Items.length; i++) {
            for (var j = 0; j < Items[i].length; j++) {
                Products.push(Items[i][j]);
            }
        }

        for (var row = 0; row < Products.length; row++) {
            Parameters[row] = Products[row].slice(1, 4);
            Results[row] = Products[row].slice(-5, -1);
            Aggregate[row] = [].concat(Parameters[row], Results[row]);
            Aggregate[row][3] = Number(parseFloat(Aggregate[row][3].replace(',','.').replace(' ','')));
            Aggregate[row][4] = Number(parseFloat(Aggregate[row][4].replace(',','.').replace(' ','')));
            Aggregate[row][5] = Number(parseFloat(Aggregate[row][5].replace(',','.').replace(' ','')));
            Aggregate[row][6] = Number(parseFloat(Aggregate[row][6].replace(',','.').replace(' ','')));
        }
    }

    return sumAggregateProducts(Aggregate);
}

/**
 *
 * @param data
 * @returns Array
 **/
function sumAggregateProducts(data) {

    var newArray = [];
    var myArray = [];

    // FFINAL RESULT TABLE OPTION
    var optionResult = {
        tableClass: "result",
        calType: "result",
        data: [],
        columnResize: false,
        allowInsertColumn: false,
        allowDeleteColumn: false,
        eraseCell: false,
        columnSorting: false,
        allowInsertRow: true,
        allowManualInsertRow: false,
        selectionCopy: false,
        contextMenu: function () {
            return false
        },
        actionMenu: false,
        colAlignments: ['left', 'left', 'left', 'left'],
        colHeaderClasses: [
            'head-product',
            'head-unit',
            'head-distance',
            'head-leaf-wall'
        ],
        colHeaders: [
            lang.Product,
            lang.RegNum,
            lang.PerVineyard,
            lang.Unit
        ],
        colHeadersTitle: [
            lang.Product,
            lang.RegNum,
            lang.PerVineyard,
            lang.Unit
        ],
        colWidths: [200, 100, 170, 150],
        columns: [
            {type: 'text', readOnly: true},
            {type: 'text', readOnly: false},
            {type: 'text', readOnly: true},
            {type: 'text', readOnly: true}
        ],
    };

    jQuery.getJSON("../json/basf_product/", function (basfProducts) {

        var res = [];

        jQuery.each(basfProducts, function (key, val) {
            myArray[key] = val;
        });

        data.reduce(function (res, value) {

            // vyhladanie produktu podla mena v zozname vsetkých produktov
            var regNum = myArray.filter(function (product) {
                if (product.name == value[0]) {
                    return product;
                }
            });

            if (!res[value[0]]) {
                // pridanie produktu ktory nie je v zozname agregovanych dat
                if (regNum.length) {
                    res[value[0]] = [value[0], regNum[0].pfl_reg_nr, value[5], value[2]];
                } else {
                    res[value[0]] = [value[0], '', value[5], value[2]];
                }
                newArray.push(res[value[0]]);
            } else {
                // pripocitanie hodnoty v existujucom produkte agregovanych dat
                if (typeof value[5] == 'string') {
                    var add = Number(value[5]).toFixed(2);
                    res[value[0]][2] = Number(res[value[0]][2]).toFixed(2);
                    res[value[0]][2] += add;
                } else {
                    res[value[0]][2] += value[5];
                }
            }

            return res;

        }, {});

        // Nastavenie dátového pola pre Final Result
        optionResult.data = newArray;

        // Inicializacia final result tabulky
        if (!$.fn.jexcel.defaults['results']) {
            jQuery('#results').jexcel(optionResult);
        } else {
            jQuery('#results').jexcel('destroy');
            jQuery('#results').jexcel(optionResult);
        }

    });
}

/**
 *
 * @param data
 * @param calType
 * @param id
 */
function validateResultData(data, calType, id) {

    var error = [];

    if (calType == "Leaf wall") {

        var calculationType = id;

        // Size of the vineyard [ha]
        var singleValues1 = jQuery( "#" + calculationType + "_size_vineyard" ).val();
        var countItems = data.length;

        for (var i = 0; i < countItems; i++) {

            if (typeof data[i][5] == 'string') {
                data[i][5] = data[i][5].replace(',', '.').replace(' ', '');
            }
            if (typeof data[i][8] == 'string') {
                data[i][8] = data[i][8].replace(',', '.').replace(' ', '');
            }
            if (typeof data[i][12] == 'string') {
                data[i][12] = data[i][12].replace(',', '.').replace(' ', '');
            }

            if (data[i][5] > 0) {
                if (data[i][8] > 0) {
                    if (data[i][12] > (data[i][5] * data[i][8])) {
                        error[i] = true;
                    }
                } else {
                    if (data[i][12] > (data[i][5] * singleValues1)) {
                        error[i] = true;
                    }
                }
            }
        }

        if (error.length > 0) {
            Cookies.set('error', error);
        }
    }
}

/**
 *
 * @param obj
 * @param cell
 * @param val
 */
changeData = function(obj, cell, val) {

    var tableId = $(obj).prop('id');
    var url = "../json/basf_product/";
    var position = jQuery(cell).prop('id').split("-");
    var row = Number(position[1]) + 1;
    var col = Number(position[0]);
    var unit = '';
    var dose_rate = 0;
    var growthStage = jQuery(obj).data("growth-stage");

    var a = growthStage;

    if (col == 1 && val != '') {

        //var UnitCell = Number(col) + 1;
        //var DoseRateCell = Number(col) + 2;

        $.getJSON(url, function (products) {
            $.each(products, function (index, product) {
                if (product.name == val) {

                    unit = product.unit;
                    unit = product.unit;

                    if (product.dose_rate !== undefined) {
                        //dose_rate = product.dose_rate;
                        if (product.name == "Kumulus® WG" && growthStage == "austrieb") {
                            if (product.dose_rate.growthStage !== undefined || product.dose_rate.growthStage !== "") {
                                dose_rate = product.dose_rate.austrieb;
                            } else {
                                dose_rate = product.dose_rate.default;
                            }
                        } else {
                            dose_rate = product.dose_rate.default;
                        }
                    }

                    jQuery('#'+tableId).jexcel('setValue', 'C'+row, dose_rate);
                    jQuery('#'+tableId).jexcel('setValue', 'D'+row, unit);
                }
            });
        });
    }

    $('#'+tableId).jexcel('setData', false);
}

/**
 *
 * @param message
 * @param value
 */
afterchange = function(obj) {

    var id = jQuery(obj).prop('id');
    var calType = jQuery(obj).data('type');
    var data = jQuery('#'+id).jexcel('getData', false);

    validateResultData(data, calType, id);
    var JsonData = JSON.stringify(data);
    delete JsonData["results"];
    window.agregateData[id] = JsonData;

    var error = Cookies.get('error');

    if (typeof error !== "undefined") {
        if (error.length > 0) {
            jQuery.alert({
                title: "Fehler",
                content: lang.LwaError,
                animation: 'opacity',
                closeAnimation: 'opacity',
                animateFromElement: false,
                animationSpeed: 200,
                theme: 'modern',
                buttons: {
                    okay: {
                        text: lang.ButtonOK,
                        btnClass: 'btn-blue'
                    }
                }
            });
            Cookies.remove('error');
        }
    }

}

/**
 *
 * @param obj
 * @param cell
 * @param oldValue
 * @param newValue
 */
beforechange = function (obj, cell, oldValue, newValue) {}

/**
 *
 * @param obj
 * @param row
 * @param records
 */
insertrow = function (obj, row, records) {}

/**
 *
 * @param obj
 * @param row
 */
deleterow = function (obj, row) {}

/**
 *
 * @param array data
 * @returns {any[]}
 */
getAgregateData = function () {
    return window.agregateData;
}

/**
 *
 * @type {{getValue: (function(*=): (*|jQuery)),
 * closeEditor: (function(*=, *): jQuery),
 * setValue: (function(*=, *=): boolean),
 * openEditor: productEditor.openEditor}}
 */
var productEditor = {
    // Methods
    openEditor : function(cell, empty) {

        // Calculation Table
        var tableId = jQuery("table").parent().prop('id');

        // Keep the current value
        jQuery(cell).addClass('edition');

        // get hidden input element
        var input = jQuery(cell).find('input');

        // Get current content
        var html = jQuery(cell).html();

        // Get current value
        var value = jQuery(cell).find('input');
        if (jQuery(value).length) {
            value = jQuery(cell).find('input').val();
        } else {
            value = jQuery(cell).html();
        }

        // get detail cell info
        var cell_id = jQuery(cell).prop('id');
        var res = jQuery(cell).prop('id').split("-");
        var row = res[1];
        var col = res[0];

        // create editor element
        var editor = document.createElement('input');
        jQuery(editor).prop('class', 'editor');
        jQuery(editor).prop('id', 'products_' + row);
        jQuery(editor).prop('value', 'products_' + value);
        jQuery(editor).css('width', jQuery(cell).width());
        jQuery(editor).css('height', jQuery(cell).height());
        jQuery(cell).html(editor);

        // Current value
        jQuery(editor).focus();
        if (! empty) {
            jQuery(editor).val(value);
        }

        var options = {
            url: "../json/basf_product/",
            getValue: "name",
            placeholder: lang.AutocompletePlaceholder,
            list: {
                match: {
                    enabled: true
                },
                showAnimation: {
                    type: "fade", //normal|slide|fade
                    time: 400,
                    callback: function() {}
                },
                hideAnimation: {
                    type: "slide", //normal|slide|fade
                    time: 400,
                    callback: function() {}
                },
                onChooseEvent: function() {
                    var $originalInput = jQuery(cell).find('input').clone();
                    var $autoComplete = jQuery(cell).find('input').closest(".easy-autocomplete");
                    $autoComplete.replaceWith($originalInput);
                    jQuery('#' + $.fn.jexcel.current).jexcel('closeEditor', jQuery(cell), true);
                },
                onSelectItemEvent: function() {
                    jQuery('products_' + row).val(value).trigger("change"); //copy it to the hidden field
                },
                getValue: function(element) {
                    return jQuery(element).find("name").text();
                },
            },
            template: {
                type: "description",
                fields: {
                    description: "type"
                }
            },
            theme: "square"
        };

        jQuery(editor).easyAutocomplete(options);

    },
    closeEditor : function(cell, save) {

        var tableId = jQuery("table").parent().prop('id');

        // Cell Id
        var id = jQuery(cell).prop('id');

        // original content
        var $originalInput = jQuery(cell).find('input').val();

        // Close edition
        jQuery(cell).removeClass('edition');

        // Get content
        var value = jQuery(cell).find('.editor').val();

        // Update values
        $.fn.jexcel.ignoreHistory = false;

        var $autoComplete = jQuery(cell).find('input').closest(".easy-autocomplete");
        $autoComplete.replaceWith($originalInput);

        // Save history
        return value;
    },
    getValue : function(cell) {
        var value = jQuery(cell).find('input');
        if (jQuery(value).length) {
            value = jQuery(cell).find('input').val();
        } else {
            value = jQuery(cell).html();
        }
        return value;
    },
    setValue : function(cell, value, force) {
        // set columns value
        if (value) {
            jQuery(cell).html(value); // current cell = product name
        }
    }
};

// BASE DATA
var agregateData = [];

jQuery(document).ready(function() {

    jQuery('.SlectBoxType').SumoSelect({forceCustomRendering: true});
    jQuery('.SlectBoxGrowth').SumoSelect({forceCustomRendering: true});
    jQuery('.SlectBoxFarm').SumoSelect({
        cforceCustomRendering: true
    });
    jQuery('.SlectBoxEquipment').SumoSelect({
        forceCustomRendering: true
    });

    // Select Farm
    jQuery('select.SlectBoxFarm').on('sumo:closing', function(sumo) {
        jQuery('#sizeVineyard').val(jQuery(this).find(":selected").data("size_vineyard")); // Size vineyard / ha
        jQuery('#distanceBetweenRows').val(jQuery(this).find(":selected").data("distance")); // Distance between rows
    });

    // Select Equipment
    jQuery('select.SlectBoxEquipment').on('sumo:closing', function(sumo) {
        var total = jQuery(this).val();
        var water = jQuery(this).find(":selected").data("used_water");         // Used water volume for 100 % leaf wall area [L]
        var spraying = jQuery(this).find(":selected").data("spraying_device"); // Volume of the spraying device [L]
        var name = jQuery(this).find(":selected").html();
        jQuery("#totalUsedNozzles").val(total);
        // total used water volume for 100 % leaf wall area [L]
        jQuery("#usedWaterVolume").val(water);
        // total spraying devices
        jQuery("#volumeSprayingDevice").val(spraying);
        // all selected equipment name
        jQuery("#titleUsedNozzles").val(name);
    });

    jQuery(document).on('click', '.add-row-modal', function (e) {
        e.preventDefault();
        var type = jQuery(this).data('type');
        var cal = jQuery(this).data('cal');
        var growth = jQuery(this).data('growth');
        var distance = jQuery(this).data('distance');
        var used_nozzles = jQuery(this).data('used_nozzles');
        var size_vineyard = jQuery(this).data('size_vineyard');

        if (type == "Classic") {

            jQuery("#calculator_name").val(cal);
            jQuery("#calculator_type").val(type);
            jQuery("#calculator_growth").val(growth);
            jQuery("#calculator_distance").val(distance);

            /*if (Cookies.get('used_nozzles')) {
                jQuery("#used_nozzles").val(Cookies.get('used_nozzles'));
            } else {
                jQuery("#used_nozzles").val(used_nozzles);
            }

            if (Cookies.get('dose_rate')) {
                jQuery("#dose_rate").val(Cookies.get('dose_rate'));
            }

            if (Cookies.get('unit')) {
                jQuery("#unit").val(Cookies.get('unit'));
            }

            if (Cookies.get('treated_area')) {
                jQuery("#treated_area").val(Cookies.get('treated_area'));
            } else {
                jQuery("#treated_area").val(size_vineyard);
            }

            if (Cookies.get('saved_water')) {
                jQuery("#saved_water").val(Cookies.get('saved_water'));
            }*/

            jQuery("#used_nozzles").val(used_nozzles);
            jQuery("#treated_area").val(size_vineyard);

        } else {
            jQuery("#calculator_name_lwa").val(cal);
            jQuery("#calculator_type_lwa").val(type);
            jQuery("#calculator_growth_lwa").val(growth);
            jQuery("#calculator_distance_lwa").val(distance);

            /*if (Cookies.get('used_nozzles_lwa')) {
                jQuery("#used_nozzles_lwa").val(Cookies.get('used_nozzles_lwa'));
            } else {
                jQuery("#used_nozzles_lwa").val(used_nozzles);
            }

            if (Cookies.get('dose_rate_lwa')) {
                jQuery("#dose_rate_lwa").val(Cookies.get('dose_rate_lwa'));
            }

            if (Cookies.get('unit_lwa')) {
                jQuery("#unit_lwa").val(Cookies.get('unit_lwa'));
            }

            if (Cookies.get('dose_max_lwa')) {
                jQuery("#dose_max_lwa").val(Cookies.get('dose_max_lwa'));
            }

            if (Cookies.get('height_lwa')) {
                jQuery("#height_lwa").val(Cookies.get('height_lwa'));
            }

            if (Cookies.get('treated_area_lwa')) {
                jQuery("#treated_area_lwa").val(Cookies.get('treated_area_lwa'));
            } else {
                jQuery("#calculator_size_vineyard_lwa").val(size_vineyard);
            }

            if (Cookies.get('saved_water_lwa')) {
                jQuery("#saved_water_lwa").val(Cookies.get('saved_water_lwa'));
            }*/

            jQuery("#used_nozzles_lwa").val(used_nozzles)
            jQuery("#unit_lwa").val(Cookies.get('unit_lwa'));
            jQuery("#calculator_size_vineyard_lwa").val(size_vineyard);

        }

        var iid = jQuery(this).attr('href');
        jQuery("[href=" + iid + "]").magnificPopup({
            type: 'inline',
            preloader: false,
            modal: true,
            callbacks: {
                beforeOpen: function() {

                    jQuery('#calculation-form .jcalendar').remove();

                    // autocomplet pre basf produkty len pre klasicku kalkulaciu
                    if (type == "Classic") {
                        jQuery('#modaldate').jcalendar({format:'DD. MM. YYYY',mask:0});
                        var options = {
                            url: "../json/basf_product/",
                            getValue: "name",
                            placeholder: lang.AutocompletePlaceholder,
                            type:type,
                            list: {
                                match: {
                                    enabled: true
                                },
                                showAnimation: {
                                    type: "fade", //normal|slide|fade
                                    time: 400,
                                    callback: function () {
                                    }
                                },
                                hideAnimation: {
                                    type: "slide", //normal|slide|fade
                                    time: 400,
                                    callback: function () {
                                    }
                                },
                                onLoadEvent: function() {
                                    //console.log('onLoadEvent');
                                },
                                onChooseEvent: function () {
                                    var product = jQuery("#product").getSelectedItemData().name;
                                    var unit = jQuery("#product").getSelectedItemData().unit;
                                    var dose_rate = jQuery("#product").getSelectedItemData().dose_rate;
                                    jQuery("#unit").val(unit).trigger("change");
                                    if (growth == 'austrieb' && product == "Kumulus® WG") {
                                        var dose_rate_value = dose_rate.austrieb;
                                        jQuery("#dose_rate").val(dose_rate_value.toString().replace(/[.]/, ",")).trigger("change");
                                    } else {
                                        var dose_rate_value = dose_rate.default;
                                        jQuery("#dose_rate").val(dose_rate_value.toString().replace(/[.]/, ",")).trigger("change");
                                    }
                                }
                            },
                            template: {
                                type: "description",
                                fields: {
                                    description: "type"
                                }
                            },
                            theme: "square"
                        };
                        jQuery("#product").easyAutocomplete(options);
                        jQuery('.easy-autocomplete').css('width', 'auto');
                    } else {
                        jQuery('#modaldate_lwa').jcalendar({format:'DD. MM. YYYY',mask:0});
                    }

                    // load

                    var request = $.ajax({
                        type: "get",
                        url : myAjax.ajaxUrl,
                        data : {action: "load_recommended_products", growth_stage: growth},
                        dataType: "html"
                    });

                    request.done(function( msg ) {
                        jQuery( "#recommended_products" ).html( msg );
                    });

                },
                close: function() {
                    if (type == "Classic") {
                        jQuery('#row-treatment .jcalendar').remove();
                        jQuery('.jcalendar_value').remove();
                    } else {
                        jQuery('#row-treatment-lwa .jcalendar').remove();
                        jQuery('.jcalendar_value').remove();
                    }

                    jQuery('.jcalendar_spraying_date').jcalendar({
                        format:'DD. MM. YYYY',
                        mask:0
                    });
                },
            }
        }).magnificPopup('open');
    });


    // BASE TABLE OPTIONS
    var optionsClassic = {
        tableClass: "classic",
        calType: "classic",
        data: [['', '', '0', '', '0', '0', '0', '', '', '', '', null]],
        columnResize: false,
        allowInsertColumn: false,
        allowDeleteColumn: false,
        eraseCell:false,
        columnSorting: false,
        allowInsertRow: true,
        allowManualInsertRow: false,
        selectionCopy: false,
        contextMenu: function() { return false },
        actionMenu: true,
        colAlignments: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'center'],
        colHeaderClasses: [
            'head-date',
            'head-product',
            'head-leaf-wall',
            'head-unit',
            'head-treated-area',
            'head-opened-nozzles',
            'head-saved-water',
            'head-water-volume',
            'head-dose-rate',
            'head-per-farm',
            'head-per-spraying',
            'head-action'
        ],
        colHeaders: [
            lang.Date,
            lang.Product,
            lang.DoseRateKM,
            lang.Unit,
            lang.AltArea,
            lang.OpenedNozzles,
            lang.SavedWater,
            lang.WaterVolume,
            lang.PerHA,
            lang.PerVineyard,
            lang.PerDevice,
            '&nbsp;'
        ],
        //colHeaders: [],
        colHeadersTitle: [
            lang.Date,
            lang.Product,
            lang.DoseRateKM,
            lang.Unit,
            lang.AltArea,
            lang.OpenedNozzles,
            lang.SavedWater,
            lang.WaterVolume,
            lang.PerHA,
            lang.PerVineyard,
            lang.PerDevice,
            '',
        ],
        colWidths: [ 0, 100, 110, 50, 100, 100, 140, 100, 120, 100, 120, 50],
        columns: [
            { type: 'hidden'},
            { type: 'text', editor:productEditor, url: '../json/basf_product/' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text', readOnly:true },
            { type: 'text', readOnly:true },
            { type: 'text', readOnly:true },
            { type: 'text', readOnly:true },
            { type: 'action', readOnly:true },
        ],
        onbeforechange:beforechange,
        onchange:changeData,
        onafterchange:afterchange,
        oninsertrow:insertrow,
        ondeleterow:deleterow,
    };

    // LEAF WALL TABLE OPTIONS
    var optionsLeafWall  = {
        tableClass: "leafwall",
        calType: "leafwall",
        data: [['', '', '', '0', '0', '', '0', '0', '0', '0', '', '', '', '', null]],
        columnResize: false,
        allowInsertColumn: false,
        allowDeleteColumn: false,
        eraseCell:false,
        columnSorting: false,
        allowInsertRow: true,
        allowManualInsertRow: false,
        selectionCopy: false,
        contextMenu: function() { return false },
        actionMenu: true,
        colAlignments: ['left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'left', 'center'],
        colHeaderClasses: [
            'head-date',
            'head-product',
            'head-dose-rate-km',
            'head-unit',
            'head-distance',
            'head-treated-area',
            'head-opened-nozzles',
            'head-saved-water',
            'head',
            'head',
            'head-water-volume',
            'head-dose-rate',
            'head-per-farm',
            'head-per-spraying',
            'head-action'
        ],
        colHeaders: [
            lang.Date,
            lang.Product,
            lang.DoseRatePercent,
            lang.Unit,
            lang.RowsDistance,
            lang.MaxDoseRate,
            lang.LeafWallHeight,
            lang.OpenedNozzles,
            lang.AltArea,
            lang.SavedWater,
            lang.WaterVolume,
            lang.PerHA,
            lang.PerVineyard,
            lang.PerDevice,
            '&nbsp;'
        ],
        //colHeaders: [],
        colHeadersTitle: [
            lang.Date,
            lang.Product,
            lang.DoseRatePercent,
            lang.Unit,
            lang.RowsDistance,
            lang.MaxDoseRate,
            lang.LeafWallHeight,
            lang.OpenedNozzles,
            lang.AltArea,
            lang.SavedWater,
            lang.WaterVolume,
            lang.PerHA,
            lang.PerVineyard,
            lang.PerDevice,
            '',
        ],
        colWidths: [ 0, 100, 120, 80, 85, 120, 115, 90, 115, 115, 100, 120, 120, 150, 50],
        columns: [
            { type: 'hidden' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text', readOnly:true  },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text' },
            { type: 'text', readOnly:true },
            { type: 'text', readOnly:true },
            { type: 'text', readOnly:true },
            { type: 'text', readOnly:true },
            { type: 'action', readOnly:true},
        ],
        onbeforechange:beforechange,
        onchange:changeData,
        onafterchange:afterchange,
        oninsertrow:insertrow,
        ondeleterow:deleterow,
    };

    var submit = jQuery( "#calculation-form" ).submit(function(event ) {

        event.preventDefault();

        var cal_type = jQuery( "#cal_type" ).val();          // Spraying method:
        var spraying_date = jQuery("#spraying_date").val();  // Spraying date
        var call_type_lang_param = cal_type.toLowerCase().replace(/ /g,"_");
        var call_type_name = lang[call_type_lang_param];
        var growth_stage = jQuery( "#growth_stage" ).val();  // Rastová fáza vinica
        var vineyard = jQuery( "#farm" ).val();              // názov farmy
        var size_vineyard = jQuery( "#farm option:selected" ).data('size_vineyard');        // veľkosť farmy
        var distance = jQuery( "#farm option:selected" ).data('distance');                  // vzdialenosť riadku
        var equipment_id = jQuery( "#equipment option:selected" ).data('equipment_id');     // ID stroja na postrekovanie
        var equipment_name = jQuery( "#equipment option:selected" ).data('equipment_name');      // Nazov stroja na postrekovanie

        var calculator = cal_type + "_" + growth_stage + "_" + vineyard + "_" + equipment_id;      // Calculator ID
        calculator = calculator.toLowerCase().replace(/ /g,"_");

        var calculatorText = jQuery( "#growth_stage option:selected" ).data('text');    // text fáza vinica

        if (!spraying_date) {
            jQuery.alert({
                title: lang.FarmMissingSprayingDate,
                content: lang.FarmMissingSprayingDateText,
                animation: 'opacity',
                closeAnimation: 'opacity',
                animateFromElement: false,
                animationSpeed: 200,
                theme: 'modern',
                buttons: {
                    okay: {
                        text: lang.ButtonOK,
                        btnClass: 'btn-blue'
                    }
                }
            });
            return false;
        }

        if (!vineyard) {
            jQuery.alert({
                title: lang.FarmMissingTitle,
                content: lang.FarmMissingText,
                animation: 'opacity',
                closeAnimation: 'opacity',
                animateFromElement: false,
                animationSpeed: 200,
                theme: 'modern',
                buttons: {
                    okay: {
                        text: lang.ButtonOK,
                        btnClass: 'btn-blue'
                    }
                }
            });
            return false;
        }

        var equipment = jQuery( "#titleUsedNozzles" ).val();     // spraying device

        if (!equipment || equipment == 0) {
            jQuery.alert({
                title: lang.EquipmentMissingTitle,
                content: lang.EquipmentMissingText,
                animation: 'opacity',
                closeAnimation: 'opacity',
                animateFromElement: false,
                animationSpeed: 200,
                theme: 'modern',
                buttons: {
                    okay: {
                        text: lang.ButtonOK,
                        btnClass: 'btn-blue'
                    }
                }
            });
            return false;
        }

        var totalUsedNozzles = jQuery("#totalUsedNozzles").val();
        var distanceBetweenRows = jQuery("#distanceBetweenRows").val();
        var size_vineyard = jQuery("#sizeVineyard").val();
        var spraying_device = jQuery("#volumeSprayingDevice").val();
        var used_water = jQuery("#usedWaterVolume").val();
        jQuery("#"+calculator+"_used_nozzles").val(jQuery("#totalUsedNozzles").val());

        // nastavenie ID pre typ formulara v modalovm okne - Classic calculator
        var calculatorFormId = "#row-treatment";

        // Classic calculator
        if (cal_type != "Classic") {
            // Leaft wall calculator
            calculatorFormId = "#row-treatment-lwa";
        }

        // if calculator not exist, created new growth stage calculator
        if (jQuery('#'+calculator).length == 0) {

            // html header for growth stage calculator
            var calForm = '<form class="spraying-growth-stage" id="'+calculator+'_form">' +
                '<div class="row">\n' +
                '                <div class="col col-12 col-md-3 col-lg-3">\n' +
                '                    <div class="form-group">\n' +
                '                        <h3>' + lang.CalcualtionMethod+ ':</h3>\n' +
                '                        <strong>'+call_type_name+'</strong>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col col-12 col-md-2 col-lg-2">\n' +
                '                    <div class="form-group">\n' +
                '                        <h3>' + lang.SprayingDate+ ':</h3>\n' +
                '                        <strong>'+spraying_date+'</strong>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col col-12 col-md-2 col-lg-2">\n' +
                '                    <div class="form-group">\n' +
                '                        <h3>' + lang.GrowthStage + ':</h3>\n' +
                '                        <strong>'+calculatorText+'</strong>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col col-12 col-md-2 col-lg-2">\n' +
                '                    <div class="form-group">\n' +
                '                        <h3>' + lang.Vineyard + ':</h3>\n' +
                '                        <strong>'+vineyard+'</strong>\n' +
                '                        <span class="tripsy-tooltip"><img class="tripsy-tooltip-icon" src="/wp-content/themes/onepress-child/assets/images/tooltip_tripsy_blue.svg" alt=""><span>'+lang.VineyardSize+': '+size_vineyard+',<br/>'+lang.RowsDistance+': '+distance+'</span></span>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col  col-12 col-md-3 col-lg-3">\n' +
                '                    <div class="form-group">\n' +
                '                        <h3>' + lang.SprayingDevice + ':</h3>\n' +
                '                        <strong>'+equipment+'</strong>\n' +
                '                        <span class="tripsy-tooltip"><img class="tripsy-tooltip-icon" src="/wp-content/themes/onepress-child/assets/images/tooltip_tripsy_blue.svg" alt=""><span>Inhalt Spritzfass: '+spraying_device+',<br/>Wasseraufwandmenge/ha bei voller Belaubung: '+used_water+',<br/>Gesamtdüsenanzahl am Pflanzenschutzgerät: '+totalUsedNozzles+'</span></span>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '        </div>\n' +
                '\n' +
                '<div style="display:none;">\n' +
                '<label>Spraying type:</label>\n' +
                '<input type="text" name="spraying_type_name" id="'+calculator+'_call_type_name" value="'+call_type_name+'" disabled>\n' +

                '<label>Spraying date:</label>\n' +
                '<input type="text" name="spraying_date" id="'+calculator+'_spraying_date" value="'+spraying_date+'" disabled>\n' +

                '<label>Growth staged</label>\n' +
                '<input type="text" name="growth_staged" id="'+calculator+'_growth_staged" value="'+calculatorText+'" disabled>\n' +

                '<label>Vineyard Size </label>\n' +
                '<input type="text" name="size_vineyard" id="'+calculator+'_size_vineyard" value="'+size_vineyard+'" disabled>\n' +

                '<label>' + lang.DeviceVolume + '</label>\n' +
                '<input type="text" name="spraying_device" id="'+calculator+'_spraying_device" value="'+spraying_device+'" disabled>\n' +

                '<label>' + lang.Water100LWA + '</label>\n' +
                '<input type="text" name="used_water" id="'+calculator+'_used_water" value="'+used_water+'" disabled>\n\n' +

                '<label>' + lang.Nozzles100LWA + '</label>\n' +
                '<input type="text" name="used_nozzles" id="'+calculator+'_used_nozzles" value="'+totalUsedNozzles+'" disabled>\n' +

                '<label>' + lang.RowsDistance+ '</label>\n' +
                '<input type="text" name="distance_between_rows" id="'+calculator+'_distance_between_rows" value="'+distanceBetweenRows+'" disabled>\n' +

                '<label>' + lang.Vineyard + '</label>\n' +
                '<input type="text" name="vineyard_name" id="'+calculator+'_vineyard_name" value="'+vineyard+'" disabled>\n' +

                '<label>Spraying Plan ID</label>\n' +
                '<input type="text" name="spraying_id" id="'+calculator+'_spraying_id" value="'+calculator+'" disabled>\n' +

                '<label>' + lang.EquipmentId + '</label>\n' +
                '<input type="text" name="equipment_id" id="'+calculator+'_equipment_id" value="'+equipment_id+'" disabled>\n' +

                '<label>' + lang.EquipmentName + '</label>\n' +
                '<input type="text" name="equipment_name" id="'+calculator+'_equipment_name" value="'+equipment_name+'" disabled>\n' +

                '</div>\n' +
                '</form>';

            // table growth stage calculator
            var calculatoris = '<div class="row-cal"><div id="'+calculator+'" class="'+calculator+'" data-growth-stage="'+growth_stage.replace(/ /g,"_").toLowerCase()+'" data-type="'+cal_type+'"></div></div>';

            // html action menu for growth stage calculator
            var action = '<div class="row-cal-action"><div class="col-action"><div>' +
                '           <div class="section-buttons-spraying-plan">' +
                //'            <a class="add-row" href="#" data-cal="'+calculator+'" data-type="'+cal_type+'" data-growth="'+growth_stage+'">' + lang.TreatmentAdd + '</a>' +
                '            <a class="button add-row-modal spraying-plan" href="'+calculatorFormId+'" data-cal="'+calculator+'" data-type="'+cal_type+'" data-growth="'+growth_stage+'" data-distance="'+distanceBetweenRows+'" data-used_nozzles="'+totalUsedNozzles+'" data-size_vineyard="'+size_vineyard+'">' + lang.addProductToSpraying + '</a>' +
                '            <div class="section-action-spraying-plan">' +
                '               <a class="save-spraying-plan" href="#" data-cal="'+calculator+'" data-type="'+cal_type+'">' + lang.SaveSprayingPlan + '</a>' +
                '               <a class="remove-calculation" href="#" data-cal="'+calculator+'">' + lang.CalculationRemove + '</a>' +
                '            </div>' +
                '</div></div></div></div>';
            jQuery().insertBefore(this);

            var htmlContent = calForm + calculatoris + action;

            if (document.getElementById('view-calculation-form')) {
                jQuery(htmlContent)
                    .insertBefore('#view-calculation-form')
                    .wrapAll( '<div class="container cal" id="wrapper_'+calculator+'"></div>') ;
            } else {
                jQuery(htmlContent)
                    .insertBefore(this)
                    .wrapAll( '<div class="container cal" id="wrapper_'+calculator+'"></div>') ;
            }
            if (cal_type == "Classic") {
                optionsClassic.data = [['', '', 0, '', 0, 0, 0, '=WATER_VOLUME(B$, F$, G$, "#'+calculator+'")', '=DOES_RATE_PER_HA(B$, C$, F$, G$, "#'+calculator+'")', '=PRODUCT_PER_FARM(B$, E$, I$,"#'+calculator+'")', '=PRODUCT_PER_SPRAING(B$, G$, H$, I$, "#'+calculator+'")', null]];
                optionsClassic.tableId = calculator + '_calculation';
                optionsClassic.calculationId = '#' + calculator;
                optionsClassic.growthStage = growth_stage.toLowerCase().replace(/ /g,"_");
                var cal = jQuery('#' + calculator).jexcel(optionsClassic);
            } else {
                var distanceBetweenRows = jQuery("#" + calculator + "_distance_between_rows").val();
                //optionsLeafWall.data = [['', '', null, null, distanceBetweenRows, 0, 0, 0, 0, 0, '=LEAF_WALL_WATER_VOLUME(H$,"#'+calculator+'")', '=LEAF_WALL_PRODUCT_PER_FARM(N$,I$,G$,E$,"#'+calculator+'")','=LEAF_WALL_DOES_RATE_PER_HA(C$,E$,G$,J$,"#'+calculator+'")', '=LEAF_WALL_PRODUCT_PER_SPRAING(N$,M$,K$,"#'+calculator+'")', null]];
                optionsLeafWall.data = [['', '', null, null, distanceBetweenRows, 0, 0, 0, 0, 0, '=LEAF_WALL_WATER_VOLUME(H$,"#'+calculator+'")', '=LEAF_WALL_DOES_RATE_PER_HA(C$, E$, G$, J$, "#'+calculator+'")', '=LEAF_WALL_PRODUCT_PER_FARM(L$, I$, G$, E$, "#'+calculator+'")','=LEAF_WALL_PRODUCT_PER_SPRAING(L$, M$, I$,"#'+calculator+'")', null]];
                optionsLeafWall.tableId = calculator + '_calculation';
                optionsLeafWall.calculationId = '#' + calculator;
                optionsLeafWall.growthStage = growth_stage.toLowerCase().replace(/ /g,"_");
                var cal = jQuery('#' + calculator).jexcel(optionsLeafWall);
            }

            // resec calculation method:
            jQuery('.SlectBoxType')[0].sumo.unSelectAll();

            // reset growth stage
            jQuery('.SlectBoxGrowth')[0].sumo.unSelectAll();

            // reset selected farm
            jQuery('.SlectBoxFarm')[0].sumo.selectItem(0);

            // reset selected equipment
            //jQuery('.SlectBoxEquipment')[0].sumo.unSelectAll(); // Multiselect
            jQuery('.SlectBoxEquipment')[0].sumo.selectItem(0);

            // reset form helper input value
            jQuery("#usedNozzles").val(null);
            jQuery("#totalUsedNozzles").val(null);
            jQuery("#distanceBetweenRows").val(null);
            jQuery("#titleUsedNozzles").val(null);
            jQuery("#sizeVineyard").val(null);
            jQuery("#volumeSprayingDevice").val(null);
            jQuery("#usedWaterVolume").val(null);

            if (jQuery("#view-calculation-form").hasClass('hidden')) {
                jQuery("#view-calculation-form").removeClass("hidden");
            }

            jQuery("#calculation-form").addClass("hidden");
            jQuery("#hidden-calculation-form").addClass("hidden");
            jQuery("#show-calculation-form").removeClass("hidden");
            jQuery("#spraying_date").val('');

        } else {
            jQuery.confirm({
                icon: 'fa fa-warning',
                theme: 'modern',
                title: lang.Warning,
                animation: 'opacity',
                closeAnimation: 'opacity',
                animateFromElement: false,
                animationSpeed: 200,
                type: 'red',
                content: lang.TableExists,
                buttons: {
                    okay: {
                        text: lang.ButtonOK,
                        btnClass: 'btn-red'
                    }
                }
            });
        }

        jQuery('.jcalendar_spraying_date .jcalendar_input').remove();

    });

    // Clearing the calculation
    jQuery(document).on('click', '.remove-calculation', function (e) {

        e.preventDefault();

        var wrapper    = "#wrapper_" + jQuery(this).data('cal');
        var calTable   = jQuery(this).data('cal');
        var SprayingId = jQuery(this).data('id');

        jQuery.confirm({
            title: lang.CalculationRemove,
            theme: 'modern',
            content: '' +
                '<form action="" class="formName">' +
                '<div class="form-group">' +
                '<label>' + lang.CalculationRemoveText + '</label>' +
                '<input type="hidden" name="wrapper" class="wrapperName form-control" value="'+wrapper+'" readonly/>' +
                '<input type="hidden" name="calTable" class="tableName form-control" value="'+calTable+'" readonly/>' +
                '<input type="hidden" name="SprayingId" class="SprayingId form-control" value="'+SprayingId+'" readonly/>' +
                '</div>' +
                '</form>',
            icon: 'fa fa-question-circle',
            animation: 'opacity',
            closeAnimation: 'opacity',
            animateFromElement: false,
            animationSpeed: 200,
            type: 'red',
            opacity: 0.5,
            autoClose: 'cancel|8000',
            buttons: {
                confirm: {
                    text: lang.RemoveBtn,
                    btnClass: 'btn-red',
                    action: function() {
                        var wrapper = this.$content.find('.wrapperName').val();
                        var calTable = this.$content.find('.tableName').val();
                        var SprayingId = this.$content.find('.SprayingId').val();
                        if (typeof SprayingId !== "undefined") {
                            jQuery.ajax({
                                type : "post",
                                dataType : "json",
                                url : myAjax.ajaxUrl,
                                data : {action: "delete_spraying_plan", spraying_id: SprayingId, spraying_plan: calTable},
                                success: function(response) {
                                    if (response.type == "success") {
                                        toastr.options = {
                                            "closeButton": true,
                                            "debug": false,
                                            "newestOnTop": false,
                                            "progressBar": false,
                                            "positionClass": "toast-bottom-center",
                                            "preventDuplicates": false,
                                            "onclick": null,
                                            "showDuration": "300",
                                            "hideDuration": "1000",
                                            "timeOut": "5000",
                                            "extendedTimeOut": "1000",
                                            "showEasing": "swing",
                                            "hideEasing": "linear",
                                            "showMethod": "fadeIn",
                                            "hideMethod": "fadeOut"
                                        };

                                        toastr.warning(response.message, response.title);

                                        jQuery(wrapper).hide();
                                        jQuery( "#" + calTable).jexcel('destroy');
                                        jQuery( "#" + calTable).detach();
                                        jQuery(wrapper).detach();
                                    }
                                    else {
                                        toastr.options = {
                                            "closeButton": true,
                                            "debug": false,
                                            "newestOnTop": false,
                                            "progressBar": false,
                                            "positionClass": "toast-bottom-center",
                                            "preventDuplicates": false,
                                            "onclick": null,
                                            "showDuration": "300",
                                            "hideDuration": "1000",
                                            "timeOut": "5000",
                                            "extendedTimeOut": "1000",
                                            "showEasing": "swing",
                                            "hideEasing": "linear",
                                            "showMethod": "fadeIn",
                                            "hideMethod": "fadeOut"
                                        };

                                        toastr.error(response.message, response.title);
                                    }
                                }
                            });
                        } else {
                            toastr.warning(lang.DeleteSprayingPlanText, lang.DeleteSprayingPlanTitle);
                            jQuery(wrapper).hide();
                            jQuery( "#" + calTable).jexcel('destroy');
                            jQuery( "#" + calTable).detach();
                            jQuery(wrapper).detach();
                        }

                    }
                },
                cancel: {
                    text: lang.Cancel,
                    action: function() {}
                }
            }
        });

    });

    // Disable form submit on enter
    jQuery(document).on('keyup keypress', '#row-treatment', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });
    jQuery(document).on('keyup keypress', '#row-treatment-lwa', function(e) {
        var keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });

    // Modalove okno formulare pre pridanie riadku do Classic kalkulacie
    jQuery(document).on('submit', '#row-treatment', function (e) {
        e.preventDefault();

        var form_data = jQuery('#row-treatment').serializeArray();
        jQuery('#row-treatment .jcalendar').remove();

        var data_length = form_data.length;
        var data = [];

        for (var i = 0; i < data_length; i++) {
            data[form_data[i].name] = form_data[i].value;
        }

        var calTable = "#" + data["cal_name"];
        var date = "";
        var product = data.product;
        var unit = data.unit;
        var dose_rate = data.dose_rate;
        var treated_area = data.treated_area;
        var opened_nozzles = data.used_nozzles;
        var saved_water = data.saved_water;

        // kontrola dat vytvorenej tabulky
        var old_data = jQuery(calTable).jexcel('getData', false);

        // zostavenie datovej struktury pre vlozenie noveho riadku
        var rowOptionClassic = [date, product, dose_rate, unit, treated_area, opened_nozzles, saved_water, '=WATER_VOLUME(B$, F$, G$, "'+calTable+'")',
            '=DOES_RATE_PER_HA(B$, C$, F$, G$, "'+calTable+'")', '=PRODUCT_PER_FARM(B$, E$, I$,"'+calTable+'")',
            '=PRODUCT_PER_SPRAING(B$, G$, H$, I$,"'+calTable+'")', null];

        // ak je inicializovana prazdna tabulka naplnenie dat do nulteho riadku a vymazanie prazdneho riadku
        if (! old_data[0][1] ) {
            jQuery(calTable).jexcel('insertRow', rowOptionClassic, 0);
            jQuery(calTable).jexcel('deleteRow', 1);
        } else {
            // postupne naplnania riadkov
            jQuery(calTable).jexcel('insertRow', rowOptionClassic);
        }

        // Set cookies
        Cookies.set('used_nozzles', opened_nozzles);
        Cookies.set('dose_rate', dose_rate);
        Cookies.set('unit', unit);
        Cookies.set('treated_area', treated_area);
        Cookies.set('saved_water', saved_water);

        // Clear form data
        document.getElementById("row-treatment").reset();

        // save instance in magnificPopup variable
        var magnificPopup = $.magnificPopup.instance;

        // Close popup that is currently opened
        magnificPopup.close();

    });

    // Modalove okno formulare pre pridanie riadku do Leaft wall kalkulacie
    jQuery(document).on('submit', '#row-treatment-lwa', function (e) {
        e.preventDefault();

        var form_data = jQuery('#row-treatment-lwa').serializeArray();
        jQuery('#row-treatment-lwa .jcalendar').remove();

        var data_length = form_data.length;
        var data = [];

        for (var i = 0; i < data_length; i++) {
            data[form_data[i].name] = form_data[i].value;
        }

        var calTable = "#" + data["cal_name"];
        var distance = data["cal_distance"]; // distance Between Rows

        var date = "";
        var product = data.product; // Product
        var unit = data.unit; // Unit
        var dose_rate = data.dose_rate; // Dose rate for 10 km leaf wall area
        var dose_max = data.dose_max; // Max dose rate per ha
        var opened_nozzles = data.used_nozzles; // Max dose rate per ha
        var height = data.height; // Alternative treated area
        var treated_area = data.treated_area; // Alternative treated area
        var saved_water = data.saved_water; // Saved water

        // kontrola dat vytvorenej tabulky
        var old_data = jQuery(calTable).jexcel('getData', false);

        optionsLeafWall.data = [['', '', null, null, distanceBetweenRows, 0, 0, 0, 0, 0,
            '=LEAF_WALL_WATER_VOLUME(H$,"#'+calculator+'")',
            '=LEAF_WALL_DOES_RATE_PER_HA(C$, E$, G$, J$, "#'+calculator+'")',
            '=LEAF_WALL_PRODUCT_PER_FARM(L$, I$, G$, E$, "#'+calculator+'")',
            '=LEAF_WALL_PRODUCT_PER_SPRAING(L$, M$, I$,"#'+calculator+'")', null]];

        // zostavenie datovej struktury pre vlozenie noveho riadku
        var rowOptionLeaftWall = [date, product, dose_rate, unit, distance, dose_max, height, opened_nozzles,
            treated_area, saved_water, '=LEAF_WALL_WATER_VOLUME(H$,"'+calTable+'")', '=LEAF_WALL_DOES_RATE_PER_HA(C$, E$, G$, J$,"'+calTable+'")',
            '=LEAF_WALL_PRODUCT_PER_SPRAING(L$, M$, I$,"'+calTable+'")', '=LEAF_WALL_PRODUCT_PER_SPRAING(L$, M$, I$, "'+calTable+'")', null];

        // ak je inicializovana prazdna tabulka naplnenie dat do nulteho riadku a vymazanie prazdneho riadku
        if (! old_data[0][1] ) {
            jQuery(calTable).jexcel('insertRow', rowOptionLeaftWall, 0);
            jQuery(calTable).jexcel('deleteRow', 1);
        } else {
            jQuery(calTable).jexcel('insertRow', rowOptionLeaftWall);
        }

        // Set cookies
        Cookies.set('used_nozzles_lwa', opened_nozzles);
        Cookies.set('dose_rate_lwa', dose_rate);
        Cookies.set('unit_lwa', unit);
        Cookies.set('dose_max_lwa', dose_max);
        Cookies.set('height_lwa', height);
        Cookies.set('treated_area_lwa', treated_area);
        Cookies.set('saved_water_lwa', saved_water);

        // Clear form data
        document.getElementById("row-treatment-lwa").reset();

        // Save instance in magnificPopup variable
        var magnificPopup = $.magnificPopup.instance;

        // Close popup that is currently opened
        magnificPopup.close();

    });

    /**
     * Prepocita konecny vysledok pre celkove mnozstvo produktov v plane postreku
     */
    jQuery(document).on("click", "#reloadCalculation", function (e) {

        e.preventDefault();

        var $jexcel = $.fn.jexcel.defaults;
        if ($jexcel !== undefined ) {

            var tableData = [];
            var spraying = [];
            var sprayingData = {};
            var countCalculations = Object.keys($jexcel).length;
            var calculations = Object.keys($jexcel);

            if (countCalculations > 0) {

                jQuery.each(calculations, function (k, v) {

                    tableData[v] = jQuery("#" + v).jexcel('getData', false);
                    spraying[v] =  jQuery('#' + v + "_form");

                    sprayingData[v] = {
                        'data' : {
                            "spraying_id" : spraying[v].find('input[name="spraying_id"]').val(),
                            "spraying_type" : spraying[v].find('input[name="spraying_type_name"]').val(),
                            "growth_phase" : spraying[v].find('input[name="growth_staged"]').val(),
                            "vineyard" : spraying[v].find('input[name="vineyard_name"]').val(),
                            "vineyard_size" : spraying[v].find('input[name="size_vineyard"]').val(),
                            "device" : spraying[v].find('input[name="spraying_device"]').val(),
                            "device_size" :spraying[v].find('input[name="size_vineyard"]').val(),
                            "water_volume" : spraying[v].find('input[name="used_water"]').val(),
                            "equipment_id" : spraying[v].find('input[name="equipment_id"]').val(),
                            "equipment" : spraying[v].find('input[name="equipment_name"]').val(),
                            "nozzles" : spraying[v].find('input[name="used_nozzles"]').val(),
                            "row_spacing" : spraying[v].find('input[name="distance_between_rows"]').val(),
                            "date" : spraying[v].find('input[name="spraying_date"]').val()
                        },
                        'items' : tableData[v]
                    };
                });

                try {
                    localStorage.setItem('spraying', JSON.stringify(sprayingData));
                    jQuery( "#generate-spraying-plan" ).removeClass( "disable" );
                    jQuery( "#generate-spraying-plan" ).addClass( "enable" );
                } catch (domException) {
                    if (
                        ['QuotaExceededError', 'NS_ERROR_DOM_QUOTA_REACHED'].includes(
                            domException.name
                        )
                    ) {
                        // handle quota limit exceeded error
                    }
                }


                delete tableData["results"];
                var data = getAggregateTableData(tableData);

            }
        }
    });

    jQuery('.jcalendar_spraying_date').jcalendar({
        format:'DD. MM. YYYY',
        mask:0
    });
});
