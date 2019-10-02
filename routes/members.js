const express = require("express");
const router = express.Router();
const members = require("../MembersList");
const uuid = require("uuid");

//Call Members list and post it
router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json(members.filter(member => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(404)
      .json({ msg: `No member found with id of ${req.params.id}` });
  }
});

//POST Methods...
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "Active"
  };

  if (!newMember.name || !newMember.email) {
    return res.status(400).json({
      msg: "Please provide name and email address"
    });
  }

  members.push(newMember);
  res.json(members);
});

//Update or PUT methods

router.put("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    const updMember = req.body;
    members.forEach(member => {
      if (member.id === parseInt(req.params.id)) {
        member.name = updMember.name ? updMember.name : member.name;
        member.email = updMember.email ? updMember.email : member.email;

        res.json({ msg: `member has been updated`, member });
      }
    });
  } else {
    res.status(400).json({ msg: `No member found with id ${req.params.id}` });
  }
});

//Delete Member
router.delete("/:id", (req, res) => {
  const found = members.some(member => member.id === parseInt(req.params.id));

  if (found) {
    res.json({
      msg: "Member has been deleted",
      members: members.filter(member => member.id !== parseInt(req.params.id))
    });
  } else {
    res.status(400).json({
      msg: `No member found with id ${req.params.id}`
    });
  }
});
module.exports = router;
