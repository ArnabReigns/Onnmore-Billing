const express = require("express");
var cors = require('cors')
var pdfGenerator = require('./pdfGenerator');
var {v4} = require('uuid');
const path = require('path');

var email = require('./email');

const app = express();

app.use( express.static( path.join( __dirname,"./frontend/dist")));

app.set('view engine','ejs');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended:true}));

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

  

  res.render('invoice-tempalte',{data:data});
  
});

app.listen(3000,()=>{
    console.log("Server is running on port http://localhost:3000");
});