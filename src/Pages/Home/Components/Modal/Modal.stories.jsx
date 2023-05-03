import React from "react";
import Modal from "./index";
import "./styles.module.scss";

export default {
  title: "Modal",
  component: Modal,
  argTypes: {
    onClose: { action: "closed" },
  },
};

const Template = (args) => <Modal {...args} />;

export const Visible = Template.bind({});
Visible.args = {
  display: true,
  children: <p>Modal content goes here</p>,
  /*onClose: () => {
    Visible.args.display = false;
  },*/
};

export const Hidden = Template.bind({});
Hidden.args = {
  display: false,
  children: <p>Modal content goes here</p>,
  /*onClose: () => {
    Hidden.args.display = false;
  },*/
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  display: true,
  children: (
    <>
      <h1>HRNET</h1>
      <p>Nouvel employé créé 😁</p>
    </>
  ),
  /*onClose: () => {
    CustomContent.args.display = false;
  },*/
};
