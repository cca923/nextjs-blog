import { useState } from "react";

import Form from "./Form";
import Result from "../../../containers/Result";

export default function Search() {
  const [url, setUrl] = useState();

  return (
    <>
      <Form setUrl={setUrl} />
      <Result url={url} />
    </>
  );
}
