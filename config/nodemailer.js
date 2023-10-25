const nodemailer=require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'briana.connelly2@ethereal.email',
        pass: 'pvMZMRQHSBA1SUPKwU'
    }
});

let renderTamplate=(data,relativePath)=>{
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,relativePath),data,(err,template)=>{
            if(err){
                     console.log('err in rendering template');
                     return;
            }
            mailHtml=template
        }
        
    )
    return mailHtml;
}
module.exports={
    transporter: transporter,
    renderTamplate:renderTamplate
}
