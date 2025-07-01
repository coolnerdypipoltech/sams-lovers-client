const ENDPOINT = "https://sams-lovers-admin-b4d0cvasfwgrhhds.canadacentral-01.azurewebsites.net/api";

export async function SignIn(_name, _email, _password, _facebook_url, _instagram_url, _tiktok_url, _x_url, _youtube_url) {
    try {
        console.log(ENDPOINT + "/v1/auth/signin");
        const bodyData = {
            name: _name,
            email: _email,
            password: _password,
            diamonds: 0,
            facebook: _facebook_url,
            instagram: _instagram_url,
            tiktok: _tiktok_url,
            x: _x_url,
            youtube: _youtube_url,
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
        const response = await fetch(ENDPOINT + "/v1/auth/tokens", {
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
        const response = await fetch(ENDPOINT + "/v1/challenges/submission/", {
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

export async function GetArticles (_token, _limit, _offset) {
    try{
        const response = await fetch(ENDPOINT + `/v1/articles/${_limit}/${_offset}`, {
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

export async function GetRewards(_token, _limit, _offset) {
    console.log(ENDPOINT + `rewards//${_limit}/${_offset}`);
    try{
        const response = await fetch(ENDPOINT + `/v1/rewards/${_limit}/${_offset}`, {
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

export async function GetRewardsByUserWithURL (_token, _next_url) {
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

export async function GetPurchasedRewards (_token, _limit, _offset) {
    try {
        const response = await fetch(ENDPOINT + `/v1/rewards/purchased/${_limit}/${_offset}`, {
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

export async function GetPurchasedRewardsWithURL (_token, _next_url) {
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

export async function GetTopUsers (_token, _limit, _offset) {
    try {
        const response = await fetch(ENDPOINT + `/v1/users/top/${_limit}/${_offset}`, {
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

export async function GetTopUsersByURL (_token, _next_url) {
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

export async function GetMainPageData (_token) {
    try {
        const response = await fetch(ENDPOINT + `/v1/home/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        console.log(response);
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetLandingPageData (_token) {
    try {
        const response = await fetch(ENDPOINT + `/v1/landing/`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    }catch (error) {
        console.error('API Call error:', error);
    }
}

export async function UpdateUserInfo (_token, _name, _facebook_url, _instagram_url, _tiktok_url, _x_url, _youtube_url) {
    try {
        const response = await fetch(ENDPOINT + "/v1/auth/info", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": _token,
            },
            body: JSON.stringify({
                name: _name,
                facebook: _facebook_url,
                instagram: _instagram_url,
                tiktok: _tiktok_url,
                x: _x_url,
                youtube: _youtube_url,
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

export async function DeleteUser (_token, _password) {
    try {
        const response = await fetch(ENDPOINT + "/v1/auth", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": _token,
            },
            body: JSON.stringify({
                password: _password
            }),
        });
        return response;
    } catch (error) {
        console.error('API Call error:', error);
    }
}

export async function GetFooterLinks () {
    try {
        const response = await fetch(ENDPOINT + "/v1/links", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        });
        return response;
    } catch (error) {
        console.error('API Call error:', error);
    }
}