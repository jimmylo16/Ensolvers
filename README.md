# Ensolvers

To run the project locally please install docker and run the following command in the terminal

```bash
$ docker compose up -d
```

you will install the back, the front, the database and run the migrations

## Description

This is a project for Ensolvers, it is a simple web application that allows you:

- Login a and register
- See user based info, so every user will have theirs own notes
- Add Notes
- Add Categories
- Add Categories to those notes
- See all the Notes by user
- Edit an especific Note
- Delete a Note (Soft Delete in the database)
- Archieve a Note (Change the status in the database)
- Activate a Note

## TechStack

# FrontEnd

See detailed [information](./frontend/README.md), the technologies used are:

- Tailwind css
- Typescript
- shadCDN (React Hook Form, zod and the ui library components)
- axios
- jest
- react-dom

# Backend

See detailed [information](./backend/README.md), the technologies used are:

- Typescript
- TypeORM
- postgress
- passport
- classValidator
- jest
- jwt
- swagger

# Database

- postgress

# Docker
