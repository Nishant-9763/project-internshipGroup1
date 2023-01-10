const collegeModel = require('../models/collegeModel');
const internModel = require('../models/internModel');

const {validCollegeName, validUrl, validCollegeFullName} = require('../validators/validator');

const createCollege = async function (req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length == 0) return res.status(400).send({status: false, msg: 'please enter college details'});

        const {name, fullName, logoLink} = data;

        if (!name) return res.status(400).send({status: false, msg: 'name is required'});
        if (!validCollegeName(name)) return res.status(400).send({status: false, msg: 'please enter a valid college name'});

        if (!fullName) return res.status(400).send({status: false, msg: 'fullName is required'});
        if (!validCollegeFullName(fullName)) return res.status(400).send({status: false, msg: 'please enter a valid college fullName'});

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

const getCollege = async function (req, res) {
    try {
        const data = req.query;

        if (!data.collegeName) return res.status(400).send({msg: 'please enter college name'});
        if (!validCollegeName(data.collegeName)) return res.status(400).send({status: false, msg: 'please enter a valid college name'});
        const college = await collegeModel.findOne({name: data.collegeName, isDeleted: false});
        
        if (!college) return res.status(400).send({status: false, msg: 'college with this name does not exits'});

        const interns = await internModel.find({collegeId: college._id}).select({name: 1, email: 1, mobile: 1});
        
        const {name, fullName, logoLink} = college;

        if (interns.length == 0) return res.status(200).send({status: true, data: {name, fullName, logoLink, interns: 'no intern available in this college'}});

        
        const finalData = {name , fullName, logoLink, interns};
        res.status(200).send({status: true, data: finalData})
    } catch (error) {
        res.status(500).send({status: false, msg: error.message});
    };
};

module.exports= {createCollege, getCollege};