var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var port = 8080

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    console.log(q.pathname)
    if(q.pathname == "/get-action" && req.method === "GET"){
        // ambil parameter dari URL
        var search = q.query.search;
        
        if( search ){
            // Ambil data dari form dengan metode GET
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write("<h3>Hasil Pencarian:</h3>");
            res.write("<p>Anda mencari: <b>" + search + "</b></p>");
            res.write("<pre>Website ini menampilkan data GET method dari form sebelumnya.</pre>")
            res.end("<a href='/'>Kembali</a>");
        } 
    } else if(q.pathname == '/login' && req.method === 'GET') {

            // tampilkan form login
            fs.readFile('login.html', (err, data) => {
                if (err) { // kirim balasan error
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                // kirim form search.html
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });

    }else if(q.pathname == '/login' && req.method === 'POST') {

            var body = '';

            req.on('data', function (data) {
                body += data;

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6)
                    req.connection.destroy();
            });

            req.on('end', function () {
                var postData = qs.parse(body);
                
                // cek login
                if( postData.email === "admin@ngide.net" && postData.password === "yukngide"){
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write('<h2>Selamat datang admin!</h2> ');
                    res.write('<p>Email: '+postData.email+'</p>');
                    res.write('<p>Password: '+postData.password+'</p>');
                    res.write("<a href='/login'>kembali</a>");
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write('<h2>Login Gagal!</h2> ');
                    res.write("<a href='/login'>coba lagi</a>");
                    res.end();
                }
            });

    } else{
            // tampilkan form search
            fs.readFile('form-get.html', (err, data) => {
                if (err) { // kirim balasan error
                    res.writeHead(404, {'Content-Type': 'text/html'});
                    return res.end("404 Not Found");
                } 
                // kirim form search.html
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write(data);
                return res.end();
            });
        }

  
}).listen(port);

console.log('server is running on http://localhost:'+ port);
