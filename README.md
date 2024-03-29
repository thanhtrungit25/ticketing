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
- Get all namespace in kubenertes: `kubectl get namespace`
- Get all services from specific namespace: `kubectl get services -n [namespace_name]`
- The pattern URL to ingress service is: `http://[NAMEOFSERVICE].NAMESPACE.svc.cluster.local` (ex: ingress-nginx-controller.ingress-inginx)

# FEATURES
- Auth service
    - [x] signup user api
        - [x] Error handling consistence
        - [x] Check user existing and save user to mongdb
        - [x] JWT with cookie session
        - [x] Tranform response to common properties
        - [x] signin user api
        - [x] Refactor, add common request validation middleware
    - [x] signin logic
        - [x] Validate user data
        - [x] Check do user exist?
        - [x] Generate JWT
        - [x] Store JWT to session object
    - [x] current user api
        - [x] Signing out api
        - [x] Create current-user middleware to handle check jwt
        - [x] Add require auth middleware to check user is logged in
- Testing isolated microservices
    - [x] Extracting to App express component file
    - [x] Add test dependencies
    - [x] Add test environment setup file
    - [x] First test valid signup enpoint
    - [x] Unit test signup
    - [x] Unit test signin
    - [x] Unit test signout
    - [x] Unit test currentuser
    - [x] Add global auth helper function
- Frontend with Next
    - [x] Bootstrap Nextjs
    - [x] Running Next in kubernetes
        - [x] Build a Next image with Dockerfile `docker build -t trungdt25/client .`
        - [x] Pust Docker client image to docker hub `docker push trungdt25/client`
        - [x] Add configure to k8 and skallfold to deploy pod client
    - [x] Speed up file change detection of Next (maybe delete client pod, this will auto regenerate client pod again with update code)
    - [x] Signup page logic
    - [x] Redirect to landing page after signin success
    - [x] Consider context (client or server NextJS) loading currentuser api from Landing Page
        - [x] Need to specific Ingress Service name and namespace to build and URL that fetch data currentuser from Next server
        - [x] Buid and helper with axios to spefic context with baseURL
- Code sharing and reused
    - [x] Login npm and create public organization name `mictickets`
    - [x] Create `common` folder and some boilerplace files include index.ts endpoint, typescript config
    - [x] Create script to publish to `mictickets` package npm
    - [x] Cut `errors` `middleware` from `auth` folder to `common` folder and re-exporting from `errors` `middleware` folders
    - [x] Add dependencies from `errors` `middleware` then build, publish again with new version
    - [x] Stop skaffold and from `auth` folder, install new common package `npm i @mictickets/common'
    - [x] Relocating some dependencies from `errors` `middleware` to other files of `auth` services and run `npx tsc` to check errors
    - [x] Re-run skaffold and testing `auth` and `client` services again


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