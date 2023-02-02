# Boas-vindas ao repositório do projeto Front-end Online Store!

:paperclip: https://marisin.github.io/online-store/

<details>
  <summary><strong>👨‍💻 O que foi desenvolvido</strong></summary><br />

  Neste projeto foi criada uma versão simplificada, sem persistência no banco de dados, de uma **loja online**, desenvolvendo em grupo suas funcionalidades de acordo com demandas definidas em um quadro _Kanban_, em um cenário próximo ao do mercado de trabalho.
  
  A partir dessas demandas, teremos uma aplicação em que pessoas usuárias poderão:
  - Buscar produtos por termos e categorias a partir da _API do Mercado Livre_;
  - Interagir com os produtos buscados de modo a adicioná-los e removê-los de um carrinho de compras em diferentes quantidades;
  - Visualizar detalhes e avaliações prévias de um produto, bem como criar novas avaliações e;
  - Simular a finalização da compra dos itens selecionados.
</details>

<details>
  <summary><strong>:memo: Habilidades</strong></summary><br />

  Neste projeto você será irá:

  * Entender o que são Métodos Ágeis;
  * Entender o que é Kanban;
  * Entender o que é Scrum;
  * Trabalhar em equipes utilizando Kanban ou Scrum de maneira eficaz;
  * Praticar todas as habilidades desenvolvidas até agora no módulo de Front-end.
</details>

  ### Documentação da API do Mercado Livre
  <details>
   <summary><strong>👨‍💻 Endpoints </strong></summary><br />
  
   * Para listar as categorias disponíveis:
     - Endpoint: https://api.mercadolibre.com/sites/MLB/categories
  
  * Para buscar por itens por termo:
    - Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?q=$QUERY
  
  * Para buscar itens por categoria:
    - Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID
  
  * Para buscar itens de uma categoria por termo (vale ressaltar, que este endpoint não necessariamente precisa receber ambos os parâmetros para funcionar):
    - Parâmetro de busca $QUERY (este parâmetro deve ser substituído pelo valor do campo de busca)
    - Parâmetro de busca $CATEGORY_ID (este parâmetro deve ser substituído pelo ID da categoria selecionada)
    - Endpoint: https://api.mercadolibre.com/sites/MLB/search?category=$CATEGORY_ID&q=$QUERY
  
  * Para buscar detalhes de um item especifico:
    - Parâmetro de busca $PRODUCT_ID (este parâmetro deve ser substituído pelo valor do campo de busca)
    - Endpoint: https://api.mercadolibre.com/items/$PRODUCT_ID
    
    [Documentação da API completa](https://developers.mercadolivre.com.br/pt_br/itens-e-buscas)
  </details>

