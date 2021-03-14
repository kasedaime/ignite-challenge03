const express = require("express");

const {
  v4: uuidv4
} = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {
    title,
    url,
    techs
  } = request.body;

  const repository = {
    id: uuidv4(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const {
    id
  } = request.params;
  // const {
  //   title,
  //   rul,
  //   techs
  // } = request.body;
  const updatedRepository = request.body;

  const repository = repositories.find(repository => repository.id === id);

  if (!repository) {
    return response.status(404).json({
      error: "Repository not found"
    });
  }

  repository.title = updatedRepository.title;
  repository.url = updatedRepository.url;
  repository.techs = updatedRepository.techs;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const {
    id
  } = request.params;

  const hasRepository = repositories.some((repository) => repository.id === id);

  if (!hasRepository) {
    return response.status(404).json({
      error: "Repository not found"
    });
  }

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {
    id
  } = request.params;

  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(404).json({
      error: "Repository not found"
    });
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;