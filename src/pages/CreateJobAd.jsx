import React, { useEffect, useState } from "react";
import { Formik, Form, useFormik } from "formik";
import * as Yup from "yup";
import {
  Card,
  Button,
  Divider,
  Dropdown,
  FormField,
  TextArea,
} from "semantic-ui-react";
import JobAdService from "../services/jobAdService";
import CityService from "../services/cityService";
import JobTitleService from "../services/jobTitleService";
import WorkingTimeService from "../services/workingTimeService";
import WorkingTypeService from "../services/workingTypeService";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

export default function CreateJobAd() {
  const [jobTitles, setJobTitles] = useState([]);
  const [workingTypes, setWorkingTypes] = useState([]);
  const [workingTimes, setWorkingTimes] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    let jobTitleService = new JobTitleService();
    let workingTypeService = new WorkingTypeService();
    let workingTimeService = new WorkingTimeService();
    let cityService = new CityService();

    jobTitleService
      .getJobTitles()
      .then((result) => setJobTitles(result.data.data));
    workingTypeService
      .getWorkingTypes()
      .then((result) => setWorkingTypes(result.data.data));
    workingTimeService
      .getWorkingTimes()
      .then((result) => setWorkingTimes(result.data.data));
    cityService.getCities().then((result) => setCities(result.data.data));
    console.log(jobTitleOption);
  }, []);

  const history = useHistory();

  const initialValues = {
    jobTitle: { id: "" },
    city: { id: "" },
    workingType: { id: "" },
    workingTime: { id: "" },
    minSalary: "",
    maxSalary: "",
    openPositions: "",
    appDeadline: "",
    jobDescription: "",
  };

  const jobAdCreateSchema = Yup.object().shape({
    /*jobTitle: Yup.string().required("Job title is required!"),
    city: Yup.string().required("City is required!"),
    workingType: Yup.string().required("Working type is required!"),
    workingTime: Yup.string().required("Working time is required!"),
    minSalary: Yup.string().required("Minimum salary is required!"),
    maxSalary: Yup.string().required("Maximum salary is required!"),
    openPositions: Yup.string().required(
      "Number of open positions is required!"
    ),
    appDeadline: Yup.string().required("Application Deadline is required!"),
    jobDescription: Yup.string().required("Description is required!"),*/
  });

  const jobTitleOption = jobTitles.map((jobTitle, index) => ({
    key: index,
    text: jobTitle.name,
    value: jobTitle.id,
  }));

  const workingTypeOption = workingTypes.map((workingType, index) => ({
    key: index,
    text: workingType.name,
    value: workingType.id,
  }));

  const workingTimeOption = workingTimes.map((workingTime, index) => ({
    key: index,
    text: workingTime.name,
    value: workingTime.id,
  }));

  const cityOption = cities.map((city, index) => ({
    key: index,
    text: city.name,
    value: city.id,
  }));

  const formik = useFormik({
    initialValues,
    jobAdCreateSchema,
  });

  function handleSubmit(values) {
    let jobAdService = new JobAdService();
    jobAdService.addJobAd(values).then((result) => {
      if (result.data.success === true) {
        toast.success(result.data.message);
        console.log(result);
      } else {
      }
    });
  }

  return (
    <div>
      <Card fluid>
        <Card.Content>
          <Card.Header>Create A New Job Ad</Card.Header>
          <Divider inverted />
          <Formik
            initialValues={initialValues}
            validationSchema={jobAdCreateSchema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            {({ values, setFieldValue }) => (
              <div>
                <pre>{JSON.stringify(values, undefined, 2)}</pre>

                <Form className="ui form">
                  <FormField>
                    <label>Job Title</label>
                    <Dropdown
                      selection
                      placeholder="Select a Job Title"
                      name="jobTitle"
                      fluid
                      options={jobTitleOption}
                      value={values.jobTitle.id}
                      onChange={(_, { value }) =>
                        setFieldValue("jobTitle.id", value)
                      }
                    />
                  </FormField>
                  <FormField>
                    <label>City</label>
                    <Dropdown
                      selection
                      placeholder="Select a City"
                      name="city"
                      fluid
                      options={cityOption}
                      value={values.city.id}
                      onChange={(_, { value }) =>
                        setFieldValue("city.id", value)
                      }
                    />
                  </FormField>
                  <FormField>
                    <label>Working Type</label>
                    <Dropdown
                      selection
                      placeholder="Select a Working Type"
                      name="workingType"
                      fluid
                      options={workingTypeOption}
                      value={values.workingType.id}
                      onChange={(_, { value }) =>
                        setFieldValue("workingType.id", value)
                      }
                    />
                  </FormField>

                  <FormField>
                    <label>Working Time</label>
                    <Dropdown
                      selection
                      placeholder="Select a Working Time"
                      name="workingTime"
                      fluid
                      options={workingTimeOption}
                      value={values.workingTime.id}
                      onChange={(_, { value }) =>
                        setFieldValue("workingTime.id", value)
                      }
                    />
                  </FormField>

                  {/* <FormField>
                <label>Working Type</label>
                <Dropdown
                  name="workingType"
                  placeholder="Select a Working Type"
                  fluid
                  selection
                  options={workingTypeOption}
                />
              </FormField>
              <FormField>
                <label>Working Time</label>
                <Dropdown
                  name="workingTime"
                  placeholder="Select a Working Time"
                  fluid
                  selection
                  options={workingTimeOption}
                />
              </FormField>
              <FormField>
                <label>Minimum Salary</label>
                <MyCustomTextInput
                  name="minSalary"
                  placeholder="Minimum Salary"
                />
              </FormField>
              <FormField>
                <label>Maximum Salary</label>
                <MyCustomTextInput
                  name="maxSalary"
                  placeholder="Maximum Salary"
                />
              </FormField>
              <FormField>
                <label>Number of Open Positions</label>
                <MyCustomTextInput
                  name="openPositions"
                  placeholder="Number of Open Positions"
                />
              </FormField>
              <FormField>
                <label>Application Deadline</label>
                <input
                  name="appDeadline"
                  style={{ width: "100%" }}
                  type="date"
                  placeholder="Application Deadline"
                />
              </FormField>
              <FormField>
                <label>Job Description</label>
                <TextArea
                  name="jobDescription"
                  placeholder="Job Description"
                  style={{ minHeight: 100 }}
                />
              </FormField> */}

                  <FormField>
                    <Button color="green" type="submit">
                      Submit
                    </Button>
                  </FormField>
                </Form>
              </div>
            )}
          </Formik>
        </Card.Content>
      </Card>
    </div>
  );
}
