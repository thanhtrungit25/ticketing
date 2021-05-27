# HOW TO RUN
- Install docker and enable kubernetes on docker
- Install Ingress controller to handle routes to pod services
- Install skaffold to dev experiences with k8s config and auto restart services
- Clone project
- Cd to /auth and `npm install` all dependencies
- Because ingress controller using host to mouting to auth-srv. So we will need to set up to file /etc/env follow `127.0.0.1 ticking.dev`
- Cd to root foder name ticking that contain skaffold.yaml to autogenerate config and auto restart pod services for us and run `skaffold dev`
- Access to endpoint with `https://ticking.dev`. We need to type `thisisunsafe` if have trouble when asked with https

# Config kubenernetes env to apply to pod
- Add secret to auth pod
`kubectl create secret generic jwt-secret --from-literal=JWT_KEY=[YOUR SECRET KEY]`

# Some commands to use with kubenertes
- Show all pods status: `kubectl get pods`
- Show all services: `kubectl get services`
- Inspect specific pod with ID: `kubectl describe pod [pod_id]`

# FEATURES
- auth service
  - [x] signup user api
    - [x] Error handling consistence
    - [x] Check user existing and save user to mongdb
    - [x] JWT with cookie session
    - [x] Tranform response to common properties
- [x] signin user api
    - [x] Refactor, add common request validation middleware
    - [x] Signin logic
        - [x] Validate user data
        - [x] Check do user exist?
        - [x] Generate JWT
        - [x] Store JWT to session object
- [x] current user api
- [x] signing out api
- [x] create current-user middleware to handle check jwt

# Testing
- First check endpoind: `https://ticketing.dev/api/user/currentuser`

- Main enpoints:
* Signup
Endpoind: `https://ticketing.dev/api/users/signup`
Body:
```json
{
    "email": "test@dev.to",
    "password": 1234
}
```
Result and cookie has been set.
```json
{
    "id": "60af7cb69f26ab003262e274",
    "email": "fsdfhjkghjghjsdf@dev.to"
}
```

* Signin
Endpoind: `https://ticketing.dev/api/users/signin`
Body:
```json
{
    "email": "test@dev.to",
    "password": 1234
}
```
Result and cookie has been set.
```json
{
    "id": "60af7cb69f26ab003262e274",
    "email": "test@dev.to"
}
```