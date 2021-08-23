import React from "react";
import { Dropdown, Image, Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function SignedIn({ signOut }) {
  return (
    <div>
      <Menu.Item>
        <Image
          avatar
          spaced="right"
          src="https://media-exp1.licdn.com/dms/image/C5603AQHM1Z1PVE1otA/profile-displayphoto-shrink_800_800/0/1617481543269?e=1634774400&v=beta&t=3CXl4MZWhe8wXoc-W8sv7fIorKpriu5apgLVvPX6zB8"
        />
        <Dropdown>
          <Dropdown.Menu>
            <Dropdown.Item text="My Data" icon="info" />
            <Dropdown.Item
              as={Link}
              to={"/cv/create"}
              text="Create CV"
              icon="info"
            />
            <Dropdown.Item
              as={Link}
              to={"/jobad/create"}
              text="Create Job Ad"
              icon="info"
            />
            <Dropdown.Item onClick={signOut} text="Sign Out" icon="sign-out" />
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </div>
  );
}
