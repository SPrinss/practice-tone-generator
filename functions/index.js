var functions = require('firebase-functions');
var admin = require('firebase-admin');
var config = require('./config.json');
var emailClient = require('./emailClient');

admin.initializeApp(functions.config().firebase);

exports.mailFeedback = functions.firestore.document('feedback/{feedbackId}').onWrite((event) => {
  var userFormData = event.data.data();
  return emailClient.sendReviewEmail(config, userFormData.email, userFormData.feedback);
})