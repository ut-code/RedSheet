import { Container, Header } from "semantic-ui-react";
import styles from "./PageHeader.module.css";

export default function PageHeader() {
  return (
    <div className={styles.root}>
      <Container>
        <Header as="h1" className={styles.headerText}>
          RedSheet
        </Header>
      </Container>
    </div>
  );
}
