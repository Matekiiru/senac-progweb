import { Login } from './components/login.js';
import { Dashboard } from './components/dashboard.js'

//pega o contexto da aplicaçao
const app = document.getElementById("app");
//rotas
const routes = {
    "/" : () => "<h1>Página Publica</h1>",

    "/login": () => Login(),
    
    "/dashboard": () => {
        if(!isAuthenticated()){
            location.hash = "/login"
            return"";
        }
        return Dashboard()
        
    }
    
    
}

//seta o usuario como logado
// pega os dados de usuario e senha com o doc.getelementById(variavel).value
function login(){
        const usuario = document.getElementById("usuario").value;
        const senha = document.getElementById("senha").value;
        console.log(usuario)
        console.log(senha)
        if(usuario === "admin" && senha ==="admin"){
            console.log("Logado!")
             localStorage.setItem("auth", "true");
             location.hash = "/";
        }
        else{
            console.log("login e senha incorretos")
        }
    
    }
window.login = login;
//remove o estado logado do usuario
function logout(){
    localStorage.removeItem("auth");
    location.hash = "/";
}
window.logout = logout;

// renderiza a pagina com base no endereço #
function render(){
    const path = location.hash.replace("#","")  || "/";
    const route = routes[path];

    if(route){
        app.innerHTML = route();

        renderNav(path);

    const loginBtn = document.querySelector("button");
    if(loginBtn && path === "/login"){
        loginBtn.addEventListener("click",login);
    }

    if(path === "/dashboard"){
    const logoutBtn = document.querySelector("button");
    if(logoutBtn){
        logoutBtn.addEventListener("click", logout);
    }
}

    }else{
        app.innerHTML = "<h1>404</h1>"
    }
}
//verifica login
function isAuthenticated(){
    return localStorage.getItem("auth") === "true";
}
//gera o nav do dashboard
function renderNav(){
    //pega o id da area privada, para atualizar o nav e colocar o dashboard
    const privateArea = document.getElementById("privateArea")
    //limpa a privateArea
    privateArea.innerHTML = " "
    //verifica se esta logado
    if(isAuthenticated()){
        privateArea.innerHTML = `
        <a href="#/dashboard">Dashboard</a>
        `
    }
}

//listeners de mudanças da pagina
window.addEventListener("hashchange", render);
window.addEventListener("load", render);