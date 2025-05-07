
let usernameinp = document.querySelector('input')
let submitBtn = document.querySelector('form')
let profileCard = document.querySelector('.profileCard')
let repoCard = document.querySelector('#repo-list')
 

function getUser(username){

    return fetch(`https://api.github.com/users/${username}`).then( (raw)=> {
        if(!raw.ok) throw new Error('user not found');
        return raw.json()
    })
}


function getRepo(username){

    return fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=3`).then((raw)=>{
        if(!raw.ok) throw new Error('Failed to load repos..')
        return raw.json()
    })

}

function setRepo(repoData){

  // console.log(repoData)

  let allRepo = ""

  repoData.forEach((rep)=>{
    let repo = `<div class="bg-white bg-opacity-5 backdrop-blur-md p-5 rounded-xl shadow hover:scale-[1.02] transition">
          <h3 class="text-lg font-bold text-white">${rep.name}</h3>
          <p class="text-sm text-gray-400 mt-1">${rep.description}</p>
          <div class="flex justify-between mt-3 text-gray-500 text-sm">
            <span>⭐ ${rep.stargazers_count}</span>
            <span>🍴 ${rep.forks} </span>
          </div>
        </div>    `

        allRepo+=repo

      
  repoCard.innerHTML = allRepo;
  })

  
}

function setProfileData(userdata){
    let data = `<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6 bg-white bg-opacity-5 backdrop-blur-md rounded-2xl p-6 shadow-lg">
      <div class="flex items-center gap-5">
        <img class="w-24 h-24 rounded-full border-4 border-blue-500 shadow" src="${userdata.avatar_url}" alt="Avatar">
        <div>
          <h1 class="text-3xl font-bold">${userdata.name}</h1>
          <p class="text-gray-400">${userdata.bio==null?"no bio":userdata.bio}</p>
          <p class="text-sm mt-1 text-gray-500">🌍 ${userdata.location}</p>
        </div>
      </div>
      <div class="flex gap-6 text-center">
        <div>
          <h2 class="text-xl font-bold">${userdata.followers}</h2>
          <p class="text-gray-400">Followers</p>
        </div>
        <div>
          <h2 class="text-xl font-bold">${userdata.following}</h2>
          <p class="text-gray-400">Following</p>
        </div>
        <div>
          <h2 class="text-xl font-bold">${userdata.public_repos}</h2>
          <p class="text-gray-400">Contributions</p>
        </div>
      </div>
    </div>`

    profileCard.innerHTML = data;
}


submitBtn.addEventListener('submit',function(e){
    e.preventDefault()
    let username = usernameinp.value.trim()
    if(username.length>0){
        getUser(username).then((data)=>{
            // console.log(data)

            setProfileData(data)
        })

        getRepo(username).then((repos)=>{
          // console.log(repos)
          setRepo(repos)
        })
    }else{
        alert()
    }
    
})



// let user = 'itsmepraksh'
// getUser(user).then((data)=>{
//     console.log(data)
// })

// getRepo(user).then((data)=>{
//     console.log(data)
// })
