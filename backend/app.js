const express = require("express");
var cors = require('cors')
var pdfGenerator = require('./pdfGenerator');
var {v4} = require('uuid');

var email = require('./email');

const app = express();

app.use( express.static( "views") );
app.set('view engine','ejs');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended:true}));



app.get("/", (req, res) => {
    res.send('hi');
});

app.post("/generateinvoice", (req, res) => {

  let subtotal = parseInt(req.body.subTotal);
  let d = parseInt(req.body.discount);
  let gst = (subtotal * 14 )/ 100;
  subtotal += gst;
  discount = subtotal * d / 100; 
  var invoiceNum = Date.now();
  

  var data = {
    invoice:req.body,
    invoiceNum: invoiceNum,
    gst: gst,
    discount : discount.toFixed(2),
    signeture: pdfGenerator.makeImage("/views/public/signeture.png"),
    logo: pdfGenerator.makeImage("/views/public/logo.png")
  }

  console.log(req.body);
  
  pdfGenerator.createPdf('./views/invoice-tempalte.ejs',data,'output')
  .then(path => {
    console.log(path);
    email(invoiceNum,path,req.body);
  });

  res.render('invoice-tempalte',{data:data});
  
});

app.get("/generateinvoice", (req, res) => {

  let subtotal = req.body.subTotal;
  let gst = req.body.subTotal * 14 / 100;
  subtotal += gst;
  let discount = subtotal * req.body.discount / 100;
  

  var data = {
    invoice:req.body,
    gst: gst,
    discount : discount,
    signeture: pdfGenerator.makeImage("/views/public/signeture.png"),
    logo: pdfGenerator.makeImage("/views/public/logo.png")
  }

  res.render('invoice-tempalte',{data:data});
  
});


app.get('/mail',(req, res) => {

  email().then(
    res.send('send mail')
  );

})

app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
});