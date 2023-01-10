const elForm = document.querySelector(".form-user");
const elFormInput = document.querySelector(".form-input");
const elResultList = document.querySelector(".search-result__output");

const APIURL = "https://api.github.com/users/";

const createUserCard = (array, node) => {
  array.forEach((user) => {
    const cardHTML = `
        <div class="card">
            <div>
                <img src="${user.avatar_url}" alt="${user.name}">
            </div>
            <div class="user-info">
                <h2>${user.name}</h2>
            </div>
        </div>`;
    node.appendChild(cardHTML);
  });
};

async function getUser() {
  let response = await fetch(`${APIURL}${elFormInput.value}`);
  let data = await response.json();
  createUserCard(data, elResultList);
}

elForm.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const user = elFormInput.value;

  if (elFormInput.value !== "") {
    getUser();
  }
  elFormInput.value = "";
});

// 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;
