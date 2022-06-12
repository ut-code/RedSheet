import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export default async function getProblemData(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const { id } = request.query;
  if (typeof id === "string") {
    const problem = await client.problem.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    response.status(200).json(problem)
  }
  response.end(`Post:${id}`);
}
