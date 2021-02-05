var url = require('url');
var adr = 'https://ngide.net/search.php?year=2021&month=february';
var q = url.parse(adr, true);

//hasil parse URL
console.log("protocol: " + q.protocol);
console.log("hostname: " + q.host);
console.log("pathname: " + q.pathname);
console.log("params: " + q.search);

var query = q.query; // ambil query string sebagai objek
console.log(query);