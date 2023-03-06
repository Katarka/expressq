import * as dotenv from 'dotenv'
dotenv.config()

const smtp = {
    host: 'smtp.gmail.com',
    port: 465,
    user: 'sendmailerdoors@gmail.com',
    from: 'sendmailerdoors@gmail.com',
    to: 'duka@live.ru',
    token: 'ya29.a0AVvZVsqLKj9Q4qVMDl---hdx88la-52xzaJHyR5m48nmBoPPzv5ZDW8E5a4qNaJ-2kJvKxpoYCpcqXFpAAdc-GLGQP1F_cP_7NJI4HRsEqwVLMUT72e49mnrE6yWv0g-30P1eaEw6sTh6SySziW1Np-kHo3paCgYKAc8SARESFQGbdwaI0PYBxef8hAc1Ig4V7NTdtA0163'
}

export default smtp