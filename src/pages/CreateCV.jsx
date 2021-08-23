import { Form, Formik } from "formik";
import React from "react";
import { Button } from "semantic-ui-react";
import * as Yup from "yup";
import MyCustomTextInput from "../utilities/customFormControls/MyCustomTextInput";

export default function CreateCV() {
  const initialValues = { cvName: "My CV", candidateAge: 25 };
  const schema = Yup.object({
    cvName: Yup.string().required("Cv name mandatory!"),
    candidateAge: Yup.number().required("Candidate age mandatory!"),
  });

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        <Form className="ui form">
          <MyCustomTextInput name="cvName" placeholder="CV Name" />
          <MyCustomTextInput name="candidateAge" placeholder="Your Age" />
          <Button color="green" type="submit">
            Submit
          </Button>
        </Form>
      </Formik>
    </div>
  );
}
