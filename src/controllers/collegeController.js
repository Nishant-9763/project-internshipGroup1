const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');
// const internModel = require('../models/internModel');

const validName = (name) => (/^[a-zA-Z]{3,200}$/).test(name);
const validUrl = (url) => (/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/).test(url);
const validFullName = (name) => (/[a-zA-Z\s]\,[a-zA-Z\s]/).test(name);

const createCollege = async function (req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length == 0) return res.status(400).send({status: false, msg: 'please enter college details'});

        const {name, fullName, logoLink} = data;

        if (!name) return res.status(400).send({status: false, msg: 'name is required'});
        if (!validName(name)) return res.status(400).send({status: false, msg: 'please enter a valid college name'});

        if (!fullName) return res.status(400).send({status: false, msg: 'fullName is required'});
        if (!validFullName(fullName)) return res.status(400).send({status: false, msg: 'please enter a valid college fullName'});

        if (!logoLink) return res.status(400).send({status: false, msg: 'logoLink is required'});
        if (!validUrl(logoLink)) return res.status(400).send({status: false, msg: 'please enter a valid url for logoLink'});

        const college = await collegeModel.findOne({name: name});
        if (college) return res.status(400).send({status: false, msg: 'college already exits with this name, please enter a unique college name'});

        const createdCollege = await collegeModel.create(data);
  
        res.status(201).send({status: true, data: createdCollege});
    } catch (error) {
        res.status(500).send({status: false, msg: error.message});
    };
};

module.exports.createCollege = createCollege;

const getCollege = async function (req, res) {
    try {
        const data = req.query;

        if (!data.collegeName) return res.status(400).send({msg: 'please enter college name'});
        if (!validName(data.collegeName)) return res.status(400).send({status: false, msg: 'please enter a valid college name'});
        const college = await collegeModel.findOne({name: data.collegeName});
        if (!college) return res.status(400).send({status: false, msg: 'college with this name does not exits'});

        const interns = await internModel.find({collegeId: college._id}).select({name: 1, email: 1, mobile: 1});
        
        if (interns.length == 0) return res.status(400).send({status: false, msg: 'no intern found in this college'});

        const {name, fullName, logoLink} = college;
        
        const abc = {name , fullName, logoLink, interns};
        res.status(200).send({status: true, data: abc})
    } catch (error) {
        res.status(500).send({status: false, msg: error.message});
    };
};
module.exports.getCollege = getCollege;
