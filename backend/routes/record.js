const express =  require("express");

// recordRoutes is an instance of the express router.
// we use it to define our routes.
// the router will be added as a middlleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// this will help us connect to the database
const dbo = require("../db/conn");

// this help convert the id fro string to OnjectId for the _id
const ObjectId = require("mongodb").ObjectId;

// this section will help you get all the records
recordRoutes.route("/record").get(function (req, res) {
	let db_connect = dbo.getDb("employees");
	db_connect.collection("records").find({}).toArray(function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// this section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
	let db_connect = dbo.getDb("employees");
	let myquery = { _id: ObjectId( req.params.id )};
	db_connect.collection("records").findOne(myquery, function (err, result) {
		if (err) throw err;
		res.json(result);
	});
});

// this section will help ou create a new record
recordRoutes.route("/record/add").post(function (req, response) {
	let db_connect = dbo.getDb("employees");
	let myobj = {
		person_name: req.body.name,
		person_position: req.body.position,
		person_level: req.body.level,
	};
	db_connect.collection("records").insertOne(myobj, function (err, res) {
		if (err) throw err;
		response.json(res);
	});
});

// this section will help update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
	let db_connect = dbo.getDb("employees");
	let myquery = { _id: ObjectId(req.params.id )};
	let newvalues = {
		$set: {
			person_name: req.body.name,
			person_position: req.body.position,
			person_level: req.body.level,
		},
	};
	db_connect.collection("records").updateOne(myquery, newvalues, function (err, res) {
		if (err) throw err;
		console.log("1 document updated");
		response.json(res);
	});
});

// this section will help delete a record
recordRoutes.route("/:id").delete((req, response) => {
	let db_connect = dbo.getDb("employees");
	let myquery = { _id: ObjectId( req.params.id )};
	db_connect.collection("records").deleteOne(myquery, function (err, obj) {
		if (err) throw err;
		console.log("1 document deleted");
		response.status(obj);
	});
});

module.exports = recordRoutes;