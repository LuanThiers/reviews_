Categorizar/buscar posts por tópicos

 Scenario: Filtrar posts por gênero
    Given que o usuário “Quinhas” está logado no sistema
    And está na página “Fórum”
    When o usuário “Quinhas” filtra pela opção “Gênero” 
    And escolhe “Comédia”
    Then o usuário “Quinhas” é redirecionado para página “Resultados do Filtro”
    And são mostrados os posts em ordem cronológica “Não sei sei só sei que foi assim, Filme Sessão da Tarde”

Scenario: Filtrar posts por filme
   Given que o usuário “Luan_Thiers” está logado no sistema
   And está na página “Fórum”
   When o usuário “Luan_Thiers” filtra pela opção “Avaliação”
   And escolhe “4 Estrelas”
   Then o usuário “Luan_Thiers” é redirecionado para página “Resultados do Filtro”
   And são mostrados os posts “Vivemos numa Matrix?”

Scenario: Filtrar posts por gênero inexistente no banco de dados
   Given que o usuário “Polita” está logado no sistema
   And está na página “Fórum”
   When o usuário “Polita” filtra pela opção “Gênero”
   And escolhe “Terror”
   Then o usuário “Polita” é redirecionado para página “Resultados do Filtro”
   And é mostrada uma mensagem de aviso “Nenhum post foi encontrado”

 Scenario: Buscar posts pelo título da review
 Given que o usuário “Polita” está logado no sistema
 And está na página “Fórum”
 When o usuário “Polita” acessa a barra de pesquisa e busca “Vivemos numa Matrix?”
 And seleciona “Pesquisar”
 Then o usuário “Polita” é redirecionado para página “Resultados da Pesquisa”
 And são mostrados os posts “Vivemos numa Matrix?” na página “Resultados da pesquisa”