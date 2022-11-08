## Server
Per ara nomes te 2 rutes:</br>
    POST /signin: espera al body un camp "username" i un camp "password", et guarda a la db i et torna un token
    </br>
    GET / :nomes te un middleware que autentica el usuari. Espera al body els camps "username", "password" I TAMBÉ "token". Si passa el middleware t'ho comunica.
