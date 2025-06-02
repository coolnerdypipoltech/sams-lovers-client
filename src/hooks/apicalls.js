const ENDPOINT = "https://sams-lovers-admin-b4d0cvasfwgrhhds.canadacentral-01.azurewebsites.net/api";

export async function SignIn(_name, _email, _password) {
    try {
        console.log(ENDPOINT + "/v1/auth/signin");
        const bodyData = {
            name: _name,
            email: _email,
            password: _password,
            diamonds: 0
        };
        const response = await fetch(ENDPOINT + "/v1/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bodyData),
        });

        return response;
    } catch (error) {
        console.error('API Call error:', error);
    }
}

export async function LogIn(_email, _password) {
    console.log(_email, _password)
    console.log(ENDPOINT + "/v1/auth/login")
    try{
        const response = await fetch(ENDPOINT + "/v1/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: _email,
            password: _password,
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function LogInWithToken(_token) {
    try{
        const response = await fetch(ENDPOINT + "/v1/auth/login/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function ResetPassword(_email) {
    try{
        const response = await fetch(ENDPOINT + "/v1/auth/passwords/reset", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: _email,
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function CreateSubmission(_token, _challenge_id, _url) {
    try{
        const response = await fetch(ENDPOINT + "/v1/challenge/submission/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        },
        body: JSON.stringify({
            challenge_id: _challenge_id,
            url: _url
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function PurchaseReward(_token, _reward_id) {
    try{
        const response = await fetch(ENDPOINT + "/v1/rewards/purchase/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        },
        body: JSON.stringify({
            reward_id: _reward_id,
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function ExchangeCode(_token, _code) {
    try{
        const response = await fetch(ENDPOINT + "/v1/codes/exchange/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        },
        body: JSON.stringify({
            code: _code,
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetUserInfo(_token) {
    try{
        const response = await fetch(ENDPOINT + "/v1/user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetArticles (_token, _page, _count) {
    try{
        const response = await fetch(ENDPOINT + `/v1/articles/${_page}/${_count}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetChallengesByUser (_token, _challenge_status, _transaction_status, _limit, _offset) {
    console.log(ENDPOINT + `challenges/${_challenge_status}/${_transaction_status}/${_limit}/${_offset}`)
    try{
        const response = await fetch(ENDPOINT + `/v1/challenges/${_challenge_status}/${_transaction_status}/${_limit}/${_offset}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        }
        });
        console.log(response);
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetChallengesByUserWithURL (_token, _next_url) {
    console.log(ENDPOINT + _next_url);
    try{
        const response = await fetch(ENDPOINT + _next_url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        }
        });
        console.log(response);
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetPurchasedRewards (_token, _page, _count) {
    try {
        const response = await fetch(ENDPOINT + `/v1/rewards/purchased/${_page}/${_count}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": _token,
            }
          });
          const data = await response.json();
          return data;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function UpdateUserInfo (_token, _name, _facebook_url, _instagram_url, _tiktok_url, _x_url, _youtube_url) {
    try {
        const response = await fetch(ENDPOINT + "/v1/user/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": _token,
        },
        body: JSON.stringify({
            name: _name,
            facebook_url: _facebook_url,
            instagram_url: _instagram_url,
            tiktok_url: _tiktok_url,
            x_url: _x_url,
            youtube_url: _youtube_url,
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function UpdateUserAvatar (_token, _file) {
    if(_file){
        const formData = new FormData();
        formData.append('image', _file);

        try {
            const response = await fetch(ENDPOINT + "/v1/user/update/avatar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": _token,
            },
            body: formData,
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('API Call error:', error);
        }
    }
}

export async function DeleteUser (_token) {
    try {
        const response = await fetch(ENDPOINT + "/v1/user/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": _token,
            }
        });
        return response;
    } catch (error) {
        console.error('API Call error:', error);
    }
}