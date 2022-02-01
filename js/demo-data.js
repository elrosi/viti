var data = [['', '', '', '0', '0', '0', '0', '=WATER_VOLUME(F$)', '=PRODUCT_PER_SPRAING(H$,K$)', '=PRODUCT_PER_FARM(E$,K$)', '=DOES_RATE_PER_HA(C$,H$,G$)', null]];
var dataLeafWall = [['', '', '', '', '0', '0', '0', '0', '0', '0', '=LEAF_WALL_WATER_VOLUME(H$)', '=LEAF_WALL_PRODUCT_PER_SPRAING(N$,M$,K$)', '=LEAF_WALL_PRODUCT_PER_FARM(N$,I$,G$,E$)', '=LEAF_WALL_DOES_RATE_PER_HA(C$,E$,G$,J$)', null]];

var caldata = {
    austrieb: [
        ["2018-11-20 00:00:00", "Cantus®", "kg", "5", "20", "28", "0", "311.11", "6.00", "62.20", "3.11", null],
        ["2018-11-20 00:00:00", "Kumulus® WG", "kg", "7", "25", "30", "0", "333.33", "8.41", "116.75", "4.67", null]
    ],
    erste_vorblute: [
        ["2018-11-20 00:00:00", "Cantus®", "kg", "8", "50", "20", "0", "222.22", "9.61", "178.00", "3.56", null],
        ["2018-11-20 00:00:00", "Kumulus® WG", "kg", "3", "30", "40", "0", "444.44", "3.60", "80.10", "2.67", null],
        ["2018-11-20 00:00:00", "Scala®", "l", "5", "150", "70", "0", "777.78", "6.00", "1167.00", "7.78", null]
    ],
    letzte_vorblute: [
        ["2018-11-20 00:00:00", "Vivando®", "l", "20", "30", "40", "10", "444.44", "21.60", "480.00", "16.00", null],
        ["2018-11-20 00:00:00", "Aktuan® Gold®", "l", "15", "20", "20", "3", "222.22", "17.47", "129.40", "6.47", null],
        ["2018-11-20 00:00:00", "Vivando®", "kg", "20", "33", "55", "15", "611.11", "20.40", "685.74", "20.78", null],
        ["2018-11-20 00:00:00", "Cantus®", "kg", "5", "20", "28", "0", "311.11", "6.00", "62.20", "3.11", null],
    ],
    leafwall_austrieb: [
        ["2018-11-20 00:00:00", "Apatus®", "kg", "5", "20", "28", "13", "56", "33", "10", "311.11", "6.00", "62.20", "3.11", null],
        ["2018-11-20 00:00:00", "Rapatus WG", "kg", "7", "25", "30", "0", "56", "33", "5", "333.33", "8.41", "116.75", "4.67", null]
    ],
};

var equipment = [
    {
        ID: "001",
        Name: "Zetor UTILIX",
        Value: 2
    },
    {
        ID: "002",
        Name: "Zetor HORTUS",
        Value: 5
    },
    {
        ID: "003",
        Name: "Zetor MAJOR",
        Value: 7
    },
    {
        ID: "004",
        Name: "Zetor PROXIMA",
        Value: 10
    },
    {
        ID: "005",
        Name: "Zetor FORTERRA",
        Value: 12
    },
    {
        ID: "006",
        Name: "Zetor CRYSTA Rock Pigeon",
        Value: 15
    },
    {
        ID: "007",
        Name: "Zetor PIGEON",
        Value: 17
    },
    {
        ID: "008",
        Name: "Zetor SPARROW",
        Value: 21
    },
    {
        ID: "009",
        Name: "Zetor TOWHEE",
        Value: 24
    }];
