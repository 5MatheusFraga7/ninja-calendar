# README

  # 1) A api o  
  
    A api foi desenolvida usando Rest, as rotas são:

    INDEX -> Lista todas as reuniões criadas dentro do mês vigente

        get /api/v1/manager_calendar/

    SHOW -> Lista uma reuniões específica pelo id

        get /api/v1/manager_calendar/id
    
    CREATE -> Cria uma nova reunião

        post /api/v1/manager_calendar/

        { room_id: room_id, title: title, starts_at: starts_at, ends_at: ends_at }

    UPDATE -> Atualiza a reunião

        put /api/v1/manager_calendar/id

        { meet: { title: put-new-title, starts_at: put-new-date } }

    DESTROY -> Remove uma reunião específica

        delete /api/v1/manager_calendar/id
  
 # 2) Rodar o container

    Na pasta do arquivo: rode comandos:

    docker-compose build
    docker-compose up

    Isso já deve ser necessário para rodar a aplicação, que está rodando em localhost:3000

    Se acontecer algum erro, rode os comandos: 

    service postgresql restart

    sudo docker-compose run web rake db:create
    sudo docker-compose run web rake db:migrate
    sudo docker-compose run web rake db:seed

 # 3) Issues

    - Pode ser que a interface não se comporte bem com responsividade, vale a pena feratorar esse ponto


    - O método index lista todas as reuniões dentro de um mês, o melhor seria listar todas, para a paginação da interface ser mais efetiva


    - O teste de criação de reuniões pode dar problema porque usamos datas aleatórias com a gem FactoryGirl, é possível que ela gere um valor não permitido pela regra de negócio 

    - Seria bom o usuário conseguir editar as reuniões através da inteface, excluindo a mesma se precisar também