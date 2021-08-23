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
import CityService from "../services/cityService";
import JobTitleService from "../services/jobTitleService";
import WorkingTimeService from "../services/workingTimeService";
import WorkingTypeService from "../services/workingTypeService";
import MyCustomTextInput from "../utilities/customFormControls/MyCustomTextInput";

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

  const initialValues = {
    jobTitle: "",
    city: "Istanbul",
    workingType: "",
    workingTime: "",
    minSalary: "",
    maxSalary: "",
    openPositions: "",
    appDeadline: "",
    jobDescription: "",
  };

  const jobAdCreateSchema = Yup.object().shape({
    jobTitle: Yup.string().required("Job title is required!"),
    city: Yup.string().required("City is required!"),
    workingType: Yup.string().required("Working type is required!"),
    workingTime: Yup.string().required("Working time is required!"),
    minSalary: Yup.string().required("Minimum salary is required!"),
    maxSalary: Yup.string().required("Maximum salary is required!"),
    openPositions: Yup.string().required(
      "Number of open positions is required!"
    ),
    appDeadline: Yup.string().required("Application Deadline is required!"),
    description: Yup.string().required("Description is required!"),
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

  const onSubmit = (values) => {
    values.employerId = 4;
  };

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
              console.log(values);
            }}
          >
            <Form className="ui form">
              <FormField>
                <label>Job Title</label>
                <Dropdown
                  name="jobTitle"
                  placeholder="Select a Job Title"
                  fluid
                  selection
                  options={jobTitleOption}
                />
              </FormField>
              <FormField>
                <label>City</label>
                <Dropdown
                  name="city"
                  placeholder="Select a City"
                  fluid
                  selection
                  options={cityOption}
                />
              </FormField>
              <FormField>
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
                <label>City</label>
                <Dropdown
                  name="city"
                  placeholder="Select a City"
                  fluid
                  selection
                  options={cityOption}
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
              </FormField>
              <Button color="green" type="submit">
                Submit
              </Button>
            </Form>
          </Formik>
        </Card.Content>
      </Card>
    </div>
  );
}

// return (
//   <div>
//     <Card fluid>
//       <Card.Content>
//         <Card.Header>Create A New Job Ad</Card.Header>

//         <Divider inverted />
//         <Form>
//           <Form.Field>
//             <label>Job Title</label>
//             <Dropdown
//               name="jobTitle"
//               placeholder="Select a Job Title"
//               fluid
//               selection
//               options={jobTitleOption}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>City</label>
//             <Dropdown
//               name="city"
//               placeholder="Select a City"
//               fluid
//               selection
//               options={cityOption}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Working Type</label>
//             <Dropdown
//               name="workingType"
//               placeholder="Select a Working Type"
//               fluid
//               selection
//               options={workingTypeOption}
//             />
//           </Form.Field>
//           <Form.Field>
//             <label>Working Time</label>
//             <Dropdown
//               name="workingTime"
//               placeholder="Select a Working Time"
//               fluid
//               selection
//               options={workingTimeOption}
//             />
//           </Form.Field>
//           {/* Block Comments */}
//           <Form.Field>
//             <Grid stackable>
//               <Grid.Column width={8}>
//                 <label style={{ fontWeight: "bold" }}>Mimimum Salary</label>
//                 <Input
//                   name="minSalary"
//                   style={{ width: "100%" }}
//                   type="number"
//                   placeholder="Minimum Salary"
//                 ></Input>
//               </Grid.Column>
//               <Grid.Column width={8}>
//                 <label style={{ fontWeight: "bold" }}>Maximum Salary</label>
//                 <Input
//                   name="maxSalary"
//                   style={{ width: "100%" }}
//                   type="number"
//                   placeholder="Maximum Salary"
//                 ></Input>
//               </Grid.Column>
//             </Grid>
//           </Form.Field>
//           {/* Block Comments */}
//           <Form.Field>
//             <Grid stackable>
//               <Grid.Column width={8}>
//                 <label style={{ fontWeight: "bold" }}>Open Positions</label>
//                 <Input
//                   name="openPositions"
//                   id="openPositions"
//                   style={{ width: "100%" }}
//                   type="number"
//                   placeholder="Open Positions"
//                 />
//               </Grid.Column>
//               <Grid.Column width={8}>
//                 <label style={{ fontWeight: "bold" }}>
//                   Application Deadline
//                 </label>
//                 <Input
//                   name="appDeadline"
//                   style={{ width: "100%" }}
//                   type="date"
//                   placeholder="Application Deadline"
//                 />
//               </Grid.Column>
//             </Grid>
//           </Form.Field>
//           {/* Block Comments */}

//           <Form.Field>
//             <label>Job Description</label>
//             <TextArea
//               name="jobDescription"
//               placeholder="Job Description"
//               style={{ minHeight: 100 }}
//             />
//           </Form.Field>
//           {/* Block Comments */}

//           <Button type="submit">Submit</Button>
//         </Form>
//       </Card.Content>
//     </Card>
//   </div>
// );
