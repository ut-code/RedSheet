import { PrismaClient } from "@prisma/client";
import { NextApiResponse, NextApiRequest } from "next";

const client = new PrismaClient

export default async function addProblem(
    request : NextApiRequest,
    response : NextApiResponse
){
    if (request.method !== 'POST') {
        response.status(405).send({ message: 'Only POST requests allowed' })
        return
      }
    await client.problem.create({data:{title: request.body.title, content: request.body.content}})
    response.status(200).json(null);
}