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

Given('ele é proprietário da review', () => {
  cy.intercept('POST', 'http://localhost:5001/reviews/add').as('createReview');
  cy.visit("http://localhost:3000/pages/create_review/67e327fd1d1cfdd8bf403e6a");
  cy.get('[data-testid="title-textarea"]').type("Lugia é o melhor"); 
  cy.get('[data-testid="body-textarea"]').type("o melhor filme de todos os tempos"); 
  cy.get(`[data-testid="star-5"]`).click();
  cy.get('[data-testid="confirm"]').click(); 
  cy.wait('@createReview').then((interception) => {
    const reviewId = interception.response.body.id;
    Cypress.env('reviewId', reviewId);
  });
});
Given('existe uma review na página inicial', () => {
    cy.intercept('POST', 'http://localhost:5001/reviews/add').as('createReview');
    cy.visit("http://localhost:3000/pages/create_review/67e327fd1d1cfdd8bf403e6a");
    cy.get('[data-testid="title-textarea"]').type("Lugia é o melhor"); 
    cy.get('[data-testid="body-textarea"]').type("o melhor filme de todos os tempos"); 
    cy.get(`[data-testid="star-5"]`).click();
    cy.get('[data-testid="confirm"]').click(); 
    cy.wait('@createReview').then((interception) => {
    const reviewId = interception.response.body.id;
    Cypress.env('reviewId', reviewId);
  });
});

Then('a mensagem {string} deve aparecer na página', (message) => {
  cy.on('window:alert', (alertText) => {
    expect(alertText).to.equal(message);
  });
});

Then('ele está na tela {string}', (page) => {
  cy.url().should('include', `${page}`);
});
When('ele navega para "review_detail"', () => {
  const reviewId = Cypress.env('reviewId'); 
  cy.visit(`/pages/review_detail/${reviewId}`);
});
When('confirma "curtir"', () => {
  cy.get('[data-testid="like-button"]').click();
});
Then('o botão "descurtir review" deve aparecer na tela', () => {
  cy.contains("Descurtir Review").should("be.visible");
});
When('confirma "excluir"', () => {
  cy.get('[data-testid="excluir"]').click();
});


When("ele navega para a tela {string}", (path) => {
  cy.visit(`http://localhost:3000/${path}`);
  console.log(`http://localhost:3000/${path}`);
  cy.get('[data-testid="confirm"]').should('be.visible');
});

When("ele navega para a tela dessa review", () => {
  const reviewId = Cypress.env('reviewId');
  cy.visit(`/pages/review_detail/${reviewId}`);
});

When("insere o título {string} no título", (title) => {
  cy.get('[data-testid="title-textarea"]').type(`${title}`); 
});

When("insere o conteúdo {string} no corpo review", (body) => {
  cy.get('[data-testid="body-textarea"]').type(`${body}`); 
});

When("insere a classificação {string} estrelas", (classification) => {
  cy.get(`[data-testid="star-${classification}"]`).click();
});





Given('que o indivíduo está na página de cadastro e que o username {string} já está cadastrado no banco de dados', (username) => {
  cy.visit("http://localhost:3000/pages/cadastro");

  cy.request({
    method: 'GET',
    url: `http://localhost:5001/users/find/${username}`,
    failOnStatusCode: false, // Não falhará se o usuário não for encontrado
  }).then((response) => {
    expect(response.status).to.eq(200); // Verifica se o usuário está cadastrado
  });
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

