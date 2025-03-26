import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

Given("que o usuário com email {string} e senha {string} está logado no sistema", (email, senha) => {
  cy.visit("http://localhost:3000/pages/cadastro");
  cy.get('[data-testid="login-button"]').click();
  cy.get('#content.move-to-left').should('be.visible');
  cy.wait(500);
  cy.get("#e-mail").type(`${email}`);
  cy.get("#password").type(`${senha}`);
  
  cy.get('#ent').should('not.be.disabled');

  cy.get("#ent").click();
  cy.url().should("include", "/pages/initial_page");
  cy.window().its('localStorage.userToken').should('exist');
  
});

Given('que o usuário {string} está na página da review {string}', (email, reviewId) => {
  cy.visit(`http://localhost:3000/pages/review_detail/${reviewId}`);
  console.log(`http://localhost:3000/pages/review_detail/${reviewId}`);
  cy.get('[data-testid="comment-button"]').should('be.visible');
});

When("seleciona para comentar", () => {
  cy.get('[data-testid="comment-button"]').click();
  cy.get('[data-testid="comment-textarea"]').should('be.visible');
});
When("insere o comentário {string} no campo de comentários", (comentario) => {
  cy.get('[data-testid="comment-textarea"]').type(`${comentario}`); 
});

When("confirma o envio", () => {
  cy.get('[data-testid="confirm"]').click(); 
});

Then('a mensagem {string} deve aparecer na página', (message) => {
  
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message);
  });
  
});

Given('que o usuário {string} está na página {string}', (email, page) => {
  cy.visit(`http://localhost:3000/pages/${page}`);
});

When("seleciona a barra de pesquisa", () => {
  cy.get('[data-testid="search-bar"]').should('be.visible');
  cy.get('[data-testid="search-bar"]').click();
});

When("insere o nome {string} na barra de pesquisa", (user) => {
  cy.get('[data-testid="search-bar"]').type(`${user}`); 
});

When("pressiona a tecla enter", function () {
  cy.get('[data-testid="search-bar"]').type('{enter}')
  });

When("seleciona o perfil do usuário {string}", function (user) {
  cy.get('[data-testid="user_card"]').should('be.visible');
  cy.get('[data-testid="user_card"]').click();
  });

Then("o usuário deve ser redirecionado para o perfil do usuário {string} na página {string}", function (user, page) {
  cy.url().should('include', '/pages/page_userProfile');
});

When("seleciona a opção seguir", function(){
  cy.get('[data-testid="follow_button"]').should('be.visible').click();
});

Given("que o usuário acessou o perfil do usuário {string} a partir da página de pesquisa e está na página {string}", function (user, page) {
  cy.visit('http://localhost:3000/pages/page_search');
  cy.get('[data-testid="search-bar"]').click();
  cy.get('[data-testid="search-bar"]').type(`${user}`);
  cy.get('[data-testid="search-bar"]').type('{enter}');
  cy.get('[data-testid="user_card"]').click();
  cy.url().should('include', '/pages/page_userProfile');
  });

When("seleciona a opção seguidores", function () {
  cy.get('[data-testid="followers_button"]').should('be.visible').click();
  });

Then("uma lista com todos os seguidores do usuário {string} deve aparecer na tela", function (user) {
  cy.get('[data-testid="followers_list"]').should('be.visible')  
});

Given("que o usuário {string} acessou o próprio perfil a partir da página de pesquisa e está na página {string}", function (user, page) {
  cy.visit('http://localhost:3000/pages/page_search');
  cy.get('[data-testid="search-bar"]').click();
  cy.get('[data-testid="search-bar"]').type(`${user}`);
  cy.get('[data-testid="search-bar"]').type('{enter}');
  cy.get('[data-testid="user_card"]').click();
  cy.url().should('include', '/pages/page_userProfile');
  });

When("seleciona a opção excluir conta", function () {
  cy.get('[data-testid="delete_button"]').should('be.visible').click();
  });

When("confirma a exclusão da conta", function () {
  cy.on('window:confirm', (text) => {
    expect(text).to.equal('Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.');
    return true
  });
  });

Then("o usuário deve ser redirecionado para a página {string}", function (page) {
  cy.url().should('include', `/pages/${page}`);
  });