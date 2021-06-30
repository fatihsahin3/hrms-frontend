import React from "react";
import { useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";

export default function ApplicationSummary() {
  const { applicationItems } = useSelector((state) => state.application);
  return (
    <div>
      <Dropdown item text="Applications">
        <Dropdown.Menu>
          {applicationItems.map((applicationItem) => (
            <Dropdown.Item key={applicationItem.jobAd.id}>
              {applicationItem.jobAd.jobTitle}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
