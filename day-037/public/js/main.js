var $ = document.getElementById.bind(document);
var TaxCalucator = /** @class */ (function () {
    function TaxCalucator() {
    }
    // constructor(public income: number) {
    //   // if(income<=0)
    // }
    TaxCalucator.setIncome = function (income) {
        this._income = income;
    };
    TaxCalucator.init = function (stairs, ratios) {
        this._stairs = Array.apply(stairs);
        this._ratios = Array.apply(ratios);
    };
    TaxCalucator._calc = function (money) {
        for (var i = this._stairs.length - 1; i >= 0; i--) {
            if (money > this._stairs[i]) {
                return (money - this._stairs[i]) * this._ratios[i] + this._calc(this._stairs[i]);
            }
        }
        return 0;
        // if(money > 7000) {
        //   return (money-7000) * 0.2 + this._calc(7000);
        // }else if (money > 4000) {
        //   return (money-4000) * 0.15 + this._calc(4000);
        // }else if(money>2500) {
        //   return (money-2500) * 0.1 + this._calc(2500);
        // } else if(money>2000) {
        //   return (money-2000) * 0.05 + this._calc(2000);
        // }
        // return 0;
    };
    TaxCalucator.calculate = function () {
        this._tax = this._calc(this._income);
    };
    Object.defineProperty(TaxCalucator, "tax", {
        get: function () {
            // this.calculate(this._income);
            this.calculate();
            return this._tax;
        },
        enumerable: true,
        configurable: true
    });
    TaxCalucator._stairs = [
        2000, 2500, 4000, 7000
    ];
    TaxCalucator._ratios = [
        0.05, 0.1, 0.15, 0.2
    ];
    return TaxCalucator;
}());
function main() {
    var income = $('income');
    var tax = $('tax');
    income.oninput = function () {
        var v = parseFloat(income.value);
        TaxCalucator.setIncome(v);
        tax.value = TaxCalucator.tax.toFixed(2);
    };
}
main();
// let income = 15000; 
// TaxCalucator.setIncome(income);
// console.log(TaxCalucator.tax);
