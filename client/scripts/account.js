Template.layout.events({
  'click .logout': function(event){
    event.preventDefault();
    Meteor.logout();
    Router.go('hom');
  }
});

Template.login.events({
    'submit form': function(event){
        event.preventDefault();
        var email = event.target.email.value;
        var password = event.target.password.value;
        Meteor.loginWithPassword(email, password);
    }
});

Template.password.events({
  'submit form': function(event){
    event.preventDefault();
    var email = event.target.email.value;
    Meteor.call(
      'sendEmail',
      email,
      'Leaderboard-Todos <recuperarsenhajonathan@gmail.com>',
      'Pediu para recuperar senha?',
      'Hahahaha, é só um teste!\nEmail enviado pelo meteor :B',
    );
    Router.go('codepsw');
  },
});

Template.codepsw.events({
  'submit form': function(event){
    event.preventDefault();
    var code = event.target.code.value;
    var password = event.target.password.value;
    var password2 = event.target.password2.value;
    console.log("Seu código: "+code+"\nSua senha: "+password+"\nSua confirmação de senha: "+password2);
    Router.go('hom');
  },
});

Template.register.events({
  'submit form': function(event){
    event.preventDefault();
    var nome = event.target.name.value;
    var email = event.target.email.value;
    var password = event.target.password.value;
    var password2 = event.target.password2.value;
    var code = event.target.code.value;
    Meteor.call('verificationregister', code, function(error, result){
      console.log(error,result);
      var verification = result;

      console.log(code+' '+verification);
      if (verification){
        if (password == password2){
          Accounts.createUser({
            email: email,
            password: password,
            name: name,
          });
          Router.go('hom');
        } else {
          Bert.alert('As senhas precisam ser iguais', 'danger', 'growl-top-left');
          event.target.password.value = '';
          event.target.password2.value = '';
        }
      }
      else {
        Bert.alert('Código secreto incorreto!', 'danger', 'growl-top-left');
          event.target.code.value = '';
          event.target.password.value = '';
          event.target.password2.value = '';
      }
    });
  }
});

/*Meteor.loginWithPassword(email, password, function(error){
    if(error){
        console.log(error.reason);
    } else {
        Router.go("hom");
    }
});*/
