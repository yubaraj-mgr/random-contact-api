const apiUrl = "https://randomuser.me/api?";
let userArgs = [];

const fetchUsers = (params = "results=100") => {
  fetch(apiUrl + params)
    .then((response) => response.json())
    .then((data) => {
      userArgs = data.results;
      displayUser();
    })
    .catch((err) => console.log(err));
};

const displayUser = (args = userArgs) => {
  let str = ` `;
  args.map((user, i) => {
    str += `
    <div class="col-md-6 col-lg-3 mt-5" id="user-list">
    <div class="card h-100 card-deck style="width: 18rem"">
      <img src="${user.picture.large}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${user.name.title} ${user.name.first} ${user.name.last}</h5>
        <p class="card-text">
        <ul class="list-group">
        <li><i class="fa-solid circle-me fa-mobile-screen"></i> ${user.phone}</li>
        <li><i class="fa-solid circle-me fa-envelope"></i>${user.email}</li>
        <li><i class="fa-solid circle-me fa-location-dot"></i> ${user.location.street.number} ${user.location.street.name}, ${user.location.city}, ${user.location.state},  ${user.location.country},  ${user.location.postcode}</i></li>
      </ul>
        </p>
      </div>
    </div>
    </div>
    `;
  });
  document.getElementById("user-list").innerHTML = str;
  document.getElementById("user-count").innerText = args.length;
};

const handleOnChange = (e) => {
  const qryString = "results=20&gender=" + e.value;
  fetchUsers(qryString);
};

const handleOnSearch = (e) => {
  const str = e.value;
  const selectedUsers = userArgs.filter((user, i) => {
    const name = user.name.first + " " + user.name.last;
    return name.toLocaleLowerCase().includes(str.toLocaleLowerCase());
  });
  displayUser(selectedUsers);
  document.getElementById("user-count").innerText = selectedUsers.length;
};

fetchUsers();
