# Test

## Installation

Run

Creat a secret in kubernetes
kubectl create secret generic jwt-secret --from-literal=JWT_KEY=abcd

Run pmp install in auth, client and url folder

```bash
tsc --init
npm install
```

Install kubectl
https://kubernetes.io/docs/tasks/tools/

Then you can run all yaml file in rtest/infra/k8s/ as

```bash
kubectl apply -f auth-depl.yaml
```

Or

Install Skaffold
https://skaffold.dev/docs/install/

```bash
skaffold dev
```

add line in Windows\System32\drivers\ect\hosts
127.0.0.1 test.dev

open the test.dev in Chrome
