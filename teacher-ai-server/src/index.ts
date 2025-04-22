import express from "express";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";

dotenv.config();

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Apply middleware
  app.use(cors());
  app.use(express.json());

  // Create GraphQL Server
  const gqlServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hey there, I am a GraphQL server",
      },
    },
  });

  // Start the GraphQL server
  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json("Server is up and running");
  });

  // Apply Apollo Server middleware
  app.use("/graphql", expressMiddleware(gqlServer) as any);

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

init();
