const ENDPOINT = "https://sams-lovers-admin-b4d0cvasfwgrhhds.canadacentral-01.azurewebsites.net/api/v1/";

export async function SignIn(_name, _email, _password) {
    try {
        console.log(ENDPOINT + "auth/signin");
        const bodyData = {
            name: _name,
            email: _email,
            password: _password,
            diamonds: 0
        };
        const response = await fetch(ENDPOINT + "auth/signin", {
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
    console.log(ENDPOINT + "auth/login")
    try{
        const response = await fetch(ENDPOINT + "auth/login", {
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
        const response = await fetch(ENDPOINT + "auth/login/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function ResetPassword(_email) {
    try{
        const response = await fetch(ENDPOINT + "auth/passwords/reset", {
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

export async function CreateSubmission(_token, _challenge_id) {
    try{
        const response = await fetch(ENDPOINT + "challenge/submission/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
        },
        body: JSON.stringify({
            challenge_id: _challenge_id,
        }),
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function PurchaseReward(_token, _reward_id) {
    try{
        const response = await fetch(ENDPOINT + "rewards/purchase/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
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
        const response = await fetch(ENDPOINT + "codes/exchange/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
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
        const response = await fetch(ENDPOINT + "user", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetArticles (_token, _page, _count) {
    try{
        const response = await fetch(ENDPOINT + `articles/${_page}/${_count}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetChallengesByUser (_token, _page, _count) {
    try{
        const response = await fetch(ENDPOINT + `challenges/${_page}/${_count}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
        }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetPurchasedRewards (_token, _page, _count) {
    try {
        const response = await fetch(ENDPOINT + `rewards/purchased/${_page}/${_count}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + _token,
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
        const response = await fetch(ENDPOINT + "user/update", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + _token,
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
            const response = await fetch(ENDPOINT + "user/update/avatar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + _token,
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
        const response = await fetch(ENDPOINT + "user/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + _token,
            }
        });
        return response;
    } catch (error) {
        console.error('API Call error:', error);
    }
}