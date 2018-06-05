var nodemailer = require('nodemailer');

function sendReviewEmail(config, email, feedback) {
  var emailConfig = _getReviewEmailConfig(config, email, feedback);
  var transport = nodemailer.createTransport(config.email_transport);
  transport.sendMail(emailConfig, (error, info) => {
      if (error) return console.error(error);
      console.info(`Message sent: ${info.response}`);
  });
}

function _getReviewEmailConfig(config, email, feedback) {
    var styledFeedback = feedback.replace(/\n/g, "<br>");
    var emailSubject = config.review_email_subject + email;
    return {
        from: config.email_from,
        to: config.email_to,
        subject: emailSubject,
        html: `${config.review_email_message_intro} <br><br>

        email: ${email} <br>

        <br>
        --------------------------- <br>
        <br>
        Review:
        <br>
        ${styledFeedback} <br>
        <br>
        --------------------------- <br>
        <br>
        ${config.email_message_signature} <br>
        `
    }
}

exports.sendReviewEmail = sendReviewEmail;
