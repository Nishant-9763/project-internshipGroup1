const validInternName = (name) => (/^[a-zA-Z_ ]{3,20}$/).test(name);
const validEmail = (mail) => (/.+\@.+\..+/).test(mail);
const validNumber = (number) => (/^[6-9]{1}?[0-9]{9}$/).test(number);

const validCollegeName = (name) => (/^[a-z]{3,200}$/).test(name);
const validUrl = (url) => (/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%\+.~#?&\/=]*)$/).test(url);
const validCollegeFullName = (fullName) => (/^[a-zA-Z ,-]*$/).test(fullName);

module.exports = {validInternName, validEmail, validNumber, validCollegeName, validUrl, validCollegeFullName}