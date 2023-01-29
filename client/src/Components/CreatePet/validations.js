
 export const validateName = (name) => {
  const nameRegex = /^[a-zA-Z][a-zA-Z\s]{0,13}[a-zA-Z]$/;
  const error = !nameRegex.test(name)
  return error
};
export const validateDesc = (description) => {
 if(description.length < 10)return true
 else{ return false}
};
export const validateBirthday = (birthday) => {
  const regexBirthday = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
  const error = !regexBirthday.test(birthday)
  return error
};

export const validateProfilePic = (img) => {
  if (!img) true
  else false
};

export const validateSize = (size) => {
  if(!size) true
  else false
}
export const validateSpecie = (specie) => {
  if(!size) true
  else false
}
export const validateState = (state) => {
  if(!size) true
  else false
}

module.exports ={
  validateName,
  validateDesc,
  validateBirthday,
  validateProfilePic,
  validateSize,
  validateSpecie,
  validateState
}