const fetch = require("node-fetch");
fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwNWI0MDljNmYyMmM0MDNlMWY5MWY5ODY3YWM0OTJhOTA2MTk1NTgiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vZmluZGFob21laGVucnkiLCJhdWQiOiJmaW5kYWhvbWVoZW5yeSIsImF1dGhfdGltZSI6MTY3NDkzNDI1MiwidXNlcl9pZCI6IlFQRHVDQjU0SmhPNTRnNzI4MThuQUFHd3hUZjIiLCJzdWIiOiJRUER1Q0I1NEpoTzU0ZzcyODE4bkFBR3d4VGYyIiwiaWF0IjoxNjc0OTM0MjUyLCJleHAiOjE2NzQ5Mzc4NTIsImVtYWlsIjoicm9kLnRvb2JlQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJyb2QudG9vYmVAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.cjm8LiOmLisD11mAo5jwSJA7K1Ws3B5kMbYA14QI6EVP62DnzFNwOOIvwSrnsjwzfGgTpDKC8ZKGj6Gs4w3GJeqZuTSoLshBwvESMUgOiruXjeNu4PKAiosaMGFvRq5tlgQb7WVRbij23NhGf8bjQaYNazISL9jHZBEAiaQoGCdyMcA4joqg1WofhvIDNPasYJrELww1KmkDuv-OEaKY1ynyOuSCMEoH3BDmV00zaA4Ai5NzSQnWBSoR3ZuPka8kiyQn7IZHfELuTYBBM2ZeDKhK24yvLv0Qp-OrWazYDPZ3g0g-wi_6GrOliSVZtZJU0zsZcqq5hFUcUjv9-vSEog` }
    }).then(test=>test.json())
    .then(resp=>{
        console.log(resp)
    })

/* 

export const callApiWithAppCheckExample = async () => {
    //obtiene el token
    const tokenLocalStorage = await AsyncStorage.getItem('@accessToken')
    //const tokenLocalStorage = 'asds'
    //hace fetch
    const apiResponse = await fetch('http://18.208.120.129:8080/pet', {
        headers: {
            'Authorization': `Bearer ${tokenLocalStorage}`,
            'X-Firebase-AppCheck': tokenLocalStorage
        }
    }
    )
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(err => console.error(err));
    // consologea respue sta
    console.log({ respuesta: apiResponse });
}; */