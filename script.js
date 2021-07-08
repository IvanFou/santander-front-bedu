
const forms = document.querySelectorAll(".signup-form")

// console.log(forms);

// function suma(a, b) {
//   return a + b
// }

const getTemplate = () => {
  return fetch("./template.html")
    .then((response) => response.text())
}

const sendEmailToApi = (address, template) => {
  fetch(`https://bedu-email-sender-api.herokuapp.com/send?id`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: address,
      template: template,
    }),
  })
    .then((results) => {
      console.log(results.status);
      if(results.status == 200){
        alert("E-mail send!!!")
      } else {
        alert("Send failed")
      }
      document.getElementById("email").value = ""
    })
    .catch((error) => {
      console.error(error);
      document.getElementById("email").value = ""
      alert("Send failed")
    });
};

function sendEmail(miVariable) {
  miVariable.preventDefault()
  const email = miVariable.target.querySelector("input").value
  getTemplate()
    .then((template) => {
      sendEmailToApi(email, template)
    })
    .catch((error) => {
      console.log(error, "error al obtener el template");
    })
}

// const sendEmail = (miVariable) => {
//   miVariable.preventDefault()
//   console.log(miVariable);
// }

for(let i = 0; i < forms.length; i++){
  // console.log(forms[i]);
  forms[i].addEventListener("submit", sendEmail)
}
