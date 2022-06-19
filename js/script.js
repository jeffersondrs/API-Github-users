'use strict';

const APIURL = 'https://api.github.com/users/';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser(username) {
    try { 
        const { data } = await axios(APIURL + username)
        createUserCard(data)
        getRepos(username)
    }
catch(err){
    if(err.response.status === 404){

    createErrorCard('Não há usuario com esse username')
        }
    }
}
async function getRepos(username){
    try { 
        const { data } = await axios(APIURL + username + '/repos')
        addReposToCard(data)
    }
catch(err){
    
    createErrorCard('Não há usuario com esse username')
        
    }
}

function createUserCard(user){
    const cardHTML = `
    <div class="card">
    <div>
      <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
    </div>
    <div class="user-info">
      <h2>${user.name}</h2>
      <h3 style="color: white;">${user.login}</h3>
      <p>${user.bio}</p>
      <ul>
        <li>${user.followers} <strong>Followers</strong></li>
        <li>${user.following} <strong>Following</strong></li>
        <li>${user.public_repos} <strong>Repositorys</strong></li>
      </ul>

      <div id="repos"></div>

    </div>
  </div>`
    main.innerHTML = cardHTML;
}

function createErrorCard(msg){
    const cardHTML = `
    <div class="card">
    <div>
      <h2>${msg}</h2>
    </div>
  </div>`
    main.innerHTML = cardHTML;
}

function addReposToCard(repos){
    const reposEl = document.getElementById('repos');
    repos
    .slice(0, 8)
     .forEach(repo => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repos');
        repoEl.href = repo.html_url;
        repoEl.target = '_blank';
        repoEl.innerHTML = repo.name;
        reposEl.appendChild(repoEl);
     })
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;
    if(user) {
        getUser(user);
        search.value = '';
    }
})
