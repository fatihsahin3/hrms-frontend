import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";

export default function ApplicationSummary() {
  const { applications } = useSelector((state) => state.applications);

  return (
    <div>
      <Dropdown item text="Applications">
        <Dropdown.Menu>
          {applications.map((application) => (
            <Dropdown.Item key={application.jobAd.id}>
              {application.jobAd.jobTitle}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
