var
    http = require('http'),
    DOM = require('com.izaakschroeder.dom');

var TieList = function(){
    this.host = 'www.thetiegallery.com';
    this.path = '/GetProducts.ashx?subid=0&catid=2&color=&filters=&search=&page=';//'/Category.aspx?cat=2';
    this.list = [];
};

TieList.prototype.getList = function(callback){
    var self = this;

    var options = {
        host: self.host,
        port: 80,
        path: self.path,
        method: "GET"
    }

    var i;
    for(i = 1; i < 5; i++){
        options.path = self.path + i;

        request = http.request(options,function(response) {
            DOM.parse(response, function(doc) {
                doc.querySelectorAll(".ProdItem").forEach(function(i) {

                    self.list.push({
                        "name" : i.querySelector("h4").textContent,
                        "url" : "http://" + self.host + "/" + i.querySelector("a img").getAttribute("src")
                    });
                });
                callback(self.list);
            });
        }).end();
    }

}

module.exports = new TieList;
//GetProducts.ashx?subid=0&catid=2&color=&filters=&search=neckwear&page=2