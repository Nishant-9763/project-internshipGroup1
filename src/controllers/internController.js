const internModel = require('../models/internModel');
const collegeModel = require('../models/collegeModel');
const {validInternName, validEmail, validNumber, validCollegeName} = require('../validators/validator');

const createIntern = async function(req, res) {
    try {
        const data = req.body;

        if (Object.keys(data).length == 0) return res.status(400).send({status: false, msg: 'please enter intern details'});

        const {name, email, mobile, collegeName} = data;

        if (!name) return res.status(400).send({status: false, msg: 'name is required'});
        if (!validInternName(name.trim())) return res.status(400).send({status: false, msg: 'please enter a valid intern name'});
       
        if (!email) return res.status(400).send({status: false, msg: 'email is required'});
        if (!validEmail(email)) return res.status(400).send({status: false, msg: 'please enter a valid email '});
        const internByEmail = await internModel.findOne({email: email});
        if (internByEmail) return res.status(400).send({status: false, msg: 'email already in use, please enter a unique email'});

        if (!mobile) return res.status(400).send({status: false, msg: 'mobile is required'});
        if (!validNumber(mobile)) return res.status(400).send({status: false, msg: 'mobile number is invalid'});
        const internByMobile = await internModel.findOne({mobile: mobile});
        if (internByMobile) return res.status(400).send({status: false, msg: 'mobile number already in use, please enter a unique mobile number'});

        if (!collegeName) return res.status(400).send({status: false, msg: 'college name is required'});
        if (!validCollegeName(collegeName)) return res.status(400).send({status: false, msg: 'please enter a valid college name'});
        const college = await collegeModel.findOne({name: collegeName,isDeleted:false});
        if (!college) return res.status(400).send({status: false, msg: 'collge does not exits with this name'});

        data.collegeId = college._id;

        const internCreated = await internModel.create(data);

        res.status(201).send({status: true, data: internCreated});
    } catch (error) {
        res.status(500).send({status: false, msg: error.message});
    };
};

module.exports = {createIntern};
