// isValidated(data){
//     const {title, desc, autheer, image, xyz} = data;
//     let errorMessage = "";
//     if(!title){
//         errorMessage =  "post rtitle is required"
//     }else if(!desc){
//         post dec is requoired
//     }
//     if(errorMessage)
//     throw errorMessage

//     retutn true
// }

const validatePost = (body) => {
  const { userId, content } = body;
  let errorMessage = "";
  if (!userId) {
    errorMessage = "User is required.";
  } else if (!content) {
    errorMessage = "Content body is required.";
  }
  if (errorMessage) {
    throw new Error(errorMessage);
  }
  return true;
};

const validateRegistration = (body) => {
  const { name, email, password } = body;
  let errorMessage = "";
  let nameRegex = /^[a-zA-Z ]{2,30}$/;
  let emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!nameRegex.test(name)) {
    errorMessage = "Name is invalid.";
  } else if (!emailRegex.test(email)) {
    errorMessage = "Email is invalid.";
  } else if (!passwordRegex.test(password)) {
    errorMessage =
      "Password must have 8 characters including atleast one letter and one number.";
  }
  if (errorMessage) {
    throw new Error(errorMessage);
  }
  return true;
};

module.exports = { validatePost, validateRegistration };
