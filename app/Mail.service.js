
var nodemailer = require("nodemailer");
var hbs = require('nodemailer-express-handlebars');

exports.send = async function(options,callback) {
  
      // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let account = await nodemailer.createTestAccount();

  var hbsOptions = {
    viewEngine: {
        extname: '.hbs',
        layoutsDir: 'views/email/',
        defaultLayout : 'layout.main.hbs',
        partialsDir : 'public/'
    },
    viewPath: 'views/email/',
    extName: '.hbs'
};

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "mail.nova-erp.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'sebastiao.lutonda@nova-erp.com', // generated ethereal user
      pass: 'joice@Fiktiv' // generated ethereal password
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"New SMSgo 👻" <sebastiao.lutonda@nova-erp.com>', // sender address
    to: options.emails.join(','), // list of receivers
    subject: options.subject, // Subject line
    template: 'register',
    context: options
  };

  // send mail with defined transport object
  transporter.use('compile', hbs(hbsOptions));

  let info = await transporter.sendMail(mailOptions, function (err, response) {
    if(err) throw err
    transporter.close();
    })
};
