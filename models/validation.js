const Joi = require("joi");
const contactValidationSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/),
  favorite: Joi.boolean()
});

const userValidationSchema = Joi.object({
  email: Joi.string().email(),
  password: Joi.string().min(5).max(20)
})

async function validatePost(req, res, next) {
  const { name, email, phone } = req.body;
  if (!name || !phone || !email)
    return res.status(400).json({ message: "missing required name field" });

  try {
    await contactValidationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}
async function validatePut(req, res, next) {
  const { name, phone, email } = req.body;
  if (!name && !phone && !email)
    return res.status(400).json({ message: "missing fields" });
  try {
    await contactValidationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }

  next();
}
const validateStatusPatch = async (req, res, next)=>{
  try {
    await contactValidationSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  const {favorite} = req.body
  if (favorite===true || favorite === false) next ()
  else{
  return res.status(400).json({"message": "missing field favorite"})
  }
}
async function validateCredentials(req, res, next) {
  try {
    await userValidationSchema.validateAsync(req.body)
  }
  catch (err){
    return res.status(400).json(err.details[0].message)
  }
  next()
}

module.exports = {
  validatePost,
  validatePut,
  validateStatusPatch,
  validateCredentials
};
