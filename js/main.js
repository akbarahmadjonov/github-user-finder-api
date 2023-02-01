const elForm = document.querySelector(".form-user");
const elFormInput = document.querySelector(".form-input");
const elResultList = document.querySelector(".search-result__output");
const elInputError = document.querySelector(".valid-danger");

const APIURL = "https://api.github.com/users";

const createUserCard = (array, node) => {
  // node.innerHTML = [];
  const cardHTML = document.createElement("div");
  cardHTML.innerHTML = `
        <div class="card mt-3 p-4 border border-1 rounded-1">
            <div class='row'>
              <div class='col-12 col-lg-6 w-25'>

              <div>
                <img class='w-100 rounded-circle' src="${array.avatar_url}" alt="${array.name}">
                <p class='mt-2 fw-bold'>${array.name}</p>
                <p class='login-pc fs-4'>${array.login}</p>
                <p class='mt-2'>${array.bio}</p>
                <a class='d-block btn btn-dark mt-2' href='${array.html_url}' target='blank' >View Profile</a>
              </div>
              </div>

                <div class="user-info col-12 col-lg-6 ms-lg-5 mt-sm-5">
                <div class='d-flex'>
                  <p class='bg-dark me-2 p-1 text-white text-center rounded'>Public Repos: ${array.public_repos}</p>
                  <p class='bg-secondary me-2 p-1 text-white text-center rounded'>Followers: ${array.followers}</p>
                  <p class='bg-primary me-2 p-1 text-white text-center rounded'>Following: ${array.following}</p>
                </div>
                <ul class='list-group'>
                  <li class='list-group-item'><strong><i class="fa-regular fa-building"></i> Company:</strong> ${array.company} <span class='dd d-none'>Nothing provided</span> </li>
                  <li class='list-group-item'><strong><i class="fa-regular fa-file-code"></i> Website/Blog:</strong> <a class='p-1 bg-primary text-white text-decoration-none rounded' href='${array.blog}'><i class="fa-solid fa-arrow-up-right-from-square"></i> Link</a></li>
                  <li class='list-group-item'><strong><i class="fa-solid fa-location-dot"></i> Location:</strong> <a class='text-white text-decoration-none rounded'></a>${array.location}</li>
                  <li class='list-group-item'><strong><i class="fa-solid fa-at"></i> Email:</strong> <a class='p-1 bg-primary text-white text-decoration-none rounded' href='mailto:${array.email}'><i class="fa-solid fa-arrow-up-right-from-square"></i> Link</a></li>
                  <li class='list-group-item'><strong><i class="fa-solid fa-mug-hot"></i> Want to be Hired:</strong> <span class='p-1 bg-danger text-white rounded'>${array.hireable}</span> </li>
                </ul>
                </div>
            </div>
        </div>`;
  node.appendChild(cardHTML);
};

async function getUser() {
  let response = await fetch(`${APIURL}/${elFormInput.value}`);
  let data = await response.json();
  console.log(data);

  for (key in data) {
    if (data[key] === null) {
      data[key] = "❗ No data provided by the user.";
    }
  }
  createUserCard(data, elResultList);
}

// async function run() {
//   try {
//     getUser();
//   } catch (err) {
//     console.log(err);
//   }
// }

// run();

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  //* Checks if user enters a value to an input
  if (elFormInput.value === "") {
    elInputError.classList.remove("d-none");
    return;
  } else {
    elInputError.classList.add("d-none");
  }

  getUser();
  //* Executes the fetch function
  // elFormInput.value = "";
});
