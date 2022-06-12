import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Problems.module.css";
import React, { useEffect, useState } from "react";
import { Card, Icon } from "semantic-ui-react";
import getProblemsData from "../api/getProblemsData";
import { responseSymbol } from "next/dist/server/web/spec-compliant/fetch-event";
const postSendApi = "pages/api/addProblem";

type Problem = {
  id: number;
  title: string;
};

const Problems: NextPage = () => {

  const [problems, setProblems] = useState<Problem>([
    { id: 1, title: "math" },
    { id: 2, title: "science" },
  ]);

  const getMessagesApi = "/api/getProblemsData";
  useEffect(() => {
    const timerId = setInterval(async () => {
      const response = await fetch(getMessagesApi);
      setProblems(await response.json());
    }, 5000);

    // useEffect フックに指定した関数の戻り値に指定した関数はコンポーネントの破棄時に実行される
    return () => {
      clearInterval(timerId);
    };
  }, []);

  console.log("problems:");
  console.log(problems);

  // const problems: Problem[] = [
  //   { id: 1, title: "math" },
  //   { id: 2, title: "science" },
  // ];

  return (
    <div className={styles.container}>
      <Head>
        <title>Red-Sheet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>問題一覧</div>
        <Card.Group className={styles.problems}>
          {problems.map((problem) => (
            <Card fluid key={problem.id}>
              <Card.Content>{problem.title}</Card.Content>
            </Card>
          ))}
            <Card fluid key={problems.length}>
              <Card.Content>
                <Icon name="plus" className={styles.plusIcon}/>
                追加する!
              </Card.Content>
            </Card>
        </Card.Group>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
};

export default Problems;