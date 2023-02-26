var ejs = require('ejs');
var puppeteer = require('puppeteer');
var fs = require('fs');

async function createPdf(templateName,data,outputName) {
  let browser;
  browser = await puppeteer.launch();
  const [page] = await browser.pages();
  const html = await ejs.renderFile(templateName, {data: data});
  await page.setContent(html,{ waitUntil: ["load", "networkidle0", "domcontentloaded"], });
  const pdf = await page.pdf({format:"A4",path:'outputs/'+outputName+'.pdf',printBackground:true,});
  browser?.close;
  return './outputs/'+outputName+'.pdf';
}


function makeImage(image)
{
  return fs.readFileSync(`${process.cwd()}${image}`).toString('base64');
}

module.exports = {createPdf,makeImage};