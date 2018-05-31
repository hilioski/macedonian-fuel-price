var page = require("webpage").create();

page.open("http://www.erc.org.mk/", function(status) {
    console.log("Status: " + status);

    if(status === "success") {
        var response = page.evaluate(function() {
            var dataList = [];

            [].forEach.call(document.querySelectorAll('#CeniLista table tbody tr'), function(tr){
                var name = tr.querySelectorAll('td')[0].innerText;
                var price = parseFloat(tr.querySelectorAll('td')[1].innerText.split(' ')[0]).toFixed(2);
                var unit = tr.querySelectorAll('td')[1].innerText.split(' ')[1].split('/')[1];
                var currency = tr.querySelectorAll('td')[1].innerText.split(' ')[1].split('/')[0];

                var data = {
                    name: name,
                    price: price,
                    unit: unit,
                    currency: currency
                };

                dataList.push(data);
            });

            return JSON.stringify(dataList);
        });

        console.log(response);
    }

    phantom.exit();
});