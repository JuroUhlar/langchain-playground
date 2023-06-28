---
title: "Account Limits"
slug: "account-limits"
hidden: false
createdAt: "2022-06-06T18:36:07.420Z"
updatedAt: "2023-06-12T11:58:35.413Z"
---
All  Fingerprint **accounts**  are limited to **one unlimited 14-day free trial**. After you sign up, you are automatically enrolled in the free trial and can try the Fingerprint API without limitations. After the trial period ends, you must upgrade to a paid plan to continue using Fingerprint. 

All Fingerprint **applications** have the following default limits:

| Resource                | Default Limit         | Notes                                                                                                                                                                                                                                |
| :---------------------- | :-------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SSL certificates        | 1                     | Each SSL Certificate can hold up to 50 [subdomains](doc:subdomain-integration).                                                                                                                                                      |
| API Keys                | 10                    | The number of API keys that an application can have. Includes **public** and **secret** keys.                                                                                                                                        |
| Monthly API requests    | **unlimited**         | Only Identification API requests count towards your monthly plan or are billed. Server API requests are free.                                                                                                                        |
| API Rate Limit          | 5 requests per second | The maximum number of API requests per second for the public and secret keys. It is possible to increase the limit on a paid plan by emailing support.                                                                               |
| Webhook endpoints       | 5                     | [Webhooks](doc:webhooks).                                                                                                                                                                                                            |
| Request filtering rules | 15                    | [Request filtering rules](doc:request-filtering) that an application can have in total. Includes **allowed/forbidden origins** and **forbidden HTTP headers**.                                                                       |
| Visit history           | 30 days               | For plans, visit history is available through the [Server API](https://dev.fingerprint.com/docs/server-api) for the past 30 days. For Enterprise plans, the data is kept for 90 days or longer depending on the enterprise contract. |

> 📘 Increasing Limits
> 
> If you want to increase a limit, please reach out to [our support team](https://fingerprint.com/support/).