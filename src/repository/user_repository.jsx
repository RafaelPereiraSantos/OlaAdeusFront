const punch_api_sign_in_url = 'http://localhost:3001/sign-in';
const punch_api_sign_out_url = 'http://localhost:3001/sign-out';
const punch_api_sign_up_url = 'http://localhost:3001/sign-up';
const punch_api_user_url = 'http://localhost:3001/user';

function post(url, body, success, failure) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  };
  fetch(url, { method: 'post', headers: headers, body: body, credentials: 'include' })
    .then((res) => { success(res) })
    .catch((err) => { failure(err) });
};

function get(url, success, failure) {
  fetch(punch_api_user_url, { method: 'get', credentials: 'include' })
    .then((res) => res.json())
    .then((body) => { success(body) })
    .catch((err) => { failure(err) })
}

let UserRepository = {}

UserRepository.signIn = (email_address, password, success, failure) => {
  const body = JSON.stringify({
    user: {
      email_address: email_address.value,
      password: password.value,
    }
  });

  post(punch_api_sign_in_url, body, success, failure)
}

UserRepository.signOut = (success, failure) => {
  post(punch_api_sign_out_url, null, success, failure);
}

UserRepository.registerUser = (user_name, email_address, password, success, failure) => {
  const body = JSON.stringify({
    user: {
      name: user_name.value,
      email_address: email_address.value,
      password: password.value,
    }
  });

  post(punch_api_sign_up_url, body, success, failure)
}

UserRepository.user = (success, failure) => get(punch_api_sign_out_url, success, failure)


export default UserRepository;