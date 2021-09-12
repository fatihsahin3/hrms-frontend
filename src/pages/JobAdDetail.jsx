import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, Button } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  applyJobAd,
  withdrawApplication,
} from "../store/actions/applicationActions";
import JobAdService from "../services/jobAdService";

export default function JobAdDetail() {
  let { id } = useParams();

  const [jobAd, setjobAd] = useState({});
  const { applications } = useSelector((state) => state.applications);
  const dispatch = useDispatch();

  const handleApplyJob = (jobAd) => {
    dispatch(applyJobAd(jobAd));
  };

  const handleWithdrawApplication = (jobAd) => {
    dispatch(withdrawApplication(jobAd));
  };

  function checkIfJobApplied(jobAd) {
    for (let index = 0; index < applications.length; index++) {
      const element = applications[index];

      if (element.jobAd.id === jobAd.id) {
        return true;
      }
    }
  }

  useEffect(() => {
    let jobAdService = new JobAdService();
    jobAdService
      .getJobAdsById(id)
      .then((result) => setjobAd(result.data.data[0]));
  }, [id]);

  return (
    <div>
      <Card.Group>
        <Card fluid>
          <Card.Content>
            <Card.Header>{jobAd.jobTitle}</Card.Header>
            <Card.Meta>{jobAd.companyName}</Card.Meta>
            <Card.Description>
              Deadline:
              {" " +
                moment(new Date(Date.parse(jobAd.deadline))).format(
                  "DD-MM-YYYY"
                )}
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <div className="ui two buttons">
              <Button as={NavLink} to="/" basic color="yellow">
                Back
              </Button>

              {checkIfJobApplied(jobAd) === true ? (
                <Button
                  onClick={() => handleWithdrawApplication(jobAd)}
                  basic
                  color="red"
                >
                  Withdraw
                </Button>
              ) : (
                <Button
                  onClick={() => handleApplyJob(jobAd)}
                  basic
                  color="green"
                >
                  Apply
                </Button>
              )}
            </div>
          </Card.Content>
        </Card>
      </Card.Group>
    </div>
  );
}
