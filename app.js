const express = require('express');
const bodyParser = require('body-parser');
const article = require('./db');
const particle = require('./pdb');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.json());

app.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.send(200);
        /让options请求快速返回/
    } else {
        next();
    }
});

app.post('/article', function (req, res) {
    console.log(req.body);
    let blog = req.body;
    article.create(blog, function (err, docs) {
        console.log(docs);
    })
    // article.update({},{Count : req.body.Count},function(err, raw){
    //     console.log(raw);
    // })
    res.end('我收到了');
})

app.get('/getarticle1', function (req, res) {
    article.find(function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).sort("-num").exec(function (err, docs) {
        console.log(docs);
    })
})

app.get('/getarticle2', function (req, res) {
    article.find({
        selected: /表白/
    }, function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).sort("-num").exec(function (err, docs) {
        console.log(docs);
    })
})

app.get('/getarticle3', function (req, res) {
    article.find({
        selected: /一句/
    }, function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).sort("-num").exec(function (err, docs) {
        console.log(docs);
    })
})

app.get('/getarticle4', function (req, res) {
    article.find({
        selected: /吐槽/
    }, function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).sort("-num").exec(function (err, docs) {
        console.log(docs);
    })
})

app.post('/getarticle5', function (req, res) {
    console.log(req.body);
    let sousuo = req.body.sousuo;
    article.find({
        Content: sousuo
    }, function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).sort("-num").exec(function (err, docs) {
        console.log(docs);
    })
})

app.post('/removearticle', function (req, res) {

    let blog = req.body.biaoji;
    console.log(blog);

    article.deleteOne({
        _id: blog
    }, function (err, doc) {
        console.log(doc);
    })

    particle.remove({
        Id: blog
    }, function (err, doc) {
        console.log(doc);
    })

    res.end('我收到了');
})

//评论

app.post('/Harticle', function (req, res) {
    console.log(req.body);
    let blog = req.body;
    particle.create(blog, function (err, docs) {
        console.log(docs);
    })
    res.end('我收到了');
})

app.post('/Hgetarticle', function (req, res) {
    // console.log(req.body);
    let blog = req.body.Id
    particle.find({
        Id: blog
    }, function (err, doc) {
        console.log(doc);
        res.json(doc);
    }).sort("-time").exec(function (err, docs) {
        console.log(docs);
    })
})

app.post('/pinglunnum', function (req, res) {
    let _id = req.body.Id;
    particle.countDocuments({
        Id: _id
    }, function (err, doc) {
        article.updateOne({
            _id: _id
        }, {
            Count: doc
        }, function (err, doc) {
            console.log(doc);
        })
    })
    particle.countDocuments({
        Id: _id
    }, function (err, doc) {
        article.updateOne({
            _id: _id,
            Count: '0',
        }, {
            Count: doc+1
        }, function (err, doc) {
            console.log(doc);
        })
    })
    res.end('ok')
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})