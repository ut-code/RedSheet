import { NextApiRequest, NextApiResponse } from "next";
import {PrismaClient} from "@prisma/client";

const client = new PrismaClient();

export default async function getProblemsData(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const problems = await client.problem.findMany();
  response.status(200).json(problems);
}
