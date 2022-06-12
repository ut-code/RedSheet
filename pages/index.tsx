import type { NextPage } from "next";
import Link from "next/link";
import { Button, Container } from "semantic-ui-react";
import PageHeader from "../components/PageHeader/PageHeader";
import PageFooter from "../components/PageFooter/PageFooter";
import styles from "./Home.module.css";

const Home: NextPage = () => {
  return (
    <>
      <PageHeader />
      <Container text className={styles.main}>
        <p>RedSheet は、暗記学習をサポートするツールです。</p>
        <Link href="./problems">
          <Button primary as="a">
            はじめる
          </Button>
        </Link>
      </Container>
      <PageFooter />
    </>
  );
};

export default Home;
