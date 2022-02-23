import { useState } from "react";

import Form from "./form";
import Result from "./result";

export default function Search() {
  const [url, setUrl] = useState();

  return (
    <>
      <Form setUrl={setUrl} />
      <Result url={url} />
    </>
  );
}
