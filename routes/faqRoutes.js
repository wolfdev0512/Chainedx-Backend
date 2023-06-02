const express = require("express");

const {
  addFaq,
  getAllFaqs,
  getFaq,
  updateFaq,
  deleteFaq,
} = require("../controllers/faqController");

const router = express.Router();

// http://localhost:4000/api/faq
router.post("/", addFaq);

// http://localhost:4000/api/faq
router.get("/", getAllFaqs);

// http://localhost:4000/api/faq/:faq_id
router.get("/:id", getFaq);

// http://localhost:4000/api/faq/:faq_id
router.put("/:id", updateFaq);

// http://localhost:4000/api/faq/:faq_id
router.delete("/:id", deleteFaq);

module.exports = {
  routes: router,
};
