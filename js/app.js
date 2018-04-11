var config = {
  apiKey: "AIzaSyBgNUYGo0wMSBegfA0gnWULpVIVmQowRug",
  authDomain: "fir-b0664.firebaseapp.com",
  databaseURL: "https://fir-b0664.firebaseio.com",
  projectId: "fir-b0664",
  storageBucket: "fir-b0664.appspot.com",
  messagingSenderId: "17497757455"
};
firebase.initializeApp(config);

const database = firebase.database();
const users = database.ref('users');

//variables del dom
const nameUser = $('#name-user');
const emailUser = $('#email-user');
const age = $('#age-user');
const btnAdd = $('#adduser');
const save = $('#save');

users.on('value', function (datos) {
  $('.box').remove(); // no duplicar datos
  const data = datos.val();

  $.each(data, function (indice, user) {
    const template = `<tr class="box" data-id=${indice} ><td>${user.name}</td><td>${user.email}</td><td>${user.age}</td><td><a data-id=${indice} data-name=${user.name} data-email=${user.email} data-age=${user.age} class="btn green edit mr-1">Edit</a><a data-id=${indice} class="btn btn-danger delete">Delete</a></td></tr>`;
    $('#container').append(template);
  });

});
var idUser = '';



$(document).on('click', '.edit', (event) => {
  event.preventDefault();
  btnAdd.attr('disabled', 'disabled');
  save.attr('disabled', false);
  const id = event.target.dataset.id;
  const nameSave = event.target.dataset.name;
  const emailSave = event.target.dataset.email;
  const ageSave = event.target.dataset.age;
console.log(id);
  nameUser.val(nameSave);
  emailUser.val(emailSave);
  age.val(ageSave);
  idUser = id;
})

// Actualizar
save.on('click', (event) => {
  event.preventDefault();
  var userUpdate = firebase.database().ref(`users/${idUser}`);
  if(age.val()&&nameUser.val()&&emailUser.val()){
  userUpdate.update({
    age: age.val(),
    name: nameUser.val(),
    email: emailUser.val()

  });
  clear();
  btnAdd.attr('disabled', false);
  save.attr('disabled', 'disabled');
}else{
  alert('Completa los campos');
}
});


//Borrar datos de firebase
$(document).on('click', '.delete', (event) => {
  const idUserDelete = event.target.dataset.id;
  var userDelete = firebase.database().ref(`users/${idUserDelete}`);
  userDelete.remove();
});

// Agregar a la base de datos
btnAdd.on('click', () => {
if(age.val()&&nameUser.val()&&emailUser.val()){
  users.push({
    age: age.val(),
    name: nameUser.val(),
    email: emailUser.val(),

  }, function () {
    console.log('Se registro correctamente');
  });
clear();
}else{
  alert('Completa los campos')
}

});

function clear(){
  nameUser.val('');
  emailUser.val('');
  age.val('');
}