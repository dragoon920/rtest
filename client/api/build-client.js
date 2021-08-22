import axios from 'axios'

const BuildClient = ({req}) => {
    if (typeof window ==='undefined') {
        // on server
        // service name cmd:  kubectl get services -n ingress-nginx
        // namespace cmd:  kubectl get namespace
        // request should be mad to http://SERVICENAME.NAMESPCAE.svc.cluster.local
        return axios.create({
            baseURL:'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        });
    } else {
        return axios.create({
            baseUrl: '/',
        });
    }
}

export default BuildClient;