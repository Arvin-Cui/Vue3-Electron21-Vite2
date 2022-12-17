// @ts-ignore
const ACHEME = "file";
const path=require('path')
// const LOAD_URL = `${ACHEME}://${ __dirname}/index.html`;
const LOAD_URL=`file://${path.join(__dirname, '../../../dist/index.html')}`
module.exports={
    ACHEME,
    LOAD_URL
}
