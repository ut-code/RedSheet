import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "./Problem.module.css";
import React, { useState, useEffect } from "react";
import { Header, Form, Container, Button, TextArea } from "semantic-ui-react";
import { useRouter } from "next/router";

type Problem = {
  id: number;
  title: string;
  content: string;
};

const splitPattern = new RegExp(/<<<|>>>/, "i");

const ProblemPage: NextPage = () => {
  const [problem, setProblem] = useState<Problem | null>(null);
  const router = useRouter();
  useEffect(() => {
    if (!router.query.id) return;
    (async () => {
      const response = await fetch(`/api/problems/${router.query.id}`);
      const problem: Problem = await response.json();
      setProblem(problem);
      setRawText(problem.content);
      setContents(problem.content.split(splitPattern));
    })();
  }, [router.query.id]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [rawText, setRawText] = useState<string>("");
  const [contents, setContents] = useState<string[]>([]);
  const [isCovered, setIsCovered] = useState<boolean>(true);
  const changeCoverState = () => {
    isCovered ? setIsCovered(false) : setIsCovered(true);
  };
  const cancelUpdateContent = () => {
    setRawText("");
    setIsEdit(false);
    setIsCovered(true);
  };
  const updateContent = async() => {
    setContents(rawText.split(splitPattern));
    setIsEdit(false);
    setIsCovered(true);
    await fetch("/api/addProblem",{
      method: "post",
      headers: { "Content-Type":"application/json"},
      body: JSON.stringify({title: problem?.title, content: problem?.content}),
    })
    
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Red-Sheet</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header as="h2" className={styles.title}>
          {problem ? problem.title : "?????????????????????"}
        </Header>
        <div className={styles.content}>
          {isEdit ? (
            <>
              <Form className={styles.form}>
                <TextArea
                  autoHeight
                  value={rawText}
                  placeholder="Please enter a new problem."
                  onChange={(event) => {
                    setRawText(event.target.value);
                  }}
                  rows={3}
                  className={styles.formTextArea}
                />
              </Form>
            </>
          ) : (
            <>
              <Container className={styles.container}>
                {contents.map((content, index) =>
                  index % 2 == 0 ? (
                    content
                  ) : (
                    <span
                      className={styles.mark}
                      key={index}
                      style={
                        isCovered
                          ? { backgroundColor: "black" }
                          : { color: "red" }
                      }
                    >
                      {content}
                    </span>
                  )
                )}
              </Container>
            </>
          )}
        </div>
        <div className={styles.buttons}>
          {isEdit ? (
            <>
              <Button onClick={updateContent}>????????????</Button>
              <Button onClick={cancelUpdateContent}>??????????????????</Button>
            </>
          ) : (
            <>
              <Button onClick={() => setIsEdit(true)}>
                ???????????????????????????
              </Button>
              <Button onClick={changeCoverState}>
                ?????????{isCovered ? "??????" : "?????????"}
              </Button>
            </>
          )}
        </div>
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

export default ProblemPage;
