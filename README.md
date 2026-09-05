<div align="center">

# HealthLink

**Healthcare workflows combined with brain-tumour MRI segmentation.**

<img src="https://img.shields.io/badge/Completed_competition_project-4F86FF?style=flat-square&labelColor=0B1224" alt="Completed competition project" /> <img src="https://img.shields.io/badge/Public_repository-4F86FF?style=flat-square&labelColor=0B1224" alt="Public repository" />

[Portfolio](https://kavindudamsith.tech/) &nbsp;|&nbsp; [LinkedIn](https://www.linkedin.com/in/kavindu-damsith-86696722a/) &nbsp;|&nbsp; [Email](mailto:kavindudamsith65@gmail.com)

</div>

---

## Overview

HealthLink was developed for a competition. It connects a React healthcare application and Node.js API with a Flask-based ResUNet service that processes MRI images, while Kubernetes manifests describe a deployable multi-service environment.

## What it does

| Area | Details |
| --- | --- |
| **Healthcare workflows** | Users, doctors, appointments, reports, and administrative dashboards. |
| **MRI analysis** | A Flask service loads trained ResUNet weights and processes uploaded scan images. |
| **Role protection** | JWT-based authentication plus administrator and application middleware. |
| **Deployment** | Dockerfiles, Kubernetes namespace, frontend, backend, configuration, secrets, and ingress manifests. |

## Repository map

| Path | Purpose |
| --- | --- |
| `healthLink/frontend/` | React interface, dashboards, forms, reports, and visual assets. |
| `healthLink/backend/` | Express API, controllers, routes, middleware, and database access. |
| `healthLink/flaskBackend/` | ResUNet model service, weights, and development inputs. |
| `deployment/` | Container and Kubernetes deployment manifests. |
| `db/` | Relational database model and SQL export. |

## Technology

- **React**
- **Node.js**
- **Express**
- **MySQL**
- **Flask**
- **ResUNet**
- **Docker**
- **Kubernetes**

## Local setup

```bash
cd healthLink/backend && npm install && npm run dev
# In another terminal
cd healthLink/frontend && npm install && npm start
# The model service is started separately from healthLink/flaskBackend
```

### Configuration notes

Configure local database, authentication, API endpoints, and model paths. Deployment secrets in source history must not be reused.

## Status

Completed competition project.

## Links

- [Portfolio case study](https://kavindudamsith.tech/#work)

---

Questions about this repository? [Email me](mailto:kavindudamsith65@gmail.com) or connect on [LinkedIn](https://www.linkedin.com/in/kavindu-damsith-86696722a/).
