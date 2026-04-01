// components/login.js
export function Login() {
    return `
        <h1>Login</h1>
        <label>Usuário</label>
        <input id="usuario" placeholder="Digite seu usuário" type="text">

        <label>Senha</label>
        <input id="senha" placeholder="Digite sua senha" type="password">

        <button onclick="login()">Entrar</button>
    `;
}