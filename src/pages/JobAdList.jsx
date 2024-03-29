import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Menu, Table } from "semantic-ui-react";
import JobAdService from "../services/jobAdService";
import moment from "moment";
import { useSelector } from "react-redux";

export default function JobAdList() {
  const [jobAds, setjobAds] = useState([]);
  const { applications } = useSelector((state) => state.applications);

  useEffect(() => {
    let jobAdService = new JobAdService();
    jobAdService.getJobAds().then((result) => setjobAds(result.data.data));
  }, []);

  function checkIfJobApplied(jobAd) {
    for (let index = 0; index < applications.length; index++) {
      const element = applications[index];

      if (element.jobAd.id === jobAd.id) {
        return true;
      }
    }

    return false;
  }

  return (
    <div>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Job Title</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
            <Table.HeaderCell>Publish Date</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
            <Table.HeaderCell>Deadline</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {jobAds.map((jobAd) => (
            <Table.Row key={jobAd.id}>
              <Table.Cell>{jobAd.jobTitle}</Table.Cell>
              <Table.Cell>{jobAd.openPositionQty}</Table.Cell>
              <Table.Cell>{jobAd.companyName}</Table.Cell>
              <Table.Cell>
                {moment(new Date(Date.parse(jobAd.publishedAt))).format(
                  "DD-MM-YYYY"
                )}
              </Table.Cell>
              <Table.Cell>
                {moment(new Date(Date.parse(jobAd.deadline))).format(
                  "DD-MM-YYYY"
                )}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/jobads/${jobAd.id}`}>
                  {checkIfJobApplied(jobAd) === false ? (
                    <Button basic color="green">
                      Apply
                    </Button>
                  ) : (
                    <Button basic color="red">
                      Withdraw
                    </Button>
                  )}
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="3">
              <Menu floated="right" pagination>
                <Menu.Item as="a" icon>
                  <Icon name="chevron left" />
                </Menu.Item>
                <Menu.Item as="a">1</Menu.Item>
                <Menu.Item as="a">2</Menu.Item>
                <Menu.Item as="a">3</Menu.Item>
                <Menu.Item as="a">4</Menu.Item>
                <Menu.Item as="a" icon>
                  <Icon name="chevron right" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}
