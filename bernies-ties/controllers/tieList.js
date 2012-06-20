var
    http = require('http'),
    DOM = require('com.izaakschroeder.dom');

var TieList = function(){
    this.host = 'www.thetiegallery.com';
    this.path = '/Category.aspx?cat=2';
    this.list = [];
};

TieList.prototype.getList = function(callback){
    var self = this;
    var request = http.request({
            host: self.host,
            port: 80,
            path: self.path,
            method: "GET"
        }, function(response) {

            DOM.parse(response, function(doc) {
                doc.querySelectorAll(".ProdItem").forEach(function(i) {

                    self.list.push({
                        "name" : i.querySelector("h4 a").textContent,
                        "url" : "http://" + self.host + "/" + i.querySelector("a img").getAttribute("src")
                    });
                });

                callback(self.list);
            });
        });
    request.end();

    return self.list;
}

module.exports = new TieList;
