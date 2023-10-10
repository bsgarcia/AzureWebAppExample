const showMembers = async () => {
    document.querySelector('#members').classList.remove('hidden');
}

const hideMembers = () => {
    document.querySelector('#members').classList.add('hidden');
}
const showAddMember = () => {
    document.querySelector('#home').classList.add('fill')
    document.querySelector('#addMember').classList.remove('fill')
    document.querySelector('.hidden-div').classList.remove('hidden');
}

const hideAddMember = () => {
    document.querySelector('#home').classList.remove('fill')
    document.querySelector('#addMember').classList.add('fill')
    document.querySelector('.hidden-div').classList.add('hidden');
}

const loading = () => {
    document.querySelector('#loading').style.display = 'block';
}

const doneLoading = () => {
    document.querySelector('#loading').style.display = 'none';
}
    
const createCard = (params) => {
    const card = `
            <article class="no-padding">
                <img class="responsive small" src="https://${params.pic_url}">
                <div class="padding">
                    <h5>${params.nickname}</h5>
                    <p>${params.firstname} ${params.lastname}</p>

                <button onclick="deleteMember(${params.Id})" class="circle">
                <i class="mdi mdi-delete"></i>
              </button>
                </div>
            </article>`;
    return card;
}

const createMember = async (data) => {
    const endpoint = `/data-api/rest/Person/`;
    console.log('Creating member...')
    console.table(data);
    const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    console.table(result);
    console.table(result.value);
}

const deleteMember = async (id) => {
    hideMembers();
    const endpoint = '/data-api/rest/Person/Id';
    const response = await fetch(`${endpoint}/${id}`, {
      method: "DELETE"
    });
    if(response.ok) {
      console.log(`Record deleted: ${ id }`)
    } else {
      console.log(response);
    }
    await list();
    showMembers();
  }

// add JavaScript here
const list = async () => {
    hideMembers();
    document.querySelector('#members').innerHTML = '';
    const endpoint = '/data-api/rest/Person';
    const response = await fetch(endpoint);
    const data = await response.json();
    console.table(data.value);
    data.value.forEach((person) => {
        console.log(`${person.firstname} ${person.lastname}`);
        // create card using cardTemplate
        document.querySelector('#members').innerHTML += `
                    <div class='s2'>${createCard(person)}</div>
                `
    });
    doneLoading();
    showMembers();
}

const getPicURL = () => {
    return new Promise((resolve, reject) => {
        var formData = new FormData();
        formData.append('image', document.getElementById('file').files[0]);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://api.imgur.com/3/image');
        xhr.setRequestHeader('Authorization', 'Client-ID aca6d2502f5bfd8');
        xhr.onload = function () {
            if (xhr.status === 200) {
                var response = JSON.parse(xhr.responseText);
                resolve(response.data.link)
                // var photo_hash = response.data.deletehash;
            }
        };
        xhr.send(formData);
    })
}

const checkInputs = () => {
    const inputs = [...document.querySelectorAll('input')];
    let invalid = false;
    inputs.forEach((input) => {
        if(!input.value) {
           invalid = true; 
        }
    })
    return invalid;
}
// ---------------------------------------------------------------------
// EVENT LISTENERS
// ---------------------------------------------------------------------
document.querySelector('#addMember').addEventListener('click', () => {
    if (document.querySelector('.hidden-div').classList.contains('hidden')) {
        showAddMember()
    } else {
        hideAddMember()
    }
});

document.querySelector('#home').addEventListener('click', () => {
    hideAddMember()
});

document.querySelector("#submit").addEventListener('click', async () => {
    // check that all inputs are filled (use required attribute html5)
    if (checkInputs()) {
        document.querySelector("form").reportValidity();
        return;
    }
    loading(); 
    hideAddMember();
    hideMembers();
    const pic_url = await getPicURL();
    const data = {
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        nickname: document.querySelector('#nickname').value, 
        pic_url: pic_url.split('//')[1]
    }
    await createMember(data)
    await list()
    // simulate click on home button
    document.querySelector('#home').click()

})


// ---------------------------------------------------------------------
// INIT
// ---------------------------------------------------------------------
loading();
list()
showMembers();