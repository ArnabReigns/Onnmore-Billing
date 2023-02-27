const nodemailer = require("nodemailer");


async function main(invoiceNumber,invoicePath,invoice) {

  const transporter = nodemailer.createTransport({
    service:"gmail",
    auth: {
        user: 'arnab.dev.09@gmail.com',
        pass: 'opckwprrgvveumds'
    }
  });

  let info = await transporter.sendMail({
    from: '"onnmore.com" <arnab.dev.09@gmail.com>', // sender address
    to: "arnabchatterjee912@gmail.com,subhajitmaji167@gmail.com", // list of receivers subhajitmaji167@gmail.com
    subject: "Invoice from onnmore.com", // Subject line
    text: `Hello ${invoice.customerName},

  I hope you’re well. Please see attached invoice number ${invoiceNumber}, due on ${new Date().toISOString().slice(0,10)}. Don’t hesitate to reach out if you have any questions.
    
Kind regards,
Onnmore.com`,
     // plain text body
    attachments: [
      {
        filename: "invoice.pdf",
        path: invoicePath,
      }
    ]
  }).then(()=>{
    console.log("sent successfully");
  }).catch(err=> console.error(err));

}


module.exports = main;